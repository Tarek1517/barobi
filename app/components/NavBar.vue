<script setup lang="ts"></script>

<template>
  <header
    class="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-lg"
  >
    <div class="container mx-auto">
      <NuxtLink class="flex items-center justify-between h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center">
          <img
            class="object-contain rounded w-24 h-24"
            src="/images/logo.png"
          />
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center gap-3">
          <!-- Home -->

          <!-- Apartments Dropdown -->
          <div class="relative group">
            <NuxtLink
              to="/room"
              class="flex items-center space-x-2 px-3 py-3 text-gray-700 hover:text-primary font-medium transition-all duration-300"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                />
              </svg>
              <span>Apartments</span>
              <svg
                class="w-4 h-4 transition-transform group-hover:rotate-180"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </NuxtLink>

            <!-- Apartments Mega Menu -->
            <div
              class="absolute left-0 mt-2 w-96 bg-white shadow-2xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2"
            >
              <div class="py-6">
                <div class="grid grid-cols-2 gap-2">
                  <!-- Apartment Types -->
                  <div>
                    <div class="space-y-3">
                      <a
                        href="/apartments/studio"
                        class="flex items-center space-x-3 p-3 hover:bg-blue-50 transition-colors group"
                      >
                        <div
                          class="w-8 h-8 bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors"
                        >
                          <svg
                            class="w-4 h-4 text-blue-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                            />
                          </svg>
                        </div>
                        <span class="text-sm font-medium text-gray-700"
                          >Studio A</span
                        >
                      </a>
                      <a
                        href="/apartments/1-bedroom"
                        class="flex items-center space-x-3 p-3 hover:bg-blue-50 transition-colors group"
                      >
                        <div
                          class="w-8 h-8 bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors"
                        >
                          <svg
                            class="w-4 h-4 text-green-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                            />
                          </svg>
                        </div>
                        <span class="text-sm font-medium text-gray-700"
                          >1-Bedroom</span
                        >
                      </a>
                      <a
                        href="/apartments/2-bedroom"
                        class="flex items-center space-x-3 p-3 hover:bg-blue-50 transition-colors group"
                      >
                        <div
                          class="w-8 h-8 bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors"
                        >
                          <svg
                            class="w-4 h-4 text-purple-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                            />
                          </svg>
                        </div>
                        <span class="text-sm font-medium text-gray-700"
                          >2-Bedroom</span
                        >
                      </a>
                    </div>
                  </div>

                  <!-- Apartment Features -->
                  <div>
                    <div class="space-y-3">
                      <a
                        href="/apartments/luxury"
                        class="flex items-center space-x-3 p-3 hover:bg-blue-50 transition-colors group"
                      >
                        <div
                          class="w-8 h-8 bg-yellow-100 flex items-center justify-center group-hover:bg-yellow-200 transition-colors"
                        >
                          <svg
                            class="w-4 h-4 text-yellow-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                        <span class="text-sm font-medium text-gray-700"
                          >Luxury</span
                        >
                      </a>
                      <a
                        href="/apartments/pet-friendly"
                        class="flex items-center space-x-3 p-3 hover:bg-blue-50 transition-colors group"
                      >
                        <div
                          class="w-8 h-8 bg-pink-100 flex items-center justify-center group-hover:bg-pink-200 transition-colors"
                        >
                          <svg
                            class="w-4 h-4 text-pink-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                        <span class="text-sm font-medium text-gray-700"
                          >Pet Friendly</span
                        >
                      </a>
                      <a
                        href="/apartments/pool"
                        class="flex items-center space-x-3 p-3 hover:bg-blue-50 transition-colors group"
                      >
                        <div
                          class="w-8 h-8 bg-cyan-100 flex items-center justify-center group-hover:bg-cyan-200 transition-colors"
                        >
                          <svg
                            class="w-4 h-4 text-cyan-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path
                              fill-rule="evenodd"
                              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                        <span class="text-sm font-medium text-gray-700"
                          >With Pool</span
                        >
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Hotels -->
           <NuxtLink
              to="/service"
            class="flex items-center space-x-2 px-3 py-3 text-gray-700 hover:text-primary font-medium transition-all duration-300 group"
          >
            <span>Facilities</span>
          </NuxtLink>

          <!-- Destinations -->
          <a
            href="/location"
            class="flex items-center space-x-2 px-3 py-3 text-gray-700 hover:text-primary font-medium transition-all duration-300 group"
          >
            <span>Location</span>
          </a>

          <NuxtLink
            to="/nearby"
            class="flex items-center space-x-2 px-3 py-3 text-gray-700 hover:text-primary font-medium transition-all duration-300 group"
          >
            <span>Nearby</span>
          </NuxtLink>

          <a
            href="/gallery"
            class="flex items-center space-x-2 px-3 py-3 text-gray-700 hover:text-primary font-medium transition-all duration-300 group"
          >
            <span>Gallery</span>
          </a>

          <NuxtLink
            to="/blog"
            class="flex items-center space-x-2 px-3 py-3 text-gray-700 hover:text-primary font-medium transition-all duration-300 group"
          >
            <span>Blog</span>
          </NuxtLink>

          <NuxtLink
            to="/contact"
            class="flex items-center space-x-2 px-3 py-3 text-gray-700 hover:text-primary font-medium transition-all duration-300 group"
          >
            <span>Contact Us</span>
          </NuxtLink>

        </nav>

        <!-- Right Actions -->
        <div class="flex items-center">
          <!-- Language Selector -->
          <div class="relative group">
            <button
              class="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>EN</span>
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <div
              class="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
            >
              <div class="py-2">
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >English</a
                >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >Español</a
                >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >Français</a
                >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >Deutsch</a
                >
              </div>
            </div>
          </div>

          <!-- User Actions -->
          <div class="flex items-center space-x-2">
            <button
              class="p-2 text-gray-600 hover:text-primary rounded-lg hover:bg-blue-50 transition-colors"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>

            <a
              href="/login"
              class="flex items-center space-x-2 px-6 py-2.5 bg-primary text-white font-medium hover:from-primary hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fill-rule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>Book Now</span>
            </a>
          </div>

          <!-- Mobile Menu Button -->
          <button
            class="lg:hidden p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <svg
              class="w-6 h-6 text-gray-900"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </NuxtLink>
    </div>
  </header>
</template>
