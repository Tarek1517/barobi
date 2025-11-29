<!-- components/Nearby2Card.vue -->
<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
    <div class="flex flex-col md:flex-row">
      <!-- Image Section -->
      <div class="md:w-2/5">
        <NuxtImg
          :src="item.image"
          :alt="item.name"
          class="w-full h-64 md:h-full object-cover"
          loading="lazy"
          format="webp"
          quality="80"
        />
      </div>
      
      <!-- Content Section -->
      <div class="md:w-3/5 p-6">
        <div class="flex flex-col h-full">
          <!-- Header -->
          <div class="flex items-start justify-between mb-3">
            <div>
              <h3 class="text-xl font-bold text-gray-900 mb-1">
                {{ item.name }}
              </h3>
              <div class="flex items-center gap-4 text-sm text-gray-600">
                <span class="flex items-center">
                  <Icon name="mdi:clock-outline" class="mr-1 text-blue-500" />
                  {{ item.distance }}
                </span>
                <span class="flex items-center">
                  <Icon name="mdi:star" class="mr-1 text-yellow-500" />
                  {{ item.rating }}
                </span>
              </div>
            </div>
            <span 
              :class="[
                'px-3 py-1 rounded-full text-xs font-medium',
                type === 'restaurants' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              ]"
            >
              {{ type === 'restaurants' ? 'Restaurant' : 'Activity' }}
            </span>
          </div>

          <!-- Description -->
          <p class="text-gray-700 mb-4 line-clamp-2 flex-grow">
            {{ item.short_description }}
          </p>

          <!-- Details -->
          <div class="space-y-2 text-sm text-gray-600">
            <div class="flex items-center">
              <Icon name="mdi:map-marker-outline" class="mr-2 text-red-500 flex-shrink-0" />
              <span class="truncate">{{ item.address }}</span>
            </div>
            <div class="flex items-center">
              <Icon name="mdi:phone-outline" class="mr-2 text-green-500 flex-shrink-0" />
              <span>{{ item.phone }}</span>
            </div>
            <div v-if="item.hours" class="flex items-center">
              <Icon name="mdi:clock-time-four-outline" class="mr-2 text-purple-500 flex-shrink-0" />
              <span>{{ item.hours }}</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-3 mt-4 pt-4 border-t border-gray-100">
            <button class="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
              <Icon name="mdi:directions" class="mr-1" />
              Directions
            </button>
            <button class="flex items-center text-purple-600 hover:text-purple-700 transition-colors ml-auto">
              <Icon name="mdi:phone" class="mr-1" />
              Call
            </button>       
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  },
  type: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>