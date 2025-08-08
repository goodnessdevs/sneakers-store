import React from 'react'
import { Facebook, Github, Instagram } from 'lucide-react'
import Image from 'next/image'
import { ModeToggle } from './ModeToggle'

const Footer = () => {
  return (
    <footer className="bg-black text-white p-14">
      <div className="text-center space-y-5 mx-auto w-full">
        <div className="h-10 w-fit text-center mx-auto">
          <Image
            src="/logo.png"
            alt="Brand-logo"
            width={200}
            height={23}
            quality={100}
            className="object-cover h-full"
          />
        </div>

        <p>&copy;2025 Sole Vibes. All rights reserved.</p>

        <ul className="flex justify-center items-center gap-6">
          <li>
            <a href="">
              <Github />
            </a>
          </li>
          <li>
            <a href="">
              <Instagram />
            </a>
          </li>
          <li>
            <a href="">
              <Facebook />
            </a>
          </li>
        </ul>
      </div>
      <div className="float-right">
        <ModeToggle />
      </div>
    </footer>
  )
}

export default Footer
