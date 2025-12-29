<template>
  <div class="bg-background">
    <!-- Hero Section -->
    <section
      class="relative h-[250px] sm:h-[300px] lg:h-[500px] overflow-hidden group"
    >
      <img
        src="/images/room-13.jpg"
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        loading="eager"
      />
      <div
        class="absolute inset-0 bg-gradient-to-r from-black/30 via-black/40 to-transparent"
      />

      <div
        class="container h-full mx-auto px-4 sm:px-6 flex items-center justify-center relative z-10"
      >
        <div class="max-w-5xl space-y-3 sm:space-y-4 text-center">
          <nav
            class="flex items-center justify-center text-white/90 text-xs sm:text-sm mb-4 sm:mb-6"
          >
            <NuxtLink
              to="/"
              class="hover:text-primary transition-colors flex items-center"
            >
              <Icon name="mdi:home-outline" class="mr-1" /> Home
            </NuxtLink>
            <Icon
              name="iconamoon:arrow-right-2"
              class="mx-2 sm:mx-3 text-xs opacity-70"
            />
            <span class="text-white font-medium">Rooms & Suites</span>
          </nav>

          <h1
            class="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-3 sm:mb-4 leading-tight"
          >
            Our Luxury
            <span class="linear-wipe animate-gradient">Rooms & Suites</span>
          </h1>
          <p
            class="text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl mx-auto"
          >
            Experience unparalleled comfort in our carefully designed
            accommodations. Each space is crafted to provide the perfect blend
            of luxury and homely comfort.
          </p>
        </div>
      </div>
    </section>

    <!-- Rooms Section -->
    <section class="py-8 sm:py-12 lg:py-20 bg-background">
      <div class="container mx-auto px-4 sm:px-6">
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Filters Sidebar -->
          <aside class="w-full lg:w-80 flex-shrink-0">
            <div class="lg:hidden mb-4">
              <button
                @click="showMobileFilters = !showMobileFilters"
                class="w-full flex items-center justify-between p-4 border border-gray-200 bg-white shadow-sm"
              >
                <span class="font-medium">Filters & Search</span>
                <Icon
                  :name="showMobileFilters ? 'ph:caret-up' : 'ph:caret-down'"
                  class="text-lg"
                />
              </button>
            </div>

            <div
              :class="[
                'space-y-8 bg-white p-6 lg:p-0 border border-gray-200 lg:border-none',
                showMobileFilters ? 'block' : 'hidden lg:block',
              ]"
            >
              <!-- Search -->
              <div class="p-6">
                <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Icon name="ph:magnifying-glass" /> Search Rooms
                </h3>
                <div class="relative">
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search by room name..."
                    class="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                  />
                  <Icon
                    name="ph:magnifying-glass"
                    class="absolute right-3 top-3 text-gray-400"
                  />
                </div>
              </div>

              <!-- Room Types -->
              <div class="p-6">
                <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Icon name="ph:buildings" /> Room Types
                </h3>
                <div class="space-y-2">
                  <button
                    @click="clearFilters()"
                    :class="[
                      'flex items-center gap-3 w-full px-3 py-2 transition-colors text-sm sm:text-base',
                      !selectedType
                        ? 'bg-primary text-white font-medium'
                        : 'hover:bg-gray-100 text-gray-700',
                    ]"
                  >
                    <Icon name="ph:grid-four" class="text-lg" />
                    <span>All Room Types</span>
                  </button>
                  <button
                    v-for="category in category?.data"
                    :key="category.id"
                    @click="toggleType(category.id)"
                    :class="[
                      'w-full text-left px-3 py-2 transition-colors flex items-center gap-3',
                      selectedType == category.id
                        ? 'bg-primary text-white font-medium'
                        : 'hover:bg-gray-100 text-gray-700',
                    ]"
                  >
                    <Icon name="ph:bed" class="text-lg" />
                    {{ category.name }}
                  </button>
                </div>
              </div>

              <!-- Price Range -->
              <div class="p-6">
                <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span class="text-base font-extrabold">$</span> Price Range
                </h3>
                <div class="px-2">
                  <div class="flex justify-between text-sm text-gray-800 mb-2">
                    <span>${{ priceRange[0] }}</span>
                    <span>${{ priceRange[1] }}</span>
                  </div>
                  <input
                    type="range"
                    v-model="priceRange[0]"
                    :min="minPrice"
                    :max="maxPrice"
                    class="w-full mb-4"
                    @input="updatePriceRange"
                  />
                  <input
                    type="range"
                    v-model="priceRange[1]"
                    :min="minPrice"
                    :max="maxPrice"
                    class="w-full"
                    @input="updatePriceRange"
                  />
                </div>
              </div>

              <!-- Room Size -->
              <div class="p-6">
                <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Icon name="mdi:ruler" /> Room Size
                </h3>
                <div class="space-y-2">
                  <button
                    v-for="size in roomsize?.data"
                    :key="size.id"
                    @click="toggleSize(size.id)"
                    :class="[
                      'w-full text-left px-3 py-2 transition-colors',
                      selectedSize == size.id
                        ? 'bg-primary text-white font-medium'
                        : 'hover:bg-gray-100 text-gray-700',
                    ]"
                  >
                    <Icon name="mdi:pencil-ruler" class="text-lg" />
                    <span class="px-3">{{ size.name }}</span>
                  </button>
                </div>
              </div>

              <!-- Amenities -->
              <div class="p-6">
                <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Icon name="ph:sparkle" /> Amenities
                </h3>
                <div class="space-y-3">
                  <label
                    v-for="amenity in amenities?.data"
                    :key="amenity.id"
                    class="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      :value="amenity"
                      v-model="selectedAmenities"
                      class="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span class="text-sm text-gray-700">{{ amenity.title}}</span>
                  </label>
                </div>
              </div>

              <div class="lg:hidden pt-4 border-t">
                <button
                  @click="clearFilters"
                  class="w-full px-4 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-colors font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </aside>

          <!-- Main Content -->
          <div class="flex-1">
            <!-- Results Header -->
            <div
              class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
            >
              <div class="text-sm text-gray-600">
                Showing {{ filteredRooms.length }} rooms
                <span v-if="selectedType" class="font-medium text-primary">
                  in {{ selectedType }}
                </span>
                <span v-if="selectedSize" class="font-medium text-primary">
                  in {{ selectedSize }}
                </span>
              </div>

              <div class="flex items-center gap-4">
                <div class="flex items-center gap-2">
                  <span class="text-sm text-gray-600">Sort by:</span>
                  <select
                    v-model="sortBy"
                    class="p-2 border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="default">Recommended</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="size">Room Size</option>
                    <option value="name">Name A-Z</option>
                  </select>
                </div>

                <button
                  v-if="hasActiveFilters"
                  @click="clearFilters"
                  class="hidden lg:flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors border border-gray-200 hover:border-gray-300"
                >
                  <Icon name="ph:x" class="text-base" />
                  Clear Filters
                </button>
              </div>
            </div>

            <!-- Active Filters -->
            <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 mb-6">
              <span
                v-if="selectedType"
                class="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                {{ selectedType }}
                <button @click="selectedType = ''">
                  <Icon name="ph:x" class="text-xs hover:text-primary/70" />
                </button>
              </span>
              <span
                v-if="selectedSize"
                class="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                {{ selectedSize }}
                <button @click="selectedSize = ''">
                  <Icon name="ph:x" class="text-xs hover:text-primary/70" />
                </button>
              </span>
              <span
                v-if="priceRange[0] > minPrice || priceRange[1] < maxPrice"
                class="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                ${{ priceRange[0] }} - ${{ priceRange[1] }}
                <button @click="resetPriceRange">
                  <Icon name="ph:x" class="text-xs hover:text-primary/70" />
                </button>
              </span>
              <span
                v-for="amenity in selectedAmenities"
                :key="amenity"
                class="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                {{ amenity }}
                <button @click="removeAmenity(amenity)">
                  <Icon name="ph:x" class="text-xs hover:text-primary/70" />
                </button>
              </span>
            </div>

            <!-- Rooms Grid -->
            <div
              v-if="filteredRooms.length > 0"
              class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8"
            >
              <RoomCard
                v-for="room in filteredRooms"
                :key="room.id"
                :room="room"
                class="transition-transform hover:scale-[1.02]"
              />
            </div>

            <!-- No Results -->
            <div v-else class="py-20 text-center">
              <div class="max-w-md mx-auto">
                <Icon
                  name="ph:bed"
                  class="text-5xl text-gray-300 mx-auto mb-4"
                />
                <h3 class="text-xl font-medium text-gray-700 mb-2">
                  No rooms found
                </h3>
                <p class="text-gray-500 mb-6">
                  Try adjusting your filters to find more rooms
                </p>
                <button
                  @click="clearFilters"
                  class="px-6 py-3 bg-primary text-white hover:bg-primary/90 transition-colors font-medium"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  
const { $api } = useNuxtApp();

const { data: rooms } = await useAsyncData('rooms', () =>
    $api('/accommodations')
  );


// Reactive state
const searchQuery = ref("");
const selectedType = ref("");
const selectedSize = ref("");
const sortBy = ref("default");
const showMobileFilters = ref(false);
const selectedAmenities = ref([]);

// Constants
const { data: category } = await  useAsyncData('category', () =>
    $api('/get-room-category')
  );

const { data: amenities } = await  useAsyncData('amenities', () =>
    $api('/get-amenities')
  );

  const { data: roomsize } = await  useAsyncData('roomsize', () =>
    $api('/get-room-size')
  );

// Price range
const minPrice = 0;
const maxPrice = 500;
const priceRange = ref([minPrice, maxPrice]);

// Computed properties
const filteredRooms = computed(() => {
  let filtered = [...rooms?.value?.data];

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (room) =>
        room.name.toLowerCase().includes(query) ||
        room.type.toLowerCase().includes(query) ||
        room.short_description.toLowerCase().includes(query)
    );
  }

  // Type filter
  if (selectedType.value) {
    filtered = filtered.filter((room) => room.type === selectedType.value);
  }

  // Size filter
  if (selectedSize.value) {
    filtered = filtered.filter((room) => room.size === selectedSize.value);
  }

  // Price filter
  filtered = filtered.filter(
    (room) =>
      room.price >= priceRange.value[0] && room.price <= priceRange.value[1]
  );

  // Amenities filter
  if (selectedAmenities.value.length > 0) {
    filtered = filtered.filter((room) =>
      selectedAmenities.value.every((amenity) =>
        room.amenities.includes(amenity)
      )
    );
  }

  // Sorting
  const sortOptions = {
    "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price,
    size: (a, b) => parseInt(a.size) - parseInt(b.size),
    name: (a, b) => a.name.localeCompare(b.name),
  };

  if (sortOptions[sortBy.value]) {
    filtered.sort(sortOptions[sortBy.value]);
  }

  return filtered;
});

const hasActiveFilters = computed(() => {
  return (
    selectedType.value !== "" ||
    selectedSize.value !== "" ||
    priceRange.value[0] > minPrice ||
    priceRange.value[1] < maxPrice ||
    selectedAmenities.value.length > 0 ||
    searchQuery.value !== ""
  );
});

// Methods
const toggleType = (type: string) => {
  selectedType.value = selectedType.value === type ? "" : type;
};

const toggleSize = (size: string) => {
  selectedSize.value = selectedSize.value === size ? "" : size;
};

const removeAmenity = (amenity: string) => {
  selectedAmenities.value = selectedAmenities.value.filter(
    (a) => a !== amenity
  );
};

const updatePriceRange = () => {
  if (priceRange.value[0] > priceRange.value[1]) {
    priceRange.value[0] = priceRange.value[1];
  }
  if (priceRange.value[1] < priceRange.value[0]) {
    priceRange.value[1] = priceRange.value[0];
  }
};

const resetPriceRange = () => {
  priceRange.value = [minPrice, maxPrice];
};

const clearFilters = () => {
  searchQuery.value = "";
  selectedType.value = "";
  selectedSize.value = "";
  selectedAmenities.value = [];
  priceRange.value = [minPrice, maxPrice];
  sortBy.value = "default";
  showMobileFilters.value = false;
};
</script>

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
input[type="range"] {
  -webkit-appearance: none;
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  background: #111827;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

input[type="range"]::-moz-range-thumb {
  width: 18px;
  height: 18px;
  background: #111827;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
