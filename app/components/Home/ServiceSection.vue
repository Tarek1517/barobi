<script setup lang="ts">
// Services data

import type { Service } from '~/types';

type ApiResponse = {
  data: Service[];
}
const {data:services} = await useAPI<ApiResponse>('/get-home-services');
</script>

<template>
  <section
    class="py-16 bg-background relative overflow-hidden"
  >
    <div class="container mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl font-secondary md:text-5xl font-bold text-gray-900 mb-6">
          <span class="linear-wipe animate-gradient">Around The Apartment</span>
        </h2>
        <p class="text-xl font-primary text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Experience unparalleled comfort in our carefully designed rooms and
          apartments. Each space is crafted to provide the perfect blend of
          luxury and homely comfort.
        </p>
      </div>

      <!-- Services Carousel -->
      <UCarousel
        v-slot="{ item: services }"
        :items="services?.data"
        loop
        arrows
        dots
        :autoplay="{ delay: 3000 }"
        class="overflow-visible pb-6"
        :ui="{
          item: 'basis-full sm:basis-2/3 lg:basis-1/2 xl:basis-1/3',
        }"
      >
        <ServiceCard :service="services" />
      </UCarousel>
    </div>
  </section>
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
