<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useGamesApi } from '../../composables/useGamesApi'
import { formatRating, formatReleaseDate } from '../../utils/game'
import type { Game } from '../../types/game'

const route = useRoute()
const { fetchGame } = useGamesApi()
const gameId = computed(() => Number(route.params.id))
const game = ref<Game | null>(null)
const status = ref<'pending' | 'success' | 'error'>('pending')
const error = ref<unknown>(null)

const featuredImage = computed(() => game.value?.images?.[0]?.image_url)

onMounted(async () => {
  try {
    game.value = await fetchGame(gameId.value)
    status.value = 'success'
  } catch (requestError) {
    error.value = requestError
    status.value = 'error'
  }
})
</script>

<template>
  <main class="container detail-page">
    <NuxtLink class="back-link" to="/">&larr; Back to games</NuxtLink>

    <p v-if="status === 'pending'" class="status-message" role="status">Loading game...</p>
    <p v-else-if="error || !game" class="status-message status-message--error" role="alert">
      This game could not be found. Return to the catalog to choose another game.
    </p>
    <article v-else>
      <header class="detail-hero">
        <GameImage :src="featuredImage" :alt="`${game.title} artwork`" large />
        <div class="detail-hero__copy">
          <p class="section-label">GAME PROFILE</p>
          <h1>{{ game.title }}</h1>
          <p class="detail-hero__description">{{ game.description || 'No description available.' }}</p>
          <div class="detail-rating">
            <strong>{{ formatRating(game.average_rating) }}</strong>
            <span>/ 10 average rating</span>
            <span>({{ game.total_reviews }} ratings)</span>
          </div>
        </div>
      </header>

      <dl class="fact-grid">
        <div>
          <dt>Released</dt>
          <dd>{{ formatReleaseDate(game.release_date) }}</dd>
        </div>
        <div>
          <dt>Developer</dt>
          <dd>{{ game.developer?.name || 'Unknown developer' }}</dd>
        </div>
        <div>
          <dt>Genres</dt>
          <dd>{{ game.genre?.name || 'Uncategorized' }}</dd>
        </div>
        <div>
          <dt>Platform</dt>
          <dd>{{ game.platform || 'Unknown platform' }}</dd>
        </div>
      </dl>

      <section class="reviews" aria-labelledby="reviews-title">
        <div class="section-heading">
          <p class="section-label">PLAYER NOTES</p>
          <h2 id="reviews-title">Reviews</h2>
        </div>
        <p v-if="!game.reviews?.length" class="empty-state">No reviews are available for this game.</p>
        <ul v-else class="review-list">
          <li v-for="review in game.reviews" :key="review.id" class="review">
            <div class="review__topline">
              <strong>{{ review.user?.username || 'Anonymous player' }}</strong>
              <span class="review__rating">{{ formatRating(review.rating) }} / 10</span>
            </div>
            <p>{{ review.review_text || 'This player left a rating without written feedback.' }}</p>
          </li>
        </ul>
      </section>
    </article>
  </main>
</template>
