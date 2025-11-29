<script setup lang="ts">
// Gallery images data
const galleryImages = [
  {
    id: 1,
    src: "/images/01.jpg",
    alt: "Luxury King Room",
    category: "rooms",
    title: "Deluxe King Room",
    description: "Spacious room with city view and premium amenities",
  },
  {
    id: 2,
    src: "/images/about-t1.jpg",
    alt: "Infinity Pool",
    category: "amenities",
    title: "Infinity Pool",
    description: "Stunning rooftop pool with panoramic city views",
  },
  {
    id: 3,
    src: "/images/caffee.jpg",
    alt: "Main Restaurant",
    category: "dining",
    title: "Skyline Restaurant",
    description: "Fine dining experience with international cuisine",
  },
  {
    id: 4,
    src: "/images/room-13.jpg",
    alt: "Luxury Spa",
    category: "amenities",
    title: "Wellness Spa",
    description: "Relaxing spa treatments and massage therapies",
  },
  {
    id: 5,
    src: "/images/room-2.jpg",
    alt: "Executive Suite",
    category: "rooms",
    title: "Executive Suite",
    description: "Luxurious suite with separate living area",
  },
  {
    id: 6,
    src: "/images/gym2.png",
    alt: "Fitness Center",
    category: "amenities",
    title: "Fitness Center",
    description: "State-of-the-art gym equipment and personal training",
  },

  {
    id: 8,
    src: "/images/room-3.jpg",
    alt: "Conference Room",
    category: "facilities",
    title: "Conference Room",
    description: "Modern meeting spaces for business events",
  },
  {
    id: 9,
    src: "/images/banner5.jpg",
    alt: "Grand Lobby",
    category: "facilities",
    title: "Grand Lobby",
    description: "Elegant lobby with contemporary design",
  },
  {
    id: 10,
    src: "/images/room-4.jpg",
    alt: "Family Room",
    category: "rooms",
    title: "Family Suite",
    description: "Comfortable family accommodation with extra space",
  },
  {
    id: 11,
    src: "/images/gym.jpg",
    alt: "Poolside",
    category: "amenities",
    title: "Poolside Lounge",
    description: "Relaxing pool area with comfortable sunbeds",
  },
  {
    id: 12,
    src: "/images/room-9.jpg",
    alt: "Breakfast Area",
    category: "dining",
    title: "Morning Cafe",
    description: "Buffet breakfast with fresh local ingredients",
  },
];

// Categories for filtering
const categories = [
  { id: "all", name: "All Photos", count: galleryImages.length },
  {
    id: "rooms",
    name: "Rooms & Suites",
    count: galleryImages.filter((img) => img.category === "rooms").length,
  },
  {
    id: "amenities",
    name: "Amenities",
    count: galleryImages.filter((img) => img.category === "amenities").length,
  },
  {
    id: "dining",
    name: "Dining",
    count: galleryImages.filter((img) => img.category === "dining").length,
  },
  {
    id: "facilities",
    name: "Facilities",
    count: galleryImages.filter((img) => img.category === "facilities").length,
  },
];

// Reactive state
const activeCategory = ref("all");
const selectedImage = ref(null);
const isLightboxOpen = ref(false);

// Computed filtered images
const filteredImages = computed(() => {
  if (activeCategory.value === "all") {
    return galleryImages;
  }
  return galleryImages.filter(
    (image) => image.category === activeCategory.value
  );
});

// Lightbox functions
const openLightbox = (image) => {
  selectedImage.value = image;
  isLightboxOpen.value = true;
  document.body.style.overflow = "hidden";
};

const closeLightbox = () => {
  isLightboxOpen.value = false;
  selectedImage.value = null;
  document.body.style.overflow = "auto";
};

const navigateImage = (direction) => {
  const currentIndex = galleryImages.findIndex(
    (img) => img.id === selectedImage.value.id
  );
  let newIndex;

  if (direction === "next") {
    newIndex = (currentIndex + 1) % galleryImages.length;
  } else {
    newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  }

  selectedImage.value = galleryImages[newIndex];
};

// Keyboard navigation
const handleKeydown = (event) => {
  if (!isLightboxOpen.value) return;

  switch (event.key) {
    case "Escape":
      closeLightbox();
      break;
    case "ArrowLeft":
      navigateImage("prev");
      break;
    case "ArrowRight":
      navigateImage("next");
      break;
  }
};

// Add event listener for keyboard
onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <!-- Gallery Hero Section -->
  <section class="relative h-[400px] lg:h-[500px] overflow-hidden group">
    <!-- Background -->
    <NuxtImg
      src="/images/banner3.jpg"
      alt="Hotel Gallery"
      class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
      loading="eager"
      preload
      format="webp"
      quality="80"
    />
    <!-- Gradient Overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 to-black/40"
    ></div>

    <!-- Content -->
    <div
      class="container h-full mx-auto px-4 flex items-center justify-center relative z-10"
    >
      <div class="max-w-5xl space-y-4 text-center">
        <nav
          class="flex items-center justify-center text-white/90 text-sm mb-6"
        >
          <NuxtLink
            to="/"
            class="hover:text-primary transition-colors duration-300 flex items-center"
          >
            <Icon name="mdi:home-outline" class="mr-1" /> Home
          </NuxtLink>
          <Icon
            name="iconamoon:arrow-right-2"
            class="mx-3 text-xs opacity-70"
          />
          <span class="text-white font-medium">Gallery</span>
        </nav>

        <h1
          class="text-5xl md:text-7xl text-center font-bold text-white leading-tight tracking-tight"
        >
          Hotel
          <span class="linear-wipe drop-shadow-lg"> Gallery </span>
        </h1>
        <p class="text-xl text-center text-gray-200 mt-4">
          Explore our luxurious accommodations, amenities, and facilities
        </p>
      </div>
    </div>
  </section>

  <!-- Gallery Content Section -->
  <section class="container mx-auto mb-16 py-20">
    <!-- Filter Tabs -->
    <div class="flex flex-wrap justify-center gap-4 mb-12">
      <button
        v-for="category in categories"
        :key="category.id"
        @click="activeCategory = category.id"
        :class="[
          'px-6 py-3 font-medium transition-all duration-300 border-2',
          activeCategory == category.id
            ? 'bg-primary text-white border-primary/35 shadow-lg transform scale-105'
            : 'bg-white text-primary border-primary/35 hover:shadow-md',
        ]"
      >
        {{ category.name }}
        <span
          :class="[
            'ml-2 px-2 py-1 rounded-full text-xs',
            activeCategory == category.id ? 'bg-white/35' : 'bg-gray-200',
          ]"
        >
          {{ category.count }}
        </span>
      </button>
    </div>

    <!-- Gallery Grid -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <div
        v-for="image in filteredImages"
        :key="image.id"
        class="group relative bg-white overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer"
        @click="openLightbox(image)"
      >
        <!-- Image -->
        <div class="aspect-square overflow-hidden">
          <NuxtImg
            :src="image.src"
            :alt="image.alt"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            format="webp"
            quality="85"
          />
        </div>

        <!-- Overlay -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
        >
          <div
            class="p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            <h3 class="font-bold text-lg mb-2">{{ image.title }}</h3>
            <p
              class="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
            >
              {{ image.description }}
            </p>
            <div
              class="flex items-center mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200"
            >
              <Icon name="mdi:eye" class="mr-2" />
              <span class="text-sm">Click to view</span>
            </div>
          </div>
        </div>

        <!-- Category Badge -->
        <div class="absolute top-4 left-4">
          <span
            class="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 capitalize"
          >
            {{ image.category }}
          </span>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredImages.length === 0" class="text-center py-16">
      <Icon name="mdi:image-off" class="text-gray-300 text-6xl mx-auto mb-4" />
      <h3 class="text-xl font-semibold text-gray-600 mb-2">
        No images found
      </h3>
      <p class="text-gray-500">
        Try selecting a different category to view more photos
      </p>
    </div>
  </section>

  <!-- Call to Action Section -->
  <section class="bg-gradient-to-r from-tertiary to-secondary/55 py-20">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
        Experience Our Luxury Firsthand
      </h2>
      <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
        Book your stay and enjoy our premium accommodations, world-class
        amenities, and exceptional service
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink
          to="/rooms"
          class="bg-white text-primary px-8 py-4 font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
        >
          View Rooms & Suites
        </NuxtLink>
        <NuxtLink
          to="/contact"
          class="border-2 border-white text-white px-8 py-4 font-semibold hover:bg-white hover:text-secondary transition-all duration-300 transform hover:scale-105"
        >
          Contact Us
        </NuxtLink>
      </div>
    </div>
  </section>

  <!-- Lightbox Modal -->
  <div
    v-if="isLightboxOpen"
    class="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
    @click="closeLightbox"
  >
    <!-- Close Button -->
    <button
      @click="closeLightbox"
      class="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10"
    >
      <Icon name="mdi:close" class="text-3xl" />
    </button>

    <!-- Navigation Buttons -->
    <button
      @click.stop="navigateImage('prev')"
      class="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-3"
    >
      <Icon name="mdi:chevron-left" class="text-2xl" />
    </button>

    <button
      @click.stop="navigateImage('next')"
      class="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-3"
    >
      <Icon name="mdi:chevron-right" class="text-2xl" />
    </button>

    <!-- Image Content -->
    <div class="max-w-6xl max-h-full flex flex-col items-center" @click.stop>
      <!-- Image -->
      <div class="flex-1 flex items-center justify-center">
        <NuxtImg
          :src="selectedImage.src"
          :alt="selectedImage.alt"
          class="max-w-full max-h-[80vh] object-contain rounded-lg"
          format="webp"
          quality="90"
        />
      </div>

      <!-- Image Info -->
      <div class="text-white text-center mt-6 max-w-2xl">
        <h3 class="text-2xl font-bold mb-2">{{ selectedImage.title }}</h3>
        <p class="text-gray-300">{{ selectedImage.description }}</p>
        <div
          class="flex items-center justify-center gap-4 mt-4 text-sm text-gray-400"
        >
          <span class="capitalize px-3 py-1 bg-white/20 rounded-full">
            {{ selectedImage.category }}
          </span>
          <span>{{ selectedImage.id }} / {{ galleryImages.length }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.linear-wipe {
  text-align: center;
  background: linear-gradient(
    to right,
    #7e1218 20%,
    #cd986c 40%,
    #cd986c 60%,
    #1f2d3e 80%
  );
  background-size: 200% auto;
  color: #000;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 3s linear infinite;
}

@keyframes shine {
  to {
    background-position: 200% center;
  }
}

/* Smooth transitions for lightbox */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
