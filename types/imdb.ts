export interface FilmCredit {
  title: string
  year: number
  role: string
  rating?: number
  isShort?: boolean
  imageUrl?: string
}

export interface IMDbData {
  name: string
  credits: FilmCredit[]
} 