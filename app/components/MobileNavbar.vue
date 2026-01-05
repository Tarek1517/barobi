<script setup lang="ts">
import { ref } from 'vue'

const { $api } = useNuxtApp()

const mobileMenuOpen = ref(false)
const apartmentsOpen = ref(false)
const openCategory = ref<number | null>(null)

const toggleMobileMenu = () => mobileMenuOpen.value = !mobileMenuOpen.value
const toggleApartments = () => apartmentsOpen.value = !apartmentsOpen.value
const toggleCategory = (id: number) =>
  openCategory.value = openCategory.value === id ? null : id

const { data: categories } = await useAsyncData('room-categories-mobile', () =>
  $api('/get-categories-with-room')
)
</script>


<template>
  <header class="lg:hidden sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
    <div class="flex items-center justify-between h-16 px-4">
      <NuxtLink to="/" class="flex items-center">
        <img src="/images/logo.png" alt="Logo" class="w-32 h-auto object-contain" />
      </NuxtLink>

      <button @click="toggleMobileMenu" class="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
        <Icon v-if="!mobileMenuOpen" name="heroicons-outline:menu" class="w-6 h-6" />
        <Icon v-else name="heroicons-outline:x" class="w-6 h-6" />
      </button>
    </div>

    <transition name="slide-fade">
      <nav
        v-if="mobileMenuOpen"
        class="px-4 pb-6 space-y-3 font-primary text-base border-t border-gray-200"
      >

        <!-- Apartments -->
        <div>
          <button
            @click="toggleApartments"
            class="flex justify-between items-center w-full py-2 font-semibold text-gray-800"
          >
            Apartments
            <Icon
              :name="apartmentsOpen ? 'heroicons-solid:chevron-up' : 'heroicons-solid:chevron-down'"
              class="w-5 h-5"
            />
          </button>

          <div v-if="apartmentsOpen" class="mt-2 space-y-3">

            <!-- Category -->
            <div
              v-for="category in categories?.data"
              :key="category.id"
              class="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                @click="toggleCategory(category.id)"
                class="flex justify-between items-center w-full px-3 py-2 bg-gray-50 font-medium text-gray-700"
              >
                {{ category.name }}
                <Icon
                  :name="openCategory === category.id
                    ? 'heroicons-solid:minus'
                    : 'heroicons-solid:plus'"
                  class="w-4 h-4"
                />
              </button>

              <!-- Rooms -->
              <div v-if="openCategory === category.id" class="p-3 space-y-3 bg-white">
                <NuxtLink
                  v-for="room in category.rooms"
                  :key="room.title"
                  :to="`/room/${room.slug}`"
                  @click="toggleMobileMenu"
                  class="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition"
                >
                  <img
                    :src="room.image"
                    class="w-16 h-12 object-cover rounded-md border"
                    alt=""
                  />
                  <div>
                    <p class="text-sm font-medium text-gray-800">
                      {{ room.title }}
                    </p>
                    <p class="text-xs text-gray-500">
                      <span class="font-semibold">{{ room.currency }} {{ room.price }}</span> / night
                    </p>
                  </div>
                </NuxtLink>
              </div>
            </div>

          </div>
        </div>

        <!-- Other Links -->
        <NuxtLink @click="toggleMobileMenu" to="/service" class="block py-2 text-gray-700">Facilities</NuxtLink>
        <NuxtLink @click="toggleMobileMenu" to="/location" class="block py-2 text-gray-700">Location</NuxtLink>
        <NuxtLink @click="toggleMobileMenu" to="/nearby" class="block py-2 text-gray-700">Explore Dhaka</NuxtLink>
        <NuxtLink @click="toggleMobileMenu" to="/dining" class="block py-2 text-gray-700">Dining</NuxtLink>
        <NuxtLink @click="toggleMobileMenu" to="/gallery" class="block py-2 text-gray-700">Gallery</NuxtLink>
        <NuxtLink @click="toggleMobileMenu" to="/blog" class="block py-2 text-gray-700">Blog</NuxtLink>
        <NuxtLink @click="toggleMobileMenu" to="/contact" class="block py-2 text-gray-700">Contact Us</NuxtLink>

        <!-- Offers -->
        <NuxtLink
          @click="toggleMobileMenu"
          to="/#offers"
          class="block py-2 px-3 bg-orange-200 text-orange-700 font-medium rounded-md relative"
        >
          Offers
          <span
            class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full
                   w-5 h-5 flex items-center justify-center animate-pulse"
          >
            !
          </span>
        </NuxtLink>
      </nav>
    </transition>
  </header>
</template>


<style>
.slide-fade-enter-active {
    transition: all 0.3s ease;
}

.slide-fade-leave-active {
    transition: all 0.2s ease;
}

.slide-fade-enter-from {
    opacity: 0;
    transform: translateY(-10px);
}

.slide-fade-enter-to {
    opacity: 1;
    transform: translateY(0);
}

.slide-fade-leave-from {
    opacity: 1;
    transform: translateY(0);
}

.slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
