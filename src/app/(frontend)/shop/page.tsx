'use client'

import { useEffect, useState } from 'react'
import ProductsList from '@/components/ProductsList'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

const ShoppingPage = () => {
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest')
  const [user, setUser] = useState<any>(null)
  const [loadingUser, setLoadingUser] = useState(true)
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/my-route/get-user', { credentials: 'include' })
        if (res.ok) {
          const data = await res.json()
          setUser(data.user)
          if (!data.user) setShowAuthDialog(true) // show dialog if not logged in
        } else {
          setShowAuthDialog(true)
        }
      } catch (err) {
        console.error('Failed to fetch user', err)
        setShowAuthDialog(true)
      } finally {
        setLoadingUser(false)
      }
    }
    fetchUser()
  }, [])

  if (loadingUser) {
    return <div className="p-10 text-center">Loading...</div>
  }

  return (
    <>
      <div className="py-6 px-4">
        <div className="mb-6 ms-14">
          <h2 className="text-4xl font-semibold leading-tight">Browse Our Collection</h2>
          <p className="mt-2 text-gray-700 dark:text-gray-300 text-base">
            Handpicked products just for you — shop quality and style in one place.
          </p>

          <div className="mt-2.5 space-y-2.5">
            <h2 className="font-semibold text-xl">Sort By</h2>
            <RadioGroup
              defaultValue="latest"
              className="flex gap-x-6 items-center"
              onValueChange={(value) => setSortOrder(value as 'latest' | 'oldest')}
            >
              <div className="flex items-center gap-1">
                <RadioGroupItem value="latest" id="latest" />
                <Label htmlFor="latest">Latest</Label>
              </div>
              <div className="flex items-center gap-1">
                <RadioGroupItem value="oldest" id="oldest" />
                <Label htmlFor="oldest">Oldest</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <ProductsList sortOrder={sortOrder} />
      </div>

      {/* Login Required Dialog */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>Please log in or sign up to access this page.</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => {
                setShowAuthDialog(false)
                router.push('/create-account')
              }}
            >
              Sign Up
            </Button>
            <Button
              onClick={() => {
                setShowAuthDialog(false)
                router.push('/login')
              }}
            >
              Login
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ShoppingPage
