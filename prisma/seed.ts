import { PrismaClient, UserStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as process from 'process';
import PermissionSeed from './seeders/permissions.seed';
import ExternalAgentsSeed from './seeders/external-agents.seed';
import PagesSeed from './seeders/pages.seed';
import RoutesSeed from './seeders/route/routes.seed';
import HandbooksSeed from './seeders/handbooks.seed';
import GlossariesSeed from './seeders/glossaries.seed';
import { each } from 'lodash';
import PrivilegeGroupSeed from './seeders/privilege-group.seed';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('qwerty123', 10);
  const admin = await prisma.user.upsert({
    where: { phone: '0123456789' },
    update: {},
    create: {
      email: 'test@gmail.com',
      phone: '0123456789',
      password,
      name: 'Admin',
      surname: 'Admin',
      middle_name: 'Admin',
      status: UserStatus.WORKING,
    },
  });

  console.log({ admin });

  each(
    [
      PermissionSeed,
      ExternalAgentsSeed,
      PagesSeed,
      GlossariesSeed,
      HandbooksSeed,
      RoutesSeed,
      PrivilegeGroupSeed,
    ],
    async (seedClass) => {
      await new seedClass().seed(prisma);
    },
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
