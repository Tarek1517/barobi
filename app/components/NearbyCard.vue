<template>
  <div
    class="bg-white shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
    <!-- Image Section (Top) -->
    <div class="relative">
      <img :src="item.image" :alt="item.name" class="w-full h-48 object-cover" loading="lazy" format="webp"
        quality="80" />
      <!-- Category Badge -->
      <div class="absolute top-3 left-3">
        <span :class="[
          'px-3 py-1 rounded-full font-primary text-xs font-medium',
          type === 'restaurants'
            ? 'bg-green-100 text-green-800'
            : 'bg-blue-100 text-blue-800',
        ]">
          {{ type === "restaurants" ? "Restaurant" : "Activity" }}
        </span>
      </div>
      <!-- Distance Badge -->
      <div class="absolute top-3 right-3">
        <span class="px-2 py-1 bg-black/70 text-white text-xs font-medium rounded-md">
          {{ item.distance }}
        </span>
      </div>
    </div>

    <!-- Content Section -->
    <div class="p-5">
      <!-- Header -->
      <div class="flex items-center justify-between b-3">
        <h3 class="text-lg font-primary font-bold text-gray-900 mb-2 line-clamp-1">
          {{ item.name }}
        </h3>
      </div>

      <!-- Short Description -->
      <p class="text-gray-700 font-secondary text-sm mb-4 line-clamp-2">
        {{ item.short_description }}
      </p>

      <!-- Details Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-sm text-gray-600">
        <div class="flex items-center">
          <Icon name="mdi:map-marker-outline" class="mr-2 text-red-500 flex-shrink-0" />
          <span class="truncate text-xs">{{ item.address }}</span>
        </div>
        <div class="flex items-center">
          <Icon name="mdi:phone-outline" class="mr-2 text-green-500 flex-shrink-0" />
          <span class="text-xs">{{ item.phone }}</span>
        </div>
      </div>


      <!-- Action Buttons -->
      <div class="flex gap-3 pt-3 border-t border-gray-100">
        <button :href="item.map_link"
          class="flex-1 flex items-center justify-center gap-1 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors text-sm font-medium">
          <Icon name="mdi:directions" />
          Directions
        </button>
        <a :href="`tel:${item.phone}`"
          class="flex-1 flex items-center justify-center gap-1 px-4 py-2 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-lg transition-colors text-sm font-medium">
          <Icon name="mdi:phone" />
          Call Now
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.hover\:scale-\[1\.02\] {
  transform: scale(1);
  transition: transform 0.3s ease;
}

.hover\:scale-\[1\.02\]:hover {
  transform: scale(1.02);
}
</style>
