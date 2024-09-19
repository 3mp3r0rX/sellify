import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// Fetch all ads
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    try {
      const ad = await prisma.ad.findUnique({
        where: { id: Number(id) },
      });

      if (ad) {
        return NextResponse.json(ad, { status: 200 });
      } else {
        return NextResponse.json({ error: 'Ad not found' }, { status: 404 });
      }
    } catch (error) {
      console.error('Error fetching ad:', error);
      return NextResponse.json({ error: 'Failed to fetch ad' }, { status: 500 });
    }
  }

  // Return all ads if no ID is provided
  try {
    const ads = await prisma.ad.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        imageUrl: true,
        category: true,
      },
    });
    return NextResponse.json(ads, { status: 200 });
  } catch (error) {
    console.error('Error fetching ads:', error);
    return NextResponse.json({ error: 'Failed to fetch ads' }, { status: 500 });
  }
}

// Create a new ad
export async function POST(request: NextRequest) {
  try {
    const { title, description, price, imageUrl, category } = await request.json();

    if (!title || !description || isNaN(price) || !category) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const newAd = await prisma.ad.create({
      data: {
        title,
        description,
        price,
        imageUrl: imageUrl || null,
        category,
      },
    });

    return NextResponse.json(newAd, { status: 201 });
  } catch (error) {
    console.error('Error creating ad:', error);
    return NextResponse.json({ error: 'Failed to post ad' }, { status: 500 });
  }
}

// Update an existing ad
export async function PUT(request: NextRequest) {
  try {
    const { id, title, description, price, imageUrl, category } = await request.json();

    if (!id || !title || !description || isNaN(price) || !category) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const updatedAd = await prisma.ad.update({
      where: { id },
      data: {
        title,
        description,
        price,
        imageUrl: imageUrl || null,
        category,
      },
    });

    return NextResponse.json(updatedAd, { status: 200 });
  } catch (error) {
    console.error('Error updating ad:', error);
    return NextResponse.json({ error: 'Failed to update ad' }, { status: 500 });
  }
}

// Delete an ad
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Ad ID is required' }, { status: 400 });
    }

    await prisma.ad.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Ad deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting ad:', error);
    return NextResponse.json({ error: 'Failed to delete ad' }, { status: 500 });
  }
}
