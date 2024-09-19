// src/app/api/categories/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Ensure this path is correct

export async function GET(request: Request) {
  const url = new URL(request.url);
  const name = url.searchParams.get('name');

  if (name) {
    try {
      const category = await prisma.category.findUnique({
        where: { name: name },
      });

      if (category) {
        return NextResponse.json(category);
      } else {
        return NextResponse.json({ error: 'Category not found' }, { status: 404 });
      }
    } catch (error) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }

  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
