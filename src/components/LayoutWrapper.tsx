'use client'

import { usePathname } from 'next/navigation'
import Footer from './Footer'
import Navbar from './Navbar'
import { Separator } from './ui/separator'

interface LayoutWrapperClientProps {
  children: React.ReactNode
  user: any // You should use your actual User type here
}

const LayoutWrapper = ({ children, user }: LayoutWrapperClientProps) => {
  const pathname = usePathname()

  const hidePaths = ['/login', '/create-account', '/forgot-password']
  const shouldHide = hidePaths.includes(pathname)

  return (
    <>
      {!shouldHide && <Navbar user={user} />}
      <Separator />
      <main>{children}</main>
      {!shouldHide && <Footer />}
    </>
  )
}

export default LayoutWrapper
