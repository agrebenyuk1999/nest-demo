import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AuditEvent } from '../../common/events/audit.event';
import { BaseAuditListener } from '../../common/base-audit.listener';
import { PrismaService } from '@prisma/prisma.service';
import { Permission } from '@prisma/client';

@Injectable()
export class RoleAuditListener extends BaseAuditListener {
  fields = ['name', 'type', 'permissions'];

  constructor(prisma: PrismaService) {
    super(prisma);
  }

  @OnEvent('role.observe')
  async handleUserAuditEvent(event: AuditEvent) {
    await this.handleAuditEvent(event);
  }

  modifyPermissions(permissions: Permission[]): string[] {
    return permissions.map((permission: Permission) => permission.description);
  }
}
