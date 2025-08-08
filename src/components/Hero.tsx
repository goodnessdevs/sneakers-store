import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'

const Hero = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-10 p-14">
      <div className="space-y-4">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
          Performance Meets Style
        </h1>
        <p className="text-2xl md:text-3xl text-slate-800 dark:text-slate-300 font-semibold">
          Elite Sneakers for Every Move
        </p>
        <p className="mt-4 text-lg md:text-xl text-slate-700 dark:text-slate-400 max-w-2xl">
          Whether you're hitting the gym, the court, or the streets — our sneakers deliver unmatched
          comfort, cutting-edge design, and all-day performance. Gear up with the best, and move
          with confidence.
        </p>

        <Button className="mt-6 px-6 py-5 text-lg font-semibold rounded-full">Shop Now</Button>
      </div>
      <div>
        <Image src="/assets/shoe5.png" alt="hero-section" width={600} height={600} quality={100} />
      </div>
    </div>
  )
}

export default Hero
