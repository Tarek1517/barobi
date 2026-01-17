<script setup lang="ts">
import type { Testimonial } from '~/types';

type ApiResponse = {
  data: Testimonial[];
}
const { data: testimonials } = await useAPI < ApiResponse > ('/get-testimonials');
const generateStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, index) =>
    index < rating ? "★" : "☆"
  ).join("");
};
</script>

<template>
  <section class="py-16 bg-background relative overflow-hidden">
    <div class="container mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl font-primary md:text-5xl font-bold text-gray-900 mb-6">
          <span class="linear-wipe animate-gradient">What Our Guests Say</span>
        </h2>
        <p class="text-xl font-secondary text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Discover why our guests keep coming back. Read about their experiences
          and see how we've made their stays unforgettable.
        </p>
      </div>

      <!-- Testimonials Carousel -->
      <UCarousel v-slot="{ item }" :items="testimonials?.data" loop arrows dots :autoplay="{ delay: 4000 }"
        class="overflow-visible pb-6" :ui="{
          item: 'basis-full sm:basis-2/3 lg:basis-1/2 xl:basis-1/3',
        }">
        <div
          class="bg-white shadow-lg p-6 mx-4 h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-105">
          <!-- Rating -->
          <div class="mb-4">
            <div class="text-yellow-400 text-xl font-bold">
              {{ generateStars(item.rating) }}
            </div>
          </div>

          <!-- Comment -->
          <p class="text-gray-600 font-secondary mb-6 flex-grow leading-relaxed italic">
            "{{ item.description }}"
          </p>

          <!-- Guest Info -->
          <div class="flex items-center gap-4 pt-4 border-t border-gray-100">
            <img :src="item.image" :alt="item.name"
              class="w-12 h-12 rounded-full object-cover border-2 border-primary/20" />
            <div class="flex-1">
              <h4 class="font-semibold font-primary text-gray-900">{{ item.name }}</h4>
              <div class="flex items-center justify-between">
                <p class="text-sm font-secondary text-gray-500">{{ item.address }}</p>
                <span class="text-xs font-primary bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {{ item.total_stayed }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </UCarousel>
    </div>
  </section>
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
