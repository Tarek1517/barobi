<script setup>
defineProps({
  service: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div
    class="group relative h-[500px] overflow-hidden cursor-pointer mx-2 shadow-lg hover:shadow-2xl transition-all duration-500">
    <!-- Background Image -->
    <nuxt-link :to="`/service/${service.slug}`">
      <img :src="service.image" :alt="service.title"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />

      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-300"></div>
    </nuxt-link>
    <!-- Price Badge -->
    <div
      class="absolute font-primary top-4 right-4 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 rounded-full px-3 py-1 shadow-lg w-fit backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
      <span class="text-xs font-bold text-white">{{ service.price }}</span>
    </div>

    <!-- Content Container -->
    <div
      class="absolute top-96 left-0 right-0 p-6 text-white transform transition-transform duration-500 group-hover:-translate-y-20">
      <!-- Service Name - Moves up with content -->
      <h3 class="text-2xl font-primary font-bold mb-2 text-center transition-all duration-500 group-hover:mb-4">
        {{ service.title }}
      </h3>

      <!-- Hidden Content on Hover -->
      <div
        class="flex flex-col opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-200">
        <!-- Short Description -->
        <p class="text-gray-200 mb-4 line-clamp-2  font-primary text-center">
          {{ service.short_description }}
        </p>

        <!-- View Details Button -->
        <NuxtLink :to="`/service/${service.slug}`"
          class="bg-gradient-to-r font-primary inline-block from-tertiary to-secondary/55 hover:from-secondary/55 hover:to-tertiary backdrop-blur-sm px-6 py-2 rounded-full font-semibold transition-colors duration-300 mx-auto shadow-lg">
          View Details
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
