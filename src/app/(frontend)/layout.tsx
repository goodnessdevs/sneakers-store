import React from 'react'
import { Afacad_Flux } from 'next/font/google'
import './styles.css'
import { Metadata } from 'next'
import LayoutWrapper from '@/components/LayoutWrapper'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { headers } from 'next/headers'
import payload from '@/lib/payload'

const afacadFlux = Afacad_Flux({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  description: 'An ecommerce app using Payload in a Next.js app.',
  title: 'Sole Vibes',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const headerList = await headers()
  const { user } = await payload.auth({ headers: headerList })

  return (
    <html lang="en" className="min-h-screen" suppressHydrationWarning>
      <body className={`${afacadFlux.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LayoutWrapper user={user}>
            <main>{children}</main>
          </LayoutWrapper>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
