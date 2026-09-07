<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useGamesApi } from '../composables/useGamesApi'
import { sortGames } from '../utils/game'
import type { Game } from '../types/game'

const { fetchFeaturedGames } = useGamesApi()

const sortBy = ref<'rating' | 'release'>('rating')
const fetchedGames = ref<Game[]>([])
const status = ref<'pending' | 'success' | 'error'>('pending')
const error = ref<unknown>(null)

const games = computed(() => {
  return sortGames(fetchedGames.value, sortBy.value)
})

onMounted(async () => {
  try {
    fetchedGames.value = await fetchFeaturedGames()
    status.value = 'success'
  } catch (requestError) {
    error.value = requestError
    status.value = 'error'
  }
})
</script>

<template>
  <main class="container">
    <header class="page-header">
      <div>
        <p class="section-label">THE 2015-2017 EDITION</p>
        <h1>Game World</h1>
        <p class="page-header__intro">
          Fifteen games, selected at random and ranked for your next deep dive.
        </p>
      </div>
    </header>

    <section class="catalog-toolbar" aria-labelledby="catalog-title">
      <div>
        <p class="section-label">CURATED CATALOG</p>
        <h2 id="catalog-title">A snapshot of the era</h2>
      </div>
      <label class="sort-control">
        <span>Sort games</span>
        <select v-model="sortBy">
          <option value="rating">Average rating</option>
          <option value="release">Release date</option>
        </select>
      </label>
    </section>

    <p v-if="status === 'pending'" class="status-message" role="status">Loading games...</p>
    <p v-else-if="error" class="status-message status-message--error" role="alert">
      The games could not be loaded. Make sure the REST API is running and try again.
    </p>
    <div v-else class="game-grid">
      <GameCard v-for="game in games" :key="game.id" :game="game" />
    </div>

    <footer class="page-footer">
      <span>Showing {{ games.length }} games</span>
      <span>Sorted by {{ sortBy === 'rating' ? 'average rating' : 'release date' }}</span>
    </footer>
  </main>
</template>
