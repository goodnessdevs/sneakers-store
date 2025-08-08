'use client'

import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { toast } from 'sonner'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from './ui/navigation-menu'

interface NavbarProps {
  user: any // You should use your actual User type here
}

const Navbar = ({ user: initialUser }: NavbarProps) => {
  const [user, setUser] = useState(initialUser)
  const router = useRouter()

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
                <Link href="/shop">Shop</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/cart">Cart</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/account">Account</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                {user ? (
                  <div className="flex items-center gap-x-2 font-semibold">
                    <p>{user.name}</p>
                    <div className="rounded-full w-10 h-10 border border-1 flex justify-center items-center">
                      {(() => {
                        const parts = user.name.trim().split(' ')
                        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
                      })()}
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
    </header>
  )
}

export default Navbar
