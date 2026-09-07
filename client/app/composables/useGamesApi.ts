import type { Game, GameResponse, GameStatsResponse } from '../types/game'
import { GAME_COUNT, sampleRandom } from '../utils/game'

const PERIOD_START = '2015-01-01'
const PERIOD_END = '2017-12-31'

export function useGamesApi() {
  const config = useRuntimeConfig()
  const apiBase = String(config.public.apiBase).replace(/\/$/, '')

  function request<T>(path: string): Promise<T> {
    return $fetch<T>(`${apiBase}${path}`)
  }

  function imageUrl(path?: string): string | undefined {
    if (!path) return undefined
    
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path
    }

    return `${new URL(apiBase).origin}${path}`
  }

  async function fetchGame(id: number): Promise<Game> {
    const [gameResponse, statsResponse] = await Promise.all([
      request<GameResponse>(`/games/${id}`),
      request<GameStatsResponse>(`/games/${id}/stats`)
    ])

    return {
      ...gameResponse.data,
      images: gameResponse.data.images?.map((image) => ({
        ...image,
        image_url: imageUrl(image.image_url) || ''
      })),
      average_rating: Number(statsResponse.data.average_rating) || 0,
      total_reviews: Number(statsResponse.data.total_reviews) || 0
    }
  }

  async function fetchFeaturedGames(): Promise<Game[]> {
    const range = await request<{ ids: number[] }>(
      `/games/by-date-range?from=${PERIOD_START}&to=${PERIOD_END}`
    )
    const ids = sampleRandom(range.ids, GAME_COUNT)

    return Promise.all(ids.map(fetchGame))
  }

  return { fetchFeaturedGames, fetchGame }
}
