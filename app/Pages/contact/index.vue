<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "#app";

const { $api } = useNuxtApp();

const { data: settings } = await useAsyncData('settings', () =>
  $api('/get-settings')
);

// Form state
const form = ref({
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
});

// Errors state
const errors = ref<Record<string, string>>({});

// Simple frontend validation
const validateForm = () => {
  errors.value = {}; // reset previous errors
  let isValid = true;

  if (!form.value.name) {
    errors.value.name = "Name is required";
    isValid = false;
  }
  if (!form.value.email) {
    errors.value.email = "Email is required";
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(form.value.email)) {
    errors.value.email = "Email is not valid";
    isValid = false;
  }
  if (!form.value.phone) {
    errors.value.phone = "Phone is required";
    isValid = false;
  }

  if (!form.value.subject) {
    errors.value.subject = "Subject is required";
    isValid = false;
  }
  if (!form.value.message) {
    errors.value.message = "Message is required";
    isValid = false;
  }

  return isValid;
};

const onSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  try {
    await $api('/contact', {
      method: 'POST',
      body: form.value,
    });

    form.value = {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    };
    errors.value = {};
    alert("Message sent successfully!");
  } catch (err: any) {
      console.error("Failed to submit contact form:", err);
      alert("Something went wrong. Please try again later.");
  }
};
</script>


<template>
  <!-- Hero Banner -->
  <section class="relative h-[400px] lg:h-[500px] overflow-hidden group">
    <!-- Background -->
    <img src="/images/contact1.png" alt="Location banner"
      class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
      loading="eager" />
    <!-- Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-r from-black/30 via-black/40 to-black/25"></div>

    <!-- Content -->
    <div class="container h-full mx-auto px-4 flex items-center justify-center relative z-10">
      <div class="max-w-5xl space-y-4">
        <nav class="flex items-center  font-primary justify-center text-white/90 text-sm mb-6">
          <NuxtLink to="/" class="hover:text-primary transition-colors duration-300 flex items-center">
            <Icon name="mdi:home-outline" class="mr-1" /> Home
          </NuxtLink>
          <Icon name="iconamoon:arrow-right-2" class="mx-3 text-xs opacity-70" />
          <span class="text-white font-medium">Location</span>
        </nav>

        <h1 class="text-5xl md:text-7xl font-primary text-center font-bold text-white leading-tight tracking-tight">
          Our
          <span class="linear-wipe drop-shadow-lg"> Location </span>
        </h1>
        <p class="text-xl font-secondary text-center text-gray-200 mt-4">
          Find us easily and plan your visit to our premium apartment
        </p>
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section class="bg-background py-10 lg:py-28">
    <div class="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 px-6">
      <!-- Info Panel -->
      <div
        class="relative w-full bg-gray-100 h-[450px] lg:h-[580px] bg-[url('/images/01.jpg')] bg-no-repeat bg-center bg-cover flex flex-col justify-end px-4 lg:px-8">
        <div class="flex flex-col lg:flex-row items-start lg:items-end w-full">
          <div class="flex-1 text-start lg:text-left text-black">
            <NuxtLink to="/" class="flex items-start shrink-0">
              <img src="/images/logo.png" alt="ShopEase" class="w-20 h-auto" />
            </NuxtLink>
            <h2 class="text-lg font-primary font-semibold my-2">
              Contact with us Any time Anywhere
            </h2>
            <p class="text-sm font-secondary mb-3 text-gray-600">
              Do you have any Questions? Contact with us and our support team
              will reply to your question.
            </p>
            <div class="flex space-x-4 mb-4">
              <a :href="settings?.data?.facebook_link"
                class="group bg-primary/15 p-2 rounded-md transition duration-300 transform hover:scale-110"
                aria-label="Facebook">
                <Icon name="line-md:facebook" class="text-primary transition duration-300" />
              </a>
              <a :href="settings?.data?.linkedin_link"
                class="group bg-primary/15 p-2 rounded-md transition duration-300 transform hover:scale-110"
                aria-label="LinkedIn">
                <Icon name="basil:linkedin-solid" class="text-primary transition duration-300" />
              </a>
              <a :href="settings?.data?.youtube_link"
                class="group bg-primary/15 p-2 rounded-md transition duration-300 transform hover:scale-110"
                aria-label="YouTube">
                <Icon name="tdesign:logo-youtube-filled" class="text-primary transition duration-300" />
              </a>
              <a :href="settings?.data?.instagram_link"
                class="group bg-primary/15 p-2 rounded-md transition duration-300 transform hover:scale-110"
                aria-label="Instagram">
                <Icon name="akar-icons:instagram-fill" class="text-primary transition duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Form -->
      <div class="bg-white md:col-span-2 flex flex-col px-10 py-5">
        <h2 class="text-2xl font-primary lg:text-4xl font-bold mb-3 text-gray-800">
          How can we help?
        </h2>
        <p class="mb-3 font-secondary text-gray-600 text-sm lg:text-lg leading-relaxed">
          Fill in your details below and a member of the team will be in touch.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 py-8">
          <div>
            <label class="block text-sm font-secondary font-medium text-gray-700 mb-1">
              Name <span class="text-red-600">*</span>
            </label>
            <input v-model="form.name" type="text" placeholder="Your name"
              class="w-full border border-primary/15 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition shadow-sm" />
              <p v-if="errors.name" class="text-red-600 text-xs mt-1">{{ errors.name }}</p>
          </div>
          <div>
            <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">
              Email <span class="text-red-600">*</span>
            </label>
            <input v-model="form.email" type="email" placeholder="Your email"
              class="w-full border border-primary/15 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition shadow-sm" />
              <p v-if="errors.email" class="text-red-600 text-xs mt-1">{{ errors.email }}</p>
          </div>
        </div>
        <div class="py-2">
          <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">
            Phone <span class="text-red-600">*</span>
          </label>
          <input v-model="form.phone" type="tel" placeholder="Phone"
            class="w-full border border-primary/15 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition shadow-sm" />
            <p v-if="errors.phone" class="text-red-600 text-xs mt-1">{{ errors.phone }}</p>
        </div>
        <div class="py-2">
          <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">
            Subject <span class="text-red-600">*</span>
          </label>
          <input v-model="form.subject" type="text" placeholder="Subject"
            class="w-full border border-primary/15 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition shadow-sm" />
            <p v-if="errors.subject" class="text-red-600 text-xs mt-1">{{ errors.subject }}</p>
        </div>

        <div class="py-2 flex-1">
          <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">
            Message <span class="text-red-600">*</span>
          </label>
          <textarea v-model="form.message"
            class="w-full h-32 px-4 py-3 border border-primary/15 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition shadow-sm resize-none"
            placeholder="Your Message"></textarea>
            <p v-if="errors.message" class="text-red-600 text-xs mt-1">{{ errors.message }}</p>
        </div>

        <button @click="onSubmit"
          class="mt-3 bg-gradient-to-r font-primary from-primary to-secondary text-white px-6 py-3 text-sm font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:opacity-95 transition-all w-full lg:w-max">
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
  background: linear-gradient(to right,
      #7e1218 20%,
      #cd986c 40%,
      #cd986c 60%,
      #ffff 80%);
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
