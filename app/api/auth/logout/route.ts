import { NextResponse } from 'next/server';
import cookie from 'cookie';

export async function POST() {
  const response = NextResponse.json({ message: 'Logout successful' });
  response.headers.append('Set-Cookie', cookie.serialize('token', '', { httpOnly: true, path: '/', expires: new Date(0) }));
  
  return response;
}
