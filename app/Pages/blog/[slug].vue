<script setup lang="ts">
import { ref, computed } from "vue";
import type { Blog } from '~/types';

type SingleBlogApiResponse = {
  data: Blog;
}

const route = useRoute();
const { data: blog, pending, error } = useAPI<SingleBlogApiResponse>(`/blogs/${route.params.slug}`);

const blogData = computed(() => blog.value?.data);

const latestBlogs = computed(() => blog.value?.data?.latest_blogs);

const trendingBlogs = computed(() => blog.value?.data?.trending_blogs);

const rating = ref(0);
const hoverRating = ref(0);
const review = ref({
  message: "",
  name: "",
  email: "",
});
const { $api } = useNuxtApp()
const loading = ref(false);

const onSubmit = async () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    !review.value.name ||
    !review.value.email ||
    !review.value.message ||
    rating.value === 0
  ) {
    alert("Please fill in all fields and provide a rating!");
    return;
  }

  if (!emailRegex.test(review.value.email)) {
    alert("Please enter a valid email address!");
    return;
  }

  const payload = {
    name: review.value.name,
    email: review.value.email,
    message: review.value.message,
    rating: rating.value,
    blog_id: blogData.value?.id,
  };

  try {
    loading.value = true;

    await $api('/review', {
      method: 'POST',
      body: payload,
    });

    alert("Review submitted successfully! Your review will be visible after approval.");

    review.value = {
      name: '',
      email: '',
      message: '',
    };
    rating.value = 0;
  } catch (error: any) {
    console.error(error);
    alert(error?.data?.message || 'Failed to submit review');
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatRelativeTime = (dateStr: string) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return formatDate(dateStr);
};
</script>

<template>
  <div v-if="pending" class="min-h-screen flex items-center justify-center">
    <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
  </div>

  <div v-else-if="error" class="container mx-auto py-20 text-center">
    <h2 class="text-2xl font-bold text-red-500">Error loading blog post.</h2>
    <NuxtLink to="/blogs" class="text-primary underline mt-4 block">Back to Blogs</NuxtLink>
  </div>

  <div v-else-if="blogData">
    <section class="mb-16">
      <div class="relative h-[400px] lg:h-[500px] overflow-hidden">
        <div class="absolute inset-0">
          <img :src="blogData.thumbnail" :alt="blogData.title" class="w-full h-full object-cover transform scale-105" />
          <div class="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-transparent"></div>
        </div>

        <div class="absolute inset-0 flex items-center justify-start">
          <div class="text-white container mx-auto px-4">
            <div class="flex items-center gap-3 mb-6">
              <span class="bg-primary/90 text-white px-4 py-2 text-sm font-medium backdrop-blur-sm">
                {{ blogData.category }}
              </span>
              <span class="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 text-sm">
                <Icon name="mdi:clock-outline" class="w-4 h-4" />
                {{ Math.ceil(blogData?.title?.length / 200) || 5 }} min read
              </span>
              <div class="flex items-center gap-1">
          <template v-for="i in 5" :key="i">
            <Icon v-if="i <= Math.floor(Math.round(blogData?.blog_review * 2) / 2)" name="material-symbols:star-rounded" class="w-4 h-4 text-yellow-400" />
            <Icon v-else-if="i - 0.5 === Math.round(blogData?.blog_review * 2) / 2" name="material-symbols:star-half-rounded" class="w-4 h-4 text-yellow-400" />
            <Icon v-else name="material-symbols:star-outline-rounded" class="w-4 h-4 text-gray-300" />
          </template>
          <span class="text-sm font-bold text-white ml-1">({{ blogData?.blog_review }})</span>
        </div>
            </div>

            <h1 class="text-4xl lg:text-5xl font-bold mb-6 leading-tight tracking-tight max-w-4xl">
              {{ blogData.title }}
            </h1>
            <p class="text-lg text-gray-200 mb-8 leading-relaxed max-w-3xl">
              {{ blogData.short_description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="mb-20">
      <div class="container mx-auto px-4">
        <div class="flex flex-col lg:flex-row gap-12">
          <div class="w-full lg:w-2/3">
            <article class="bg-white shadow-sm border border-gray-100 p-8 lg:p-12">
              <div v-html="blogData.content" class="prose break-words overflow-hidden prose-lg max-w-none mb-12"></div>

              <div class="border-t border-gray-200 pt-12">
                <h3 class="text-2xl font-bold text-gray-900 mb-8">Community Reviews</h3>
                
                <div v-if="blogData.reviews?.length" class="space-y-6">
                 <div
  v-for="rev in blogData.reviews"
  :key="rev.id"
  class="bg-gray-50 p-6 border border-gray-200"
>
  <!-- Header -->
  <div class="flex items-center justify-between mb-3">
    <div>
      <p class="font-bold text-gray-900">{{ rev.name }}</p>
      <p class="text-xs text-gray-500">
        {{ formatRelativeTime(rev.created_at) }}
      </p>
    </div>

    <!-- ⭐ Rating -->
    <div class="flex items-center gap-1">
      <span
        v-for="star in 5"
        :key="star"
        class="text-lg"
        :class="star <= rev.rating ? 'text-yellow-400' : 'text-gray-300'"
      >
        ★
      </span>
    </div>
  </div>

  <!-- Message -->
  <p class="text-gray-700 leading-relaxed">
    {{ rev.message }}
  </p>
</div>

                </div>

                <div v-else class="text-center py-12 bg-gray-50 rounded-xl">
                  <Icon name="mdi:comment-outline" class="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <p class="text-gray-500">No reviews yet. Be the first to share!</p>
                </div>
              </div>

              <div class="border-t border-gray-200 pt-12 mt-12">
                <h3 class="text-2xl font-bold mb-8">Leave a Rating</h3>
                <div class="flex gap-2 mb-6">
                  <button v-for="star in 5" :key="star" 
                    @click="rating = star" 
                    @mouseenter="hoverRating = star"
                    @mouseleave="hoverRating = 0"
                    class="text-3xl transition-colors"
                    :class="(hoverRating || rating) >= star ? 'text-yellow-500' : 'text-gray-300'">
                    ★
                  </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <input v-model="review.name" type="text" placeholder="Name" class="w-full p-4 border border-gray-200 focus:border-primary outline-none" />
                  <input v-model="review.email" type="email" placeholder="Email" class="w-full p-4 border border-gray-200 focus:border-primary outline-none" />
                </div>
                <textarea v-model="review.message" rows="4" placeholder="Your review..." class="w-full p-4 border border-gray-200 focus:border-primary outline-none mb-6"></textarea>
                
                <button @click="onSubmit" class="bg-primary text-white px-8 py-4 font-bold hover:bg-primary-dark transition-all">
                  Submit Review
                </button>
              </div>
            </article>
          </div>

          <div class="w-full lg:w-1/3 space-y-8">
            <div class="bg-white border border-gray-100 p-6">
              <h3 class="text-xl font-bold mb-6 border-l-4 border-primary pl-4">Trending</h3>
              <div class="space-y-6">
                <NuxtLink v-for="item in trendingBlogs" :key="item.id" :to="`/blog/${item.slug}`" class="flex gap-4 group">
                  <img :src="item.thumbnail" class="w-20 h-20 object-cover rounded shadow-sm" />
                  <div class="flex-1">
                    <h4 class="font-bold group-hover:text-primary transition-colors line-clamp-2">{{ item.title }}</h4>
                    <p class="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <Icon name="mdi:clock-outline" class="w-4 h-4" /> 
                      {{ Math.ceil(item?.title?.length / 200) || 5 }} min read
                    </p>
                  </div>
                </NuxtLink>
              </div>
            </div>

             <div class="bg-white border border-gray-100 p-6">
              <h3 class="text-xl font-bold mb-6 border-l-4 border-primary pl-4">Latest Blogs</h3>
              <div class="space-y-6">
                <NuxtLink v-for="item in latestBlogs" :key="item.id" :to="`/blog/${item.slug}`" class="flex gap-4 group">
                  <img :src="item.thumbnail" class="w-20 h-20 object-cover rounded shadow-sm" />
                  <div class="flex-1">
                    <h4 class="font-bold group-hover:text-primary transition-colors line-clamp-2">{{ item.title }}</h4>
                    <p class="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <Icon name="mdi:clock-outline" class="w-4 h-4" />
                      {{ Math.ceil(item?.title?.length / 200) || 5 }} min read
                    </p>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>