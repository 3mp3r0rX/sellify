// src/test-prisma.ts
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const categories = await prisma.category.findMany();
  console.log(categories);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
