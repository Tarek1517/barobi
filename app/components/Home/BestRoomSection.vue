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
    availableRooms: 5,
    short_description:
      "Experience ultimate luxury in our spacious suite with panoramic city views and premium amenities.",
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
    availableRooms: 2,
    short_description:
      "Elegant room with modern comforts and thoughtful touches for a perfect stay.",
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
    availableRooms: 1,
    short_description:
      "Perfect for families with separate living area and all the comforts of home.",
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
    availableRooms: 3,
    short_description:
      "Sophisticated suite designed for business travelers with dedicated workspace.",
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
    availableRooms: 0,
    short_description:
      "Enhanced comfort with premium bedding and upgraded amenities.",
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
    availableRooms: 8,
    short_description:
      "Compact and efficient space perfect for short stays and budget-conscious travelers.",
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
            class="linear-wipe animate-gradient"
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
