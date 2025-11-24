<script setup>
const props = defineProps({
  room: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <NuxtLink :to="`/rooms/${room.id}`" class="block group">
    <div
      class="bg-primary/10 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl border border-primary/10 h-full flex flex-col hover:-translate-y-2"
    >
      <!-- Image Section -->
      <div class="relative h-56 overflow-hidden">
        <!-- Room Image -->
        <img
          :src="room.image"
          :alt="room.name"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        <!-- Gradient Overlay -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        ></div>

        <!-- Room Type Badge -->
        <div
          class="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg"
        >
          <span class="text-sm font-semibold text-primary">{{
            room.type
          }}</span>
        </div>

        <!-- Favorite Button -->
        <button
          class="absolute top-4 right-4 text-white hover:text-red-500 transition-colors p-2 bg-black/20 rounded-full backdrop-blur-sm"
        >
          <Icon name="heroicons:heart" class="w-5 h-5" />
        </button>
      </div>

      <!-- Content Section -->
      <div class="p-6 flex-1 flex flex-col">
        <!-- Room Details Grid -->
        <div class="grid grid-cols-2 gap-3 mb-4">
          <div class="flex items-center gap-2 text-gray-600">
            <div
              class="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center"
            >
              <Icon name="mdi:ruler-square" class="w-4 h-4 text-primary" />
            </div>
            <div>
              <div class="text-xs text-gray-500">Size</div>
              <div class="text-sm font-semibold">{{ room.size }}</div>
            </div>
          </div>
          <div class="flex items-center gap-2 text-gray-600">
            <div
              class="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center"
            >
              <Icon name="mdi:account-group" class="w-4 h-4 text-primary" />
            </div>
            <div>
              <div class="text-xs text-gray-500">Guests</div>
              <div class="text-sm font-semibold">{{ room.guests }}</div>
            </div>
          </div>
        </div>

        <!-- Room Name -->
        <h3
          class="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300"
        >
          {{ room.name }}
        </h3>
        <!-- Excerpt -->
        <p class="text-gray-600 text-sm leading-relaxed max-w-xl mb-3">
          {{ room.short_description }}
        </p>
        <!-- CTA Button -->
        <div class="flex mt-auto justify-between items-center">
          <div class="flex flex-row items-center gap-1">
            <div class="text-lg font-bold text-primary">{{ room.price }}/</div>
            <div class="text-xs opacity-90">{{ room.period }}</div>
          </div>
          <button
            class="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-2 px-4 transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Icon
              name="material-symbols:bookmark-sharp"
              class="w-5 h-5 transition-transform group-hover:translate-x-1"
            />
            Book
          </button>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
