import { NextResponse } from 'next/server'
import payload from '@/lib/payload'

// GET /my-route/get-user
export async function GET(request: Request) {
  try {
    // Get headers from request so Payload can authenticate the user
    const headers = Object.fromEntries(request.headers.entries())

    // Authenticate the user
    const { user } = await payload.auth({ headers: request.headers })

    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    return NextResponse.json({ user }, { status: 200 })
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
  }
}
