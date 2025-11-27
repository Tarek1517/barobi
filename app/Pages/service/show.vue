<script setup>
// ✅ Static Service Details
const ServiceDetails = {
  id: 1,
  slug: "infinity-gym",
  name: "Infinity Gym",
  service_image_url: "/images/gym.jpg",
  price: "Free",
  category: "Wellness",
  short_description:
    "State-of-the-art fitness facility with premium equipment available 24/7 exclusively for hotel guests.",
  description: `
    <p class="lead">Welcome to Infinity Gym, our exclusive fitness center designed specifically for hotel guests seeking to maintain their wellness routine while traveling.</p>
    
    <div class="my-8">
      <img src="/images/gym1.png" alt="Infinity Gym Interior" class="w-full h-auto shadow-lg" />
      <p class="text-center text-gray-600 mt-2">Our spacious hotel gym with panoramic city views</p>
    </div>
    
    <p>As part of our commitment to guest wellness, we provide <strong>complimentary 24/7 access</strong> to our premium fitness facility. Whether you're an early riser or prefer late-night workouts, our gym is always available.</p>
    
    <h3>🏋️ Premium Equipment</h3>
    <h4>Cardio Zone</h4>
    <p>Featuring the latest treadmills, ellipticals, stationary bikes, and rowing machines - all equipped with personal entertainment systems and heart rate monitoring.</p>
    
    <h4>Strength Training Area</h4>
    <p>Complete set of free weights, resistance machines, and functional training equipment suitable for all fitness levels.</p>
    
    <h4>Yoga & Stretching Space</h4>
    <p>Dedicated area with mats, blocks, and straps for yoga, Pilates, and stretching routines.</p>
    
    <h3>👨‍💼 Personal Training</h3>
    <p>Available upon request (additional charges apply):</p>
    <ul>
      <li>One-on-one personal training sessions</li>
      <li>Custom workout programs</li>
      <li>Fitness assessments</li>
      <li>Nutritional guidance</li>
    </ul>
    <div class="flex gap-8">
    <div class="my-8">
      <img src="/images/gym2.png" alt="Gym Equipment" class="w-full h-auto shadow-lg" />
      <p class="text-center text-gray-600 mt-2">Latest fitness equipment from Technogym and Life Fitness</p>
    </div>

    <div class="my-8">
      <img src="/images/gym3.png" alt="Complimentary Amenities" class="w-full h-auto shadow-lg" />
      <p class="text-center text-gray-600 mt-2">Complimentary towels, water, and fitness accessories</p>
    </div>
    </div>
    
    
    <h3>🕒 Operating Hours</h3>
    <p>Available exclusively for hotel guests:</p>
    <ul>
      <li><strong>24 hours, 7 days a week</strong></li>
      <li>Access via your room key card</li>
    </ul>
    
    <h3>📍 Location</h3>
    <p>Conveniently located on the 3rd floor with:</p>
    <ul>
      <li>Panoramic city views</li>
      <li>Adjacent to the spa and pool</li>
      <li>Locker rooms with showers</li>
      <li>Complimentary towels and toiletries</li>
      <li>Water and refreshment station</li>
    </ul>
    
    <blockquote>
      "The hotel gym exceeded my expectations - better equipped than most commercial gyms and available 24/7!"
    </blockquote>
    
    <h3>📞 Booking & Information</h3>
    <p>No reservation required for general use. For personal training or special requests, please contact:</p>
    <ul>
      <li>Front Desk: Extension 1234</li>
      <li>Wellness Center: Extension 5678</li>
      <li>Or visit the Concierge</li>
    </ul>
  `,
  features: [
    "24/7 Access",
    "Premium Equipment",
    "Complimentary Towels",
    "Locker Rooms",
    "Personal Training Available",
    "City Views",
  ],
  operating_hours: {
    monday_friday: "24 Hours",
    saturday_sunday: "24 Hours",
  },
  contact: {
    front_desk: "Extension 1234",
    wellness_center: "Extension 5678",
  },
};

// ✅ Static Related Services
const relatedServices = [
  {
    id: 2,
    slug: "house-caffee",
    name: "House Caffee",
    service_image_url: "/images/caffee.png",
    price: "$18-35",
    short_description:
      "Premium coffee and breakfast service delivered to your room.",
  },
  {
    id: 3,
    slug: "baggage-storage",
    name: "Baggage Storage",
    service_image_url: "/images/baggage.png",
    price: "Free",
    short_description:
      "Secure storage for your luggage before check-in or after check-out.",
  },
];
</script>

<template>
  <!-- Enhanced Banner -->
  <section class="mb-16">
    <div class="relative h-[400px] lg:h-[500px] overflow-hidden">
      <div class="absolute inset-0">
        <img
          :src="ServiceDetails.service_image_url"
          alt="Service Image"
          class="w-full h-full object-cover transform scale-105"
        />
        <div
          class="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-transparent"
        ></div>
      </div>

      <div class="absolute inset-0 flex items-center justify-start">
        <div class="text-white container mx-auto">
          <!-- Category Badge -->
          <div class="flex items-center gap-3 mb-6">
            <span
              class="bg-primary/90 text-white px-4 py-2 text-sm font-medium backdrop-blur-sm"
            >
              {{ ServiceDetails.category }}
            </span>
            <span
              class="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 text-sm"
            >
              <Icon name="mdi:clock-outline" class="w-4 h-4" />
              24/7 Access
            </span>
          </div>

          <h1
            class="text-4xl lg:text-5xl font-bold mb-6 leading-tight tracking-tight"
          >
            {{ ServiceDetails.name }}
          </h1>
          <p class="text-lg text-gray-200 mb-8 leading-relaxed max-w-3xl">
            {{ ServiceDetails.short_description }}
          </p>

          <!-- Price & CTA -->
          <div class="flex items-center gap-6 flex-wrap">
            <div class="flex items-center gap-3">
              <div class="text-3xl font-bold text-primary">
                {{ ServiceDetails.price }}
              </div>
              <div class="text-gray-300">
                <p class="text-sm">For hotel guests only</p>
                <p class="text-sm">No reservation required</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div class="animate-bounce">
          <Icon name="mdi:chevron-double-down" class="w-6 h-6 text-white/80" />
        </div>
      </div>
    </div>
  </section>

  <!-- Main Content -->
  <section class="mb-20">
    <div class="container mx-auto">
      <div class="flex flex-col lg:flex-row gap-12">
        <!-- Main Service Content -->
        <div class="w-full lg:w-2/3">
          <article class="bg-primary/10 shadow-2xl p-8 lg:p-12">
            <!-- Content -->
            <div
              v-html="ServiceDetails.description"
              class="prose prose-lg max-w-none mb-12"
            ></div>
          </article>
        </div>

        <!-- Sidebar -->
        <div class="w-full lg:w-1/3 space-y-8">
          <!-- Related Services -->
          <div class="bg-white shadow-2xl p-6">
            <h3
              class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3"
            >
              <div
                class="w-2 h-8 bg-gradient-to-b from-tertiary to-secondary rounded-full"
              ></div>
              <span>You Might Also Like</span>
            </h3>
            <div class="space-y-5">
              <div
                v-for="service in relatedServices"
                :key="service.id"
                class="group hover:bg-gradient-to-r hover:from-gray-50 hover:to-white p-4 rounded-2xl transition-all duration-300 border border-transparent hover:border-gray-200"
              >
                <NuxtLink
                  :to="`/service-details/${service.slug}`"
                  class="flex gap-4"
                >
                  <img
                    :src="service.service_image_url"
                    class="w-20 h-20 object-cover flex-shrink-0 shadow-sm group-hover:shadow-md transition-all"
                  />
                  <div class="flex-1 min-w-0">
                    <h4
                      class="font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2 transition-colors mb-2"
                    >
                      {{ service.name }}
                    </h4>
                    <p class="text-primary font-medium text-sm mb-1">
                      {{ service.price }}
                    </p>
                    <p class="text-xs text-gray-500 line-clamp-2">
                      {{ service.short_description }}
                    </p>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Quick Contact -->
          <div
            class="bg-gradient-to-br from-primary to-secondary p-6 text-white"
          >
            <div class="text-center">
              <Icon
                name="mdi:headset"
                class="w-12 h-12 mx-auto mb-4 text-white/90"
              />
              <h3 class="text-xl font-bold mb-2">Need Help?</h3>
              <p class="text-white/80 mb-4">
                Our concierge team is available 24/7 to assist with any service
                requests.
              </p>
              <div class="space-y-3">
                <div class="flex items-center justify-center gap-2">
                  <Icon name="mdi:phone" class="w-5 h-5" />
                  <span
                    >Front Desk: {{ ServiceDetails.contact.front_desk }}</span
                  >
                </div>
                <div class="flex items-center justify-center gap-2">
                  <Icon name="mdi:phone" class="w-5 h-5" />
                  <span
                    >Wellness:
                    {{ ServiceDetails.contact.wellness_center }}</span
                  >
                </div>
                <button
                  class="w-full bg-white text-primary font-semibold py-3 hover:bg-gray-100 transition-colors mt-4"
                >
                  Call Concierge
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
