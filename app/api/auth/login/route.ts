import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import cookie from 'cookie';

const prisma = new PrismaClient();
const JWT_SECRET = 'your-secret-key'; // Replace this with an environment variable

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Find user by email
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Compare passwords
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  // Generate a session token (optional)
  const response = NextResponse.json({ message: 'Login successful' });
  response.headers.append('Set-Cookie', cookie.serialize('token', 'user-session-token', { httpOnly: true, path: '/' }));

  return response;
}
