<script setup lang="ts">
const { $api } = useNuxtApp()

/* =======================
   Async Data
======================= */

const route = useRoute()

const checkIn = computed(() => route.query.checkIn as string || '')
const checkOut = computed(() => route.query.checkOut as string || '')

const apiUrl = computed(() => {
  const params: Record<string, string> = {}
  if (checkIn.value) params.checkIn = checkIn.value
  if (checkOut.value) params.checkOut = checkOut.value
  return `/accommodations${Object.keys(params).length ? '?' + new URLSearchParams(params).toString() : ''}`
})

// watch apiUrl so rooms refetch when query changes
const { data: rooms } = await useAsyncData(
  () => `rooms-${apiUrl.value}`, // key depends on apiUrl
  () => $api(apiUrl.value),
  { watch: [apiUrl] } // <-- important!
)

const { data: category } = await useAsyncData('category', () =>
  $api('/get-room-category')
)

const { data: roomsize } = await useAsyncData('roomsize', () =>
  $api('/get-room-size')
)

type Room = {
  id: number
  title: string
  price: number
  category_id: number
  room_size_id: number
}

const searchQuery = ref('')
const selectedType = ref<number | null>(null)
const selectedSize = ref<number | null>(null)
const sortBy = ref('default')
const showMobileFilters = ref(false)

const minPrice = 0
const maxPrice = 500
const priceRange = ref<[number, number]>([minPrice, maxPrice])

const updatePriceRange = () => {
  if (Number(priceRange.value[0]) > Number(priceRange.value[1])) {
    priceRange.value[0] = priceRange.value[1]
  }
}

const filteredRooms = computed<Room[]>(() => {
  const list: Room[] = rooms.value?.data ?? []
  let filtered = [...list]


  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    filtered = filtered.filter(room =>
      room.title.toLowerCase().includes(q)
    )
  }

  if (selectedType.value !== null) {
    filtered = filtered.filter(
      room => room.category_id === selectedType.value
    )
  }

  if (selectedSize.value !== null) {
    filtered = filtered.filter(
      room => room.room_size_id === selectedSize.value
    )
  }

  filtered = filtered.filter(
    room =>
      room.price >= priceRange.value[0] &&
      room.price <= priceRange.value[1]
  )

  switch (sortBy.value) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'name':
      filtered.sort((a, b) => a.name.localeCompare(b.name))
      break
  }

  return filtered
})

const hasActiveFilters = computed(() =>
  searchQuery.value ||
  selectedType.value !== null ||
  selectedSize.value !== null ||
  priceRange.value[0] !== minPrice ||
  priceRange.value[1] !== maxPrice
)

const selectedCategoryName = computed(() => {
  return category.value?.data?.find((c: any) => c.id === selectedType.value)?.name
})

const selectedSizeName = computed(() => {
  return roomsize.value?.data?.find((s: any) => s.id === selectedSize.value)?.name
})

const toggleType = (id: number) => {
  selectedType.value = selectedType.value === id ? null : id
}

const toggleSize = (id: number) => {
  selectedSize.value = selectedSize.value === id ? null : id
}

const resetPriceRange = () => {
  priceRange.value = [minPrice, maxPrice]
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedType.value = null
  selectedSize.value = null
  priceRange.value = [minPrice, maxPrice]
  sortBy.value = 'default'
  showMobileFilters.value = false
}
</script>

<template>
  <div class="bg-background">
    <section class="relative h-[250px] sm:h-[300px] lg:h-[500px] overflow-hidden group">
      <img src="/images/room-13.jpg"
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        loading="eager" />
      <div class="absolute inset-0 bg-gradient-to-r from-black/30 via-black/40 to-transparent" />

      <div class="container h-full mx-auto px-4 sm:px-6 flex items-center justify-center relative z-10">
        <div class="max-w-5xl space-y-3 sm:space-y-4 text-center">
          <nav class="flex items-center justify-center text-white/90 text-xs sm:text-sm mb-4 sm:mb-6">
            <NuxtLink to="/" class="hover:text-primary transition-colors flex items-center">
              <Icon name="mdi:home-outline" class="mr-1" /> Home
            </NuxtLink>
            <Icon name="iconamoon:arrow-right-2" class="mx-2 sm:mx-3 text-xs opacity-70" />
            <span class="text-white font-medium">Rooms & Suites</span>
          </nav>

          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-3 sm:mb-4 leading-tight">
            Our Luxury <span class="linear-wipe animate-gradient">Rooms & Suites</span>
          </h1>
          <p class="text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl mx-auto">
            Experience unparalleled comfort in our carefully designed accommodations.
          </p>
        </div>
      </div>
    </section>

    <section class="py-8 sm:py-12 lg:py-20 bg-background">
      <div class="container mx-auto px-4 sm:px-6">
        <div class="flex flex-col lg:flex-row gap-8">
          <aside class="w-full lg:w-80 flex-shrink-0">
            <div class="lg:hidden mb-4">
              <button @click="showMobileFilters = !showMobileFilters"
                class="w-full flex items-center justify-between p-4 border border-gray-200 bg-white shadow-sm">
                <span class="font-medium">Filters & Search</span>
                <Icon :name="showMobileFilters ? 'ph:caret-up' : 'ph:caret-down'" class="text-lg" />
              </button>
            </div>

            <div :class="[
              'space-y-8 bg-white p-6 lg:p-0 border border-gray-200 lg:border-none',
              showMobileFilters ? 'block' : 'hidden lg:block',
            ]">
              <div class="p-6">
                <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Icon name="ph:magnifying-glass" /> Search Rooms
                </h3>
                <div class="relative">
                  <input v-model="searchQuery" type="text" placeholder="Search by room name..."
                    class="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300" />
                </div>
              </div>

              <div class="p-6">
                <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Icon name="ph:buildings" /> Room Types
                </h3>
                <div class="space-y-2">
                  <button @click="selectedType = null"
                    :class="['flex items-center gap-3 w-full px-3 py-2 transition-colors text-sm', !selectedType ? 'bg-primary text-white' : 'hover:bg-gray-100']">
                    All Room Types
                  </button>
                  <button v-for="cat in category?.data" :key="cat.id" @click="toggleType(cat.id)"
                    :class="['w-full text-left px-3 py-2 transition-colors flex items-center gap-3', selectedType === cat.id ? 'bg-primary text-white' : 'hover:bg-gray-100']">
                    {{ cat.name }}
                  </button>
                </div>
              </div>

              <div class="p-6">
                <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
                  $ Price Range
                </h3>
                <div class="px-2">
                  <div class="flex justify-between text-sm text-gray-800 mb-2">
                    <span>Min: ${{ priceRange[0] }}</span>
                    <span>Max: ${{ priceRange[1] }}</span>
                  </div>
                  <input type="range" v-model.number="priceRange[0]" :min="minPrice" :max="maxPrice" class="w-full mb-4"
                    @input="updatePriceRange" />
                  <input type="range" v-model.number="priceRange[1]" :min="minPrice" :max="maxPrice" class="w-full"
                    @input="updatePriceRange" />
                </div>
              </div>

              <div class="p-6">
                <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Icon name="mdi:ruler" /> Room Size
                </h3>
                <div class="space-y-2">
                  <button v-for="size in roomsize?.data" :key="size.id" @click="toggleSize(size.id)"
                    :class="['w-full text-left px-3 py-2 transition-colors', selectedSize === size.id ? 'bg-primary text-white' : 'hover:bg-gray-100']">
                    {{ size.name }}
                  </button>
                </div>
              </div>

              <div class="lg:hidden pt-4">
                <button @click="clearFilters" class="w-full px-4 py-3 bg-gray-900 text-white font-medium">
                  Clear All Filters
                </button>
              </div>
            </div>
          </aside>

          <div class="flex-1">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div class="text-sm text-gray-600">
                Showing {{ filteredRooms.length }} rooms
              </div>

              <div class="flex items-center gap-4">
                <select v-model="sortBy" class="p-2 border border-gray-200 bg-white text-sm">
                  <option value="default">Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name A-Z</option>
                </select>
                <button v-if="hasActiveFilters" @click="clearFilters" class="text-sm text-gray-600 hover:text-primary">
                  Clear Filters
                </button>
              </div>
            </div>

            <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 mb-6">
              <span v-if="selectedType"
                class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-2">
                {{ selectedCategoryName }}
                <button @click="selectedType = null">
                  <Icon name="ph:x" />
                </button>
              </span>
              <span v-if="selectedSize"
                class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-2">
                {{ selectedSizeName }}
                <button @click="selectedSize = null">
                  <Icon name="ph:x" />
                </button>
              </span>
            </div>

            <div v-if="filteredRooms.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <RoomCard v-for="room in filteredRooms" :key="room.id" :room="room" />
            </div>

            <div v-else class="py-20 text-center">
              <h3 class="text-xl font-medium text-gray-700">No rooms found</h3>
              <button @click="clearFilters" class="mt-4 px-6 py-2 bg-primary text-white">Clear Filters</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
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
}
</style>