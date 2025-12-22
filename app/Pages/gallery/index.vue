<script setup lang="ts">
const { $api } = useNuxtApp();

const { data: gallery } = await useAsyncData('gallery', () =>
  $api('/get-gallery')
);

const galleryImages = computed(() => gallery.value?.data || []);

const categories = computed(() => {
  const images = galleryImages.value;
  const cats = [
    { id: "all", name: "All Photos", count: images.length }
  ];

  const uniqueCategories = [...new Set(images.map(img => img.category_name))];
  
  uniqueCategories.forEach(catName => {
    cats.push({
      id: catName,
      name: catName,
      count: images.filter(img => img.category_name === catName).length
    });
  });

  return cats;
});

const activeCategory = ref("all");
const selectedImage = ref(null);
const isLightboxOpen = ref(false);
const filteredImages = computed(() => {
  if (activeCategory.value === "all") {
    return galleryImages.value;
  }
  return galleryImages.value.filter(
    (image) => image.category_name === activeCategory.value
  );
});

const openLightbox = (image) => {
  selectedImage.value = image;
  isLightboxOpen.value = true;
  if (process.client) {
    document.body.style.overflow = "hidden";
  }
};

const closeLightbox = () => {
  isLightboxOpen.value = false;
  selectedImage.value = null;
  if (process.client) {
    document.body.style.overflow = "auto";
  }
};

const navigateImage = (direction) => {
  const images = galleryImages.value;
  const currentIndex = images.findIndex((img) => img.id === selectedImage.value.id);
  let newIndex;

  if (direction === "next") {
    newIndex = (currentIndex + 1) % images.length;
  } else {
    newIndex = (currentIndex - 1 + images.length) % images.length;
  }

  selectedImage.value = images[newIndex];
};

const handleKeydown = (event) => {
  if (!isLightboxOpen.value) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") navigateImage("prev");
  if (event.key === "ArrowRight") navigateImage("next");
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <section class="relative h-[400px] lg:h-[500px] overflow-hidden group">
    <img
      src="/images/banner3.jpg"
      alt="Hotel Gallery"
      class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
      loading="eager"
    />
    <div class="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 to-black/40"></div>

    <div class="container h-full mx-auto px-4 flex items-center justify-center relative z-10">
      <div class="max-w-5xl space-y-4 text-center">
        <nav class="flex items-center font-secondary justify-center text-white/90 text-sm mb-6">
          <NuxtLink to="/" class="hover:text-primary transition-colors duration-300 flex items-center">
            <Icon name="mdi:home-outline" class="mr-1" /> Home
          </NuxtLink>
          <Icon name="iconamoon:arrow-right-2" class="mx-3 text-xs opacity-70" />
          <span class="text-white font-medium">Gallery</span>
        </nav>

        <h1 class="text-5xl md:text-7xl font-primary text-center font-bold text-white leading-tight tracking-tight">
          Hotel <span class="linear-wipe drop-shadow-lg"> Gallery </span>
        </h1>
        <p class="text-xl text-center font-secondary text-gray-200 mt-4">
          Explore our luxurious accommodations, amenities, and facilities
        </p>
      </div>
    </div>
  </section>

  <section class="bg-background min-h-[600px]">
    <div class="container mx-auto py-20">
      <div class="flex flex-wrap justify-center gap-4 mb-12">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="activeCategory = category.id"
          :class="[
            'px-6 py-3 font-medium transition-all duration-300 border-2',
            activeCategory == category.id
              ? 'bg-primary font-primary text-white border-primary/35 shadow-lg transform scale-105'
              : 'bg-white font-primary text-primary border-primary/35 hover:shadow-md',
          ]"
        >
          {{ category.name }}
          <span :class="['ml-2 px-2 py-1 rounded-full text-xs', activeCategory == category.id ? 'bg-white/35' : 'bg-gray-200']">
            {{ category.count }}
          </span>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="image in filteredImages"
          :key="image.id"
          class="group relative bg-white overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer"
          @click="openLightbox(image)"
        >
          <div class="aspect-square overflow-hidden">
            <img
              :src="image.image"
              :alt="image.title"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          </div>

          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div class="p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <h3 class="font-bold text-lg mb-1">{{ image.title }}</h3>
              <p class="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                {{ image.short_description }}
              </p>
              <div class="flex items-center mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                <Icon name="mdi:eye" class="mr-2" />
                <span class="text-sm">Click to view</span>
              </div>
            </div>
          </div>

          <div class="absolute top-4 left-4">
            <span class="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 capitalize">
              {{ image.category_name }}
            </span>
          </div>
        </div>
      </div>

      <div v-if="filteredImages.length === 0" class="text-center py-16">
        <Icon name="mdi:image-off" class="text-gray-300 text-6xl mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-gray-600 mb-2">No images found</h3>
      </div>
    </div>
  </section>

  <Teleport to="body">
    <div v-if="isLightboxOpen" class="fixed inset-0 bg-black/95 z-[999] flex items-center justify-center p-4" @click="closeLightbox">
      <button @click="closeLightbox" class="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-[1000]">
        <Icon name="mdi:close" class="text-4xl" />
      </button>

      <button @click.stop="navigateImage('prev')" class="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 rounded-full p-3 z-[1000]">
        <Icon name="mdi:chevron-left" class="text-3xl" />
      </button>

      <button @click.stop="navigateImage('next')" class="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 rounded-full p-3 z-[1000]">
        <Icon name="mdi:chevron-right" class="text-3xl" />
      </button>

      <div class="max-w-6xl w-full flex flex-col items-center" @click.stop>
        <img :src="selectedImage.image" :alt="selectedImage.title" class="max-w-full max-h-[75vh] object-contain shadow-2xl" />
        <div class="text-white text-center mt-6 max-w-2xl px-4">
          <h3 class="text-2xl font-primary font-bold mb-2">{{ selectedImage.title }}</h3>
          <p class="text-gray-300 font-secondary text-lg">{{ selectedImage.short_description }}</p>
          <div class="flex items-center justify-center gap-4 mt-4 text-sm">
            <span class="capitalize px-4 py-1 bg-white/10 rounded-full border border-white/20">
              {{ selectedImage.category_name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.linear-wipe {
  background: linear-gradient(to right, #7e1218 20%, #cd986c 40%, #cd986c 60%, #1f2d3e 80%);
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 3s linear infinite;
}

@keyframes shine {
  to { background-position: 200% center; }
}
</style>