import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AuditEvent } from '../../common/events/audit.event';
import { BaseAuditListener } from '../../common/base-audit.listener';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class CompanyAuditListener extends BaseAuditListener {
  fields = ['name', 'divisions'];

  constructor(prisma: PrismaService) {
    super(prisma);
  }

  @OnEvent('company.observe')
  async handleUserAuditEvent(event: AuditEvent) {
    await this.handleAuditEvent(event);
  }
}
