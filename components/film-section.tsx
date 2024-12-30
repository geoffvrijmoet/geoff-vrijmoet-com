"use client"

import { useEffect, useState } from 'react'
import { FilmCredit } from '@/types/imdb'
import { Camera, Star, Loader2 } from 'lucide-react'
import Image from 'next/image'

export function FilmSection() {
  const [credits, setCredits] = useState<FilmCredit[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCredits() {
      try {
        const res = await fetch('/api/imdb')
        if (!res.ok) throw new Error('Failed to fetch credits')
        const data = await res.json()
        setCredits(data.credits)
      } catch (error) {
        setError('Failed to load film credits')
        console.error('Failed to fetch credits:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCredits()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500 dark:text-red-400 py-8">
        {error}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {credits.map((credit) => (
        <div 
          key={`${credit.title}-${credit.year}`}
          className="group relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 max-w-[150px] mx-auto w-full"
        >
          {credit.imageUrl && (
            <div className="relative w-full pt-[120%]">
              <Image
                src={credit.imageUrl}
                alt={credit.title}
                fill
                sizes="(min-width: 1536px) 16vw, (min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover object-center"
                priority
                quality={100}
                loading="eager"
              />
            </div>
          )}
          <div className="p-3">
            <div className="flex items-start justify-between">
              <h3 className="text-sm font-semibold mb-1">{credit.title}</h3>
              {credit.rating && (
                <div className="flex items-center gap-0.5 text-yellow-500">
                  <Star className="w-3 h-3 fill-current" />
                  <span className="text-xs">{credit.rating}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300 mb-1">
              <Camera className="w-3 h-3" />
              <span className="text-xs">{credit.role}</span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {credit.year} {credit.isShort && "• Short"}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 