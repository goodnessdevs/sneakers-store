import configPromise from '@payload-config'
import { cookies } from 'next/headers'
import { getPayload } from 'payload'

export const DELETE = async () => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('payload-token')?.value

    if (!token) {
      return Response.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const headers = new Headers()
    headers.set('cookie', `payload-token=${token}`)

    const payload = await getPayload({ config: configPromise })
    const { user } = await payload.auth({ headers })

    if (!user) {
      return Response.json({ error: 'Invalid token' }, { status: 401 })
    }

    await payload.delete({
      collection: 'users',
      id: user.id,
    })

    // Clear cookie
    cookieStore.set({
      name: 'payload-token',
      value: '',
      maxAge: 0,
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    })

    return Response.json({ message: 'User deleted successfully' })
  } catch (err: any) {
    console.error(err)
    return Response.json({ error: err.message || 'Failed to delete user' }, { status: 500 })
  }
}
