<script setup lang="ts"></script>

<template>
  <section
    class="w-full relative overflow-hidden py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100"
  >
    <!-- Animated background elements -->
    <div
      class="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl animate-pulse-slow"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-[32rem] h-[32rem] bg-secondary/5 rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl animate-pulse-slow delay-1000"
    ></div>

    <!-- Geometric pattern overlay -->
    <div class="absolute inset-0 opacity-[0.03] bg-geometric-pattern"></div>

    <div class="container mx-auto px-3 relative z-10">
      <!-- Services -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <!-- Card 1: Luxury Accommodation -->
        <div
          class="group text-start bg-white p-8 transition-all duration-500 hover:shadow-sm shadow-2xl border hover:border-gray-100 border-primary/30 hover:translate-y-1 -translate-y-3 relative overflow-hidden"
        >
          <div
            class="absolute top-0 right-0 w-28 h-28 bg-primary/10 rounded-bl-full transition-all duration-500"
          ></div>
          <div class="flex justify-start mb-6 relative z-10">
            <div
              class="p-4 bg-gradient-to-br from-primary/15 to-primary/10 rounded-xl transition-colors duration-500 shadow-sm"
            >
              <Icon name="mdi:bed-king" class="w-8 h-8 text-primary text-3xl" />
            </div>
          </div>
          <h3 class="font-semibold text-xl text-gray-900 mb-4 relative z-10">
            Luxury Rooms
          </h3>
          <p class="text-gray-500 text-sm leading-relaxed mb-6 relative z-10">
            Spacious suites with premium bedding, modern amenities, and stunning
            views.
          </p>
          <div class="flex items-center relative z-10">
            <div
              class="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-primary/10"
            >
              <Icon
                name="mdi:arrow-right"
                class="text-secondary transition-all duration-500 transform group-hover:text-primary group-hover:translate-x-1"
              />
            </div>
            <span
              class="text-primary text-sm font-medium transition-all duration-300 ml-3 group-hover:opacity-0 opacity-100 hover:opacity-100"
              >View Rooms</span
            >
          </div>
        </div>

        <!-- Card 2: Fine Dining -->
        <div
          class="group text-start bg-white p-8 transition-all duration-500 shadow-sm hover:shadow-2xl border border-gray-100 hover:border-secondary/30 hover:-translate-y-3 relative overflow-hidden"
        >
          <div
            class="absolute top-0 right-0 w-28 h-28 bg-secondary/10 rounded-bl-full transition-all duration-500"
          ></div>
          <div class="flex justify-start mb-6 relative z-10">
            <div
              class="p-4 bg-gradient-to-br from-secondary/15 to-secondary/10 rounded-xl transition-colors duration-500 shadow-sm"
            >
              <Icon
                name="mdi:silverware-fork-knife"
                class="w-8 h-8 text-secondary text-3xl"
              />
            </div>
          </div>
          <h3 class="font-semibold text-xl text-gray-900 mb-4 relative z-10">
            Gourmet Dining
          </h3>
          <p class="text-gray-500 text-sm leading-relaxed mb-6 relative z-10">
            Experience exquisite culinary delights with our multiple restaurants
           .
          </p>
          <div class="flex items-center relative z-10">
            <div
              class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-secondary/10"
            >
              <Icon
                name="mdi:arrow-right"
                class="text-primary transition-all duration-500 transform group-hover:text-secondary group-hover:translate-x-1"
              />
            </div>
            <span
              class="text-secondary text-sm font-medium transition-all duration-300 ml-3 opacity-0 group-hover:opacity-100"
              >View Menu</span
            >
          </div>
        </div>

        <!-- Card 3: Wellness Center -->
        <div
          class="group text-start bg-white p-8 transition-all duration-500 hover:shadow-sm shadow-2xl border hover:border-gray-100 border-primary/30 hover:translate-y-1 -translate-y-3 relative overflow-hidden"
        >
          <div
            class="absolute top-0 right-0 w-28 h-28 bg-primary/10 rounded-bl-full transition-all duration-500"
          ></div>
          <div class="flex justify-start mb-6 relative z-10">
            <div
              class="p-4 bg-gradient-to-br from-primary/15 to-primary/10 rounded-xl transition-colors duration-500 shadow-sm"
            >
              <Icon name="mdi:spa" class="w-8 h-8 text-primary text-3xl" />
            </div>
          </div>
          <h3 class="font-semibold text-xl text-gray-900 mb-4 relative z-10">
            Spa & Wellness
          </h3>
          <p class="text-gray-500 text-sm leading-relaxed mb-6 relative z-10">
            Rejuvenate your mind and body with our premium spa treatments,
            sauna.
          </p>
          <div class="flex items-center relative z-10">
            <div
              class="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-primary/10"
            >
              <Icon
                name="mdi:arrow-right"
                class="text-secondary transition-all duration-500 transform group-hover:text-primary group-hover:translate-x-1"
              />
            </div>
            <span
              class="text-primary text-sm font-medium transition-all duration-300 ml-3 group-hover:opacity-0 opacity-100 hover:opacity-100"
              >Book Treatment</span
            >
          </div>
        </div>

        <!-- Card 4: Swimming Pool -->
        <div
          class="group text-start bg-white p-8 transition-all duration-500 shadow-sm hover:shadow-2xl border border-gray-100 hover:border-secondary/30 hover:-translate-y-3 relative overflow-hidden"
        >
          <div
            class="absolute top-0 right-0 w-28 h-28 bg-secondary/10 rounded-bl-full transition-all duration-500"
          ></div>
          <div class="flex justify-start mb-6 relative z-10">
            <div
              class="p-4 bg-gradient-to-br from-secondary/15 to-secondary/10 rounded-xl transition-colors duration-500 shadow-sm"
            >
              <Icon name="mdi:pool" class="w-8 h-8 text-secondary text-3xl" />
            </div>
          </div>
          <h3 class="font-semibold text-xl text-gray-900 mb-4 relative z-10">
            Infinity Pool
          </h3>
          <p class="text-gray-500 text-sm leading-relaxed mb-6 relative z-10">
            Relax and unwind in our stunning infinity pool with panoramic views
            and premium poolside service.
          </p>
          <div class="flex items-center relative z-10">
            <div
              class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-secondary/10"
            >
              <Icon
                name="mdi:arrow-right"
                class="text-primary transition-all duration-500 transform group-hover:text-secondary group-hover:translate-x-1"
              />
            </div>
            <span
              class="text-secondary text-sm font-medium transition-all duration-300 ml-3 opacity-0 group-hover:opacity-100"
              >View Pool</span
            >
          </div>
        </div>

        <!-- Card 5: free wifi -->
        <div
          class="group text-start bg-white p-8 transition-all duration-500 shadow-sm hover:shadow-2xl border border-gray-100 hover:border-secondary/30 hover:-translate-y-3 relative overflow-hidden"
        >
          <div
            class="absolute top-0 right-0 w-28 h-28 bg-secondary/10 rounded-bl-full transition-all duration-500"
          ></div>
          <div class="flex justify-start mb-6 relative z-10">
            <div
              class="p-4 bg-gradient-to-br from-secondary/15 to-secondary/10 rounded-xl transition-colors duration-500 shadow-sm"
            >
              <Icon
                name="material-symbols:android-wifi-4-bar"
                class="w-8 h-8 text-secondary text-3xl"
              />
            </div>
          </div>
          <h3 class="font-semibold text-xl text-gray-900 mb-4 relative z-10">
            Free Wifi
          </h3>
          <p class="text-gray-500 text-sm leading-relaxed mb-6 relative z-10">
            Experience exquisite culinary delights with our multiple restaurants
           .
          </p>
          <div class="flex items-center relative z-10">
            <div
              class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-secondary/10"
            >
              <Icon
                name="mdi:arrow-right"
                class="text-primary transition-all duration-500 transform group-hover:text-secondary group-hover:translate-x-1"
              />
            </div>
            <span
              class="text-secondary text-sm font-medium transition-all duration-300 ml-3 opacity-0 group-hover:opacity-100"
              >View Menu</span
            >
          </div>
        </div>

        <!-- Card 6: Car Parking -->
        <div
          class="group text-start bg-white p-8 transition-all duration-500 hover:shadow-sm shadow-2xl border hover:border-gray-100 border-primary/30 hover:translate-y-1 -translate-y-3 relative overflow-hidden"
        >
          <div
            class="absolute top-0 right-0 w-28 h-28 bg-primary/10 rounded-bl-full transition-all duration-500"
          ></div>
          <div class="flex justify-start mb-6 relative z-10">
            <div
              class="p-4 bg-gradient-to-br from-primary/15 to-primary/10 rounded-xl transition-colors duration-500 shadow-sm"
            >
              <Icon name="fluent:vehicle-car-parking-20-filled" class="w-8 h-8 text-primary text-3xl" />
            </div>
          </div>
          <h3 class="font-semibold text-xl text-gray-900 mb-4 relative z-10">
            On-site parking
          </h3>
          <p class="text-gray-500 text-sm leading-relaxed mb-6 relative z-10">
            Spacious suites with premium bedding, modern amenities, and stunning
            views.
          </p>
          <div class="flex items-center relative z-10">
            <div
              class="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-primary/10"
            >
              <Icon
                name="mdi:arrow-right"
                class="text-secondary transition-all duration-500 transform group-hover:text-primary group-hover:translate-x-1"
              />
            </div>
            <span
              class="text-primary text-sm font-medium transition-all duration-300 ml-3 group-hover:opacity-0 opacity-100 hover:opacity-100"
              >View Rooms</span
            >
          </div>
        </div>

        <!-- Card 7: Smoke free -->
        <div
          class="group text-start bg-white p-8 transition-all duration-500 shadow-sm hover:shadow-2xl border border-gray-100 hover:border-secondary/30 hover:-translate-y-3 relative overflow-hidden"
        >
          <div
            class="absolute top-0 right-0 w-28 h-28 bg-secondary/10 rounded-bl-full transition-all duration-500"
          ></div>
          <div class="flex justify-start mb-6 relative z-10">
            <div
              class="p-4 bg-gradient-to-br from-secondary/15 to-secondary/10 rounded-xl transition-colors duration-500 shadow-sm"
            >
              <Icon name="ic:outline-smoke-free" class="w-8 h-8 text-secondary text-3xl" />
            </div>
          </div>
          <h3 class="font-semibold text-xl text-gray-900 mb-4 relative z-10">
            Smoke-free hotel
          </h3>
          <p class="text-gray-500 text-sm leading-relaxed mb-6 relative z-10">
            Relax and unwind in our stunning infinity pool with panoramic views
            and premium poolside service.
          </p>
          <div class="flex items-center relative z-10">
            <div
              class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-secondary/10"
            >
              <Icon
                name="mdi:arrow-right"
                class="text-primary transition-all duration-500 transform group-hover:text-secondary group-hover:translate-x-1"
              />
            </div>
            <span
              class="text-secondary text-sm font-medium transition-all duration-300 ml-3 opacity-0 group-hover:opacity-100"
              >View Pool</span
            >
          </div>
        </div>

        <!-- Card 8: gym -->
        <div
          class="group text-start bg-white p-8 transition-all duration-500 hover:shadow-sm shadow-2xl border hover:border-gray-100 border-primary/30 hover:translate-y-1 -translate-y-3 relative overflow-hidden"
        >
          <div
            class="absolute top-0 right-0 w-28 h-28 bg-primary/10 rounded-bl-full transition-all duration-500"
          ></div>
          <div class="flex justify-start mb-6 relative z-10">
            <div
              class="p-4 bg-gradient-to-br from-primary/15 to-primary/10 rounded-xl transition-colors duration-500 shadow-sm"
            >
              <Icon name="streamline-block:entertainment-gym" class="w-8 h-8 text-primary text-3xl" />
            </div>
          </div>
          <h3 class="font-semibold text-xl text-gray-900 mb-4 relative z-10">
            Fitness center & GYM
          </h3>
          <p class="text-gray-500 text-sm leading-relaxed mb-6 relative z-10">
            Rejuvenate your mind and body with our premium spa treatments,
            sauna, and wellness facilities.
          </p>
          <div class="flex items-center relative z-10">
            <div
              class="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-primary/10"
            >
              <Icon
                name="mdi:arrow-right"
                class="text-secondary transition-all duration-500 transform group-hover:text-primary group-hover:translate-x-1"
              />
            </div>
            <span
              class="text-primary text-sm font-medium transition-all duration-300 ml-3 group-hover:opacity-0 opacity-100 hover:opacity-100"
              >Book Treatment</span
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.bg-geometric-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
</style>
