<script setup>
// Services data
const services = [
  {
    id: 1,
    name: "Fitness Centre",
    image: "/images/Gym-4.webp",
    price: "Free",
    short_description:
      "Learn step-by-step how to import cars from Japan with minimal hassle and maximum savings.",
  },
  {
    id: 2,
    name: "Garden Coffee Shop",
    image: "/images/caffee-garden.jpg",
    price: "$189",
    short_description:
      "Learn step-by-step how to import cars from Japan with minimal hassle and maximum savings.",
  },
  {
    id: 3,
    name: "Rooftop Café",
    image: "/images/rooftop.jpg",
    price: "Free",
    short_description:
      "Learn step-by-step how to import cars from Japan with minimal hassle and maximum savings.",
  },
  {
    id: 4,
    name: "Private Meeting Room",
    image: "/images/meetingroom.jpg",
    price: "$259",
    short_description:
      "Learn step-by-step how to import cars from Japan with minimal hassle and maximum savings.",
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
            >Services</span
          >
        </div>
        <h2 class="text-4xl font-primary md:text-5xl font-bold text-gray-900 mb-6">
          Around
          <span class="linear-wipe animate-gradient">The Apartment</span>
        </h2>
        <p class="text-xl font-secondary text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Experience unparalleled comfort in our carefully designed rooms and
          apartments. Each space is crafted to provide the perfect blend of
          luxury and homely comfort.
        </p>
      </div>

      <!-- Services Carousel -->
      <UCarousel
        v-slot="{ item: services }"
        :items="services"
        loop
        arrows
        dots
        :autoplay="{ delay: 3000 }"
        class="overflow-visible pb-6"
        :ui="{
          item: 'basis-full sm:basis-2/3 lg:basis-1/2 xl:basis-1/3',
        }"
      >
        <ServiceCard :service="services" />
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
