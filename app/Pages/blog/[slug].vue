<script setup lang="ts">
// ✅ Static Blog Details

import type { Blog } from '~/types';

type SingleBlogApiResponse = {
  data: Blog;
}
const { data: blog } = useAPI<SingleBlogApiResponse>(`/blogs/${useRoute().params?.slug}`);


// ✅ Static Latest Blogs
const latestBlogs = [
  {
    id: 2,
    slug: "ui-ux-tips",
    title: "UI/UX Tips for Beginners in 2025",
    blog_image_url: "/images/room-6.jpg",
    publish_date: "2025-09-13",
    blog_reviews: [{ rating: 4 }, { rating: 5 }],
    read_time: "4 min",
  },
  {
    id: 3,
    slug: "responsive-design",
    title: "Advanced Responsive Design Patterns",
    blog_image_url: "/images/room-7.jpg",
    publish_date: "2025-09-05",
    blog_reviews: [],
    read_time: "6 min",
  },
];

// ✅ Static Top Articles
const topArticles = [
  {
    id: 4,
    slug: "web-design-trends",
    title: "Web Design Trends That Will Dominate 2025",
    blog_image_url: "/images/room-1.jpg",
    publish_date: "2025-09-01",
    blog_reviews: [{ rating: 5 }],
    read_time: "8 min",
  },
  {
    id: 5,
    slug: "color-theory",
    title: "Modern Color Theory for Digital Products",
    blog_image_url: "/images/room-2.jpg",
    publish_date: "2025-08-28",
    blog_reviews: [{ rating: 4 }, { rating: 5 }],
    read_time: "5 min",
  },
];

// ✅ Reviews form state
import { ref, computed } from "vue";
const rating = ref(0);
const review = ref({
  rating: 0,
  reviewMassage: "",
  name: "",
  email: "",
  blog_id: blog?.value?.id,
});

// ✅ Hover state for star rating
const hoverRating = ref(0);

// ✅ Submit handler (static simulation)
const onSubmit = () => {
  if (
    !review.value.name ||
    !review.value.email ||
    !review.value.reviewMassage ||
    rating.value === 0
  ) {
    alert("Please fill in all fields and provide a rating!");
    return;
  }
  alert("Review submitted successfully! (Simulated)");
  review.value = {
    rating: 0,
    reviewMassage: "",
    name: "",
    email: "",
    blog_id: blog?.value?.id,
  };
  rating.value = 0;
  hoverRating.value = 0;
};


// ✅ Date formatting
const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// ✅ Format relative time
const formatRelativeTime = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
  return formatDate(dateStr);
};
</script>

<template>
  <!-- Enhanced Banner -->
  <section class="mb-16">
    <div class="relative h-[400px] lg:h-[500px] overflow-hidden">
      <div class="absolute inset-0">
        <img :src="blog?.data?.thumbnail" alt="Blog Image" class="w-full h-full object-cover transform scale-105" />
        <div class="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-transparent"></div>
      </div>

      <div class="absolute inset-0 flex items-center justify-start">
        <div class="text-white container mx-auto">
          <!-- Category Badge -->
          <div class="flex items-center gap-3 mb-6">
            <span class="bg-primary/90 text-white px-4 py-2 text-sm font-medium backdrop-blur-sm">
              UI/UX Design
            </span>
            <span class="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 text-sm">
              <Icon name="mdi:clock-outline" class="w-4 h-4" />
              8 min read
            </span>
          </div>

          <h1 class="text-4xl lg:text-5xl font-bold mb-6 leading-tight tracking-tight">
            {{ blog?.data?.title }}
          </h1>
          <p class="text-lg text-gray-200 mb-8 leading-relaxed max-w-3xl">
            {{ blog?.data?.short_description }}
          </p>

          <!-- Author & Meta Info -->
          <div class="flex items-center gap-6 flex-wrap">
            <div class="h-6 w-px bg-white/30"></div>
            <div class="flex items-center gap-4 text-sm">
              <template v-for="i in 5" :key="i">
                <Icon v-if="i <= Math.floor(Math.round(blog?.data?.blog_review * 2) / 2)"
                  name="material-symbols:star-rounded" class="w-4 h-4 text-yellow-400" />
                <Icon v-else-if="i - 0.5 === Math.round(blog?.data?.blog_review * 2) / 2"
                  name="material-symbols:star-half-rounded" class="w-4 h-4 text-yellow-400" />
                <Icon v-else name="material-symbols:star-outline-rounded" class="w-4 h-4 text-gray-300" />
              </template>
              <span class="text-sm font-bold text-gray-900 ml-1">{{ blog?.data?.blog_review }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div class="animate-bounce">
          <Icon name="mdi:chevron-double-down" class="w-6 h-6 text-white/80" />
        </div>
      </div>
    </div>
  </section>

  <!-- Main Content -->
  <section class="mb-20">
    <div class="container mx-auto">
      <div class="flex flex-col lg:flex-row gap-12">
        <!-- Main Blog Content -->
        <div class="w-full lg:w-2/3">
          <article class="bg-primary/10 shadow-2xl p-8 lg:p-12">
            <!-- Content -->
            <div v-html="blog?.data?.content" class="prose prose-lg max-w-none mb-12"></div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-3 mb-12 pt-8 border-t border-gray-100">
              <span
                class="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer">
                #UI Design
              </span>
              <span
                class="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer">
                #Web Trends
              </span>
              <span
                class="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer">
                #2025
              </span>
              <span
                class="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer">
                #Accessibility
              </span>
            </div>

            <!-- Reviews Section -->
            <div class="border-t border-gray-200 pt-12">
              <div class="flex items-center justify-between mb-8">
                <h3 class="text-2xl lg:text-3xl font-bold text-gray-900">
                  Community Reviews
                </h3>
                <div
                  class="flex items-center gap-3 bg-gradient-to-r from-primary/10 to-purple-100 px-4 py-2 rounded-full">
                  <Icon name="mdi:star" class="w-5 h-5 text-yellow-500" />
                  <span class="font-semibold text-gray-900">{{ blog?.data?.blog_review }} out of 5</span>
                  <span class="text-gray-600">({{ blog?.data?.blog_review }} reviews)</span>
                </div>
              </div>

              <div v-if="blog?.data?.blog_review > 0" class="space-y-6">
                <div v-for="rev in blog?.data?.blog_review" :key="rev.id"
                  class="bg-gradient-to-br from-gray-50 to-white p-6 border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-300">
                  <div class="flex items-start gap-4 mb-4">
                    <img :src="rev.avatar" :alt="rev.name"
                      class="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-sm" />
                    <div class="flex-1">
                      <div class="flex items-center gap-3 mb-1">
                        <p class="font-semibold text-gray-900 text-lg">
                          {{ rev.name }}
                        </p>
                        <span class="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                          {{ rev.role }}
                        </span>
                      </div>
                      <p class="text-sm text-gray-500 flex items-center gap-2">
                        <Icon name="mdi:clock-outline" class="w-4 h-4" />
                        {{ formatRelativeTime(rev.created_at) }}
                      </p>
                    </div>
                  </div>
                  <div class="flex gap-1 mb-4">
                    <span v-for="star in 5" :key="star" class="text-xl transition-transform hover:scale-110" :class="rev.rating >= star ? 'text-yellow-500' : 'text-gray-300'
                      ">
                      ★
                    </span>
                  </div>
                  <p class="text-gray-700 leading-relaxed text-lg">
                    {{ rev.reviewMassage }}
                  </p>
                </div>
              </div>

              <div v-else class="text-center py-12">
                <div
                  class="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="mdi:comment-outline" class="w-10 h-10 text-gray-400" />
                </div>
                <p class="text-gray-500 text-lg">
                  No reviews yet. Be the first to share your thoughts!
                </p>
              </div>
            </div>

            <!-- Submit Review Form -->
            <div class="border-t border-gray-200 pt-12 mt-12">
              <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
                Share Your Thoughts
              </h3>

              <div class="space-y-8">
                <!-- Rating -->
                <div>
                  <label class="block text-lg font-semibold text-gray-900 mb-4">
                    How would you rate this article?
                  </label>
                  <div class="flex gap-1">
                    <button v-for="star in 5" :key="star" @click="rating = star" @mouseenter="hoverRating = star"
                      @mouseleave="hoverRating = 0"
                      class="text-3xl focus:outline-none transition-all duration-200 transform hover:scale-125" :class="[
                        (hoverRating || rating) >= star
                          ? 'text-yellow-500'
                          : 'text-gray-500',
                        (hoverRating || rating) >= star ? 'animate-pulse' : '',
                      ]">
                      ★
                    </button>
                  </div>
                  <p class="text-sm text-gray-500 mt-2">
                    {{ rating }}/5 stars selected
                  </p>
                </div>

                <!-- Review Text -->
                <div>
                  <label class="block text-lg font-semibold text-gray-900 mb-4">
                    Your Review
                  </label>
                  <textarea v-model="review.reviewMassage" rows="5"
                    class="w-full p-6 border-2 bg-white border-gray-200 focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 resize-none"
                    placeholder="What did you think about this article? Share your insights and experiences..."></textarea>
                </div>

                <!-- Personal Info -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-lg font-semibold text-gray-900 mb-4">
                      Your Name
                    </label>
                    <input v-model="review.name" type="text"
                      class="w-full p-4 bg-white border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                      placeholder="Enter your name" />
                  </div>
                  <div>
                    <label class="block text-lg font-semibold text-gray-900 mb-4">
                      Email Address
                    </label>
                    <input v-model="review.email" type="email"
                      class="w-full p-4 bg-white border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                      placeholder="your.email@example.com" />
                  </div>
                </div>

                <!-- Submit Button -->
                <button @click="onSubmit"
                  class="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold text-lg px-8 py-4 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                  :class="rating === 0
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:shadow-2xl'
                    " :disabled="rating === 0">
                  <Icon name="mdi:send" class="w-5 h-5" />
                  Submit Review
                </button>
              </div>
            </div>
          </article>
        </div>

        <!-- Sidebar -->
        <div class="w-full lg:w-1/3 space-y-8">
          <!-- Top Articles -->
          <div class="bg-white shadow-2xl p-6 top-6">
            <h3 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div class="w-2 h-8 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
              <span>Trending Articles</span>
            </h3>
            <div class="space-y-5">
              <div v-for="blog in topArticles" :key="blog.id"
                class="group hover:bg-gradient-to-r hover:from-gray-50 hover:to-white p-4 rounded-2xl transition-all duration-300 border border-transparent hover:border-gray-200">
                <NuxtLink :to="`/blog-details/${blog.slug}`" class="flex gap-4">
                  <img :src="blog.blog_image_url"
                    class="w-20 h-20 object-cover flex-shrink-0 shadow-sm group-hover:shadow-md transition-all" />
                  <div class="flex-1 min-w-0">
                    <h4
                      class="font-semibold text-gray-900 group-hover:text-primary line-clamp-2 transition-colors mb-2">
                      {{ blog.title }}
                    </h4>
                    <div class="flex items-center gap-3 text-xs text-gray-500">
                      <span class="flex items-center gap-1">
                        <Icon name="mdi:calendar" class="w-3 h-3" />
                        {{ formatRelativeTime(blog.publish_date) }}
                      </span>
                      <span class="flex items-center gap-1">
                        <Icon name="mdi:clock-outline" class="w-3 h-3" />
                        {{ blog.read_time }}
                      </span>
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Latest Articles -->
          <div class="bg-white shadow-2xl p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div class="w-2 h-8 bg-gradient-to-b from-tertiary to-secondary rounded-full"></div>
              <span>Latest Updates</span>
            </h3>
            <div class="space-y-5">
              <div v-for="blog in latestBlogs" :key="blog.id"
                class="group hover:bg-gradient-to-r hover:from-gray-50 hover:to-white p-4 rounded-2xl transition-all duration-300 border border-transparent hover:border-gray-200">
                <NuxtLink :to="`/blog-details/${blog.slug}`" class="flex gap-4">
                  <img :src="blog.blog_image_url"
                    class="w-20 h-20 object-cover flex-shrink-0 shadow-sm group-hover:shadow-md transition-all" />
                  <div class="flex-1 min-w-0">
                    <h4
                      class="font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2 transition-colors mb-2">
                      {{ blog.title }}
                    </h4>
                    <div class="flex items-center gap-3 text-xs text-gray-500">
                      <span class="flex items-center gap-1">
                        <Icon name="mdi:calendar" class="w-3 h-3" />
                        {{ formatRelativeTime(blog.publish_date) }}
                      </span>
                      <span class="flex items-center gap-1">
                        <Icon name="mdi:clock-outline" class="w-3 h-3" />
                        {{ blog.read_time }}
                      </span>
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Newsletter -->
          <div class="bg-gradient-to-br from-primary to-secondary p-6 text-white">
            <div class="text-center">
              <Icon name="mdi:email-newsletter" class="w-12 h-12 mx-auto mb-4 text-white/90" />
              <h3 class="text-xl font-bold mb-2">Stay Updated</h3>
              <p class="text-white/80 mb-4">
                Get the latest articles and design insights delivered to your
                inbox.
              </p>
              <div class="space-y-3">
                <input type="email" placeholder="Enter your email"
                  class="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all" />
                <button class="w-full bg-white text-primary font-semibold py-3 hover:bg-gray-100 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
