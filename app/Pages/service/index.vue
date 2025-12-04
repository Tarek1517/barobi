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
  <!-- Hero Banner -->
  <section class="relative h-[400px] lg:h-[500px] overflow-hidden group">
    <!-- Background -->
    <img
      src="/images/banner3.jpg"
      alt="Tech products banner"
      class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
      loading="eager"
    />
    <!-- Gradient Overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-r from-black/30 via-black/40 to-black/25"
    ></div>

    <!-- Content -->
    <div
      class="container h-full mx-auto px-4 flex items-center justify-center relative z-10"
    >
      <div class="max-w-5xl space-y-4">
        <nav
          class="flex items-center font-secondary justify-center text-white/90 text-sm mb-6"
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
          <span class="text-white font-medium">Facilities</span>
        </nav>

        <h1
          class="text-5xl md:text-7xl font-primary text-center font-bold text-white leading-tight tracking-tight"
        >
          Our
          <span class="linear-wipe drop-shadow-lg"> Facilities </span>
        </h1>
        <p class="text-xl font-secondary text-center text-gray-200 mt-4">
          Discover insights, trends, and stories from our team of experts
        </p>
      </div>
    </div>
  </section>

  <section class="bg-background py-20">
    <div class="container mx-auto flex flex-wrap lg:py-5">
      <!-- Blog Posts Section -->
      <div class="w-full rounded-lg px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            v-for="service in services"
            :key="service.id"
            :service="service"
          />
        </div>
      </div>
    </div>
  </section>
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
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
