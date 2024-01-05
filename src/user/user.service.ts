import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { BaseService } from '../common/base.sevice';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserFilter } from './user.filter';
import { UserResponse } from './responses/user.response';

@Injectable()
export class UserService extends BaseService<User, CreateUserDto, UpdateUserDto, UserResponse> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'user');
  }

  filterClass = UserFilter;
  responseClass = UserResponse;
  relations: string[] = ['roles'];
}
