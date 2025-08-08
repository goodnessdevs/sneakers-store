import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('payload-token')?.value

  // If no token, redirect to login for protected paths
  const protectedRoutes = ['/account', '/shop', '/cart']
  if (!token && protectedRoutes.some((path) => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Just allow the request to proceed — no JWT validation here
  return NextResponse.next()
}

export const config = {
  matcher: ['/account/:path*', '/shop/:path*', '/cart/:path*'],
}
