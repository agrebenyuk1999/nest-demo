import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponse } from './responses/user.response';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HashPasswordPipe } from './pipes/hash-password.pipe';
import { User } from '@prisma/client';
import FilterDto from '../common/query.dto';
import { IPaginatedResult } from '../common/IPaginatedResult';
import { UpdateRoleDto } from '../role/dto/update-role.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import QueryDto from '../common/query.dto';

@ApiTags('user')
@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly _service: UserService) {}

  @Post()
  create(@Body(HashPasswordPipe) createDto: CreateUserDto): Promise<UserResponse | User> {
    return this._service.create(createDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<UserResponse | User | null> {
    return this._service.findById(id);
  }

  @Get()
  findAll(@Query() queryDto: QueryDto<User>): Promise<IPaginatedResult<User>> {
    return this._service.findAll(queryDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateUserDto,
  ): Promise<UserResponse | User> {
    return this._service.update(id, updateDto);
  }

  //method for delete user
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this._service.remove(id);
  }
}
