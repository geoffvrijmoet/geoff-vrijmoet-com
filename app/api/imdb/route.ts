import { NextResponse } from 'next/server'
import { fetchIMDbCredits } from '@/lib/imdb'

// Cache the response for 1 hour
export const revalidate = 3600

export async function GET() {
  try {
    const credits = await fetchIMDbCredits()
    return NextResponse.json({ credits })
  } catch (error) {
    console.error('Failed to fetch IMDb data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch IMDb data' }, 
      { status: 500 }
    )
  }
} 