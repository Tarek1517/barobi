<script setup lang="ts">
const { $api } = useNuxtApp();

const { data: categories } = await useAsyncData('room-categories', () =>
  $api('/get-categories-with-room')
);

</script>

<template>
  <header class="sticky top-0 z-40 bg-background backdrop-blur-xl border-b border-gray-100 shadow-lg">
    <div class="container mx-auto">
      <NuxtLink class="flex items-center justify-between h-20">
        <NuxtLink to="/" class="flex items-center">
          <img class="object-contain rounded w-35 h-auto" src="/images/logo.png" />
        </NuxtLink>
        <nav class="hidden font-primary text-lg lg:flex items-center gap-2">
          <div class="relative group">
            <!-- Apartments Button -->
            <NuxtLink to="/room"
              class="flex items-center space-x-2 px-3 py-3 text-gray-700 hover:text-primary font-medium transition-all duration-300">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span>Apartments</span>
              <svg class="w-4 h-4 transition-transform group-hover:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd" />
              </svg>
            </NuxtLink>

            <!-- Mega Menu -->
            <div class="absolute left-0 mt-4 w-[900px] bg-white shadow-2xl border border-gray-200
           opacity-0 invisible group-hover:opacity-100 group-hover:visible
           transition-all duration-300 translate-y-3 group-hover:translate-y-0 z-50">
              <div class="p-6">
                <div class="grid grid-cols-2 gap-6">

                  <!-- Category Column -->
                  <div v-for="category in categories?.data" :key="category.id" class="space-y-4">
                    <!-- Category Title -->
                    <h3 class="text-lg font-semibold text-gray-800 border-b pb-2">
                      {{ category.name }}
                    </h3>

                    <!-- Rooms -->
                    <div class="space-y-3">
                      <NuxtLink v-for="room in category.rooms" :key="room.title" :to="`/room/${room.slug}`"
                        class="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-50 transition group">
                        <!-- Room Image -->
                        <img :src="room.image" class="w-20 h-16 object-cover rounded-md border" alt="" />

                        <!-- Room Info -->
                        <div class="flex-1">
                          <p class="text-sm font-medium text-gray-800 group-hover:text-primary">
                            {{ room.title }}
                          </p>
                          <p class="text-sm text-gray-500">
                            <span class="font-semibold text-gray-700">{{ room.currency }} {{ room.price }}</span> /
                            night
                          </p>
                        </div>
                      </NuxtLink>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>


          <NuxtLink to="/service"
            class="flex items-center space-x-2 px-3 py-3 text-gray-700 hover:text-primary font-medium transition-all duration-300 group">
            <span>Facilities</span>
          </NuxtLink>

          <NuxtLink to="/location"
            class="flex items-center space-x-2 px-3 py-3 text-gray-700 hover:text-primary font-medium transition-all duration-300 group">
            <span>Location</span>
          </NuxtLink>

          <NuxtLink to="/nearby"
            class="flex items-center space-x-2 px-1 py-3 text-gray-700 hover:text-primary font-medium transition-all duration-300 group">
            <span>Explore Dhaka</span>
          </NuxtLink>

          <NuxtLink to="/dining"
            class="flex items-center space-x-2 px-3 py-3 text-gray-700 hover:text-primary font-medium transition-all duration-300 group">
            <span>Dining</span>
          </NuxtLink>

          <NuxtLink to="/gallery"
            class="flex items-center space-x-2 px-3 py-3 text-gray-700 hover:text-primary font-medium transition-all duration-300 group">
            <span>Gallery</span>
          </NuxtLink>

          <NuxtLink to="/blog"
            class="flex items-center space-x-2 px-3 py-3 text-gray-700 hover:text-primary font-medium transition-all duration-300 group">
            <span>Blog</span>
          </NuxtLink>

          <NuxtLink to="/contact"
            class="flex items-center space-x-2 px-3 py-3 text-gray-700 hover:text-primary font-medium transition-all duration-300 group">
            <span>Contact Us</span>
          </NuxtLink>
          <!-- Offer Button -->
          <!-- Offer Button with Badge -->
          <NuxtLink to="/#offers"
            class="relative px-4 py-1 bg-orange-200 hover:bg-orange-300 text-orange-700 font-medium transition-all duration-300 ml-2 group">
            <span class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
                  clip-rule="evenodd" />
                <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
              </svg>
              Offers
            </span>
            <span
              class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              !
            </span>
          </NuxtLink>
        </nav>

        <!-- Right Actions -->
        <div class="flex items-center">
          <!-- Language Selector -->
          <!-- <div class="relative group">
            <button
              class="flex items-center font-primary space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                  clip-rule="evenodd" />
              </svg>
              <span>EN</span>
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd" />
              </svg>
            </button>
            <div
              class="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div class="py-2">
                <a href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">English</a>
                <a href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Español</a>
                <a href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Français</a>
                <a href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Deutsch</a>
              </div>
            </div>
          </div> -->

          <!-- User Actions -->
          <div class="flex items-center space-x-2">
            <!-- <button class="p-2 text-gray-600 hover:text-primary rounded-lg hover:bg-blue-50 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clip-rule="evenodd" />
              </svg>
            </button> -->

            <NuxtLink to="/room"
              class="flex items-center font-primary space-x-2 px-6 py-2.5 bg-primary text-white font-medium hover:from-primary hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fill-rule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clip-rule="evenodd" />
              </svg>
              <span>Book Now</span>
            </NuxtLink>
          </div>

          <!-- Mobile Menu Button -->
          <button class="lg:hidden p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
            <svg class="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </NuxtLink>
    </div>
  </header>
</template>
