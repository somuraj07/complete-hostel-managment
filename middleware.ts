import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export function middleware(req: NextRequest) {
  const role = req.cookies.get('adminRole')?.value || req.cookies.get('adminRole');
  const { pathname } = req.nextUrl;

  // Protect /warden route
  if (pathname.startsWith('/warden') && role !== 'warden') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Protect /watchman route
  if (pathname.startsWith('/watchman') && role !== 'watchman') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Protect /allDetails route - allow only warden and chairman
  if (pathname.startsWith('/allDetails') && role !== 'warden') {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  if (pathname.startsWith('/detailsall') && role !== 'chairman') {
    return NextResponse.redirect(new URL('/login', req.url));
  }         

  return NextResponse.next();
}

export const config = {
  matcher: ['/warden/:path*', '/watchman/:path*', '/allDetails/:path*','/detailsall/:path*'],
};
