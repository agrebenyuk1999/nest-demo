import { PrismaClient } from '@prisma/client';
import { each } from 'lodash';

export default class PagesSeed {
  async seed(prisma: PrismaClient) {
    const items = [
      {
        key: 'privacy_policy',
        name: 'Політика конфіденційності',
        file_name: 'privacy_policy.pdf',
      }
    ];

    each(items, async (item) => {
      await prisma.page.upsert({
        where: { key: item.key },
        update: {},
        create: item,
      });
    });
  }
}
