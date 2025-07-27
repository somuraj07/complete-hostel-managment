import { PrismaClient } from '@prisma/client';

import * as bcrypt from 'bcryptjs'; 
const prisma = new PrismaClient();

async function main() {
  const wardenPassword = await bcrypt.hash("warden123", 10);
  const watchmanPassword = await bcrypt.hash("watchman123", 10);
  const AdminPassword = await bcrypt.hash("chairman123", 10);


  await prisma.admin.upsert({
    where: { username: 'warden' },
    update: {},
    create: {
      username: 'warden',
      password: wardenPassword,
      role: 'warden',
    },
  });

  await prisma.admin.upsert({
    where: { username: 'watchman' },
    update: {},
    create: {
      username: 'watchman',
      password: watchmanPassword,
      role: 'watchman',
    },
  });
  await prisma.admin.upsert({
    where: { username: 'chairman' },
    update: {},
    create: {
      username: 'chairman',
      password: AdminPassword,
      role: 'chairman',
    },
  });

  console.log("✅ Seeded warden and watchman credentials");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
