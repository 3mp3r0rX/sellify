// src/app/api/users/[id]/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { name, email } = await req.json();

  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email },
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
  
    try {
      await prisma.user.delete({
        where: { id: Number(id) },
      });
      return NextResponse.json({ message: 'User deleted' });
    } catch (error) {
      return NextResponse.error();
    }
  }

  export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    return NextResponse.json(user);
  }
  
  export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const { name, email } = await request.json();
  
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, email },
    });
  
    return NextResponse.json(updatedUser);
  }