import { PrismaClient } from '@prisma/client';
import {each, find} from 'lodash';
import {CATEGORY} from "../../src/glossary/glossary.constants";
import {PRIVILEGE_KEY} from "../../src/privilege/privilege.constants";

export default class PrivilegeGroupSeed {

  startDate = new Date("2023-01-01T00:00:00+0200");
  endDate = new Date("2023-12-31T23:59:59+0200");

  async seed(prisma: PrismaClient) {

    const ts = await prisma.glossary.findMany({
      where: {
        category: CATEGORY.PRIVILEGE_TYPE,
      }
    })

    const items = [
      {
        name: 'Учнівська',
        limit: -1,
        percent: 100,
        start_date: this.startDate,
        end_date: this.endDate,
        privileges: [
          {
            name: 'Учнівська',
            key: PRIVILEGE_KEY.PUPIL,
            type_id: find(ts, (e) => e.value === 'Учнівська').id,
          },
        ],
      },
      {
        name: 'Студентська',
        limit: 30,
        percent: 50,
        start_date: this.startDate,
        end_date: this.endDate,
        privileges: [
          {
            name: 'Студентська',
            key: PRIVILEGE_KEY.STUDENT,
            type_id: find(ts, (e) => e.value === 'Студентська').id,
          },
        ],
      },
      {
        name: 'Соц ознака 1',
        limit: 50,
        percent: 100,
        start_date: this.startDate,
        end_date: this.endDate,
        privileges: [
          {
            code: '35',
            name: 'Пільга 1',
            type_id: find(ts, (e) => e.value === 'Соціальна').id,
          },
        ],
      },
      {
        name: 'Соц ознака 2',
        limit: 100,
        percent: 100,
        start_date: this.startDate,
        end_date: this.endDate,
        privileges: [
          {
            code: '33',
            name: 'Пільга 2',
            type_id: find(ts, (e) => e.value === 'Соціальна').id,
          },
        ],
      },
      {
        name: 'Проф ознака 1',
        limit: 50,
        percent: 100,
        start_date: this.startDate,
        end_date: this.endDate,
        privileges: [
          {
            name: 'Пільга 3',
            type_id: find(ts, (e) => e.value === 'Професійна').id,
            factory_id: null,
          },
        ],
      },
    ];

    await prisma.privilege.deleteMany({});
    await prisma.privilegeGroup.deleteMany({});

    each(items, async (item) => {
      await prisma.privilegeGroup.create({
        data: {
          name: item.name,
          limit: item.limit,
          percent: item.percent,
          start_date: item.start_date,
          end_date: item.end_date,
          privileges: {
            create: item.privileges,
          },
        }
      })
    });
  }
}
