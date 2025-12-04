<script setup>
// Testimonials data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/avatar1.png",
    rating: 5,
    comment:
      "Absolutely loved our stay! The staff was incredibly helpful and the rooms were spotless. Will definitely be returning on our next trip. Will definitely be returning on our next trip",
    stayDuration: "3 nights",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Tokyo, Japan",
    image: "/images/avatar2.png",
    rating: 5,
    comment:
      "Best hotel experience I've had in years. The attention to detail and customer service exceeded all expectations. Highly recommended!",
    stayDuration: "5 nights",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    location: "London, UK",
    image: "/images/avatar3.png",
    rating: 4,
    comment:
      "Beautiful property with amazing amenities. The location was perfect for exploring the city. Only minor issue was the Wi-Fi speed. Will definitely be returning on our next trip",
    stayDuration: "4 nights",
  },
  {
    id: 4,
    name: "David Kim",
    location: "Seoul, South Korea",
    image: "/images/avatar4.jpg",
    rating: 5,
    comment:
      "Exceptional service from check-in to check-out. The room was spacious and the bed was incredibly comfortable. Perfect for business travelers.",
    stayDuration: "2 nights",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    location: "Sydney, Australia",
    image: "/images/avatar5.jpg",
    rating: 5,
    comment:
      "The hotel exceeded all our expectations. The staff went above and beyond to make our anniversary special. Truly memorable experience!",
    stayDuration: "3 nights",
  },
];

// Function to generate star ratings
const generateStars = (rating) => {
  return Array.from({ length: 5 }, (_, index) =>
    index < rating ? "★" : "☆"
  ).join("");
};
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
            class="text-primary  font-secondary font-semibold text-sm uppercase tracking-wide"
            >Testimonials</span
          >
        </div>
        <h2 class="text-4xl font-primary md:text-5xl font-bold text-gray-900 mb-6">
          What Our
          <span class="linear-wipe animate-gradient"> Guests Say</span>
        </h2>
        <p class="text-xl font-secondary text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Discover why our guests keep coming back. Read about their experiences
          and see how we've made their stays unforgettable.
        </p>
      </div>

      <!-- Testimonials Carousel -->
      <UCarousel
        v-slot="{ item }"
        :items="testimonials"
        loop
        arrows
        dots
        :autoplay="{ delay: 4000 }"
        class="overflow-visible pb-6"
        :ui="{
          item: 'basis-full sm:basis-2/3 lg:basis-1/2 xl:basis-1/3',
        }"
      >
        <div
          class="bg-white shadow-lg p-6 mx-4 h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-105"
        >
          <!-- Rating -->
          <div class="mb-4">
            <div class="text-yellow-400 text-xl font-bold">
              {{ generateStars(item.rating) }}
            </div>
          </div>

          <!-- Comment -->
          <p class="text-gray-600 font-secondary mb-6 flex-grow leading-relaxed italic">
            "{{ item.comment }}"
          </p>

          <!-- Guest Info -->
          <div class="flex items-center gap-4 pt-4 border-t border-gray-100">
            <img
              :src="item.image"
              :alt="item.name"
              class="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
            />
            <div class="flex-1">
              <h4 class="font-semibold font-primary text-gray-900">{{ item.name }}</h4>
              <div class="flex items-center justify-between">
                <p class="text-sm font-secondary text-gray-500">{{ item.location }}</p>
                <span
                  class="text-xs font-primary bg-primary/10 text-primary px-2 py-1 rounded-full"
                >
                  {{ item.stayDuration }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </UCarousel>
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
