import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleFilter } from './role.filter';
import { APP_GUARD } from '@nestjs/core';
import { PermissionsGuard } from '../common/permissions.guard';

@Module({
  controllers: [RoleController],
  providers: [RoleService, { provide: APP_GUARD, useClass: PermissionsGuard }],
})
export class RoleModule {}
