<script setup lang="ts">
const isExpanded = ref(false);

const fullText = `Discover a new level of comfort, convenience, and elevated living at Barobi Apartment — a modern hospitality concept designed for travelers seeking a seamless blend of privacy, space, and hotel-standard service. Ideally located just 3 minutes from Hazrat Shahjalal International Airport, Dhaka. Barobi Apartment is the perfect destination for families, business travelers, corporate guests, expatriates, and long-stay visitors who value accessibility without compromising comfort. With 20 beautifully designed rooms spread across four thoughtfully curated categories, each living space reflects modern design, warm tones, and premium furnishing to ensure a calming and restful environment. Guests can choose from our spacious Family Suite (700 sq. ft), stylish Executive Suite Large (545 sq. ft) and Executive Suite (503 sq. ft) or the cozy yet elegant Premium Deluxe (302 sq. ft). Each room includes essential modern amenities, ensuring a relaxing stay—whether for a single night or an extended visit. For guests looking to unwind, the Lobby Garden Coffee Shop being set will offer a peaceful Environment—surrounded by natural tones and greenery, ideal for enjoying coffee, reading, working, or informal conversation. Business guests will also appreciate our private meeting room once stablished will, designed to accommodate up to 10 persons with comfort, privacy, and a professional setting for discussions, presentations, and virtual meetings. From thoughtful design to attentive service, Barobi Apartment offers a welcoming environment built around convenience, comfort, and modern hospitality values. Whether your journey is for business, leisure, or a transition between destinations, we invite you to experience genuine hospitality where every detail is crafted to make you feel at home. At Barobi Apartment, you'll feel right at home away from your home.`;

// Split text into words and get first 20 words
const words = fullText.split(" ");
const shortText = words.slice(0, 30).join(" ") + "...";

const displayText = computed(() => {
  return isExpanded.value ? fullText : shortText;
});

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

<template>
  <section class="pt-32 pb-12 bg-background">
    <!-- First Row: Image Left, Content Right -->
    <div class="container mx-auto px-4 mb-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Left Content - Image -->
        <div class="relative group">
          <div class="relative overflow-hidden shadow-2xl">
            <img src="/images/about-t1.jpg" alt="Luxury Hotel Experience"
              class="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700" />
            <!-- Gradient Overlay -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            </div>
          </div>

          <!-- Floating Testimonial -->
          <div class="absolute -bottom-6 -right-6 bg-white shadow-2xl p-4 border border-primary/30">
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <Icon name="mdi:star" class="w-6 h-6 text-white" />
              </div>
              <div class="font-primary">
                <div class="text-2xl font-bold text-gray-900">4.9/5</div>
                <div class="font-secondary text-sm text-gray-600">
                  Guest Rating
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Content - Text -->
        <div class="space-y-4 lg:pl-12">
          <!-- Heading -->
          <h1 class="text-5xl font-primary font-bold text-gray-900 leading-tight">
            Experience
            <span class="linear-wipe">Luxury</span>
            <br />Living
          </h1>

          <!-- Description -->
          <!-- Description -->
          <p class="font-secondary text-lg text-gray-600 leading-relaxed font-light">
            {{ displayText }}
            <button @click="toggleExpand" class="text-secondary hover:text-primary font-medium ml-1 focus:outline-none">
              {{ isExpanded ? "Show Less" : "Read More" }}
            </button>
          </p>


          <!-- CTA Button -->
          <NuxtLink to="/room"
            class="group relative bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-4 px-10 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden inline-block">
            <span class="relative z-10 font-primary flex items-center gap-3">
              <Icon name="mdi:calendar-check" class="w-5 h-5 group-hover:scale-110 transition-transform" />
              Book Your Stay
            </span>
            <div
              class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000">
            </div>
          </NuxtLink>

        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Gradient Text Animation */
.linear-wipe {
  text-align: center;
  background: linear-gradient(to right,
      #7e1218 20%,
      #cd986c 40%,
      #cd986c 60%,
      #1f2d3e 80%);
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
