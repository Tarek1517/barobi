<script setup>
const props = defineProps({
  room: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="block group">
    <div
      class="bg-white shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl border border-primary/10 h-full flex flex-col hover:-translate-y-2">
      <div class="relative h-68 overflow-hidden">
        <NuxtLink :to="`/room/${room.slug}`">
          <!-- Room Image -->
          <img :src="room.image" :alt="room.title"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />

          <!-- Gradient Overlay -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          </div>
        </NuxtLink>

        <!-- Badges Container -->
        <div class="absolute font-secondary top-4 left-4 flex flex-col gap-2">
          <div class="flex gap-2">
            <div
              class="bg-gradient-to-r from-emerald-500 to-emerald-700 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg w-fit">
              <span class="text-xs font-medium text-white">{{
                room.category_name
              }}</span>
            </div>
            <!-- Room Type Badge -->
            <!-- <div
              class="bg-gradient-to-r from-orange-500 to-orange-700 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg w-fit">
              <span class="text-xs font-medium text-white">{{
                room.discount
              }}</span>
            </div> -->

            <!-- Available Rooms Badge -->
            <!-- <div
              class="bg-gradient-to-r from-orange-500 to-orange-700 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg w-fit">
              <span class="text-xs font-medium text-white">
                {{ room.available_rooms }}
                {{ room.available_rooms === 1 ? "Room" : "Rooms" }} Left
              </span>
            </div> -->
          </div>
          <!-- <div class="flex gap-2">
            <div
              class="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg w-fit">
              <span class="text-xs font-medium text-white">Free Breakfast</span>
            </div>
            <div
              class="bg-gradient-to-r from-tertiary to-secondary/55 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg w-fit">
              <span class="text-xs font-medium text-white">Free Self Parking</span>
            </div>
          </div> -->
        </div>

        <!-- Favorite Button -->
        <!-- <button
          class="absolute top-4 right-4 text-white hover:text-red-500 transition-colors p-2 bg-black/20 rounded-full backdrop-blur-sm">
          <Icon name="heroicons:heart" class="w-5 h-5 text-primary" />
        </button> -->
      </div>

      <!-- Content Section -->
      <div class="p-6 flex-1 flex flex-col">
        <!-- Room Details Grid -->
        <div class="grid grid-cols-2 gap-3 mb-4">
          <div class="flex items-center gap-2 text-gray-600">
            <div class="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="mdi:ruler-square" class="w-4 h-4 text-primary" />
            </div>
            <div>
              <div class="text-xs font-secondary text-gray-500">Size</div>
              <div class="text-sm font-primary font-semibold">{{ room.size_name }}</div>
            </div>
          </div>
          <div class="flex items-center gap-2 text-gray-600">
            <div class="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="mdi:account-group" class="w-4 h-4 text-primary" />
            </div>
            <div>
              <div class="text-xs font-secondary text-gray-500">Guests</div>
              <div class="text-sm font-primary font-semibold">
                {{ room.guest_adult }} <span class="text-xs font-normal text-gray-500">({{ room.guest_child }} Child
                  Allowed)</span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2 text-gray-600">
            <div class="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="material-symbols:android-wifi-3-bar" class="w-4 h-4 text-primary" />
            </div>
            <div>
              <div class="text-xs font-secondary text-gray-500">Wifi</div>
              <div class="text-sm font-primary font-semibold text-success">Free Wifi</div>
            </div>
          </div>
          <div class="flex items-center gap-2 text-gray-600">
            <div class="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="material-symbols:bath-bedrock" class="w-4 h-4 text-primary" />
            </div>
            <div>
              <div class="text-xs font-secondary text-gray-500">Beds</div>
              <div class="text-sm font-primary font-semibold">{{ room?.bed }}</div>
            </div>
          </div>
        </div>

        <NuxtLink :to="`/room/${room.slug}`"
          class="text-xl font-bold  font-primary text-gray-900 group-hover:text-primary transition-colors duration-300">
          {{ room.title }}
        </NuxtLink>
        <!-- Available Rooms Info -->
        <!-- <div class="mt-2">
          <div class="flex font-secondary items-center gap-2 text-sm">
            <div :class="[
              'w-2 h-2 rounded-full',
              room.available_rooms > 3
                ? 'bg-green-500'
                : room.available_rooms > 1
                  ? 'bg-yellow-500'
                  : 'bg-red-500',
            ]"></div>
            <span :class="[
              'font-medium',
              room.available_rooms > 3
                ? 'text-green-600'
                : room.available_rooms > 1
                  ? 'text-yellow-600'
                  : 'text-red-600',
            ]">
              {{
                room.available_rooms > 3
                  ? "Plenty available"
                  : room.available_rooms > 1
                    ? "Few left"
                    : room.available_rooms > 0
                      ? "Last room"
                      : "No room available"
              }}
            </span>
          </div>
        </div> -->

        <!-- Excerpt -->
        <p class="text-gray-600  font-secondary text-sm leading-relaxed max-w-xl mb-3 mt-2">
          {{ room.short_description }}
        </p>

        <!-- CTA Button -->
        <div class="flex mt-auto justify-between items-center">
          <div class="flex flex-col">
            <div class="flex flex-row items-center gap-1">
              <div class="text-lg font-primary font-bold text-primary">
                <span class="text-xs font-secondary opacity-90 line-through">{{ room?.currency }}{{ room.price }}</span> {{ room?.currency }}{{  room.price - (room.price * room.discount / 100) }} <br><span class="text-xs font-secondary text-gray-500 opacity-90">(+{{ room?.currency }}{{ (room.rack_price - room.after_discount).toFixed(2) }} Tax & Service)</span>
              </div>
              <div class="text-xs font-secondary opacity-90">{{ room.period }}</div>
            </div>
            <!-- <div v-if="room.available_rooms" class="text-xs font-secondary text-gray-500 mt-1">
              {{ room.available_rooms }}
              {{ room.available_rooms === 1 ? "room" : "rooms" }} available
            </div> -->
          </div>
          <div class="flex gap-2">
            <nuxtLink :to="`/room/${room.slug}`"
              class="bg-gradient-to-r from-primary font-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-2 px-4 transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
              Details
            </nuxtLink>
            <NuxtLink :to="`/checkout/${room.slug}`"
              class="bg-gradient-to-r from-primary font-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-2 px-4 transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
              <Icon name="material-symbols:bookmark-sharp"
                class="w-5 h-5 transition-transform group-hover:translate-x-1" />
              Book
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
