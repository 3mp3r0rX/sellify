// src/app/api/ads/route.ts

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Existing GET handler code here...
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch ads' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, description, price, imageUrl } = await request.json();

    // Validate input
    if (!title || !description || isNaN(price)) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    // Create a new ad
    const newAd = await prisma.ad.create({
      data: {
        title,
        description,
        price,
        imageUrl: imageUrl || null, // Handle optional field
      },
    });

    return NextResponse.json(newAd, { status: 201 });
  } catch (error) {
    console.error('Error creating ad:', error);
    return NextResponse.json({ error: 'Failed to post ad' }, { status: 500 });
  }
}
