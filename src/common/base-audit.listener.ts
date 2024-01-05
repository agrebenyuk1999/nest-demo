import { PrismaService } from '@prisma/prisma.service';
import * as _ from 'lodash';
import { AuditEvent } from './events/audit.event';

export abstract class BaseAuditListener {
  constructor(protected prisma: PrismaService) {}

  abstract fields: string[];

  async handleAuditEvent(event: AuditEvent): Promise<void> {
    const { model, userId, action } = event;
    let data = this.modifyData(_.pick(event.data, this.fields));

    if (action === 'update') {
      const originalData = this.modifyData(_.pick(event.originalData, this.fields));

      if (_.isEqual(data, originalData)) {
        return;
      }

      data = this.getDifference(data, originalData);
    }

    await this.createActionLog(action, userId, data, model, event);
  }

  private modifyData<T>(data: T): T {
    for (const field of this.fields) {
      if (data[field]) {
        const modifyMethod = `modify${_.upperFirst(field)}`;
        if (typeof this[modifyMethod] === 'function') {
          data[field] = this[modifyMethod](data[field]);
        }
      }
    }

    return data;
  }

  private getDifference<T>(data: T, originalData: T): T {
    const differences = {};

    _.forEach(this.fields, (key) => {
      if (!_.isEqual(data[key], originalData[key])) {
        differences[key] = {
          oldValue: originalData[key],
          newValue: data[key],
        };
      }
    });

    return differences as T;
  }

  private async createActionLog(
    action: string,
    userId: number,
    data: any,
    model: string,
    event: AuditEvent,
  ): Promise<void> {
    await this.prisma.actionLog.create({
      data: {
        action,
        user_id: userId,
        data,
        entity: model,
        entity_id: action === 'delete' ? null : event.data.id,
      },
    });
  }
}
