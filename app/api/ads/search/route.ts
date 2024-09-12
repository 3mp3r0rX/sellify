import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query') || '';

  const ads = await prisma.ad.findMany({
    where: {
      title: { contains: query, mode: 'insensitive' },
    },
  });

  return NextResponse.json(ads);
}
