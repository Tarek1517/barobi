<script setup>
const props = defineProps({
  blogs: Object,
});

</script>

<template>
  <div
    class="group bg-white shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl border border-primary/10 h-full flex flex-col hover:-translate-y-2">
    <!-- Image Section -->
    <NuxtLink :to="`/blog/${blogs?.slug}`" class="block relative overflow-hidden">
      <div class="relative overflow-hidden aspect-[4/3]">
        <img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          :src="blogs?.thumbnail" :alt="blogs?.title" />
        <!-- Gradient Overlay -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        </div>

        <!-- Read time badge -->
        <div
          class="absolute bottom-4 font-secondary right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
          {{ Math.ceil(blogs?.title?.length / 200) || 5 }} min read
        </div>
      </div>
    </NuxtLink>

    <!-- Content Section -->
    <div class="p-6 flex-1 flex flex-col">
      <!-- Meta Info -->
      <div class="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-gray-100">
        <!-- Date and Comments -->
        <div class="flex items-center gap-3 text-sm text-gray-600">
          <span
            class="flex items-center font-primary gap-1.5 bg-background px-2.5 py-1 rounded-full transition-colors duration-300 group-hover:bg-primary/10">
            <Icon name="uil:calendar" class="w-3.5 h-3.5 text-primary" />
            {{ new Date(blogs?.published_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
          </span>
          <span
            class="flex items-center font-primary gap-1.5 bg-background px-2.5 py-1 rounded-full transition-colors duration-300 group-hover:bg-primary/10">
            <Icon name="uil:comment" class="w-3.5 h-3.5 text-primary" />
            {{ blogs?.total_review }}
          </span>
        </div>

        <div class="flex items-center gap-1">
          <template v-for="i in 5" :key="i">
            <Icon v-if="i <= Math.floor(Math.round(blogs?.blog_review * 2) / 2)" name="material-symbols:star-rounded" class="w-4 h-4 text-yellow-400" />
            <Icon v-else-if="i - 0.5 === Math.round(blogs?.blog_review * 2) / 2" name="material-symbols:star-half-rounded" class="w-4 h-4 text-yellow-400" />
            <Icon v-else name="material-symbols:star-outline-rounded" class="w-4 h-4 text-gray-300" />
          </template>
          <span class="text-sm font-bold text-gray-900 ml-1">{{ blogs?.blog_review }}</span>
        </div>
      </div>

      <!-- Title -->
      <h3
        class="text-xl lg:text-2xl font-primary font-bold text-gray-900 mb-3 font-marcellus line-clamp-2 leading-tight transition-colors duration-300 group-hover:text-primary flex-1">
        <NuxtLink :to="`/blog/${blogs?.slug}`" class="hover:text-primary">
          {{ blogs?.title }}
        </NuxtLink>
      </h3>

      <!-- Short Description -->
      <p class="text-gray-600 font-secondary mb-6 leading-relaxed text-sm flex-1">
        {{ blogs?.short_description }}
      </p>

      <!-- CTA Button -->
      <div class="mt-auto pt-4 border-t border-gray-100">
        <NuxtLink to="/blog/show"
          class="inline-flex font-primary items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all duration-300 group/btn">
          READ MORE
          <Icon name="iconamoon:arrow-right-2"
            class="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
