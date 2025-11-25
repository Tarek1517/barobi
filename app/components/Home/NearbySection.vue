<!-- Parent Component -->
<script setup>
const NearbyArea = [
  {
    id: 1,
    name: "Pizza Roma",
    image: "/images/pizzaroma.jpg",
    distance: "10mint to walk",
  },
  {
    id: 2,
    name: "khazana",
    image: "/images/khazana.jpg",
    distance: "10mint to ride",
  },
  {
    id: 3,
    name: "Glazed",
    image: "/images/glazed.jpg",
    distance: "30mint to walk",
  },
  {
    id: 4,
    name: "sushi samurai",
    image: "/images/sushi.jpg",
    distance: "30mint to cycle",
  },
  {
    id: 5,
    name: "Spit Fire",
    image: "/images/spitfire.png",
    distance: "30mint to cycle",
  },

  {
    id: 6,
    name: "Nandos",
    image: "/images/nandos.jpg",
    distance: "30mint to cycle",
  },
  {
    id: 7,
    name: "Pizza Roma",
    image: "/images/pizzaroma.jpg",
    distance: "10mint to walk",
  },
  {
    id: 8,
    name: "Glazed",
    image: "/images/glazed.jpg",
    distance: "30mint to walk",
  },
  {
    id: 9,
    name: "Spit Fire",
    image: "/images/spitfire.png",
    distance: "30mint to cycle",
  },
  {
    id: 10,
    name: "khazana",
    image: "/images/khazana.jpg",
    distance: "10mint to ride",
  },
];
</script>

<template>
  <section
    class="py-16 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
  >
    <div class="container mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <div
          class="inline-flex items-center gap-3 bg-primary/10 px-4 py-2 mb-4"
        >
          <div class="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span
            class="text-primary font-semibold text-sm uppercase tracking-wide"
            >Nearby Areas</span
          >
        </div>
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Nearby Areas of
          <span class="linear-wipe animate-gradient"> The Hotel</span>
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Discover convenient amenities and services located just moments away from our hotel. 
          Everything you need is within easy reach.
        </p>
      </div>

      <!-- Nearby Areas Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
        <NearbyCard
          v-for="Nearby in NearbyArea"
          :key="Nearby.id"
          :Nearby="Nearby"
          class="w-full"
        />
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

/* Move Keyframes Outside */
@keyframes shine {
  to {
    background-position: 200% center;
  }
}
</style>