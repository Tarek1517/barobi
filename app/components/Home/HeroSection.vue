<!-- components/HeroSection.vue -->
<template>
  <section
    class="relative min-h-screen flex items-center justify-center overflow-hidden"
  >
    <!-- Background Video/Slider -->
    <div class="absolute inset-0 z-0">
      <!-- Try to load video first -->
      <video
        v-if="hasVideo"
        autoplay
        muted
        loop
        playsinline
        class="w-full h-full object-cover"
      >
        <source src="/videos/video1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <!-- Fallback to image slider if no video -->
      <div v-else class="w-full h-full">
        <UCarousel
          v-slot="{ item }"
          :items="carouselItems"
          :ui="{
            item: 'flex-[0_0_100%]',
            container: 'w-full h-full',
          }"
          class="w-full h-full"
          arrows
          indicators
          autoplay
          :autoplay-interval="5000"
        >
          <div class="relative w-full h-full">
            <NuxtImg
              :src="item.image"
              :alt="item.title"
              class="w-full h-full object-cover"
              format="webp"
              quality="80"
            />
            <!-- Dark overlay for better text readability -->
            <div class="absolute inset-0 bg-black/50"></div>
          </div>
        </UCarousel>
      </div>
    </div>
    <div
      class="absolute inset-0 bg-gradient-to-r from-black/30 via-black/40 to-transparent z-0"
    ></div>
    <div
      class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-0"
    ></div>
    <!-- Main Content Container -->
    <div class="container mx-auto px-4 relative z-10 pt-20">
      <!-- Header Section -->
      <div class="text-center mb-16">
        <h1
          class="text-5xl md:text-6xl font-bold text-white font-primary mb-4 tracking-wide drop-shadow-lg linear-wipe"
        >
          BAROBI APPARTMENT
        </h1>
        <p
          class="text-2xl md:text-3xl text-gray-200 font-secondary drop-shadow"
        >
          Home Away From Home
        </p>
      </div>
    </div>
  </section>
  <section class="bg-background">
    <div class="max-w-6xl -mt-16 mx-auto">
      <div
        class="bg-white/95 backdrop-blur-sm shadow-2xl p-6 border border-white/20"
      >
        <form @submit.prevent="handleSearch" class="space-y-4">
          <!-- All fields in one row -->
          <div class="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <!-- Check-in Date -->
            <div class="group">
              <label
                class="block text-sm font-semibold font-secondary text-gray-700 mb-2"
              >
                Check-in Date
              </label>
              <div class="relative">
                <input
                  v-model="checkIn"
                  type="date"
                  class="w-full px-4 py-3 bg-white border border-primary/25 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                  required
                />
              </div>
            </div>

            <!-- Check-out Date -->
            <div class="group">
              <label
                class="block text-sm font-secondary font-semibold text-gray-700 mb-2"
              >
                Check-out Date
              </label>
              <div class="relative">
                <input
                  v-model="checkOut"
                  type="date"
                  class="w-full px-4 py-3 bg-white border border-primary/25 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                  required
                />
              </div>
            </div>

            <!-- Adults -->
            <div class="group">
              <label
                class="block font-secondary text-sm font-semibold text-gray-700 mb-2"
              >
                Adults
              </label>
              <select
                v-model="adults"
                class="w-full px-4 py-3 bg-white border border-primary/25 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base appearance-none"
              >
                <option v-for="n in 8" :key="n" :value="n">
                  {{ n }} {{ n === 1 ? "Adult" : "Adults" }}
                </option>
              </select>
            </div>

            <!-- Children -->
            <div class="group">
              <label
                class="block font-secondary text-sm font-semibold text-gray-700 mb-2"
              >
                Children
              </label>
              <select
                v-model="children"
                class="w-full px-4 py-3 bg-white border border-primary/25 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base appearance-none"
              >
                <option value="0">0 Children</option>
                <option v-for="n in 6" :key="n" :value="n">
                  {{ n }} {{ n === 1 ? "Child" : "Children" }}
                </option>
              </select>
            </div>

            <!-- Search Button -->
            <div class="group">
              <button
                type="submit"
                class="w-full font-primary bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold py-3 px-4 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 h-[50px] shadow-lg hover:shadow-xl"
              >
                <Icon name="heroicons:magnifying-glass" class="w-5 h-5" />
                <span class="whitespace-nowrap">Search Availability</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const hasVideo = ref(false);

// Carousel items for fallback
const carouselItems = [
  {
    image: "/images/banner1.jpg",
    title: "Barobi Apartments 1",
  },
  {
    image: "/images/banner5.jpg",
    title: "Barobi Apartments 2",
  },
];

// Check for video file on component mount
onMounted(async () => {
  try {
    // Check if video exists
    const response = await fetch("/videos/video1.mp4", { method: "HEAD" });
    hasVideo.value = response.ok;
  } catch (error) {
    console.log("Video not found, using image slider");
    hasVideo.value = false;
  }
});

const emit = defineEmits(["search"]);

// Form data
const checkIn = ref("");
const checkOut = ref("");
const adults = ref(2);
const children = ref(0);

// Handle form submission
const handleSearch = () => {
  const searchData = {
    checkIn: checkIn.value,
    checkOut: checkOut.value,
    adults: adults.value,
    children: children.value,
  };

  console.log("Searching with:", searchData);
  emit("search", searchData);

  // Show alert or redirect
  alert(
    `Searching for ${searchData.adults} adults and ${searchData.children} children from ${searchData.checkIn} to ${searchData.checkOut}`
  );
};
</script>

<style scoped>
/* Gradient Text Animation - KEPT AS REQUESTED */
.linear-wipe {
  text-align: center;
  background: linear-gradient(
    to right,
    #7e1218 20%,
    #cd986c 40%,
    #cd986c 60%,
    #fff 80%
  );
  background-size: 200% auto;
  color: #000;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 3s linear infinite;
}

/* Move Keyframes Outside */
@keyframes shine {
  to {
    background-position: 200% center;
  }
}
</style>
