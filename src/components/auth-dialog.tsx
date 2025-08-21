'use client'

import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function AuthDialog() {
  const [open, setOpen] = useState(true)
  const router = useRouter()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login Required</DialogTitle>
          <DialogDescription>Please log in or sign up to access this page.</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => {
              setOpen(false)
              router.push('/create-account')
            }}
          >
            Sign Up
          </Button>
          <Button
            onClick={() => {
              setOpen(false)
              router.push('/login')
            }}
          >
            Login
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
