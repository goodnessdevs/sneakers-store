// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('payload-token')?.value

  const protectedRoutes = ['/account', '/shop', '/cart']
  if (!token && protectedRoutes.some((path) => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}
