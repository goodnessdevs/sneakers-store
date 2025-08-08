import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  // Remove the JWT cookie
  const response = NextResponse.json({ message: 'Logged out' })

  response.cookies.set({
    name: 'payload-token',
    value: '',
    maxAge: 0, // Expire immediately
    path: '/', // Ensure it matches where it was set
  })

  return response
}
