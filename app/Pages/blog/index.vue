<script setup>
// ✅ Static data instead of API
const allBlogs = [
  {
    id: 1,
    slug: "first-blog-post",
    title: "First Blog Post Title",
    blog_image_url: "/images/room-1.jpg",
    publish_date: "2025-09-01",
    blog_reviews: [{ rating: 4 }, { rating: 5 }],
    short_description:
      "Discover the latest trends in hospitality and how they're transforming guest experiences worldwide with innovative approaches.",
  },
  {
    id: 2,
    slug: "second-blog-post",
    title: "Second Blog Post Title",
    blog_image_url: "/images/room-3.jpg",
    publish_date: "2025-09-05",
    blog_reviews: [],
    short_description:
      "Explore sustainable tourism practices and eco-friendly hotel management that benefit both guests and the environment.",
  },
  {
    id: 3,
    slug: "third-blog-post",
    title: "Third Blog Post Title",
    blog_image_url: "/images/room-7.jpg",
    publish_date: "2025-09-08",
    blog_reviews: [{ rating: 3 }],
    short_description:
      "Learn about the psychology of comfort and how it influences guest satisfaction and return visits to luxury hotels.",
  },
  {
    id: 4,
    slug: "fourth-blog-post",
    title: "Fourth Blog Post",
    blog_image_url: "/images/room-6.jpg",
    publish_date: "2025-09-12",
    blog_reviews: [{ rating: 5 }, { rating: 4 }],
    short_description:
      "Dive into the future of hotel technology and how it's reshaping the hospitality industry with smart room automation.",
  },
];

const latestBlogs = [
  {
    id: 7,
    slug: "latest-blog-post",
    title: "Latest Blog Post",
    blog_image_url: "/images/room-7.jpg",
    publish_date: "2025-09-10",
    blog_reviews: [{ rating: 5 }, { rating: 5 }, { rating: 4 }],
  },

  {
    id: 5,
    slug: "latest-blog-post",
    title: "Latest Blog Post",
    blog_image_url: "/images/room-8.jpg",
    publish_date: "2025-09-10",
    blog_reviews: [{ rating: 5 }, { rating: 5 }, { rating: 4 }],
  },

  {
    id: 6,
    slug: "latest-blog-post",
    title: "Latest Blog Post",
    blog_image_url: "/images/room-7.jpg",
    publish_date: "2025-09-10",
    blog_reviews: [{ rating: 5 }, { rating: 5 }, { rating: 4 }],
  },
];

const topArticles = [
  {
    id: 8,
    slug: "top-article",
    title: "Top Article Sample",
    blog_image_url: "/images/room-1.jpg",
    publish_date: "2025-08-28",
    blog_reviews: [],
  },
  {
    id: 9,
    slug: "second-top-article",
    title: "Second Top Article",
    blog_image_url: "/images/room-3.jpg",
    publish_date: "2025-08-20",
    blog_reviews: [{ rating: 4 }],
  },
   {
    id: 10,
    slug: "second-top-article",
    title: "Second Top Article",
    blog_image_url: "/images/room-4.jpg",
    publish_date: "2025-08-20",
    blog_reviews: [{ rating: 4 }],
  },
];

// ✅ Utility
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>

<template>
  <!-- Hero Banner -->
  <section class="relative h-[400px] lg:h-[500px] overflow-hidden group">
    <!-- Background -->
    <NuxtImg
      src="/images/banner6.jpg"
      alt="Tech products banner"
      class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
      loading="eager"
      preload
      format="webp"
      quality="80"
    />
    <!-- Gradient Overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-black/25"
    ></div>

    <!-- Content -->
    <div class="container h-full mx-auto px-4 flex items-center relative z-10">
      <div class="max-w-5xl space-y-4">
        <nav class="flex items-center text-white/90 text-sm mb-6">
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
          <span class="text-primary font-medium">Blog</span>
        </nav>

        <h1
          class="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight"
        >
          Our Latest <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-lg"
          >
            News & Blog
          </span>
        </h1>
        <p class="text-xl text-gray-200 mt-4 max-w-lg">
          Discover insights, trends, and stories from our team of experts
        </p>
      </div>
    </div>
  </section>

  <section class="container mx-auto mb-16 py-20">
    <div class="flex flex-wrap lg:py-5">
      <!-- Blog Posts Section -->
      <div class="w-full lg:w-3/4 rounded-lg px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <BlogCard v-for="blogs in allBlogs" :key="blogs.id" :blogs="blogs" />
        </div>
      </div>

      <!-- Sidebar Section -->
      <div class="w-full lg:w-1/4 lg:pb-10">
        <!-- Top Articles -->
        <div
          class="bg-gradient-to-br from-gray-50 to-white p-6 shadow-lg border border-gray-100 mb-8"
        >
          <h2
            class="text-2xl bg-tertiary/15 px-4 py-2 inline-ext-2xl font-bold text-gray-900 mb-2 pb-3 border-b border-gray-200 flex items-center gap-2"
          >
            <Icon name="mdi:fire" class="text-orange-500" />
            Top Articles
          </h2>

          <div
            v-for="blogs in topArticles"
            :key="blogs.id"
            class="w-full my-5 flex items-center gap-4 group/item hover:bg-gray-50 p-3 rounded-xl transition-colors duration-300"
          >
            <div
              class="relative overflow-hidden w-20 h-16 flex-shrink-0"
            >
              <img
                class="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500"
                :src="blogs?.blog_image_url"
                alt="Blog Image"
              />
              <div
                class="absolute inset-0 bg-black/20 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"
              ></div>
            </div>
            <div class="flex-1 min-w-0">
              <p
                class="text-sm font-semibold text-gray-900 leading-tight mb-2 line-clamp-2 group-hover/item:text-primary transition-colors duration-300"
              >
                <NuxtLink :to="`/blog-details/${blogs?.slug}`">
                  {{ blogs?.title }}
                </NuxtLink>
              </p>

              <div class="text-xs text-gray-600 gap-3">
                <span class="flex items-center gap-1">
                  <Icon name="mdi:calendar" class="w-3 h-3" />
                  {{ formatDate(blogs?.publish_date) }}
                </span>
                <span class="flex items-center gap-1">
                  <Icon name="mdi:star" class="w-3 h-3 text-yellow-500" />
                  {{
                    blogs?.blog_reviews.length > 0
                      ? `${blogs?.blog_reviews.length} review${
                          blogs?.blog_reviews.length > 1 ? "s" : ""
                        }`
                      : "No reviews"
                  }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Latest Articles -->
        <div
          class="bg-gradient-to-br from-gray-50 to-white p-6 shadow-lg border border-gray-100"
        >
          <h2
            class="text-2xl bg-tertiary/15 font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200 flex items-center gap-2"
          >
            <Icon name="mdi:clock-outline" class="text-primary" />
            Latest Articles
          </h2>

          <div
            v-for="blogs in latestBlogs"
            :key="blogs.id"
            class="w-full my-5 flex items-center gap-4 group/item hover:bg-gray-50 p-3 rounded-xl transition-colors duration-300"
          >
            <div
              class="relative overflow-hidden w-20 h-16 flex-shrink-0"
            >
              <img
                class="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500"
                :src="blogs?.blog_image_url"
                alt="Blog Image"
              />
              <div
                class="absolute inset-0 bg-black/20 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"
              ></div>
            </div>
            <div class="flex-1 min-w-0">
              <p
                class="text-sm font-semibold text-gray-900 leading-tight mb-2 line-clamp-2 group-hover/item:text-primary transition-colors duration-300"
              >
                <NuxtLink :to="`/blog-details/${blogs?.slug}`">
                  {{ blogs?.title }}
                </NuxtLink>
              </p>

              <div class="text-xs text-gray-600 gap-3">
                <span class="flex items-center gap-1">
                  <Icon name="mdi:calendar" class="w-3 h-3" />
                  {{ formatDate(blogs?.publish_date) }}
                </span>
                <span class="flex items-center gap-1">
                  <Icon name="mdi:star" class="w-3 h-3 text-yellow-500" />
                  {{
                    blogs?.blog_reviews.length > 0
                      ? `${blogs?.blog_reviews.length} review${
                          blogs?.blog_reviews.length > 1 ? "s" : ""
                        }`
                      : "No reviews"
                  }}
                </span>
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
