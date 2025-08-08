import configPromise from '@payload-config'
import { cookies } from 'next/headers'
import { getPayload } from 'payload'

export const POST = async (request: Request) => {
  try {
    const payload = await getPayload({ config: configPromise })

    const { email, password } = await request.json()

    if (!email || !password) {
      return Response.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const loginResult = await payload.login({
      collection: 'users',
      data: { email, password },
    })
    console.log(loginResult.token, loginResult.user, loginResult.exp)

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
      message: 'Login successful',
      user: loginResult.user,
      token: loginResult.token,
    })
  } catch (err: any) {
    console.error(err)
    return Response.json({ error: err.message || 'Login failed' }, { status: 401 })
  }
}
