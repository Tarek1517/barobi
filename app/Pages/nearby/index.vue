<script setup>
// Restaurant Data
const restaurants = [
  {
    id: 1,
    name: "Pizza Roma",
    image: "/images/pizzaroma.jpg",
    distance: "10min to walk",
    category: "restaurant",
    short_description: "Authentic Italian pizzeria with wood-fired oven and traditional recipes",
    address: "123 Main Street, Downtown",
    phone: "+1 (555) 123-4567",
    rating: 4.5
  },
  {
    id: 2,
    name: "Khazana",
    image: "/images/khazana.jpg",
    distance: "10min to ride",
    category: "restaurant",
    short_description: "Fine Indian cuisine with modern twist and extensive wine selection",
    address: "456 Oak Avenue, City Center",
    phone: "+1 (555) 234-5678",
    rating: 4.8
  },
  {
    id: 3,
    name: "Glazed",
    image: "/images/glazed.jpg",
    distance: "30min to walk",
    category: "restaurant",
    short_description: "Artisan donuts and coffee shop with creative flavors",
    address: "789 Maple Road, West End",
    phone: "+1 (555) 345-6789",
    rating: 4.3
  },
  {
    id: 4,
    name: "Sushi Samurai",
    image: "/images/sushi.jpg",
    distance: "30min to cycle",
    category: "restaurant",
    short_description: "Traditional Japanese sushi bar with master chefs",
    address: "321 Pine Street, East District",
    phone: "+1 (555) 456-7890",
    rating: 4.7
  },
  {
    id: 5,
    name: "Spit Fire",
    image: "/images/spitfire.png",
    distance: "30min to cycle",
    category: "restaurant",
    short_description: "Mediterranean grill with open flame cooking",
    address: "654 Elm Boulevard, North Side",
    phone: "+1 (555) 567-8901",
    rating: 4.4
  },
  {
    id: 6,
    name: "Nandos",
    image: "/images/nandos.jpg",
    distance: "30min to cycle",
    category: "restaurant",
    short_description: "Portuguese flame-grilled chicken with peri-peri sauces",
    address: "987 Cedar Lane, South Quarter",
    phone: "+1 (555) 678-9012",
    rating: 4.6
  }
];

// Things to Do Data
const thingsToDo = [
  {
    id: 1,
    name: "Pink City Shopping Center",
    image: "/images/pinkcity.jpeg",
    distance: "15min to drive",
    category: "things-to-do",
    short_description: "Historic district with vibrant pink architecture and cultural heritage sites",
    address: "Pink City District, Heritage Zone",
    phone: "+1 (555) 111-2233",
    rating: 4.9,
    hours: "9:00 AM - 6:00 PM"
  },
  
  {
    id: 3,
    name: "Unimart",
    image: "/images/unimart.jpeg",
    distance: "8min to walk",
    category: "things-to-do",
    short_description: "24/7 supermarket with fresh produce and household essentials",
    address: "123 Commerce Street, Retail District",
    phone: "+1 (555) 333-4455",
    rating: 4.0,
    hours: "Open 24 hours"
  },
  
];

// Reactive state
const activeTab = ref('restaurants');
const searchQuery = ref('');

// Computed properties
const filteredRestaurants = computed(() => {
  if (!searchQuery.value) return restaurants;
  return restaurants.filter(restaurant => 
    restaurant.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    restaurant.short_description.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const filteredThingsToDo = computed(() => {
  if (!searchQuery.value) return thingsToDo;
  return thingsToDo.filter(thing => 
    thing.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    thing.short_description.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const activeItems = computed(() => {
  return activeTab.value === 'restaurants' ? filteredRestaurants.value : filteredThingsToDo.value;
});
</script>

<template>
  <!-- Hero Banner -->
  <section class="relative h-[400px] lg:h-[500px] overflow-hidden group">
    <!-- Background -->
    <NuxtImg
      src="/images/about-t2.jpg"
      alt="Tech products banner"
      class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
      loading="eager"
      preload
      format="webp"
      quality="80"
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
          class="flex items-center justify-center text-white/90 text-sm mb-6"
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
          <span class="text-white font-medium">Nearby</span>
        </nav>

        <h1
          class="text-5xl md:text-7xl text-center font-bold text-white leading-tight tracking-tight"
        >
          Explore 
          <span class="linear-wipe drop-shadow-lg"> Nearby </span>
        </h1>
        <p class="text-xl text-center text-gray-200 mt-4">
          Discover amazing restaurants and exciting things to do around you
        </p>
      </div>
    </div>
  </section>

  <!-- Tab Navigation -->
  <section class="bg-white border-b border-gray-200 shadow-sm">
    <div class="container mx-auto px-4">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6">
        <!-- Tabs -->
        <div class="flex space-x-1 bg-gray-100 rounded-lg p-1 w-fit">
          <button
            @click="activeTab = 'restaurants'"
            :class="[
              'px-6 py-3 rounded-md font-medium transition-all duration-300',
              activeTab == 'restaurants'
                ? 'bg-primary text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            ]"
          >
            Restaurants
          </button>
          <button
            @click="activeTab = 'things-to-do'"
            :class="[
              'px-6 py-3 rounded-md font-medium transition-all duration-300',
              activeTab == 'things-to-do'
                ? 'bg-primary text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            ]"
          >
            Things to Do
          </button>
        </div>

        <!-- Search -->
        <div class="relative w-full sm:w-64">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search nearby places..."
            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
          <Icon
            name="mdi:magnify"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>
    </div>
  </section>

  <!-- Content Section -->
  <section class="container mx-auto mb-16 py-12">
    <div class="flex flex-wrap">
      <!-- Main Content -->
      <div class="w-full rounded-lg px-4">
        <!-- Results Count -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900">
            {{ activeTab === 'restaurants' ? 'Restaurants' : 'Things to Do' }}
            <span class="text-gray-500 text-lg">({{ activeItems.length }} results)</span>
          </h2>
          <p class="text-gray-600 mt-2">
            {{ activeTab === 'restaurants' 
              ? 'Discover amazing dining experiences around you' 
              : 'Explore exciting activities and attractions nearby' 
            }}
          </p>
        </div>

        <!-- Items Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Nearby2Card
            v-for="item in activeItems"
            :key="item.id"
            :item="item"
            :type="activeTab"
          />
        </div>

        <!-- Empty State -->
        <div
          v-if="activeItems.length === 0"
          class="text-center py-16"
        >
          <Icon
            name="mdi:map-marker-off"
            class="text-gray-300 text-6xl mx-auto mb-4"
          />
          <h3 class="text-xl font-semibold text-gray-600 mb-2">
            No {{ activeTab === 'restaurants' ? 'restaurants' : 'things to do' }} found
          </h3>
          <p class="text-gray-500">
            Try adjusting your search criteria or browse all {{ activeTab === 'restaurants' ? 'restaurants' : 'activities' }}
          </p>
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
</style>