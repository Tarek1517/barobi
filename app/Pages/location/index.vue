<script setup lang="ts">
// Contact information data
const contactInfo = {
  title: "BARBURMITOLA CAMLORMENT",
  subtitle: "Barbol Apartment",
  address:
    "House-14, Road-11, Sector-1, Uttara Model Town, Dhaka-1230 Bangladesh",
  phones: [
    { label: "Reservations", number: "(+88) 02 55555555" },
    { number: "(+88) 01711111111" },
    { number: "(+88) 0188888888" },
  ],
  email: "reservations@barobapartment.com",
};

// Map coordinates for Uttara, Dhaka
const mapLocation = {
  lat: 23.8759,
  lng: 90.3795,
  zoom: 15,
};
</script>

<template>
  <!-- Hero Banner -->
  <section class="relative h-[400px] lg:h-[500px] overflow-hidden group">
    <!-- Background -->
    <img
      src="/images/location2.png"
      alt="Location banner"
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
          class="flex items-center font-secondary justify-center text-white/90 text-sm mb-6"
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
          <span class="text-white font-medium">Location</span>
        </nav>

        <h1
          class="text-5xl md:text-7xl font-primary text-center font-bold text-white leading-tight tracking-tight"
        >
          Our
          <span class="linear-wipe drop-shadow-lg"> Location </span>
        </h1>
        <p class="text-xl font-secondary text-center text-gray-200 mt-4">
          Find us easily and plan your visit to our premium apartment
        </p>
      </div>
    </div>
  </section>

  <!-- Location & Contact Section -->
  <section class="bg-background py-20">
    <div class="container mx-auto flex flex-col lg:flex-row gap-12">
      <!-- Left Column - Map -->
      <div class="lg:w-1/2">
        <div class="bg-white shadow-xl overflow-hidden border border-gray-200">
          <!-- Map Container -->
          <div class="h-96 lg:h-[600px] bg-gray-100 relative">
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345093647!2d144.95605431531683!3d-37.81720997975137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577fcf9a83e2516!2sFederation%20Square!5e0!3m2!1sen!2sus!4v1609290348123!5m2!1sen!2sus"
                width="100%"
                height="600"
                style="border: 0"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <!-- Map Overlay Info -->
            <div
              class="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-4 shadow-lg"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-3 h-3 bg-red-500 rounded-full animate-pulse"
                ></div>
                <div>
                  <h3 class="font-semibold font-primary text-gray-900">Barobi Apartment</h3>
                  <p class="text-sm font-secondary text-gray-600">Uttara Model Town, Dhaka</p>
                </div>
              </div>
            </div>

            <!-- Map Controls -->
            <div class="absolute top-4 right-4 flex flex-col gap-2">
              <button
                class="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Icon name="mdi:plus" class="text-gray-700" />
              </button>
              <button
                class="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Icon name="mdi:minus" class="text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column - Contact Information -->
      <div class="lg:w-1/2">
        <div
          class="bg-white shadow-xl p-8 lg:p-12 border border-gray-200 h-full"
        >
          
          <!-- Address -->
          <div class="mb-8">
            <div class="flex flex-col items-center gap-1">
              <Icon
                name="ep:home-filled"
                class="text-primary text-2xl flex-shrink-0"
              />
              <h3
                class="text-xl lg:text-2xl font-primary font-semibold text-gray-800"
              >
                {{ contactInfo.subtitle }}
              </h3>
              <p
                class="text-gray-700 text-center font-secondary w-full max-w-sm leading-relaxed"
              >
                {{ contactInfo.address }}
              </p>
            </div>
          </div>

          <!-- Address -->
          <div class="mb-8">
            <div class="flex flex-col items-center gap-1">
              <Icon
                name="material-symbols:call-sharp"
                class="text-primary text-2xl flex-shrink-0"
              />
              <div
                v-for="(phone, index) in contactInfo.phones"
                :key="index"
                class="flex items-center gap-1 font-secondary group cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                <div class="text-center">
                  <span
                    v-if="phone.label"
                    class="text-base font-primary font-semibold text-gray-900 block"
                  >
                    {{ phone.label }}
                  </span>
                  <span
                    class="text-gray-900 font-medium group-hover:text-blue-600 transition-colors"
                  >
                    {{ phone.number }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Email -->
          <div class="mb-8">
            <div class="flex flex-col items-center gap-1">
              <Icon
                name="ic:sharp-alternate-email"
                class="text-red-500 mt-1 text-2xl flex-shrink-0"
              />
              <div>
                <a
                  :href="`mailto:${contactInfo.email}`"
                  class="text-gray-900 font-primary font-medium hover:text-blue-600 transition-colors break-all"
                >
                  {{ contactInfo.email }}
                </a>
              </div>
            </div>
          </div>
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
