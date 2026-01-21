<script setup lang="ts">
import type { Offer } from '~/types';

type ApiResponse = {
  data: Offer[];
}
const { data: offers } = await useAPI<ApiResponse>('/get-home-offers');
</script>

<template>
  <div class="bg-background" id="offers">
    <div class="container mx-auto py-20 overflow-hidden relative">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-secondary md:text-5xl font-bold text-gray-900 mb-6">
          <span class="linear-wipe animate-gradient">Ongoing Offers</span>
        </h2>

      </div>
      <UCarousel v-slot="{ item: offer }" :items="offers?.data" loop arrows dots :autoplay="{ delay: 3000 }"
        class="overflow-visible pb-6" :ui="{
          item: 'basis-full sm:basis-2/3 lg:basis-1/2 xl:basis-1/3',
        }">
        <NuxtLink :to="`/offer/${offer.slug}`"
          class="relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 mx-2 border border-primary/15 group bg-white cursor-pointer">
          <!-- Full Card Image -->
          <div class="h-40 lg:h-60 relative w-full">
            <img :src="offer.image" :alt="offer.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />

            <!-- Discount Badge -->
            <div class="absolute top-3 left-3">
              <span class="bg-primary font-secondary text-white px-2 py-1 rounded text-sm font-bold">
                {{ offer.offer }}
              </span>
            </div>

            <!-- Type Badge -->
            <div class="absolute top-3 right-3">
              <span class="bg-white/90 font-secondary text-gray-800 px-2 py-1 rounded text-xs font-semibold">
                {{ offer.category }}
              </span>
            </div>
          </div>
        </NuxtLink>

      </UCarousel>
    </div>
  </div>
</template>

<style scoped>
/* Gradient Text Animation */
.linear-wipe {
  text-align: center;
  background: linear-gradient(to right,
      #7e1218 20%,
      #cd986c 40%,
      #cd986c 60%,
      #1f2d3e 80%);
  background-size: 200% auto;
  color: #000;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 3s linear infinite;
}

/* Move Keyframes Outside */
@keyframes shine {
  to {
    background-position: 200% center;
  }
}
</style>
