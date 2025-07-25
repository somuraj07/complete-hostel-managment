import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const role = req.cookies.get('adminRole')?.value;
  const { pathname } = req.nextUrl;

  // Protect /warden route
  if (pathname.startsWith('/warden') && role !== 'warden') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Protect /watchman route
  if (pathname.startsWith('/watchman') && role !== 'watchman') {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  if (pathname.startsWith('/allDetails') && role !== 'chairman' && role!=='warden') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/warden/:path*', '/watchman/:path*','/allDetails/:path*'],
};
