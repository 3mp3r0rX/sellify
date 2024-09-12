import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { title, description, price } = await request.json();
  
  // Add validation and user checks as needed
  const newAd = await prisma.ad.create({
    data: { title, description, price, userId: /* user ID from session */ },
  });

  return NextResponse.json(newAd);
}
