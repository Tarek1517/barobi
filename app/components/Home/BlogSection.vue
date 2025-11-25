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
      "Discover the latest trends in hospitality and how they're transforming guest experiences worldwide.",
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
</script>

<template>
  <section
    class="py-16 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
  >
    <div class="container mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <div
          class="inline-flex items-center gap-3 bg-primary/10 px-4 py-2 mb-4"
        >
          <div class="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span
            class="text-primary font-semibold text-sm uppercase tracking-wide"
            >Blogs</span
          >
        </div>
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Our Latest
          <span class="linear-wipe animate-gradient"> News & Blogs</span>
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Discover why our guests keep coming back. Read about their experiences
          and see how we've made their stays unforgettable.
        </p>
      </div>

      <UCarousel
        v-slot="{ item }"
        :items="allBlogs"
        loop
        arrows
        dots
        :autoplay="{ delay: 3000 }"
        class="overflow-visible pb-6"
        :ui="{
          item: 'basis-full sm:basis-2/3 lg:basis-1/2 xl:basis-1/3',
        }"
      >
        <BlogCard :blogs="item" class="mb-5"/>
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
