import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
  Request,
  UnauthorizedException,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from '../user/decorators/user.decorator';
import { Public } from './decorators/auth.public.decorator';
import { VerifyCodeDto } from './verification-code/dto/verify-code.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @Public()
  async login(@Body() dto: LoginDto, @User() user: IAuthUser) {
    return this.service.sendVerifyCode(user.id, user.email);
  }

  @Post('verify-code')
  @Public()
  async verifyLoginByCode(
    @Body() verifyCodeDto: VerifyCodeDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const verified = await this.service.verifyLoginByCode(verifyCodeDto);

    response.cookie('access_token', verified.access_token, {
      httpOnly: true,
      path: '/',
      maxAge: 1000 * 60 * 60 * 24,
      secure: false, // true for https
    });

    return { message: 'Login successful' };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token', {
      path: '/',
      secure: false, // // true for https
    });

    return { message: 'Logout successful' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify-session')
  async verifySession(@Request() req, @User() user) {
    if (!req.user) {
      throw new UnauthorizedException('Unauthorized');
    }

    return { user };
  }
}
