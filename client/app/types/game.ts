export interface Genre {
  id?: number
  name: string
}

export interface Company {
  id?: number
  name: string
  company_type?: 'Developer' | 'Publisher'
}

export interface User {
  id?: number
  username: string
}

export interface Review {
  id?: number
  rating: number
  review_text?: string
  review_date?: string
  user?: User
}

export interface Image {
  id?: number
  image_url: string
  image_type?: 'Screenshot' | 'Cover' | 'Artwork'
}

export interface Game {
  id: number
  title: string
  description?: string
  platform?: string
  release_date?: string
  genre?: Genre
  developer?: Company
  publisher?: Company
  images?: Image[]
  reviews?: Review[]
  average_rating: number
  total_reviews: number
}

export interface GameResponse {
  data: Omit<Game, 'average_rating' | 'total_reviews'>
}

export interface GameStatsResponse {
  data: {
    id: number
    title: string
    average_rating: number | null
    total_reviews: number
  }
}
