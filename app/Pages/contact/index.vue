<script setup lang="ts">
import { useRouter } from "#app";

const data = inject("data");
const router = useRouter();

const form = ref({
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  massage: "",
});

const onSubmit = () => {
  console.log("Form submitted:", form.value);
  // You can handle API call here
};
</script>

<template>
  <!-- Hero Banner -->
  <section class="relative h-[400px] lg:h-[500px] overflow-hidden group">
    <!-- Background -->
    <NuxtImg
      src="/images/contact1.png"
      alt="Location banner"
      class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
      loading="eager"
      preload
      format="webp"
      quality="80"
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
          <span class="text-white font-medium">Location</span>
        </nav>

        <h1
          class="text-5xl md:text-7xl text-center font-bold text-white leading-tight tracking-tight"
        >
          Our
          <span class="linear-wipe drop-shadow-lg"> Location </span>
        </h1>
        <p class="text-xl text-center text-gray-200 mt-4">
          Find us easily and plan your visit to our premium apartment
        </p>
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section class="bg-white py-10 lg:py-28">
    <div
      class="max-w-7xl mx-auto grid md:grid-cols-3 gap-10"
    >
      <!-- Info Panel -->
      <div
        class="relative w-full bg-gray-100 h-[450px] lg:h-[550px] bg-[url('/images/01.jpg')] bg-no-repeat bg-center bg-cover flex flex-col justify-end px-4 lg:px-8"
      >
        <div class="flex flex-col lg:flex-row items-start lg:items-end w-full">
          <div class="flex-1 text-start lg:text-left text-black">
            <NuxtLink to="/" class="flex items-start shrink-0">
              <img src="/images/logo.png" alt="ShopEase" class="w-20 h-auto" />
            </NuxtLink>
            <h2 class="text-lg font-semibold my-2">
              Contact with us Any time Anywhere
            </h2>
            <p class="text-sm mb-3 text-gray-600">
              Do you have any Questions? Contact with us and our support team
              will reply to your question.
            </p>
            <div class="flex space-x-4 mb-4">
              <a
                href="#"
                class="group bg-primary/15 p-2 rounded-md transition duration-300 transform hover:scale-110"
                aria-label="Facebook"
              >
                <Icon
                  name="line-md:facebook"
                  class="text-primary transition duration-300"
                />
              </a>
              <a
                href="#"
                class="group bg-primary/15 p-2 rounded-md transition duration-300 transform hover:scale-110"
                aria-label="Twitter"
              >
                <Icon
                  name="line-md:twitter-x"
                  class="text-primary transition duration-300"
                />
              </a>
              <a
                href="#"
                class="group bg-primary/15 p-2 rounded-md transition duration-300 transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <Icon
                  name="basil:linkedin-solid"
                  class="text-primary transition duration-300"
                />
              </a>
              <a
                href="#"
                class="group bg-primary/15 p-2 rounded-md transition duration-300 transform hover:scale-110"
                aria-label="YouTube"
              >
                <Icon
                  name="tdesign:logo-youtube-filled"
                  class="text-primary transition duration-300"
                />
              </a>
              <a
                href="#"
                class="group bg-primary/15 p-2 rounded-md transition duration-300 transform hover:scale-110"
                aria-label="Instagram"
              >
                <Icon
                  name="akar-icons:instagram-fill"
                  class="text-primary transition duration-300"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Form -->
      <div class="md:col-span-2 flex flex-col px-5 lg:px-0">
        <h2 class="text-2xl lg:text-4xl font-bold mb-3 text-gray-800">
          How can we help?
        </h2>
        <p class="mb-3 text-gray-600 text-sm lg:text-lg leading-relaxed">
          Fill in your details below and a member of the team will be in touch.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 py-8">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Name <span class="text-red-600">*</span>
            </label>
            <input
              v-model="form.first_name"
              type="text"
              placeholder="Your name"
              class="w-full border border-primary/15 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition shadow-sm"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Email <span class="text-red-600">*</span>
            </label>
            <input
              v-model="form.email"
              type="email"
              placeholder="Your email"
              class="w-full border border-primary/15 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition shadow-sm"
            />
          </div>
        </div>

        <div class="py-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Subject <span class="text-red-600">*</span>
          </label>
          <input
            v-model="form.phone"
            type="text"
            placeholder="Subject"
            class="w-full border border-primary/15 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition shadow-sm"
          />
        </div>

        <div class="py-2 flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Message <span class="text-red-600">*</span>
          </label>
          <textarea
            v-model="form.massage"
            class="w-full h-32 px-4 py-3 border border-primary/15 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition shadow-sm resize-none"
            placeholder="Your Message"
          ></textarea>
        </div>

        <button
          @click="onSubmit"
          class="mt-3 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 text-sm font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:opacity-95 transition-all w-full lg:w-max"
        >
          Submit
          <Icon name="ep:arrow-right-bold" class="text-white text-base" />
        </button>
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
    #ffff 80%
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
