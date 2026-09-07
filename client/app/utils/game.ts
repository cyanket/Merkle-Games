import type { Game } from '../types/game'

export const GAME_COUNT = 15

export function sampleRandom<T>(items: T[], count: number, random = Math.random): T[] {
  const shuffled = [...items]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    ;[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex]!, shuffled[index]!]
  }

  return shuffled.slice(0, count)
}

export function sortGames(games: Game[], sortBy: 'rating' | 'release'): Game[] {
  return [...games].sort((first, second) => {
    if (sortBy === 'rating') {
      return second.average_rating - first.average_rating
    }

    return (second.release_date || '').localeCompare(first.release_date || '')
  })
}

export function formatReleaseDate(date?: string): string {
  if (!date) return 'Release date unavailable'

  const parsedDate = new Date(date)
  if (Number.isNaN(parsedDate.getTime())) return 'Release date unavailable'

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(parsedDate)
}

export function formatRating(rating: number): string {
  return Number.isFinite(rating) ? rating.toFixed(1) : 'N/A'
}
