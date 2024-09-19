import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import cookie from 'cookie';

export function middleware(request: NextRequest) {
  const cookies = cookie.parse(request.headers.get('cookie') || '');
  const token = cookies.token;

  if (token !== 'user-session-token') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/protected/*'], 
};
