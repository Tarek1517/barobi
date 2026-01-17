<script setup>
// All items organized by category
import { ref, computed } from 'vue';

const { $api } = useNuxtApp();

// Fetch nearby items
const { data: nearbies } = await useAsyncData('nearbies', () => $api('/get-nearby'));

const categories = [
  { id: "explore-dhaka", label: "Explore Dhaka", type: "explore-dhaka" },
  { id: "restaurant", label: "Restaurants", type: "restaurant" },
  { id: "shopping-mall", label: "Shopping Malls", type: "shopping-mall" },
  { id: "exhibition-hall", label: "Exhibition Halls", type: "exhibition-hall" },
];

const activeTab = ref("explore-dhaka");
const searchQuery = ref("");

// Map `activeTab` to API category label
const getCategoryLabelById = (id) => {
  const cat = categories.find(c => c.id === id);
  return cat ? cat.label : id;
}

// Filtered items based on activeTab and searchQuery
const activeItems = computed(() => {
  if (!nearbies?.value?.data) return [];

  const filteredByCategory = nearbies.value.data.filter(
    item => item.category === getCategoryLabelById(activeTab.value)
  );

  if (!searchQuery.value) return filteredByCategory;

  return filteredByCategory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    item.short_description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    item.address.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Current category label
const getCurrentCategoryLabel = () => getCategoryLabelById(activeTab.value);

// Current category type for Nearby2Card
const getCurrentCategoryType = () => {
  const cat = categories.find(c => c.id === activeTab.value);
  return cat ? cat.type : "explore-dhaka";
};
</script>

<template>
  <!-- Hero Banner -->
  <section class="relative h-[400px] lg:h-[500px] overflow-hidden group">
    <img src="/images/about-t2.jpg" alt="Tech products banner"
      class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
      loading="eager" />
    <div class="absolute inset-0 bg-gradient-to-r from-black/30 via-black/40 to-black/25"></div>

    <div class="container h-full mx-auto px-4 flex items-center justify-center relative z-10">
      <div class="max-w-5xl space-y-4 text-center">
        <nav class="flex items-center justify-center text-white/90 text-sm mb-6">
          <NuxtLink to="/" class="hover:text-primary transition-colors duration-300 flex items-center">
            <Icon name="mdi:home-outline" class="mr-1" /> Home
          </NuxtLink>
          <Icon name="iconamoon:arrow-right-2" class="mx-3 text-xs opacity-70" />
          <span class="text-white font-medium">Nearby</span>
        </nav>

        <h1 class="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight">
          Explore <span class="linear-wipe drop-shadow-lg"> Dhaka</span>
        </h1>
        <p class="text-xl text-gray-200 mt-4">
          Discover amazing places and exciting things to do around you
        </p>
      </div>
    </div>
  </section>

  <!-- Tab Navigation -->
  <section class="bg-background shadow-sm">
    <div class="container mx-auto px-4">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6">
        <!-- Tabs -->
        <div class="flex flex-wrap gap-2 rounded-lg p-2">
          <button v-for="category in categories" :key="category.id" @click="activeTab = category.id" :class="[
            'px-6 py-3 rounded-md font-medium transition-all duration-300 flex items-center gap-2',
            activeTab == category.id
              ? 'bg-primary text-white shadow-sm'
              : 'text-gray-600 bg-white hover:text-gray-900',
          ]">
            {{ category.label }}
            <span class="text-xs bg-background text-primary px-2 py-1 rounded-full">
              {{
                nearbies?.data?.filter(item => item.category === category.label).length
              }}
            </span>
          </button>
        </div>

        <!-- Search -->
        <div class="relative w-full sm:w-64">
          <input v-model="searchQuery" type="text" :placeholder="`Search ${getCurrentCategoryLabel().toLowerCase()}...`"
            class="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          <Icon name="mdi:magnify" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
    </div>
  </section>

  <!-- Content Section -->
  <section class="bg-background pt-12 pb-20">
    <div class="container mx-auto flex flex-wrap">
      <div class="w-full rounded-lg px-4">
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900">
            {{ getCurrentCategoryLabel() }}
            <span class="text-gray-500 text-lg">({{ activeItems.length }} results)</span>
          </h2>
          <p class="text-gray-600 mt-2">
            {{
              activeTab === "explore-dhaka"
                ? "Discover historical and cultural landmarks of Dhaka"
                : activeTab === "restaurant"
                  ? "Experience diverse culinary delights in Dhaka"
                  : activeTab === "shopping-mall"
                    ? "Shop at the best malls and retail destinations"
                    : "Host and attend events at premier exhibition venues"
            }}
          </p>
        </div>

        <!-- Items Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-1 gap-8">
          <Nearby2Card v-for="item in activeItems" :key="item.id" :item="item" :type="getCurrentCategoryType()" />
        </div>

        <!-- Empty State -->
        <div v-if="activeItems.length === 0" class="text-center py-16">
          <Icon name="mdi:map-marker-off" class="text-gray-300 text-6xl mx-auto mb-4" />
          <h3 class="text-xl font-semibold text-gray-600 mb-2">
            No {{ getCurrentCategoryLabel().toLowerCase() }} found
          </h3>
          <p class="text-gray-500">
            {{
              searchQuery
                ? "Try adjusting your search criteria"
                : `No ${getCurrentCategoryLabel().toLowerCase()} available at the moment`
            }}
          </p>
        </div>
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
