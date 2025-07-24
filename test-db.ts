import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function test() {
  try {
    const result = await prisma.$queryRaw`SELECT 1 + 1 AS result`;
    console.log('✅ DB Connected. Test Result:', result);
  } catch (error) {
    console.error('❌ DB connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

test();
