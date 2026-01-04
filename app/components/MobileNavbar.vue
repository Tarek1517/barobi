<script setup lang="ts">
import { ref } from 'vue'

const mobileMenuOpen = ref(false)
const apartmentsOpen = ref(false)

const toggleMobileMenu = () => mobileMenuOpen.value = !mobileMenuOpen.value
const toggleApartments = () => apartmentsOpen.value = !apartmentsOpen.value
</script>

<template>
    <!-- Mobile Header -->
    <header class="lg:hidden sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
        <div class="flex items-center justify-between h-16 px-4">
            <!-- Logo -->
            <NuxtLink to="/" class="flex items-center">
                <img src="/images/logo.png" alt="Logo" class="w-32 h-auto object-contain" />
            </NuxtLink>

            <!-- Hamburger -->
            <button @click="toggleMobileMenu" class="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
                <!-- Hamburger -->
                <Icon v-if="!mobileMenuOpen" name="heroicons-outline:menu" class="w-6 h-6" />

                <!-- X icon -->
                <Icon v-else name="heroicons-outline:x" class="w-6 h-6" />
            </button>
        </div>

        <!-- Mobile Menu -->
        <transition name="slide-fade">
            <nav v-if="mobileMenuOpen" class="px-4 pb-4 space-y-2 font-primary text-base border-t border-gray-200">
                <!-- Apartments Accordion -->
                <div>
                    <button @click="toggleApartments"
                        class="flex justify-between w-full py-2 font-medium text-gray-700 hover:text-primary transition">
                        Apartments
                        <Icon :name="apartmentsOpen ? 'heroicons-solid:chevron-down' : 'heroicons-solid:chevron-up'"
                            class="w-5 h-5 transition-transform" />
                    </button>
                    <div v-if="apartmentsOpen" class="pl-4 mt-1 space-y-1">
                        <NuxtLink @click="toggleMobileMenu" to="/apartments/studio"
                            class="block py-1 text-gray-600 hover:text-primary transition">Studio A</NuxtLink>
                        <NuxtLink @click="toggleMobileMenu" to="/apartments/1-bedroom"
                            class="block py-1 text-gray-600 hover:text-primary transition">1-Bedroom</NuxtLink>
                        <NuxtLink @click="toggleMobileMenu" to="/apartments/2-bedroom"
                            class="block py-1 text-gray-600 hover:text-primary transition">2-Bedroom</NuxtLink>
                        <NuxtLink @click="toggleMobileMenu" to="/apartments/luxury"
                            class="block py-1 text-gray-600 hover:text-primary transition">Luxury</NuxtLink>
                        <NuxtLink @click="toggleMobileMenu" to="/apartments/pet-friendly"
                            class="block py-1 text-gray-600 hover:text-primary transition">Pet Friendly</NuxtLink>
                        <NuxtLink @click="toggleMobileMenu" to="/apartments/pool"
                            class="block py-1 text-gray-600 hover:text-primary transition">With Pool</NuxtLink>
                    </div>
                </div>

                <!-- Other Links -->
                <NuxtLink @click="toggleMobileMenu" to="/service"
                    class="block py-2 text-gray-700 hover:text-primary transition">Facilities</NuxtLink>
                <NuxtLink @click="toggleMobileMenu" to="/location"
                    class="block py-2 text-gray-700 hover:text-primary transition">Location</NuxtLink>
                <NuxtLink @click="toggleMobileMenu" to="/nearby"
                    class="block py-2 text-gray-700 hover:text-primary transition">Explore Dhaka</NuxtLink>
                <NuxtLink @click="toggleMobileMenu" to="/dining"
                    class="block py-2 text-gray-700 hover:text-primary transition">Dining</NuxtLink>
                <NuxtLink @click="toggleMobileMenu" to="/gallery"
                    class="block py-2 text-gray-700 hover:text-primary transition">Gallery</NuxtLink>
                <NuxtLink @click="toggleMobileMenu" to="/blog"
                    class="block py-2 text-gray-700 hover:text-primary transition">Blog</NuxtLink>
                <NuxtLink @click="toggleMobileMenu" to="/contact"
                    class="block py-2 text-gray-700 hover:text-primary transition">Contact Us</NuxtLink>

                <!-- Offers -->
                <NuxtLink @click="toggleMobileMenu" to="/#offers"
                    class="block py-2 px-3 bg-orange-200 text-orange-700 font-medium rounded-md hover:bg-orange-300 transition relative">
                    Offers
                    <span
                        class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">!</span>
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
