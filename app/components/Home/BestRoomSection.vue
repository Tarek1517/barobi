<script setup>
// Rooms data
const rooms = [
  {
    id: 1,
    type: "Suite",
    discount: "20% OFF",
    name: "Family Suite",
    size: "700 sq. ft",
    beds: "King Bed",
    image: "/images/room-1.jpg",
    price: "180",
    period: "per night",
    guests: "2 Adults",
    availableRooms: 1,
    short_description:
      "Experience ultimate luxury in our spacious suite with panoramic city views and premium amenities.",
  },
  {
    id: 2,
    type: "Deluxe",
    discount: "12% OFF",
    name: "Executive Suite Large",
    size: "545 sq. ft",
    beds: "Queen Bed",
    image: "/images/room-2.jpg",
    price: "160",
    period: "per night",
    guests: "2 Adults",
    availableRooms: 6,
    short_description:
      "Elegant room with modern comforts and thoughtful touches for a perfect stay.",
  },
  {
    id: 3,
    type: "Family",
    discount: "2% OFF",
    name: "Executive Suite",
    size: "503 sq. ft",
    beds: "2 Queen Beds",
    image: "/images/room-3.jpg",
    price: "150",
    period: "per night",
    guests: "4 Adults",
    availableRooms: 6,
    short_description:
      "Perfect for families with separate living area and all the comforts of home.",
  },
  {
    id: 4,
    type: "Executive",
    discount: "15% OFF",
    name: "Premium Deluxe",
    size: "302 sq. ft",
    beds: "King Bed",
    image: "/images/room-4.jpg",
    price: "120",
    period: "per night",
    guests: "2 Adults",
    availableRooms: 7,
    short_description:
      "Sophisticated suite designed for business travelers with dedicated workspace.",
  },
];
</script>

<template>
  <section
    class="py-16 bg-background relative overflow-hidden"
  >
    <div class="container mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <div
          class="inline-flex items-center gap-3 bg-primary/10 px-4 py-2 mb-4"
        >
          <div class="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span
            class="text-primary font-secondary font-semibold text-sm uppercase tracking-wide"
            >Rooms & Suites</span
          >
        </div>
        <h2 class="text-4xl font-primary md:text-5xl font-bold text-gray-900 mb-6">
          Our Best
          <span class="linear-wipe animate-gradient"
            >Accommodations</span
          >
        </h2>
        <p class="text-xl font-secondary text-gray-600 max-w-3xl mx-auto leading-relaxed">
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
