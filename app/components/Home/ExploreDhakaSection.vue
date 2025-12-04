<script setup>
// Explore Dhaka items only
const exploreDhakaItems = [
  {
    id: 1,
    name: "Old Dhaka",
    image: "/images/old-dhaka.jpeg",
    distance: "15min to drive",
    category: "explore-dhaka",
    short_description:
      "Old Dhaka, located on the southern side of the capital, is the historic heart of the city",
    address: "Pink City District, Heritage Zone",
    phone: "+1 (555) 111-2233",
    rating: 4.9,
    hours: "9:00 AM - 6:00 PM",
    tags: ["Shopping", "Historic", "Culture"],
  },
  {
    id: 2,
    name: "Lalbagh Fort",
    image: "/images/lalbagh.jpg",
    distance: "20min to drive",
    category: "explore-dhaka",
    short_description:
      "17th-century Mughal fort complex with historical significance",
    address: "Lalbagh, Old Dhaka",
    phone: "+880 2-9673018",
    rating: 4.7,
    hours: "10:00 AM - 5:00 PM",
    tags: ["Historic", "Fort", "Mughal"],
  },
  {
    id: 3,
    name: "Ahsan Manzil Museum",
    image: "/images/ahsan.jpg",
    distance: "25min to drive",
    category: "explore-dhaka",
    short_description:
      "The Pink Palace, former residential palace of Dhaka Nawab Family",
    address: "Kumartoli, Dhaka 1000",
    phone: "+880 2-7391122",
    rating: 4.6,
    hours: "10:30 AM - 5:30 PM",
    tags: ["Palace", "Historic", "Architecture"],
  },
  // New item 1
  {
    id: 4,
    name: "Dhakeshwari National Temple",
    image: "/images/dhakeshwari.jpg",
    distance: "12min to drive",
    category: "explore-dhaka",
    short_description:
      "Architectural marvel by Louis Kahn, the seat of Bangladesh's Parliament",
    address: "Sher-e-Bangla Nagar, Dhaka",
    phone: "+880 2-8181001",
    rating: 4.8,
    hours: "9:00 AM - 5:00 PM",
    tags: ["Architecture", "Government", "Modern"],
  },
  // New item 2
  {
    id: 5,
    name: "Central Shaheed Minar",
    image: "/images/ShaheedMinar.jpg",
    distance: "18min to drive",
    category: "explore-dhaka",
    short_description:
      "Shaheed Minar, located next to Dhaka University in Shahbag, Dhaka, stands as a powerful symbol of Bangladesh’s Language Movement ",
    address: "Dhaka University, Shahbag",
    phone: "+880 2-9661900",
    rating: 4.5,
    hours: "Open 24 hours",
    tags: ["Education", "Historic", "Campus"],
  },
];

// Convert items to slides format for UCarousel
const slides = computed(() => {
  return exploreDhakaItems.map((item) => ({
    ...item,
    // You can add additional properties for slides if needed
  }));
});
</script>

<template>
  <section class="py-16 bg-background relative overflow-hidden">
    <div class="container mx-auto px-4 sm:px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center pb-8">
        <div
          class="inline-flex items-center font-secondary gap-3 bg-primary/10 px-4 py-2 mb-4"
        >
          <div class="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span
            class="text-primary font-semibold text-sm uppercase tracking-wide"
          >
            Explore Nearby
          </span>
        </div>
        <h2
          class="text-4xl md:text-5xl font-primary font-bold text-gray-900 mb-6"
        >
          Discover
          <span class="linear-wipe animate-gradient"> Dhaka</span>
        </h2>
        <p
          class="text-xl text-gray-600 font-secondary max-w-3xl mx-auto leading-relaxed"
        >
          Explore the most iconic and must-visit attractions in Dhaka, from
          historic landmarks to cultural centers.
        </p>
      </div>

      <!-- Carousel Section -->
      <div class="relative py-3">
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
          <div class="px-2">
            <NearbyCard :item="slide" type="explore-dhaka" class="h-full" />
          </div>
        </UCarousel>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Gradient Text Animation */
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
</style>
