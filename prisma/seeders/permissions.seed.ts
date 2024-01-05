import { PrismaClient } from '@prisma/client';
import { forEach } from 'lodash';
import IPermission from '../../src/common/permissions/IPermission';

export default class PermissionSeed {
  async seed(prisma: PrismaClient) {
    const permissions = {
      users: {
        group: 'Користувачі',
        permissions: {
          access: 'Перегляд списку користувачів',
          create: 'Створення користувачів',
          update: 'Оновлення користувачів',
          delete: 'Видалення користувачів',
        },
      },
      roles: {
        group: 'Ролі',
        permissions: {
          access: 'Перегляд списку ролей',
          create: 'Створення ролей',
          update: 'Оновлення ролей',
          delete: 'Видалення ролей',
        },
      },
      companies: {
        group: 'КП',
        permissions: {
          access: 'Перегляд списку КП',
          create: 'Створення КП',
          update: 'Оновлення КП',
          delete: 'Видалення КП',
          test: 'Видалення test',
        },
      },
      externalAgents: {
        group: 'Зовнішні агенти',
        permissions: {
          access: 'Перегляд списку зовнішніх агентів',
          create: 'Створення зовнішніх агентів',
          update: 'Оновлення зовнішніх агентів',
          delete: 'Видалення зовнішніх агентів',
        },
      },
      routes: {
        group: 'Маршрути',
        permissions: {
          access: 'Перегляд списку маршрутів',
          create: 'Створення маршрутів',
          update: 'Оновлення маршрутів',
          updatePrice: 'Оновлення цін маршрутів',
          delete: 'Видалення маршрутів',
        },
      },
      glossary: {
        group: 'Довідники',
        permissions: {
          access: 'Перегляд списку довідників',
          create: 'Створення довідників',
          update: 'Оновлення довідників',
          delete: 'Видалення довідників',
        },
      },
      privilegeGroup: {
        group: 'Групи пільг',
        permissions: {
          access: 'Перегляд списку груп пільг',
          create: 'Створення груп пільг',
          update: 'Оновлення груп пільг',
          delete: 'Видалення груп пільг',
        },
      },
      privilege: {
        group: 'Пільг',
        permissions: {
          access: 'Перегляд списку пільг',
          create: 'Створення пільг',
          update: 'Оновлення пільг',
          delete: 'Видалення пільг',
        },
      },
    };

    forEach(permissions, async (permission: IPermission, key) => {
      const permissionGroup = await prisma.permissionGroup.upsert({
        where: { name: permission.group },
        update: {},
        create: {
          name: permission.group,
        },
      });

      forEach(permission.permissions, async (description, type) => {
        const name = `${key}.${type}`;
        await prisma.permission.upsert({
          where: { name },
          update: {},
          create: {
            name,
            description,
            permission_group_id: permissionGroup.id,
          },
        });
      });
    });
  }
}
