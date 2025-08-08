import { headers as getHeaders } from 'next/headers'
import AccountPageWrapper from './AccountPageWrapper'
import { Order } from '@/payload-types'
import payload from '@/lib/payload'

export default async function AccountPage() {
  const headers = await getHeaders()
  const { user } = await payload.auth({ headers })

  let orders: Order[] = []
  if (user) {
    const res = await payload.find({
      collection: 'orders',
      where: { user: { equals: user.id } },
    })
    orders = (res?.docs as Order[]) || []
  }

  // Pass the fetched user and orders data as props
  return <AccountPageWrapper initialUser={user} initialOrders={orders} />
}
