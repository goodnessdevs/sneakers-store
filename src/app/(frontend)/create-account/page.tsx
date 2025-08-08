import { SignupForm } from '@/app/(frontend)/create-account/SignupForm'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CreateAccountPage = () => {
  return (
    <section className="flex flex-col justify-center items-center h-screen w-full">
      <Link href="/">
        <div className="h-16">
          <Image
            src="/logo.png"
            alt="logo"
            width={250}
            height={23}
            quality={100}
            className="object-cover h-full"
          />
        </div>
      </Link>

      <SignupForm />
    </section>
  )
}

export default CreateAccountPage

function mergeOpenGraph({ title, url }: { title: string; url: string }): Metadata['openGraph'] {
  return {
    title,
    url,
    siteName: 'Sole Vibes',
    description: `${title} | Sole Vibes`,
    type: 'website',
    locale: 'en_US',
  }
}

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Login or create an account to get started.',
  openGraph: mergeOpenGraph({
    title: 'Create Account',
    url: '/create-account',
  }),
}
