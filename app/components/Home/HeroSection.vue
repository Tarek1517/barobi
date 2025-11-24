<script setup lang="ts">
import { ref } from "vue";

// Form data
const checkIn = ref("");
const checkOut = ref("");
const rooms = ref(1);
const adults = ref(2);
const children = ref(0);
const ratePreference = ref("best");

// Carousel items
const carouselItems = [
  {
    image: "/images/banner1.jpg",
    title: "Barobi Apartments 1",
  },
  {
    image: "/images/banner5.jpg",
    title: "Barobi Apartments 2",
  },
];

// Rate options
const rateOptions = [
  { value: "best", label: "Best Available Rate" },
  { value: "corporate", label: "Corporate Rate" },
  { value: "government", label: "Government Rate" },
  { value: "aaa", label: "AAA Rate" },
];

// Features data
const features = [
  {
    icon: "mdi:wifi",
    title: "Free WiFi",
  },
  {
    icon: "mdi:pool",
    title: "Swimming Pool",
  },
  {
    icon: "mdi:car",
    title: "Parking",
  },
  {
    icon: "mdi:silverware-fork-knife",
    title: "Restaurant",
  },
];

// Handle form submission
const handleSearch = () => {
  console.log("Searching with:", {
    checkIn: checkIn.value,
    checkOut: checkOut.value,
    rooms: rooms.value,
    adults: adults.value,
    children: children.value,
    ratePreference: ratePreference.value,
  });
};
</script>

<template>
  <section
    class="relative h-[650px] flex items-center justify-center overflow-hidden"
  >
    <!-- Background Slider with Enhanced Overlay -->
    <div class="absolute inset-0">
      <UCarousel
        v-slot="{ item }"
        :items="carouselItems"
        :ui="{
          item: 'flex-[0_0_100%]',
          container: 'w-full h-full',
        }"
        class="w-full h-full"
        arrows
        indicators
        autoplay
      >
        <div class="relative w-full h-full">
          <img
            :src="item.image"
            :alt="item.title"
            class="w-full h-full object-cover transform scale-105 transition-transform duration-700"
          />
        </div>
      </UCarousel>
    </div>

    <!-- Enhanced Gradient Overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-r from-black/30 via-black/40 to-transparent z-0"
    ></div>
    <div
      class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-0"
    ></div>

    <!-- Animated Background Elements -->
    <div
      class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/60 to-purple-600/40 rounded-full -translate-y-48 translate-x-48 opacity-60 blur-xl animate-pulse-slow"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-primary/40 to-blue-600/30 rounded-full translate-y-32 -translate-x-32 opacity-50 blur-lg animate-float"
    ></div>

    <!-- Floating Particles -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        v-for="i in 12"
        :key="i"
        class="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
        :style="{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${i * 0.5}s`,
          animationDuration: `${3 + Math.random() * 4}s`,
        }"
      ></div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-1 relative z-10">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Left Content -->
          <div class="space-y-8 text-white">
            <!-- Enhanced Main Heading -->
            <div class="space-y-6">
              <div class="flex items-center gap-3 mb-2">
                <div
                  class="w-3 h-8 bg-white rounded-full animate-bounce"
                ></div>
                <span
                  class="text-white font-semibold tracking-wider uppercase text-sm"
                  >Luxury Experience</span
                >
              </div>

              <h1 class="text-4xl lg:text-5xl font-bold leading-tight">
                <span
                  class="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                >
                  Welcome to
                </span>
                <br />
                <span class="linear-wipe animate-gradient uppercase">
                  Barobi Apartments
                </span>
              </h1>

              <p
                class="text-xl text-gray-200 leading-relaxed max-w-2xl font-light"
              >
                We bring you not only a stay option, but an
                <span class="text-primary font-semibold"
                  >unforgettable experience</span
                >
                in your budget to enjoy the ultimate luxury.
              </p>
            </div>

            <!-- Enhanced CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4">
              <button
                class="group relative bg-primary text-white px-4 py-2 font-semibold transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-primary/25 overflow-hidden"
              >
                <span class="relative z-10 flex items-center gap-2">
                  <Icon name="mdi:sparkles" class="w-5 h-5" />
                  Discover Now
                </span>
                <div
                  class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
                ></div>
              </button>

              <button
                class="group relative bg-white/10 backdrop-blur-md border-2 border-white/60 hover:border-primary text-white hover:text-white px-4 py-2 font-semibold transition-all duration-500 hover:bg-primary/90 overflow-hidden"
              >
                <span class="relative z-10 flex items-center gap-2">
                  <Icon name="mdi:play-circle" class="w-5 h-5" />
                  Watch our story
                </span>
                <div
                  class="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                ></div>
              </button>
            </div>

           
          </div>

          <!-- Enhanced Booking Form -->
          <div
            class="relative bg-white/55 backdrop-blur-xl shadow-2xl p-8 border border-white/20 hover:shadow-primary/20 transition-all duration-500 group"
          >
            <!-- Form Glow Effect -->
            <div
              class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>

            <div class="relative z-10">
              <!-- Form Header -->
              <div class="text-center mb-8">
                
                <h2
                  class="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                >
                  Check Availability
                </h2>
              </div>

              <form @submit.prevent="handleSearch" class="space-y-4">
                <!-- Check-in & Check-out Dates -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="group">
                    <label class="block text-sm font-semibold text-white mb-2"
                      >Check-in Date</label
                    >
                    <input
                      v-model="checkIn"
                      type="date"
                      class="w-full px-4 py-3 bg-white border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 shadow-sm group-hover:shadow-md"
                      required
                    />
                  </div>
                  <div class="group">
                    <label class="block text-sm font-semibold text-white mb-2"
                      >Check-out Date</label
                    >
                    <input
                      v-model="checkOut"
                      type="date"
                      class="w-full px-4 py-3 bg-white border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 shadow-sm group-hover:shadow-md"
                      required
                    />
                  </div>
                </div>

                <!-- Rooms & Guests -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    class="group"
                    v-for="(field, index) in [
                      {
                        label: 'Rooms',
                        model: rooms,
                        options: 5,
                        singular: 'Room',
                        plural: 'Rooms',
                      },
                      {
                        label: 'Adults',
                        model: adults,
                        options: 8,
                        singular: 'Adult',
                        plural: 'Adults',
                      },
                      {
                        label: 'Children',
                        model: children,
                        options: 6,
                        singular: 'Child',
                        plural: 'Children',
                      },
                    ]"
                    :key="field.label"
                  >
                    <label
                      class="block text-sm font-semibold text-white mb-2"
                      >{{ field.label }}</label
                    >
                    <select
                      v-model="field.model"
                      class="w-full px-4 py-3 bg-white border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 shadow-sm group-hover:shadow-md appearance-none"
                    >
                      <option v-for="n in field.options" :key="n" :value="n">
                        {{ n }} {{ n === 1 ? field.singular : field.plural }}
                      </option>
                    </select>
                  </div>
                </div>

                <!-- Rate Preference -->
                <div class="group">
                  <label class="block text-sm font-semibold text-white mb-2"
                    >Rate Preference</label
                  >
                  <select
                    v-model="ratePreference"
                    class="w-full px-4 py-3 bg-white border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 shadow-sm group-hover:shadow-md appearance-none"
                  >
                    <option
                      v-for="option in rateOptions"
                      :key="option.value"
                      :value="option.value"
                    >
                      {{ option.label }}
                    </option>
                  </select>
                </div>

                <!-- Enhanced Search Button -->
                <button
                  type="submit"
                  class="w-full group relative bg-primary text-white py-4 px-6 font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-primary/30 overflow-hidden"
                >
                  <span
                    class="relative z-10 flex items-center justify-center gap-3"
                  >
                    <Icon
                      name="mdi:magnify"
                      class="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                    />
                    Search Availability
                  </span>
                  <div
                    class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
                  ></div>
                </button>
              </form>

              
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
      <div class="animate-bounce">
        <div
          class="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <div
            class="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"
          ></div>
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
    #fff 80%
  );
  background-size: 200% auto;
  color: #000;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 3s linear infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

/* Custom scrollbar for select elements */
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
</style>
