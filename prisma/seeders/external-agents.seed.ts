import { PrismaClient } from '@prisma/client';
import { each } from 'lodash';

export default class ExternalAgentsSeed {
  async seed(prisma: PrismaClient) {
    const items = [
      {
        name: 'qr',
        api_token: '12345678',
      }
    ];

    each(items, async (item) => {
      await prisma.externalAgent.upsert({
        where: { name: item.name },
        update: {},
        create: item,
      });
    });
  }
}
