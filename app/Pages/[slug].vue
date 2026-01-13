<script setup>
// Dinning data

const { $api } = useNuxtApp();
const slug = useRoute().params.slug;
const { data: page } = await useAsyncData('page', () =>
  $api(`/get-page/${slug}`)
);
</script>

<template>
  <!-- Hero Banner -->
  <section class="relative h-[400px] lg:h-[500px] overflow-hidden group">
    <!-- Background -->
    <img src="/images/room-9.jpg" alt="Tech products banner" class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="eager" />
    <!-- Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-r from-black/30 via-black/40 to-black/25"></div>
    <!-- Content -->
    <div class="container h-full mx-auto px-4 flex items-center justify-center relative z-10">
      <div class="max-w-5xl space-y-4">
        <nav class="flex items-center font-secondary justify-center text-white/90 text-sm mb-6">
          <NuxtLink to="/" class="hover:text-primary transition-colors duration-300 flex items-center">
            <Icon name="mdi:home-outline" class="mr-1" /> Home
          </NuxtLink>
          <Icon name="iconamoon:arrow-right-2" class="mx-3 text-xs opacity-70" />
          <span class="text-white font-medium">{{ page?.data?.title }}</span>
        </nav>

        <h1 class="text-5xl md:text-7xl font-primary text-center font-bold text-white leading-tight tracking-tight">
          {{ page?.data?.title }}
        </h1>
      </div>
    </div>
  </section>

  <section class="bg-background py-20">
    <div class="container mx-auto flex flex-wrap lg:py-5">
      <!-- Dinning Section -->
      <div class="w-full rounded-lg px-4 break-words">
        <div v-html="page?.data?.content"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.linear-wipe {
  text-align: center;
  background: linear-gradient(to right,
      #7e1218 20%,
      #cd986c 40%,
      #cd986c 60%,
      #1f2d3e 80%);
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
