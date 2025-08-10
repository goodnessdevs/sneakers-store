'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from './ui/navigation-menu'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'

interface NavbarProps {
  user: any
}

const Navbar = ({ user: initialUser }: NavbarProps) => {
  const [user, setUser] = useState(initialUser)
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const router = useRouter()

  const [loadingUser, setLoadingUser] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/my-route/get-user', { credentials: 'include' })
        if (res.ok) {
          const data = await res.json()
          setUser(data.user)
        }
      } catch (err) {
        console.error('Failed to fetch user', err)
      } finally {
        setLoadingUser(false)
      }
    }

    fetchUser()
  }, [])

  const handleProtectedClick = (e: React.MouseEvent, href: string) => {
    if (loadingUser) return // Don't block while still checking
    if (!user) {
      e.preventDefault()
      setShowAuthDialog(true)
    } else {
      router.push(href)
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/my-route/get-user', {
          credentials: 'include',
        })

        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
        }
      } catch (error) {
        console.error('Failed to fetch user', error)
      }
    }

    fetchUser()
  }, [])

  const handleNameAvatar = () => {
    const splitedUserName = user.name.split(' ')
    const firstName = splitedUserName[0]
    const secondName = splitedUserName[1]
    const thirdName = splitedUserName[2]
    const firstLetter = firstName.charAt(0).toUpperCase()
    const secondLetter = secondName.charAt(0).toUpperCase()
    const thirdLetter = thirdName?.charAt(0).toUpperCase()

    if (thirdName) {
      return `${firstLetter} ${thirdLetter}`
    }

    return `${firstLetter} ${secondLetter}`
  }

  return (
    <header>
      <nav className="md:flex md:flex-row block md:justify-between justify-start items-center md:px-14 px-4 py-4">
        <div className="h-10">
          <Image
            src="/logo.png"
            alt="Brand-logo"
            width={200}
            height={23}
            quality={100}
            className="object-cover h-full"
          />
        </div>

        <NavigationMenu>
          <NavigationMenuList className="flex justify-start items-center md:gap-x-8 gap-x-6 md:my-0 my-4">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/shop" onClick={(e) => handleProtectedClick(e, '/shop')}>
                  Shop
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/cart" onClick={(e) => handleProtectedClick(e, '/cart')}>
                  Cart
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/account" onClick={(e) => handleProtectedClick(e, '/account')}>
                  Account
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                {user ? (
                  <div className="flex items-center gap-x-2 font-semibold">
                    <p>{user.name}</p>
                    <div className="rounded-full w-10 h-10 border flex justify-center items-center">
                      {handleNameAvatar()}
                    </div>
                  </div>
                ) : (
                  <Link href="/login">
                    <Button>Login</Button>
                  </Link>
                )}
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>

      {/* Shadcn Dialog for Login/Signup */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              You need to log in or sign up to access this page.
            </DialogDescription>
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
    </header>
  )
}

export default Navbar
