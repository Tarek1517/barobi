<script setup>
// Rooms data
const rooms = [
  {
    id: 1,
    type: "Suite",
    name: "Luxury Suite",
    size: "85 m²",
    beds: "King Bed",
    image: "/images/room-1.jpg",
    price: "$299",
    period: "per night",
    guests: "2 Adults",
    short_description:
      "Learn step-by-step how to import cars from Japan with minimal hassle and maximum savings.",
  },
  {
    id: 2,
    type: "Deluxe",
    name: "Deluxe Room",
    size: "45 m²",
    beds: "Queen Bed",
    image: "/images/room-2.jpg",
    price: "$189",
    period: "per night",
    guests: "2 Adults",
    short_description:
      "Learn step-by-step how to import cars from Japan with minimal hassle and maximum savings.",
  },
  {
    id: 3,
    type: "Family",
    name: "Family Apartment",
    size: "120 m²",
    beds: "2 Queen Beds",
    image: "/images/room-3.jpg",
    price: "$399",
    period: "per night",
    guests: "4 Adults",
    short_description:
      "Learn step-by-step how to import cars from Japan with minimal hassle and maximum savings.",
  },
  {
    id: 4,
    type: "Executive",
    name: "Executive Suite",
    size: "65 m²",
    beds: "King Bed",
    image: "/images/room-4.jpg",
    price: "$259",
    period: "per night",
    guests: "2 Adults",
    short_description:
      "Learn step-by-step how to import cars from Japan with minimal hassle and maximum savings.",
  },
  {
    id: 5,
    type: "Premium",
    name: "Premium Room",
    size: "50 m²",
    beds: "King Bed",
    image: "/images/room-7.jpg",
    price: "$229",
    period: "per night",
    guests: "2 Adults",
    short_description:
      "Learn step-by-step how to import cars from Japan with minimal hassle and maximum savings.",
  },
  {
    id: 6,
    type: "Studio",
    name: "Studio Apartment",
    size: "35 m²",
    beds: "Queen Bed",
    image: "/images/room-6.jpg",
    price: "$159",
    period: "per night",
    guests: "2 Adults",
    short_description:
      "Learn step-by-step how to import cars from Japan with minimal hassle and maximum savings.",
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
        <div class="inline-flex items-center gap-3 bg-primary/10 px-4 py-2 mb-4">
          <div class="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span
            class="text-primary font-semibold text-sm uppercase tracking-wide"
            >Rooms & Suites</span
          >
        </div>
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Our Best
          <span
            class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >Rooms & Suites</span
          >
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Experience unparalleled comfort in our carefully designed rooms and
          apartments. Each space is crafted to provide the perfect blend of
          luxury and homely comfort.
        </p>
      </div>

      <!-- Cars Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <RoomCard
          v-for="room in rooms.slice(0, visibleCars)"
          :key="room.id"
          :room="room"
          class="w-full"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.grid > div {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

.grid > div:nth-child(1) {
  animation-delay: 0.1s;
}
.grid > div:nth-child(2) {
  animation-delay: 0.2s;
}
.grid > div:nth-child(3) {
  animation-delay: 0.3s;
}
.grid > div:nth-child(4) {
  animation-delay: 0.4s;
}
.grid > div:nth-child(5) {
  animation-delay: 0.5s;
}
.grid > div:nth-child(6) {
  animation-delay: 0.6s;
}
</style>
