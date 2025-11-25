<script setup lang="ts"></script>

<template>
  <section class="py-16 bg-gradient-to-br from-gray-50 to-white">
    <!-- First Row: Image Left, Content Right -->
    <div class="container mx-auto px-4 mb-20">
      <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        <!-- Left Content - Image -->
        <div class="relative group">
          <div class="relative overflow-hidden shadow-2xl">
            <img
              src="/images/about-t1.jpg"
              alt="Luxury Hotel Experience"
              class="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <!-- Gradient Overlay -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
          </div>
          <!-- Floating Badge -->
          <div
            class="absolute -top-4 -left-4 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 shadow-lg transform -rotate-3"
          >
            <div class="text-sm font-bold uppercase tracking-wide">Premium</div>
          </div>
          <!-- Floating Testimonial -->
          <div
            class="absolute -bottom-6 -right-6 bg-white shadow-2xl p-4 border border-primary/30"
          >
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center"
              >
                <Icon name="mdi:star" class="w-6 h-6 text-white" />
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">4.9/5</div>
                <div class="text-sm text-gray-600">Guest Rating</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Content - Text -->
        <div class="space-y-4 lg:pl-12">
          <!-- Badge -->
          <div class="inline-flex items-center gap-3 bg-primary/10 px-4 py-2">
            <div class="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span
              class="text-primary font-semibold text-sm uppercase tracking-wide"
              >Luxury Experience</span
            >
          </div>

          <!-- Heading -->
          <h1 class="text-5xl font-bold text-gray-900 leading-tight">
            Experience
            <span class="linear-wipe">Luxury</span>
            <br />Living
          </h1>

          <!-- Description -->
          <p class="text-lg text-gray-600 leading-relaxed font-light">
            Discover the perfect blend of comfort and elegance at Barobi
            Apartments. Your dream vacation starts with us in an environment
            designed for ultimate relaxation.
          </p>

          <!-- Features List -->
          <div class="grid grid-cols-2 gap-4 py-4">
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center"
              >
                <Icon name="mdi:star" class="w-4 h-4 text-primary" />
              </div>
              <span class="text-gray-700 font-medium">5-Star Service</span>
            </div>
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center"
              >
                <Icon name="mdi:shield-check" class="w-4 h-4 text-primary" />
              </div>
              <span class="text-gray-700 font-medium">Premium Security</span>
            </div>
          </div>

          <!-- CTA Button -->
          <button
            class="group relative bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-4 px-10 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden"
          >
            <span class="relative z-10 flex items-center gap-3">
              <Icon
                name="mdi:calendar-check"
                class="w-5 h-5 group-hover:scale-110 transition-transform"
              />
              Book Your Stay
            </span>
            <div
              class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
            ></div>
          </button>
        </div>
      </div>
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
