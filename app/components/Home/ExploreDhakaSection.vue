<script setup>

const { $api } = useNuxtApp();

const { data: nearbies } = await useAsyncData('nearbies', () =>
    $api('/get-home-nearby')
  );

const slides = computed(() => {
  if (!nearbies.value) return [];
  
  return nearbies.value?.data?.map((item) => ({
    ...item,
  }));
});
</script>

<template>
  <section class="py-16 bg-background relative overflow-hidden">
    <div class="container mx-auto px-4 sm:px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center pb-8">
        <h2 class="text-4xl md:text-5xl font-secondary font-bold text-gray-900 mb-6">
          <span class="linear-wipe animate-gradient">Discover Dhaka</span>
        </h2>
        <p class="text-xl font-primary text-gray-600 font-secondary max-w-3xl mx-auto leading-relaxed">
          Explore the most iconic and must-visit attractions in Dhaka, from
          historic landmarks to cultural centers.
        </p>
      </div>

      <!-- Carousel Section -->
      <div class="relative py-3">
        <UCarousel v-slot="{ item: slide }" :items="slides" loop arrows dots :autoplay="{ delay: 3000 }"
          class="overflow-visible pb-6" :ui="{
            item: 'basis-full sm:basis-2/3 lg:basis-1/2 xl:basis-1/3',
          }">
          <div class="px-2">
            <NearbyCard :item="slide" type="explore-dhaka" class="h-full" />
          </div>
        </UCarousel>
      </div>
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

@keyframes shine {
  to {
    background-position: 200% center;
  }
}
</style>
