import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Fetch all ads including the category field
    const ads = await prisma.ad.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        imageUrl: true,
        category: true,  // Include the category in the response
      },
    });
    return NextResponse.json(ads, { status: 200 });
  } catch (error) {
    console.error('Error fetching ads:', error);
    return NextResponse.json({ error: 'Failed to fetch ads' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, description, price, imageUrl, category } = await request.json();

    // Validate required fields
    if (!title || !description || isNaN(price) || !category) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    // Create a new ad including the category field
    const newAd = await prisma.ad.create({
      data: {
        title,
        description,
        price,
        imageUrl: imageUrl || null,
        category,  // Save the category in the database
      },
    });

    return NextResponse.json(newAd, { status: 201 });
  } catch (error) {
    console.error('Error creating ad:', error);
    return NextResponse.json({ error: 'Failed to post ad' }, { status: 500 });
  }
}
