import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AuditEvent } from '../common/events/audit.event';
import { includes } from 'lodash';
import { snakeCase } from 'lodash';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private eventEmitter: EventEmitter2) {
    super();
  }

  private currentUserId: number;

  setCurrentUser(userId: number) {
    this.currentUserId = userId;
  }

  async onModuleInit() {
    await this.$connect();

    this.$use(async (params, next) => {
      if (params.model == 'User') {
        if (params.action == 'delete') {
          params.action = 'update';
          params.args['data'] = { deleted: new Date() };
        }
      }

      let originalData = null;

      if (['create', 'update', 'delete'].includes(params.action)) {
        if (params.action === 'update') {
          const data = params.args.data;
          const includeRelations = [];
          for (const key in data) {
            if (typeof data[key] === 'object' && includes(data[key], 'set')) {
              includeRelations[key] = true;
            }
          }

          originalData = await this[params.model].findFirst({
            where: params.args.where,
            include: includeRelations,
          });
        }

        const result = await next(params);

        this.eventEmitter.emit(
          `${snakeCase(params.model).toLowerCase()}.observe`,
          new AuditEvent(params.model, this.currentUserId, params.action, result, originalData),
        );

        return result;
      }

      return next(params);
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
