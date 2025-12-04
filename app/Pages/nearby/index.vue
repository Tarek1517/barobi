<script setup>
// All items organized by category
const allItems = [
  // Explore Dhaka
  {
    id: 1,
    name: "Old Dhaka",
    image: "/images/old-dhaka.jpeg",
    distance: "15min to drive",
    category: "explore-dhaka",
    short_description:
      "Old Dhaka, located on the southern side of the capital, is the historic heart of the city",
    address: "Pink City District, Heritage Zone",
    phone: "+1 (555) 111-2233",
    rating: 4.9,
    hours: "9:00 AM - 6:00 PM",
    tags: ["Shopping", "Historic", "Culture"],
  },
  {
    id: 2,
    name: "Lalbagh Fort",
    image: "/images/lalbagh.jpg",
    distance: "20min to drive",
    category: "explore-dhaka",
    short_description:
      "17th-century Mughal fort complex with historical significance",
    address: "Lalbagh, Old Dhaka",
    phone: "+880 2-9673018",
    rating: 4.7,
    hours: "10:00 AM - 5:00 PM",
    tags: ["Historic", "Fort", "Mughal"],
  },
  {
    id: 3,
    name: "Ahsan Manzil Museum",
    image: "/images/ahsan.jpg",
    distance: "25min to drive",
    category: "explore-dhaka",
    short_description:
      "The Pink Palace, former residential palace of Dhaka Nawab Family",
    address: "Kumartoli, Dhaka 1000",
    phone: "+880 2-7391122",
    rating: 4.6,
    hours: "10:30 AM - 5:30 PM",
    tags: ["Palace", "Historic", "Architecture"],
  },
  // New item 1
  {
    id: 4,
    name: "Dhakeshwari National Temple",
    image: "/images/dhakeshwari.jpg",
    distance: "12min to drive",
    category: "explore-dhaka",
    short_description:
      "Architectural marvel by Louis Kahn, the seat of Bangladesh's Parliament",
    address: "Sher-e-Bangla Nagar, Dhaka",
    phone: "+880 2-8181001",
    rating: 4.8,
    hours: "9:00 AM - 5:00 PM",
    tags: ["Architecture", "Government", "Modern"],
  },
  // New item 2
  {
    id: 5,
    name: "Dhaka University Campus",
    image: "/images/university.jpg",
    distance: "18min to drive",
    category: "explore-dhaka",
    short_description:
      "Historic university campus with beautiful architecture and cultural significance",
    address: "Dhaka University, Shahbag",
    phone: "+880 2-9661900",
    rating: 4.5,
    hours: "Open 24 hours",
    tags: ["Education", "Historic", "Campus"],
  },

  // Restaurants
  {
    id: 4,
    name: "Pizza Roma",
    image: "/images/pizzaroma.jpg",
    distance: "10min to walk",
    category: "restaurant",
    short_description:
      "Authentic Italian pizzeria with wood-fired oven and traditional recipes",
    address: "123 Main Street, Downtown",
    phone: "+1 (555) 123-4567",
    rating: 4.5,
  },
  {
    id: 5,
    name: "Khazana",
    image: "/images/khazana.jpg",
    distance: "10min to ride",
    category: "restaurant",
    short_description:
      "Fine Indian cuisine with modern twist and extensive wine selection",
    address: "456 Oak Avenue, City Center",
    phone: "+1 (555) 234-5678",
    rating: 4.8,
  },
  {
    id: 6,
    name: "Glazed",
    image: "/images/glazed.jpg",
    distance: "30min to walk",
    category: "restaurant",
    short_description: "Artisan donuts and coffee shop with creative flavors",
    address: "789 Maple Road, West End",
    phone: "+1 (555) 345-6789",
    rating: 4.3,
  },
  {
    id: 7,
    name: "Sushi Samurai",
    image: "/images/sushi.jpg",
    distance: "30min to cycle",
    category: "restaurant",
    short_description: "Traditional Japanese sushi bar with master chefs",
    address: "321 Pine Street, East District",
    phone: "+1 (555) 456-7890",
    rating: 4.7,
  },
  {
    id: 8,
    name: "Spit Fire",
    image: "/images/spitfire.png",
    distance: "30min to cycle",
    category: "restaurant",
    short_description: "Mediterranean grill with open flame cooking",
    address: "654 Elm Boulevard, North Side",
    phone: "+1 (555) 567-8901",
    rating: 4.4,
  },
  {
    id: 9,
    name: "Nandos",
    image: "/images/nandos.jpg",
    distance: "30min to cycle",
    category: "restaurant",
    short_description: "Portuguese flame-grilled chicken with peri-peri sauces",
    address: "987 Cedar Lane, South Quarter",
    phone: "+1 (555) 678-9012",
    rating: 4.6,
  },

  // Shopping Malls
  {
    id: 10,
    name: "Unimart",
    image: "/images/unimart.jpeg",
    distance: "8min to walk",
    category: "shopping-mall",
    short_description:
      "24/7 supermarket with fresh produce and household essentials",
    address: "123 Commerce Street, Retail District",
    phone: "+1 (555) 333-4455",
    rating: 4.0,
    hours: "Open 24 hours",
  },
  {
    id: 11,
    name: "Bashundhara City",
    image: "/images/bashundhara.jpg",
    distance: "20min to drive",
    category: "shopping-mall",
    short_description:
      "Largest shopping mall in Dhaka with international brands",
    address: "Panthapath, Dhaka 1205",
    phone: "+880 2-9131001",
    rating: 4.5,
    hours: "10:00 AM - 9:00 PM",
  },
  {
    id: 12,
    name: "Jamuna Future Park",
    image: "/images/jamunaf.jpg",
    distance: "25min to drive",
    category: "shopping-mall",
    short_description: "One of the largest shopping malls in South Asia",
    address: "Progoti Sharani, Baridhara",
    phone: "+880 2-9891288",
    rating: 4.6,
    hours: "10:00 AM - 10:00 PM",
  },

  // Exhibition Halls
  {
    id: 13,
    name: "International Conference Center",
    image: "/images/bangabandhu.jpg",
    distance: "15min to drive",
    category: "exhibition-hall",
    short_description:
      "Premier convention center for international events and exhibitions",
    address: "Sher-e-Bangla Nagar, Dhaka",
    phone: "+880 2-8181001",
    rating: 4.7,
    hours: "9:00 AM - 6:00 PM",
  },
  {
    id: 14,
    name: "International Convention City Bashundhara",
    image: "/images/iccb.jpg",
    distance: "20min to drive",
    category: "exhibition-hall",
    short_description: "State-of-the-art convention and exhibition facility",
    address: "Kuril, Dhaka 1229",
    phone: "+880 2-222260030",
    rating: 4.8,
    hours: "8:00 AM - 10:00 PM",
  },
  {
    id: 15,
    name: "Bangladesh-China Friendship Conference Center",
    image: "/images/china.jpg",
    distance: "18min to drive",
    category: "exhibition-hall",
    short_description: "Modern conference and exhibition venue",
    address: "Agargaon, Dhaka 1207",
    phone: "+880 2-8180044",
    rating: 4.5,
    hours: "9:00 AM - 7:00 PM",
  },
];

// Category configuration
const categories = [
  { id: "explore-dhaka", label: "Explore Dhaka", type: "things-to-do" },
  { id: "restaurant", label: "Restaurants", type: "restaurants" },
  { id: "shopping-mall", label: "Shopping Malls", type: "things-to-do" },
  { id: "exhibition-hall", label: "Exhibition Halls", type: "things-to-do" },
];

// Reactive state
const activeTab = ref("restaurant");
const searchQuery = ref("");

// Computed property to get items for active tab
const activeItems = computed(() => {
  const filtered = allItems.filter((item) => item.category === activeTab.value);

  if (!searchQuery.value) return filtered;

  return filtered.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.short_description
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Get current category label
const getCurrentCategoryLabel = () => {
  const category = categories.find((cat) => cat.id === activeTab.value);
  return category ? category.label : activeTab.value;
};

// Get current category type for Nearby2Card
const getCurrentCategoryType = () => {
  const category = categories.find((cat) => cat.id === activeTab.value);
  return category ? category.type : "things-to-do";
};
</script>

<template>
  <!-- Hero Banner -->
  <section class="relative h-[400px] lg:h-[500px] overflow-hidden group">
    <!-- Background -->
    <img
      src="/images/about-t2.jpg"
      alt="Tech products banner"
      class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
      loading="eager"
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
          <span class="linear-wipe drop-shadow-lg"> Dhaka</span>
        </h1>
        <p class="text-xl text-center text-gray-200 mt-4">
          Discover amazing places and exciting things to do around you
        </p>
      </div>
    </div>
  </section>

  <!-- Tab Navigation -->
  <section class="bg-background shadow-sm">
    <div class="container mx-auto px-4">
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6"
      >
        <!-- Tabs -->
        <div class="flex flex-wrap gap-2 rounded-lg p-2">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="activeTab = category.id"
            :class="[
              'px-6 py-3 rounded-md font-medium transition-all duration-300 flex items-center gap-2',
              activeTab == category.id
                ? 'bg-primary text-white shadow-sm'
                : 'text-gray-600 bg-white hover:text-gray-900',
            ]"
          >
            {{ category.label }}
            <span
              class="text-xs bg-background text-primary px-2 py-1 rounded-full"
            >
              {{
                allItems.filter((item) => item.category === category.id).length
              }}
            </span>
          </button>
        </div>

        <!-- Search -->
        <div class="relative w-full sm:w-64">
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="`Search ${getCurrentCategoryLabel().toLowerCase()}...`"
            class="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Icon
            name="mdi:magnify"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>
    </div>
  </section>

  <!-- Content Section -->

  <section class="bg-background pt-12 pb-20">
    <div class="container mx-auto flex flex-wrap">
      <!-- Main Content -->
      <div class="w-full rounded-lg px-4">
        <!-- Results Count -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900">
            {{ getCurrentCategoryLabel() }}
            <span class="text-gray-500 text-lg"
              >({{ activeItems.length }} results)</span
            >
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
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Nearby2Card
            v-for="item in activeItems"
            :key="item.id"
            :item="item"
            :type="getCurrentCategoryType()"
          />
        </div>

        <!-- Empty State -->
        <div v-if="activeItems.length === 0" class="text-center py-16">
          <Icon
            name="mdi:map-marker-off"
            class="text-gray-300 text-6xl mx-auto mb-4"
          />
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
