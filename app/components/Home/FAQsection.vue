<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Faqs } from '~/types';

type ApiResponse = {
  data: Faqs[];
}

const { data: apiResponse } = await useAPI<ApiResponse>('/get-faqs');

const items = ref<Faqs[]>([]);

if (apiResponse.value?.data) {
  items.value = apiResponse.value.data.map(faq => ({
    ...faq,
    open: false 
  }));
}

const toggleFAQ = (index: number) => {
  if (items.value[index]) {
    items.value[index].open = !items.value[index].open;
  }
}
</script>

<template>
  <section class="py-16 bg-background relative overflow-hidden" id="faqs">
    <div class="container mx-auto px-6 relative z-10">
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-3 bg-primary/10 px-4 py-2 mb-4">
          <div class="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span class="text-primary font-secondary font-semibold text-sm uppercase tracking-wide">FAQ's</span>
        </div>
        <h2 class="text-4xl font-primary md:text-5xl font-bold text-gray-900 mb-6">
          FAQ's For <span class="linear-wipe">Barobi Appartment</span>
        </h2>
      </div>

      <div class="max-w-4xl mx-auto">
        <div class="space-y-4">
          <div v-for="(faq, index) in items" :key="index"
            class="bg-white shadow-lg border border-gray-100 transition-all duration-300">
            
            <button @click="toggleFAQ(index)"
              class="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none">
              <div class="flex items-start gap-4">
                <div class="flex-shrink-0 mt-1">
                  <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span class="text-primary font-bold">Q</span>
                  </div>
                </div>
                <h3 class="text-lg md:text-xl font-primary font-semibold text-gray-900">
                  {{ faq.question }}
                </h3>
              </div>
              
              <svg class="w-6 h-6 text-primary transition-transform duration-300" 
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
                <p class="text-gray-700 text-lg leading-relaxed">
                  {{ faq.answer }}
                </p>
              </div>
            </div>
          </div>
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
  to { background-position: 200% center; }
}
</style>