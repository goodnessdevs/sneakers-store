'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// Import other UI components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { User, Order } from '@/payload-types'

// Define the shape of your props
interface AccountPageClientProps {
  initialUser: User | null
  initialOrders: Order[]
}

export default function AccountPageWrapper({ initialUser, initialOrders }: AccountPageClientProps) {
  const [user, setUser] = useState<User | null>(initialUser)
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [name, setName] = useState(initialUser?.name || '')
  const router = useRouter()

  const [formattedDate, setFormattedDate] = useState('')

  useEffect(() => {
    if (initialUser?.createdAt) {
      setFormattedDate(new Date(initialUser.createdAt).toLocaleDateString())
    }
  }, [initialUser?.createdAt])

  const handleLogout = async () => {
    try {
      await fetch('/my-route/logout', {
        method: 'POST',
        credentials: 'include',
      })
      setUser(null)
      toast.success('Logged out successfully')
      router.push('/login')
    } catch (err) {
      toast.error('Failed to log out')
    }
  }

  const handleUpdateProfile = async () => {
    if (!user) return
    try {
      // Create a separate API endpoint for profile updates
      await fetch('/api/update-profile', {
        method: 'POST',
        body: JSON.stringify({ name }),
        headers: { 'Content-Type': 'application/json' },
      })
      toast.success('Profile updated')
      setUser({ ...user, name })
    } catch (err) {
      toast.error('Failed to update profile')
    }
  }

  if (!user) return router.push('/login')

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-10">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Welcome, {user?.name || 'Customer'}!</h1>
        <p className="text-muted-foreground">Manage your account and view your recent orders.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Account Information</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <label className="block text-sm mb-1">Name</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleUpdateProfile}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="font-medium">{user.name || '-'}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Date Joined</p>
            <p className="font-medium">{formattedDate}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <div className="text-center space-y-4 py-10">
              <p className="text-muted-foreground">You haven&apos;t placed any orders yet.</p>
              <Button onClick={() => router.push('/')}>Start Shopping</Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">Order ID</th>
                    <th className="text-left py-2 px-4">Date</th>
                    <th className="text-left py-2 px-4">Total</th>
                    <th className="text-left py-2 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="py-2 px-4">#{order.id.slice(-5)}</td>
                      <td className="py-2 px-4">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4">₦{order.total || '0'}</td>
                      <td className="py-2 px-4 capitalize">{order.status || 'pending'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  )
}
