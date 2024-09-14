import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET request to fetch ads, optionally filter by category
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category'); // Get category from query params, if available

    // Fetch ads, optionally filtered by category
    const ads = await prisma.ad.findMany({
      where: category ? { category } : {}, // If category exists, filter by category
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        imageUrl: true,
        category: true, // Include the category in the response
      },
    });

    return NextResponse.json(ads, { status: 200 });
  } catch (error) {
    console.error('Error fetching ads:', error);
    return NextResponse.json({ error: 'Failed to fetch ads' }, { status: 500 });
  }
}

// POST request to create a new ad
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
        category, // Save the category in the database
      },
    });

    return NextResponse.json(newAd, { status: 201 });
  } catch (error) {
    console.error('Error creating ad:', error);
    return NextResponse.json({ error: 'Failed to post ad' }, { status: 500 });
  }
}
