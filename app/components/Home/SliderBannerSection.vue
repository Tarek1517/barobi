<script setup lang="ts">
import type { Offer } from '~/types';

type ApiResponse = {
  data: Offer[];
}
const {data:offers} = await useAPI<ApiResponse>('/get-home-offers');
</script>

<template>
  <div class="bg-background" id="offers">
    <div class="container mx-auto py-20 overflow-hidden relative">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-primary md:text-5xl font-bold text-gray-900 mb-6">
          <span class="linear-wipe animate-gradient">Ongoing Offers</span>
        </h2>
        
      </div>
      <UCarousel
        v-slot="{ item: offer }"
        :items="offers?.data"
        loop
        arrows
        dots
        :autoplay="{ delay: 3000 }"
        class="overflow-visible pb-6"
        :ui="{
          item: 'basis-full sm:basis-2/3 lg:basis-1/2 xl:basis-1/3',
        }"
      >
        <div
          class="flex flex-col lg:flex-row relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 mx-2 border border-primary/15 group bg-white"
        >
          <!-- Image Section - Left -->
          <div class="lg:w-3/5 h-40 lg:h-auto relative overflow-hidden">
            <img
              :src="offer.image"
              :alt="offer.title"
              class="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
            />
            <!-- Discount Badge -->
            <div class="absolute top-3 left-3">
              <span
                class="bg-primary font-secondary text-white px-2 py-1 rounded text-sm font-bold"
              >
                {{ offer.offer }}
              </span>
            </div>
            <!-- Type Badge -->
            <div class="absolute top-3 right-3">
              <span
                class="bg-white/90 font-secondary text-gray-800 px-2 py-1 rounded text-xs font-semibold"
              >
                {{ offer.category }}
              </span>
            </div>
          </div>

          <!-- Content Section - Right -->
          <div class="lg:w-2/5 p-4 flex flex-col justify-between">
            <!-- Text Content -->
            <div>
              <h3 class="text-lg font-primary font-bold text-gray-900 mb-1">
                {{ offer.title }}
              </h3>

              <!-- Features -->
              <div class="flex flex-wrap gap-1 mb-3">
                <span
                  v-for="tagLine in offer.tag_line"
                  :key="tagLine"
                  class="bg-primary/20 font-secondary text-primary px-2 py-1 rounded text-xs"
                >
                  {{ tagLine }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </UCarousel>
    </div>
  </div>
</template>

<style scoped>
/* Gradient Text Animation */
.linear-wipe {
  text-align: center;
  background: linear-gradient(
    to right,
    #7e1218 20%,
    #cd986c 40%,
    #cd986c 60%,
    #1f2d3e 80%
  );
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
