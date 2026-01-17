<script setup lang="ts">
import { ref } from 'vue'
import type { Faqs } from '~/types'

type ApiResponse = {
  data: Faqs[]
}

// Fetch data from API
const { data: apiResponse } = await useAPI<ApiResponse>('/get-faqs')

// Initialize items with an added 'open' property
const items = ref<(Faqs & { open: boolean })[]>([])
const INITIAL_COUNT = 6

if (apiResponse.value?.data) {
  items.value = apiResponse.value.data.map(faq => ({
    ...faq,
    open: false
  }))
}

// FIX: Pass the item itself rather than just the index to avoid slice mismatch
const toggleFAQ = (faq: (Faqs & { open: boolean })) => {
  faq.open = !faq.open
}
</script>

<template>
  <section class="py-16 bg-background relative overflow-hidden" id="faqs">
    <div class="container mx-auto px-6 relative z-10">

      <div class="text-center mb-16">
        <h2 class="text-4xl font-secondary md:text-5xl font-bold text-gray-900 mb-6">
          <span class="linear-wipe">FAQ's For Barobi Appartment</span>
        </h2>
      </div>

      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="faq in items.slice(0, INITIAL_COUNT)" :key="faq.id || faq.question"
            class="bg-white shadow-lg border border-gray-100 transition-all duration-300 flex flex-col h-fit">
            
            <button @click="toggleFAQ(faq)"
              class="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none group"
              :aria-expanded="faq.open">
              <div class="flex items-start gap-4">
                <div class="flex-shrink-0 mt-1">
                  <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <span class="text-primary font-bold">Q</span>
                  </div>
                </div>
                <h3 class="text-lg md:text-xl font-primary font-semibold text-gray-900">
                  {{ faq.question }}
                </h3>
              </div>

              <svg class="w-6 h-6 text-primary transition-transform duration-300 flex-shrink-0" 
                :class="{ 'rotate-180': faq.open }"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div v-if="faq.open" class="px-6 pb-5 border-t border-gray-100 pt-5">
              <div class="flex items-start gap-4">
                <div class="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <span class="text-secondary font-bold">A</span>
                </div>
                <p class="text-gray-700 text-lg leading-relaxed font-primary">
                  {{ faq.answer }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="items.length > INITIAL_COUNT" class="text-center mt-12">
          <NuxtLink to="/contact#faqs"
            class="inline-block px-10 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition shadow-md hover:shadow-lg">
            More FAQs
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.linear-wipe {
  background: linear-gradient(to right, #7e1218, #cd986c, #1f2d3e);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 3s linear infinite;
}

@keyframes shine {
  to {
    background-position: 200% center;
  }
}

/* Optional: Smooth entry for the answer */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>