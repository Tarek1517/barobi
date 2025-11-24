<script setup>
const slides = [
  {
    title: "Summer Special",
    discount: "30% OFF",
    price: "$99/night",
    image: "/images/hotel-offer-1.jpg",
    badge: "Popular",
    features: ["Free Breakfast", "Pool", "Spa"]
  },
  {
    title: "Luxury Suite",
    discount: "25% OFF",
    price: "$199/night",
    image: "/images/hotel-offer-2.jpg",
    badge: "Luxury",
    features: ["Ocean View", "Balcony", "Spa"]
  },
  {
    title: "Family Deal",
    discount: "35% OFF",
    price: "$149/night",
    image: "/images/hotel-offer-3.jpg",
    badge: "Family",
    features: ["Kids Club", "Family Room", "Games"]
  },
  {
    title: "Business Package",
    discount: "20% OFF",
    price: "$129/night",
    image: "/images/hotel-offer-4.jpg",
    badge: "Business",
    features: ["Workspace", "Meeting", "WiFi"]
  }
];
</script>

<template>
  <div class="container mx-auto py-20 bg-white overflow-hidden relative">
    <UCarousel
      v-slot="{ item: slide }"
      :items="slides"
      loop
      arrows
      dots
      :autoplay="{ delay: 3000 }"
      class="overflow-visible pb-6"
      :ui="{
        item: 'basis-full sm:basis-2/3 lg:basis-1/2 xl:basis-1/3',
      }"
    >
      <div class="flex flex-col lg:flex-row relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 mx-2 border border-primary/15 group bg-white">
        <!-- Image Section - Left -->
        <div class="lg:w-3/5 h-40 lg:h-auto relative overflow-hidden">
          <img
            :src="slide.image"
            :alt="slide.title"
            class="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
          />
          <!-- Discount Badge -->
          <div class="absolute top-3 left-3">
            <span class="bg-primary text-white px-2 py-1 rounded text-sm font-bold">
              {{ slide.discount }}
            </span>
          </div>
          <!-- Type Badge -->
          <div class="absolute top-3 right-3">
            <span class="bg-white/90 text-gray-800 px-2 py-1 rounded text-xs font-semibold">
              {{ slide.badge }}
            </span>
          </div>
        </div>

        <!-- Content Section - Right -->
        <div class="lg:w-2/5 p-4 flex flex-col justify-between">
          <!-- Text Content -->
          <div>
            <h3 class="text-lg font-bold text-gray-900 mb-1">
              {{ slide.title }}
            </h3>
            
            <!-- Features -->
            <div class="flex flex-wrap gap-1 mb-3">
              <span
                v-for="feature in slide.features"
                :key="feature"
                class="bg-primary/20 text-primary px-2 py-1 rounded text-xs"
              >
                {{ feature }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </UCarousel>
  </div>
</template>

<style scoped>
:deep(.carousel-container) {
  gap: 1rem !important;
  padding: 0 0.5rem;
}

:deep(.carousel-item) {
  flex: 0 0 auto;
  transition: transform 0.3s ease;
}

:deep(.carousel-item:hover) {
  transform: translateY(-4px);
}

@media (min-width: 640px) {
  :deep(.carousel-container) {
    gap: 1.5rem !important;
    padding: 0 1rem;
  }
  
  :deep(.carousel-item) {
    width: calc(66.666% - 1rem);
  }
}

@media (min-width: 1024px) {
  :deep(.carousel-item) {
    width: calc(50% - 1rem);
  }
}

@media (min-width: 1280px) {
  :deep(.carousel-item) {
    width: calc(33.333% - 1rem);
  }
}

:deep(.carousel-arrow) {
  background: white !important;
  border: 1px solid #e5e7eb !important;
}

:deep(.carousel-dots) {
  bottom: -2rem !important;
}
</style>