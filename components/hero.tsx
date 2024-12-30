"use client"

import Image from "next/image"
import { Button } from "./ui/button"
import { TypeWriter } from "./type-writer"

export function Hero() {
  const roles = ["Filmmaker", "Web Developer", "Podcast Editor"]

  return (
    <section className="min-h-[90vh] flex flex-col justify-center items-center text-center px-4 py-20">
      <div className="mb-8 relative w-48 h-48 rounded-full overflow-hidden">
        <Image
          src="/images/pic-of-geoff.webp"
          alt="Geoff Vrijmoet"
          fill
          priority
          className="object-cover"
        />
      </div>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
        Geoff Vrijmoet
      </h1>
      <div className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl flex flex-wrap justify-center gap-x-2">
        <TypeWriter 
          words={roles} 
          delay={50}
          pauseBetweenWords={1000}
        />
      </div>
      <div className="flex gap-6 flex-wrap justify-center">
        <Button 
          size="lg" 
          asChild
          className="bg-rose-50 hover:bg-rose-100 border-2 border-rose-200 text-rose-900 
            shadow-sm hover:shadow-md transition-all duration-200 px-8 py-6 rounded-2xl
            dark:bg-rose-900/10 dark:hover:bg-rose-900/20 dark:border-rose-800 dark:text-rose-100"
        >
          <a href="#contact">Get in Touch</a>
        </Button>
        <Button 
          size="lg" 
          asChild
          className="bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 text-blue-900
            shadow-sm hover:shadow-md transition-all duration-200 px-8 py-6 rounded-2xl
            dark:bg-blue-900/10 dark:hover:bg-blue-900/20 dark:border-blue-800 dark:text-blue-100"
        >
          <a href="#film">View My Work</a>
        </Button>
      </div>
    </section>
  )
} 