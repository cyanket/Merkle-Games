import { describe, expect, it } from 'vitest'
import { formatRating, formatReleaseDate, sampleRandom, sortGames } from '../app/utils/game'
import type { Game } from '../app/types/game'

const game = (id: number, rating: number, release_date: string): Game => ({
  id,
  title: `Game ${id}`,
  release_date,
  average_rating: rating,
  total_reviews: 1
})

describe('game utilities', () => {
  it('samples without changing the source list', () => {
    const source = [1, 2, 3, 4]
    const result = sampleRandom(source, 2, () => 0)

    expect(result).toHaveLength(2)
    expect(source).toEqual([1, 2, 3, 4])
    expect(new Set(result).size).toBe(2)
  })

  it('sorts by rating and release date without mutating the input', () => {
    const games = [game(1, 3.2, '2017-01-01'), game(2, 4.8, '2015-01-01')]

    expect(sortGames(games, 'rating').map((item) => item.id)).toEqual([2, 1])
    expect(sortGames(games, 'release').map((item) => item.id)).toEqual([1, 2])
    expect(games.map((item) => item.id)).toEqual([1, 2])
  })

  it('formats ratings and release dates for display', () => {
    expect(formatRating(4.25)).toBe('4.3')
    expect(formatReleaseDate('2016-06-15')).toBe('Jun 15, 2016')
    expect(formatReleaseDate()).toBe('Release date unavailable')
  })
})
