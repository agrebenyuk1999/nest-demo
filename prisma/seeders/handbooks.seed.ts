import { PrismaClient } from '@prisma/client';
import { each } from 'lodash';
import { CATEGORY } from "../../src/glossary/glossary.constants";

export default class HandbooksSeed {
  async seed(prisma: PrismaClient) {
    const handbooks = [
      // Глоссарии
      {
        key: CATEGORY.COST,
        category: 'glossary',
        value: 'Вартість',
      },
      {
        key: CATEGORY.TRANSPORT_TYPE,
        category: 'glossary',
        value: 'Тип транспорту',
      },
      {
        key: CATEGORY.ENTERPRISE,
        category: 'glossary',
        value: 'Підприємство',
      },
      {
        key: CATEGORY.POSITION,
        category: 'glossary',
        value: 'Посада',
      },
      {
        key: CATEGORY.PRIVILEGE_TYPE,
        category: 'glossary',
        value: 'Типи пільг',
      },
    ];

    each(handbooks, async (item) => {
      await prisma.handbook.upsert({
        where: {
          key_category: {
            key: item.key,
            category: item.category,
          }
        },
        update: {
          value: item.value
        },
        create: item,
      })
    });
  }
}
