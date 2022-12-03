import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
// import * as jose from 'jose';

export async function middleware(req: NextRequest) {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    const { pathname } = req.nextUrl;
    return NextResponse.redirect(new URL(`/auth/login?p=${pathname}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/checkout/:path*'],
};
