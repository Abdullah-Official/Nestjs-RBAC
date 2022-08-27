import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const roles = ['user', 'admin', 'superAdmin'];
  roles.map(async (v) => {
    await prisma.role.create({ data: { roleName: v } });
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
