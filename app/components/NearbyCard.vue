<script setup>
defineProps({
  Nearby: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div
    class="group relative cursor-pointer transition-all duration-300 hover:scale-105"
  >
    <!-- Image Container with Full Rounding and Fixed Size -->
    <div class="relative rounded-full overflow-hidden mb-4 w-48 h-48 mx-auto">
      <img
        :src="Nearby.image"
        :alt="Nearby.name"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />

      <div
        class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
      ></div>
    </div>

    <div class="text-center">
      <h3
        class="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300"
      >
        {{ Nearby.name }}
      </h3>

      <p class="text-gray-600 text-sm font-medium">
        {{ Nearby.distance }}
      </p>
    </div>
  </div>
</template>
