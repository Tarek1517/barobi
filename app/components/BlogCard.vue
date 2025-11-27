<script setup>
const props = defineProps({
  blogs: Object,
});

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const averageRating = computed(() => {
  if (!props.blogs?.blog_reviews?.length) return 0;
  const sum = props.blogs.blog_reviews.reduce(
    (acc, review) => acc + review.rating,
    0
  );
  return (sum / props.blogs.blog_reviews.length).toFixed(1);
});

function wordLimit(text, limit = 20) {
  if (!text) return "";
  const words = text.split(" ");
  return words.slice(0, limit).join(" ") + (words.length > limit ? "..." : "");
}

const starRating = computed(() => {
  const rating = averageRating.value;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  let stars = "";
  for (let i = 0; i < fullStars; i++) {
    stars += "★";
  }
  if (hasHalfStar) {
    stars += "½";
  }
  return stars;
});
</script>

<template>
  <div
    class="group bg-tertiary/10 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl border border-primary/10 h-full flex flex-col hover:-translate-y-2"
  >
    <!-- Image Section -->
    <NuxtLink to="/blog/show" class="block relative overflow-hidden">
      <div class="relative overflow-hidden aspect-[4/3]">
        <img
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          :src="blogs?.blog_image_url"
          :alt="blogs?.title"
        />
        <!-- Gradient Overlay -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        ></div>

        <!-- Read time badge -->
        <div
          class="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm transition-transform duration-300 group-hover:scale-105"
        >
          {{ Math.ceil(blogs?.title?.length / 200) || 5 }} min read
        </div>
      </div>
    </NuxtLink>

    <!-- Content Section -->
    <div class="p-6 flex-1 flex flex-col">
      <!-- Meta Info -->
      <div
        class="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-gray-100"
      >
        <!-- Date and Comments -->
        <div class="flex items-center gap-3 text-sm text-gray-600">
          <span
            class="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-full transition-colors duration-300 group-hover:bg-primary/10"
          >
            <Icon name="uil:calendar" class="w-3.5 h-3.5 text-primary" />
            {{ formatDate(blogs?.publish_date) }}
          </span>
          <span
            class="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-full transition-colors duration-300 group-hover:bg-primary/10"
          >
            <Icon name="uil:comment" class="w-3.5 h-3.5 text-primary" />
            {{ blogs?.blog_reviews?.length || 0 }}
          </span>
        </div>

        <!-- Rating -->
        <div
          v-if="blogs?.blog_reviews?.length > 0"
          class="flex items-center gap-1.5 transition-transform duration-300 group-hover:scale-105"
        >
          <span class="text-yellow-400 text-sm font-bold">{{
            starRating
          }}</span>
          <span class="text-xs text-gray-500">({{ averageRating }})</span>
        </div>
      </div>

      <!-- Title -->
      <h3
        class="text-xl lg:text-2xl font-bold text-gray-900 mb-3 font-marcellus line-clamp-2 leading-tight transition-colors duration-300 group-hover:text-primary flex-1"
      >
        <NuxtLink to="/blog/show" class="hover:text-primary">
          {{ blogs?.title }}
        </NuxtLink>
      </h3>

      <!-- Short Description -->
      <p class="text-gray-600 mb-6 leading-relaxed text-sm flex-1">
        {{ wordLimit(blogs?.short_description, 12) }}
      </p>

      <!-- CTA Button -->
      <div class="mt-auto pt-4 border-t border-gray-100">
        <NuxtLink
          to="/blog/show"
          class="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all duration-300 group/btn"
        >
          READ MORE
          <Icon
            name="iconamoon:arrow-right-2"
            class="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
