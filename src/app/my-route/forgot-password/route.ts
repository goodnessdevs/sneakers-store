import { NextRequest, NextResponse } from 'next/server'
// import payload from 'payload'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { z } from 'zod'

const forgotPasswordSchema = z.object({
  email: z.string().email(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = forgotPasswordSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const { email } = parsed.data

    const payloadInstance = await getPayload({ config })
    await payloadInstance.forgotPassword({
      collection: 'users',
      data: { email },
    })

    return NextResponse.json({ message: 'Reset link sent if email exists' })
  } catch (error: any) {
    console.error('Forgot Password Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
