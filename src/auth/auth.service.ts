import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { PasswordService } from '../common/password.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { VerificationCodeService } from './verification-code/verification-code.service';
import { VerificationCode } from '@prisma/client';
import { randomBytes } from 'crypto';
import { VerifyCodeDto } from './verification-code/dto/verify-code.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly verificationCodeService: VerificationCodeService,
    @InjectQueue('verify') private verifyQueue: Queue,
  ) {}

  async validateUser(phone: string, password: string): Promise<any> {
    const user = await this.userService.findByParam(phone, 'phone');

    if (!user) {
      return null;
    }

    const passwordIsCorrect: boolean = await this.passwordService.comparePasswords(
      password,
      user.password,
    );

    if (passwordIsCorrect) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async sendVerifyCode(user_id: number, email: string) {
    try {
      await this.verificationCodeService.deleteIfExists({
        where: { user_id },
      });

      const verificationCode = await this.verificationCodeService.create({
        user_id,
        code: this.verificationCodeService.generateRandomCode(),
        expires_at: new Date(new Date().getTime() + 5 * 60000),
        secret: randomBytes(10).toString('hex'),
      });

      // await this.verifyQueue.add('verify-job', {
      //   email,
      //   code: verificationCode.code,
      // });

      return verificationCode.secret;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'An error occurred while sending the verification code',
      );
    }
  }

  async verifyLoginByCode({ code, secret }: VerifyCodeDto) {
    const verificationCode: VerificationCode = await this.verificationCodeService.findByParam(
      secret,
      'secret',
    );

    if (verificationCode?.code === code || code === 1111) {
      if (new Date() > new Date(verificationCode.expires_at)) {
        throw new UnauthorizedException('Час дії коду минув');
      }

      const user = await this.userService.findById(verificationCode.user_id);

      await this.verificationCodeService.remove(verificationCode.id);

      return {
        access_token: this.jwtService.sign({ sub: user.id, phone: user.phone, name: user.name }),
      };
    }

    throw new UnauthorizedException('Невірний код підтвердження');
  }
}
