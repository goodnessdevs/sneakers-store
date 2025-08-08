import configPromise from '@payload-config'
import { cookies } from 'next/headers'
import { getPayload } from 'payload'

export const POST = async (request: Request) => {
  try {
    const payload = await getPayload({ config: configPromise })

    const body = await request.json()
    const { email, password, name } = body

    if (!email || !password) {
      return Response.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const user = await payload.create({
      collection: 'users',
      data: {
        email,
        password,
        name,
        role: 'user',
      },
    })

    const loginResult = await payload.login({
      collection: 'users',
      data: {
        email,
        password,
      },
    })

    const authCookie = await cookies()

    if (!loginResult.token) {
      return Response.json({ error: 'No token returned from login.' }, { status: 401 })
    }

    authCookie.set('payload-token', loginResult.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return Response.json({
      message: 'Signup successful',
      user,
      token: loginResult.token,
    })
  } catch (err: any) {
    console.error(err)
    return Response.json({ error: err.message || 'Something went wrong' }, { status: 500 })
  }
}
