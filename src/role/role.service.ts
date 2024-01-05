import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { BaseService } from '../common/base.sevice';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleFilter } from './role.filter';
import { RoleResponse } from './responses/role.response';

@Injectable()
export class RoleService extends BaseService<Role, CreateRoleDto, UpdateRoleDto> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'role');
  }

  filterClass = RoleFilter;
  responseClass = RoleResponse;

  relations: string[] = ['permissions'];
}
