import { headers as getHeaders } from 'next/headers'
import payload from './payload'

const headers = await getHeaders()
const { user } = await payload.auth({ headers })

export { user }
