<script setup lang="ts">
import type { Game } from '../types/game'

defineProps<{
  game: Game
}>()
</script>

<template>
  <NuxtLink class="game-card" :to="`/games/${game.id}`">
    <GameImage :src="game.images?.[0]?.image_url" :alt="`${game.title} cover`" />
    <div class="game-card__body">
      <div class="game-card__meta">
        <span>{{ game.genre?.name || 'Uncategorized' }}</span>
        <span>{{ game.platform || 'Platform unknown' }}</span>
      </div>
      <h2>{{ game.title }}</h2>
      <p class="game-card__date">{{ formatReleaseDate(game.release_date) }}</p>
      <p class="rating" aria-label="Average rating and number of ratings">
        <strong>{{ formatRating(game.average_rating) }}</strong>
        <span>/ 10</span>
        <span class="rating__count">({{ game.total_reviews }} ratings)</span>
      </p>
    </div>
  </NuxtLink>
</template>
