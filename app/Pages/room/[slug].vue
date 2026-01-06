<template>
  <div>
    <!-- Breadcrumb -->
    <section class="bg-background border-b border-gray-200 py-4">
      <div class="container mx-auto font-primary">
        <nav class="flex items-center space-x-2 text-sm text-gray-600">
          <NuxtLink to="/" class="hover:text-primary transition-colors">Home</NuxtLink>
          <Icon name="ph:caret-right" class="text-gray-400" />
          <NuxtLink to="/rooms" class="hover:text-primary transition-colors">Rooms & Suites</NuxtLink>
          <Icon name="ph:caret-right" class="text-gray-400" />
          <span class="text-gray-900 font-medium">{{ room?.title }}</span>
        </nav>
      </div>
    </section>

    <!-- Main Content -->
    <section v-if="room" class="py-8 bg-background">
      <div class="container mx-auto">
        <!-- Image Gallery -->
        <div class="space-y-4 mb-8">
          <div class="relative overflow-hidden bg-gray-100">
            <img
              :src="selectedImage || room.image"
              :alt="room.title"
              class="w-full h-96 lg:h-[600px] object-cover cursor-zoom-in transition-transform duration-300"
              @click="openLightbox(selectedImage || room.image)"
            />
            <button
              @click="toggleFavorite"
              class="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
            >
              <Icon
                :name="isFavorite ? 'ph:heart-fill' : 'ph:heart'"
                :class="isFavorite ? 'text-red-500' : 'text-gray-600'"
                class="text-lg"
              />
            </button>
            <div class="absolute top-4 left-4">
              <span class="bg-primary font-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                {{ room.category_name }}
              </span>
            </div>
            <div class="absolute font-primary bottom-4 left-4">
              <span
                :class="[
                  'px-3 py-1 rounded-full text-sm font-medium',
                  room.available_rooms > 0 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                ]"
              >
                {{ room.available_rooms > 0 ? `${room.available_rooms} Available` : 'Fully Booked' }}
              </span>
            </div>
          </div>

          <!-- Thumbnail Carousel -->
          <div class="flex items-center justify-center">
            <UCarousel
              v-slot="{ item }"
              :items="allImages"
              loop
              :autoplay="{ delay: 4000 }"
              class="overflow-visible pb-6 w-full max-w-4xl"
              :ui="{ item: 'basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4' }"
            >
              <div
                @click="selectedImage = item"
                :class="[
                  'relative overflow-hidden cursor-pointer border-2 transition-all duration-300 mx-2 h-20 flex items-center justify-center',
                  selectedImage === item ? 'border-primary shadow-md' : 'border-transparent hover:border-gray-300'
                ]"
              >
                <img :src="item" :alt="room.title" class="w-full h-full object-cover" />
                <div v-if="selectedImage === item" class="absolute inset-0 bg-primary/20"></div>
              </div>
            </UCarousel>
          </div>
        </div>

        <!-- Two Column Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-2">
          <!-- Left Column -->
          <div class="lg:col-span-2 space-y-2">
            <!-- Overview -->
            <div class="bg-white p-8 border border-gray-200">
              <h2 class="text-3xl font-primary font-bold text-gray-900 mb-6">Room Overview</h2>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div class="flex items-center gap-3 p-4 bg-gray-50" v-if="room.room_size_name">
                  <div class="w-12 h-12 bg-primary/10 flex items-center justify-center">
                    <Icon name="ph:ruler" class="text-primary text-xl" />
                  </div>
                  <div>
                    <div class="text-sm font-secondary text-gray-500">Size</div>
                    <div class="font-semibold font-primary text-gray-900">{{ room.room_size_name }}</div>
                  </div>
                </div>
                <div class="flex items-center gap-3 p-4 bg-gray-50" v-if="room.max_guest">
                  <div class="w-12 h-12 bg-primary/10 flex items-center justify-center">
                    <Icon name="ph:users" class="text-primary text-xl" />
                  </div>
                  <div>
                    <div class="text-sm font-secondary text-gray-500">Max Guests</div>
                    <div class="font-semibold font-primary text-gray-900">{{ room.max_guest }}</div>
                  </div>
                </div>
                <div class="flex items-center gap-3 p-4 bg-gray-50" v-if="room.bed">
                  <div class="w-12 h-12 bg-primary/10 flex items-center justify-center">
                    <Icon name="ph:bed" class="text-primary text-xl" />
                  </div>
                  <div>
                    <div class="text-sm font-secondary text-gray-500">Bed</div>
                    <div class="font-semibold font-primary text-gray-900">{{ room.bed }}</div>
                  </div>
                </div>
                <div class="flex items-center gap-3 p-4 bg-gray-50" v-if="room.view">
                  <div class="w-12 h-12 bg-primary/10 flex items-center justify-center">
                    <Icon name="ph:eye" class="text-primary text-xl" />
                  </div>
                  <div>
                    <div class="text-sm font-secondary text-gray-500">View</div>
                    <div class="font-semibold font-primary text-gray-900">{{ room.view }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Room Statistics -->
            <div class="bg-white p-8 border border-gray-200">
              <h2 class="text-3xl font-primary font-bold text-gray-900 mb-6">Room Availability</h2>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div class="text-center p-6 bg-gray-50">
                  <div class="text-2xl font-primary font-bold text-gray-900">{{ room.quantity }}</div>
                  <div class="text-sm font-secondary text-gray-500">Total Rooms</div>
                </div>

                  <div class="text-center p-6 bg-green-50">
                  <div class="text-2xl font-primary font-bold text-gray-900">{{ room.available_rooms }}</div>
                  <div class="text-sm font-secondary text-gray-500">Available Rooms</div>
                </div>

                  <div class="text-center p-6 bg-red-50">
                  <div class="text-2xl font-primary font-bold text-gray-900">{{ room.booked_rooms }}</div>
                  <div class="text-sm font-secondary text-gray-500">Booked Rooms</div>
                </div>

                  <div class="text-center p-6 bg-yellow-50">
                  <div class="text-2xl font-primary font-bold text-gray-900">{{ room.under_maintenance }}</div>
                  <div class="text-sm font-secondary text-gray-500">Under Maintenance</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="lg:col-span-1 space-y-2">
            <div class="bg-white p-8 border border-primary/25 sticky">
              <div class="text-start mb-6">
                <h1 class="text-3xl font-primary font-bold text-gray-900 mb-4">{{ room.title }}</h1>
                <div class="flex flex-col items-start gap-4 text-lg text-gray-600">
                  <div class="text-2xl font-primary font-bold text-primary">
                    {{ room.currency_symbol }} {{ room.price }}
                    <span class="text-sm font-secondary font-normal text-gray-500">/per night</span>
                  </div>
                </div>
              </div>
              <div v-if="room.available_rooms > 0" class="text-center">
                <nuxtLink
                   :to="`/checkout/${room.slug}`"
                  class="inline-flex font-primary items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold text-lg py-4 px-8 transition-all duration-300 transform hover:scale-105 hover:shadow-xl w-full justify-center"
                >
                  <Icon name="ph:calendar-check" class="text-xl" />
                  Book This Room
                </nuxtLink>
              </div>
              <div v-else class="text-center">
                <div class="inline-flex font-primary items-center gap-2 bg-gray-100 text-gray-400 font-bold text-lg py-4 px-8 w-full justify-center border border-gray-200 cursor-not-allowed">
                  <Icon name="ph:calendar-x" class="text-xl" />
                  Fully Booked
                </div>
              </div>
              
            </div>
            <div class="bg-white p-7 border border-primary/25 sticky">
              <!-- Secure Booking Info -->
              <div class="space-y-2 text-center">
                <h2 class="text-xl font-primary font-bold text-gray-800">Secure Booking</h2>
                <div
                  class="flex items-center font-secondary justify-center gap-2 text-green-600 font-semibold"
                >
                  <Icon name="ph:shield-check" class="text-2xl" />
                  100% Safe & Verified
                </div>
              </div>
            </div>
          </div>
        </div>

        

        <!-- Bed & Features -->
        <div class="space-y-8 mt-2">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-2">
            <!-- Bed & Bedding -->
            <div class="bg-white p-8 border border-gray-200">
              <h2 class="text-3xl font-primary font-bold text-gray-900 mb-6">Bed & Bedding</h2>
              <div class="flex flex-wrap gap-8">
                <div v-for="item in room.bedding" :key="item.title" class="flex items-center gap-3 group">
                  <Icon :name="item.icon" class="text-xl text-primary group-hover:scale-110 transition-transform duration-300" />
                  <span class="text-gray-700 font-secondary font-medium text-sm">{{ item.title }}</span>
                </div>
              </div>
            </div>

            <!-- Room Features -->
            <div class="bg-white p-8 border border-gray-200">
              <h2 class="text-3xl font-primary font-bold text-gray-900 mb-6">Room Features</h2>
              <div class="flex flex-wrap gap-8">
                <div v-for="feature in room.room_features" :key="feature.title" class="flex items-center gap-3 group">
                  <Icon :name="feature.icon" class="text-xl text-primary group-hover:scale-110 transition-transform duration-300" />
                  <span class="text-gray-700 font-secondary font-medium text-sm">{{ feature.title }}</span>
                </div>
              </div>
            </div>

            <!-- Bathroom Features -->
            <div class="bg-white p-8 border border-gray-200">
              <h2 class="text-3xl font-primary font-bold text-gray-900 mb-6">Bath & Bathroom Features</h2>
              <div class="flex flex-wrap gap-8">
                <div v-for="feature in room.bath_features" :key="feature.title" class="flex items-center gap-3 group">
                  <Icon :name="feature.icon" class="text-xl text-primary group-hover:scale-110 transition-transform duration-300" />
                  <span class="text-gray-700 font-secondary font-medium text-sm">{{ feature.title }}</span>
                </div>
              </div>
            </div>

 <!-- Furniture -->
          <div class="bg-white p-8 border border-gray-200">
            <h2 class="text-3xl font-primary font-bold text-gray-900 mb-6">Furniture & Furnishings</h2>
            <div class="flex flex-wrap gap-8">
              <div v-for="item in room.furniture" :key="item.title" class="flex items-center gap-3 group">
                <Icon :name="item.icon" class="text-xl text-primary group-hover:scale-110 transition-transform duration-300" />
                <span class="text-gray-700 font-secondary font-medium text-sm">{{ item.title }}</span>
              </div>
            </div>
          </div>

          <!-- Food & Beverage -->
          <div class="bg-white p-8 border border-gray-200">
            <h2 class="text-3xl font-primary font-bold text-gray-900 mb-6">Food & Beverage</h2>
            <div class="flex flex-wrap gap-8">
              <div v-for="item in room.foods" :key="item.title" class="flex items-center gap-3 group">
                <Icon :name="item.icon" class="text-xl text-primary group-hover:scale-110 transition-transform duration-300" />
                <span class="text-gray-700 font-secondary font-medium text-sm">{{ item.title }}</span>
              </div>
            </div>
          </div>
          </div>

         

          <!-- Description -->
          <div class="bg-white p-8 border border-gray-200">
            <h2 class="text-3xl font-primary font-bold text-gray-900 mb-6">Description</h2>
            <div class="text-gray-600 font-secondary text-lg break-words" v-html="room.description"></div>
          </div>

          <!-- Amenities -->
          <div class="bg-white p-8 border border-gray-200">
            <h2 class="text-3xl font-bold font-primary text-gray-900 mb-6">Amenities</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div v-for="amenity in room.amenities" :key="amenity.title" class="flex flex-col items-center text-center p-4 bg-gray-50 border border-primary/20 group hover:bg-gray-100 transition-colors">
                <div class="mb-3">
                  <Icon :name="amenity.icon" class="text-2xl text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span class="text-gray-700 font-secondary font-medium text-sm">{{ amenity.title }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Rooms -->
    <section class="py-16 bg-background" v-if="room?.related_accommodations?.length">
      <div class="container mx-auto px-4 sm:px-6">
        <h2 class="text-3xl font-primary font-bold text-gray-900 text-center mb-12">You Might Also Like</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <RoomCard
            v-for="related in room.related_accommodations"
            :key="related.slug"
            :room="related"
            class="transition-transform hover:scale-[1.02]"
          />
        </div>
      </div>
    </section>

    <!-- Lightbox Modal -->
    <div v-if="showLightbox" class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" @click="closeLightbox">
      <div class="relative max-w-3xl max-h-full">
        <img :src="lightboxImage" alt="Room image" class="max-w-full max-h-full object-contain" />
        <button @click="closeLightbox" class="absolute top-4 right-4 w-10 h-10 bg-primary/20 hover:bg-primary/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors">
          <Icon name="ph:x" class="text-primary text-lg" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import type { Accommodation } from '~/types';

type SingleAccommodationApiResponse = {
  data: Accommodation;
}

const route = useRoute();
const { data: res, pending, error } = useAPI<SingleAccommodationApiResponse>(`/accommodations/${route.params.slug}`);
const room = computed(() => res?.value?.data);

// Gallery & favorite state
const selectedImage = ref('');
const isFavorite = ref(false);
const showLightbox = ref(false);
const lightboxImage = ref('');

const allImages = computed(() => {
  return room.value ? [room.value.image, ...(room.value.gallery_images.map((g: any) => g.image) || [])] : [];
});

const toggleFavorite = () => (isFavorite.value = !isFavorite.value);
const openLightbox = (img: string) => {
  lightboxImage.value = img;
  showLightbox.value = true;
};
const closeLightbox = () => {
  showLightbox.value = false;
  lightboxImage.value = '';
};
</script>

<style scoped>
.sticky {
  position: sticky;
  z-index: 10;
}
</style>
