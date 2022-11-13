// middleware.ts
import { NextResponse, NextRequest } from 'next/server';
import * as jose from 'jose';

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/checkout')) {
    const response = NextResponse.next();

    const token = req.cookies.get('token');
    let isValidToken = false;

    try {
      await jose.jwtVerify(
        token || '',
        new TextEncoder().encode(process.env.JWT_SECRET_SEED)
      );
      isValidToken = true;
      return NextResponse.next();
    } catch (error) {
      console.error(`JWT Invalid or not signed in`, { error });
      isValidToken = false;
    }

    if (!isValidToken) {
      const { pathname } = req.nextUrl;
      return NextResponse.redirect(
        new URL(`/auth/login?p=${pathname}`, req.url)
      );
    }
  }
}

export const config = {
  matcher: ['/checkout/:path*'],
};
