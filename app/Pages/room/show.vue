<template>
  <div>
    <!-- Breadcrumb -->
    <section class="bg-white border-b border-gray-200 py-4">
      <div class="container mx-auto">
        <nav class="flex items-center space-x-2 text-sm text-gray-600">
          <NuxtLink to="/" class="hover:text-primary transition-colors"
            >Home</NuxtLink
          >
          <Icon name="ph:caret-right" class="text-gray-400" />
          <NuxtLink to="/rooms" class="hover:text-primary transition-colors"
            >Rooms & Suites</NuxtLink
          >
          <Icon name="ph:caret-right" class="text-gray-400" />
          <span class="text-gray-900 font-medium">{{ room.name }}</span>
        </nav>
      </div>
    </section>

    <!-- Main Content - Single Column -->
    <section class="py-8 bg-white">
      <div class="container mx-auto">
        <!-- Image Gallery -->
        <div class="space-y-4 mb-8">
          <!-- Main Image -->
          <div class="relative overflow-hidden bg-gray-100">
            <img
              :src="selectedImage || room.mainImage"
              :alt="room.name"
              class="w-full h-96 lg:h-[600px] object-cover cursor-zoom-in transition-transform duration-300"
              @click="openLightbox(selectedImage || room.mainImage)"
            />
            <button
              @click="toggleFavorite"
              class="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
            >
              <Icon
                :name="isFavorite ? 'ph:heart-fill' : 'ph:heart'"
                :class="isFavorite ? 'text-red-500' : 'text-gray-600'"
                class="text-lg"
              />
            </button>
            <div class="absolute top-4 left-4">
              <span
                class="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium"
              >
                {{ room.type }}
              </span>
            </div>
            <!-- Availability Badge -->
            <div class="absolute bottom-4 left-4">
              <span
                :class="[
                  'px-3 py-1 rounded-full text-sm font-medium',
                  room.availableCount > 0
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white',
                ]"
              >
                {{
                  room.availableCount > 0
                    ? `${room.availableCount} Rooms Available`
                    : "Fully Booked"
                }}
              </span>
            </div>
          </div>

          <!-- Thumbnail Carousel -->
          <div class="flex items-center justify-center">
            <UCarousel
              v-slot="{ item }"
              :items="allImages"
              loop
              :autoplay="{ delay: 4000 }"
              class="overflow-visible pb-6 w-full max-w-4xl"
              :ui="{
                item: 'basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4',
              }"
            >
              <div
                @click="selectedImage = item"
                :class="[
                  'relative overflow-hidden cursor-pointer border-2 transition-all duration-300 mx-2 h-20 flex items-center justify-center',
                  selectedImage === item
                    ? 'border-primary shadow-md'
                    : 'border-transparent hover:border-gray-300',
                ]"
              >
                <img
                  :src="item"
                  :alt="`${room.name} view`"
                  class="w-full h-full object-cover"
                />
                <div
                  v-if="selectedImage === item"
                  class="absolute inset-0 bg-primary/20"
                ></div>
              </div>
            </UCarousel>
          </div>
        </div>

        <!-- Two Column Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-2">
          <!-- Left Column - Overview & Statistics (2/3 width) -->
          <div class="lg:col-span-2 space-y-2">
            <!-- Overview -->
            <div class="bg-white p-8 border border-gray-200">
              <h2 class="text-3xl font-bold text-gray-900 mb-6">
                Room Overview
              </h2>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div class="flex items-center gap-3 p-4 bg-gray-50">
                  <div
                    class="w-12 h-12 bg-primary/10 flex items-center justify-center"
                  >
                    <Icon name="ph:ruler" class="text-primary text-xl" />
                  </div>
                  <div>
                    <div class="text-sm text-gray-500">Size</div>
                    <div class="font-semibold text-gray-900">
                      {{ room.size }}
                    </div>
                  </div>
                </div>
                <div class="flex items-center gap-3 p-4 bg-gray-50">
                  <div
                    class="w-12 h-12 bg-primary/10 flex items-center justify-center"
                  >
                    <Icon name="ph:users" class="text-primary text-xl" />
                  </div>
                  <div>
                    <div class="text-sm text-gray-500">Max Guests</div>
                    <div class="font-semibold text-gray-900">
                      {{ room.maxGuests }}
                    </div>
                  </div>
                </div>
                <div class="flex items-center gap-3 p-4 bg-gray-50">
                  <div
                    class="w-12 h-12 bg-primary/10 flex items-center justify-center"
                  >
                    <Icon name="ph:bed" class="text-primary text-xl" />
                  </div>
                  <div>
                    <div class="text-sm text-gray-500">Bed</div>
                    <div class="font-semibold text-gray-900">
                      {{ room.beds }}
                    </div>
                  </div>
                </div>
                <div class="flex items-center gap-3 p-4 bg-gray-50">
                  <div
                    class="w-12 h-12 bg-primary/10 flex items-center justify-center"
                  >
                    <Icon name="ph:eye" class="text-primary text-xl" />
                  </div>
                  <div>
                    <div class="text-sm text-gray-500">View</div>
                    <div class="font-semibold text-gray-900">
                      {{ room.view }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Room Statistics -->
            <div class="bg-white p-8 border border-gray-200">
              <h2 class="text-3xl font-bold text-gray-900 mb-6">
                Room Availability
              </h2>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div class="text-center p-6 bg-gray-50">
                  <div class="text-2xl font-bold text-gray-900">
                    {{ room.totalRooms }}
                  </div>
                  <div class="text-sm text-gray-500">Total Rooms</div>
                </div>
                <div class="text-center p-6 bg-green-50">
                  <div class="text-2xl font-bold text-green-600">
                    {{ room.availableCount }}
                  </div>
                  <div class="text-sm text-green-600">Available Now</div>
                </div>
                <div class="text-center p-6 bg-red-50">
                  <div class="text-2xl font-bold text-red-600">
                    {{ room.bookedCount }}
                  </div>
                  <div class="text-sm text-red-600">Currently Booked</div>
                </div>
                <div class="text-center p-6 bg-yellow-50">
                  <div class="text-2xl font-bold text-yellow-600">
                    {{ room.maintenanceCount }}
                  </div>
                  <div class="text-sm text-yellow-600">Under Maintenance</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column - Room Header & Book Button (1/3 width) -->
          <div class="lg:col-span-1 space-y-2">
            <div class="bg-tertiary/15 p-8 border border-primary/25 sticky">
              <!-- Room Header -->
              <div class="text-start mb-6">
                <h1 class="text-3xl font-bold text-gray-900 mb-4">
                  {{ room.name }}
                </h1>
                <div
                  class="flex flex-col items-start gap-4 text-lg text-gray-600"
                >
                  <div class="flex items-start gap-2">
                    <Icon name="ph:star-fill" class="text-yellow-400" />
                    <span class="font-semibold">{{ room.rating }}</span>
                    <span class="text-gray-500"
                      >({{ room.reviewCount }} reviews)</span
                    >
                  </div>
                  <div class="text-2xl font-bold text-primary">
                    {{ room.price
                    }}<span class="text-sm font-normal text-gray-500"
                      >/{{ room.period }}</span
                    >
                  </div>
                </div>
              </div>

              <!-- Book Button -->
              <div class="text-center">
                <nuxtLink
                  to="/checkout"
                  class="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold text-lg py-4 px-8 transition-all duration-300 transform hover:scale-105 hover:shadow-xl w-full justify-center"
                >
                  <Icon name="ph:calendar-check" class="text-xl" />
                  Book This Room
                </nuxtLink>
              </div>
            </div>
            <div class="bg-tertiary/15 p-7 border border-primary/25 sticky">
              <!-- Secure Booking Info -->
              <div class="space-y-2 text-center">
                <h2 class="text-xl font-bold text-gray-800">Secure Booking</h2>
                <div
                  class="flex items-center justify-center gap-2 text-green-600 font-semibold"
                >
                  <Icon name="ph:shield-check" class="text-2xl" />
                  100% Safe & Verified
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Full Width Sections -->
        <div class="space-y-8 mt-2">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-2">
            <!-- Bed and Bedding -->
            <div class="bg-white p-8 border border-gray-200">
              <h2 class="text-3xl font-bold text-gray-900 mb-6">
                Bed & Bedding
              </h2>
              <div class="flex flex-wrap gap-8">
                <div
                  v-for="item in room.bedAndBedding"
                  :key="item"
                  class="flex items-center gap-3 group"
                >
                  <Icon
                    :name="getBeddingIcon(item)"
                    class="text-xl text-primary group-hover:scale-110 transition-transform duration-300"
                  />
                  <span class="text-gray-700 font-medium text-sm">{{
                    item
                  }}</span>
                </div>
              </div>
            </div>

            <!-- Room Features -->
            <div class="bg-white p-8 border border-gray-200">
              <h2 class="text-3xl font-bold text-gray-900 mb-6">
                Room Features
              </h2>
              <div class="flex flex-wrap gap-8">
                <div
                  v-for="feature in room.roomFeatures"
                  :key="feature"
                  class="flex items-center gap-3 group"
                >
                  <Icon
                    :name="getRoomFeatureIcon(feature)"
                    class="text-xl text-primary group-hover:scale-110 transition-transform duration-300"
                  />
                  <span class="text-gray-700 font-medium text-sm">{{
                    feature
                  }}</span>
                </div>
              </div>
            </div>

            <!-- Bath & Bathroom Features -->
            <div class="bg-white p-8 border border-gray-200">
              <h2 class="text-3xl font-bold text-gray-900 mb-6">
                Bath & Bathroom Features
              </h2>
              <div class="flex flex-wrap gap-8">
                <div
                  v-for="feature in room.bathroomFeatures"
                  :key="feature"
                  class="flex items-center gap-3 group"
                >
                  <Icon
                    :name="getBathroomIcon(feature)"
                    class="text-xl text-primary group-hover:scale-110 transition-transform duration-300"
                  />
                  <span class="text-gray-700 font-medium text-sm">{{
                    feature
                  }}</span>
                </div>
              </div>
            </div>

            <!-- Furniture & Furnishings -->
            <div class="bg-white p-8 border border-gray-200">
              <h2 class="text-3xl font-bold text-gray-900 mb-6">
                Furniture & Furnishings
              </h2>
              <div class="flex flex-wrap gap-8">
                <div
                  v-for="item in room.furniture"
                  :key="item"
                  class="flex items-center gap-3 group"
                >
                  <Icon
                    :name="getFurnitureIcon(item)"
                    class="text-xl text-primary group-hover:scale-110 transition-transform duration-300"
                  />
                  <span class="text-gray-700 font-medium text-sm">{{
                    item
                  }}</span>
                </div>
              </div>
            </div>

            <!-- Food & Beverage -->
            <div class="bg-white p-8 border border-gray-200">
              <h2 class="text-3xl font-bold text-gray-900 mb-6">
                Food & Beverage
              </h2>
              <div class="flex flex-wrap gap-8">
                <div
                  v-for="item in room.foodAndBeverage"
                  :key="item"
                  class="flex items-center gap-3 group"
                >
                  <Icon
                    :name="getFoodIcon(item)"
                    class="text-xl text-primary group-hover:scale-110 transition-transform duration-300"
                  />
                  <span class="text-gray-700 font-medium text-sm">{{
                    item
                  }}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- Description -->
          <div class="bg-white p-8 border border-gray-200">
            <h2 class="text-3xl font-bold text-gray-900 mb-6">Description</h2>
            <p class="text-gray-600 leading-relaxed text-lg">
              {{ room.description }}
            </p>
          </div>
          <!-- Amenities -->
          <div class="bg-white p-8 border border-gray-200">
            <h2 class="text-3xl font-bold text-gray-900 mb-6">Amenities</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div
                v-for="amenity in room.amenities"
                :key="amenity"
                class="flex flex-col items-center text-center p-4 bg-gray-50 bg-tertiary/15 grouphover:bg-gray-100 transition-colors group border border-primary/20"
              >
                <!-- Icon on top -->
                <div class="mb-3">
                  <Icon
                    :name="getAmenityIcon(amenity)"
                    class="text-2xl text-primary group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <!-- Amenity name below -->
                <span class="text-gray-700 font-medium text-sm">{{
                  amenity
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Rooms -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6">
        <h2 class="text-3xl font-bold text-gray-900 text-center mb-12">
          You Might Also Like
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <RoomCard
            v-for="relatedRoom in relatedRooms"
            :key="relatedRoom.id"
            :room="relatedRoom"
            class="transition-transform hover:scale-[1.02]"
          />
        </div>
      </div>
    </section>

    <!-- Lightbox Modal -->
    <div
      v-if="showLightbox"
      class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      @click="closeLightbox"
    >
      <div class="relative max-w-3xl max-h-full">
        <img
          :src="lightboxImage"
          alt="Room image"
          class="max-w-full max-h-full object-contain"
        />
        <button
          @click="closeLightbox"
          class="absolute top-4 right-4 w-10 h-10 bg-primary/20 hover:bg-primary/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
        >
          <Icon name="ph:x" class="text-primary text-lg" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Room data
const room = {
  id: 1,
  type: "Suite",
  name: "Luxury Suite with Panoramic City View",
  size: "85 m²",
  beds: "King Bed",
  maxGuests: 4,
  view: "City View",
  price: "$299",
  period: "per night",
  rating: 4.8,
  reviewCount: 124,
  description:
    "Experience ultimate luxury in our spacious suite featuring floor-to-ceiling windows with breathtaking city views. This elegantly appointed suite offers a separate living area, marble bathroom with deep soaking tub, and premium amenities for an unforgettable stay. Perfect for romantic getaways or special occasions.",
  mainImage: "/images/room-12.jpg",
  galleryImages: [
    "/images/room-8.jpg",
    "/images/room-10.jpg",
    "/images/room-11.jpg",
    "/images/room-12.jpg",
    "/images/room-13.jpg",
  ],
  amenities: [
    "Free High-Speed WiFi",
    "Air Conditioning",
    "Flat-Screen TV",
    "Mini Bar",
    "Coffee Maker",
    "Safe",
    "Hair Dryer",
    "Bathrobes & Slippers",
    "24/7 Room Service",
    "Daily Housekeeping",
    "Work Desk",
    "Iron & Ironing Board",
  ],
  // Multiple rooms statistics
  totalRooms: 8,
  availableCount: 5,
  bookedCount: 2,
  maintenanceCount: 1,
  // New features
  bedAndBedding: [
    "King Size Bed",
    "Premium Mattress",
    "Egyptian Cotton Sheets",
    "Down Comforters",
    "Memory Foam Pillows",
    "Duvet Covers",
    "Mattress Topper",
    "Bed Skirt",
  ],
  roomFeatures: [
    "Floor-to-Ceiling Windows",
    "Blackout Curtains",
    "Soundproof Walls",
    "Private Balcony",
    "City View",
    "Climate Control",
    "Electronic Safe",
    "LED Lighting",
  ],
  bathroomFeatures: [
    "Marble Bathroom",
    "Rain Shower",
    "Deep Soaking Tub",
    "Heated Floors",
    "Bidet Toilet",
    "Vanity Mirror",
    "Premium Toiletries",
    "Towel Warmer",
  ],
  furniture: [
    "King Bed Frame",
    "Nightstands",
    "Dresser",
    "Writing Desk",
    "Armchair",
    "Coffee Table",
    "Wardrobe",
    "Luggage Rack",
  ],
  foodAndBeverage: [
    "Mini Bar",
    "Nespresso Machine",
    "Electric Kettle",
    "Complimentary Water",
    "Room Service",
    "Wine Glasses",
    "Snack Basket",
    "Tea Selection",
  ],
};

// Related rooms data
const relatedRooms = [
  {
    id: 2,
    type: "Deluxe",
    name: "Deluxe Room",
    size: "45 m²",
    beds: "Queen Bed",
    image: "/images/room-9.jpg",
    price: "$189",
    period: "per night",
    guests: "2 Adults",
    short_description:
      "Elegant room with modern comforts and thoughtful touches for a perfect stay.",
  },
  {
    id: 4,
    type: "Executive",
    name: "Executive Suite",
    size: "65 m²",
    beds: "King Bed",
    image: "/images/room-6.jpg",
    price: "$259",
    period: "per night",
    guests: "2 Adults",
    short_description:
      "Sophisticated suite designed for business travelers with dedicated workspace.",
  },
  {
    id: 5,
    type: "Premium",
    name: "Premium Room",
    size: "50 m²",
    beds: "King Bed",
    image: "/images/room-6.jpg",
    price: "$229",
    period: "per night",
    guests: "2 Adults",
    short_description:
      "Enhanced comfort with premium bedding and upgraded amenities.",
  },
];

// Reactive state
const selectedImage = ref("");
const isFavorite = ref(false);
const showLightbox = ref(false);
const lightboxImage = ref("");

// Combine main image and gallery images for thumbnails
const allImages = computed(() => [room.mainImage, ...room.galleryImages]);

// Amenity icons mapping
const getAmenityIcon = (amenity: string) => {
  const iconMap: { [key: string]: string } = {
    "Free High-Speed WiFi": "ph:wifi-high",
    "Air Conditioning": "ph:snowflake",
    "Flat-Screen TV": "ph:television",
    "Mini Bar": "ph:wine",
    "Coffee Maker": "ph:coffee",
    Safe: "ph:lock",
    "Hair Dryer": "ph:wind",
    "Bathrobes & Slippers": "ph:user-circle",
    "24/7 Room Service": "ph:bell",
    "Daily Housekeeping": "ph:broom",
    "Work Desk": "ph:desk",
    "Iron & Ironing Board": "mdi:tshirt-crew",
  };
  return iconMap[amenity] || "ph:check-circle";
};

// Bed and bedding icons mapping
const getBeddingIcon = (item: string) => {
  const iconMap: { [key: string]: string } = {
    "King Size Bed": "ph:bed",
    "Premium Mattress": "ph:pill",
    "Egyptian Cotton Sheets": "game-icons:blanket",
    "Down Comforters": "ph:cloud",
    "Memory Foam Pillows": "game-icons:pillow",
    "Duvet Covers": "temaki:cloth",
    "Mattress Topper": "ph:stack",
    "Bed Skirt": "hugeicons:curtains",
  };
  return iconMap[item] || "ph:bed";
};

// Room features icons mapping
const getRoomFeatureIcon = (feature: string) => {
  const iconMap: { [key: string]: string } = {
    "Floor-to-Ceiling Windows": "ic:twotone-window",
    "Blackout Curtains": "material-symbols:curtains-closed",
    "Soundproof Walls": "ph:ear-slash",
    "Private Balcony": "ph:plant",
    "City View": "ph:buildings",
    "Climate Control": "ph:thermometer",
    "Electronic Safe": "ph:lock-key",
    "LED Lighting": "ph:lightbulb",
  };
  return iconMap[feature] || "ph:star";
};

// Bathroom features icons mapping
const getBathroomIcon = (feature: string) => {
  const iconMap: { [key: string]: string } = {
    "Marble Bathroom": "ph:bathtub",
    "Rain Shower": "ph:shower",
    "Deep Soaking Tub": "ph:bathtub",
    "Heated Floors": "ph:thermometer-hot",
    "Bidet Toilet": "ph:toilet",
    "Vanity Mirror": "mdi:mirror-rectangle",
    "Premium Toiletries": "ic:round-soap",
    "Towel Warmer": "ph:towel",
  };
  return iconMap[feature] || "ph:bathtub";
};

// Furniture icons mapping
const getFurnitureIcon = (item: string) => {
  const iconMap: { [key: string]: string } = {
    "King Bed Frame": "ph:bed",
    Nightstands: "ph:table",
    Dresser: "mingcute:drawer-2-line",
    "Writing Desk": "ph:desk",
    Armchair: "ph:chair",
    "Coffee Table": "ph:table",
    Wardrobe: "mingcute:wardrobe-2-fill",
    "Luggage Rack": "ph:suitcase",
  };
  return iconMap[item] || "ph:chair";
};

// Food and beverage icons mapping
const getFoodIcon = (item: string) => {
  const iconMap: { [key: string]: string } = {
    "Mini Bar": "ph:beer-bottle",
    "Nespresso Machine": "ph:coffee",
    "Electric Kettle": "icon-park-outline:teapot",
    "Complimentary Water": "temaki:water-bottle",
    "Room Service": "ph:bell",
    "Wine Glasses": "ph:wine",
    "Snack Basket": "ph:basket",
    "Tea Selection": "ph:tea-bag",
  };
  return iconMap[item] || "ph:fork-knife";
};

// Methods
const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
};

const openLightbox = (image: string) => {
  lightboxImage.value = image;
  showLightbox.value = true;
};

const closeLightbox = () => {
  showLightbox.value = false;
  lightboxImage.value = "";
};
</script>

<style scoped>
.sticky {
  position: sticky;
  z-index: 10;
}
</style>
