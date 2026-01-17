<script setup lang="ts">
import { ref, watch } from "vue";

const { $api } = useNuxtApp();

// Fetch Settings
const { data: settings } = await useAsyncData('settings', () =>
  $api('/get-settings')
);

// Fetch FAQs
const { data: faqResponse } = await useAsyncData('faqs', () =>
  $api('/get-faqs')
);

// FAQ State management
const faqItems = ref<any[]>([]);

// Initialize FAQ items when data is available
watch(faqResponse, (newVal) => {
  if (newVal?.data) {
    faqItems.value = newVal.data.map((faq: any) => ({
      ...faq,
      open: false
    }));
  }
}, { immediate: true });

const toggleFAQ = (faq: any) => {
  faq.open = !faq.open;
};

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

const validateForm = () => {
  errors.value = {};
  let isValid = true;
  if (!form.value.name) { errors.value.name = "Name is required"; isValid = false; }
  if (!form.value.email) { errors.value.email = "Email is required"; isValid = false; }
  else if (!/^\S+@\S+\.\S+$/.test(form.value.email)) { errors.value.email = "Email is not valid"; isValid = false; }
  if (!form.value.phone) { errors.value.phone = "Phone is required"; isValid = false; }
  if (!form.value.subject) { errors.value.subject = "Subject is required"; isValid = false; }
  if (!form.value.message) { errors.value.message = "Message is required"; isValid = false; }
  return isValid;
};

const onSubmit = async () => {
  if (!validateForm()) return;
  try {
    await $api('/contact', {
      method: 'POST',
      body: form.value,
    });
    form.value = { name: "", email: "", phone: "", subject: "", message: "" };
    errors.value = {};
    alert("Message sent successfully!");
  } catch (err: any) {
    console.error("Failed to submit contact form:", err);
    alert("Something went wrong. Please try again later.");
  }
};
</script>

<template>
  <section class="relative h-[400px] lg:h-[500px] overflow-hidden group">
    <img src="/images/contact1.png" alt="Location banner"
      class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
      loading="eager" />
    <div class="absolute inset-0 bg-gradient-to-r from-black/30 via-black/40 to-black/25"></div>
    <div class="container h-full mx-auto px-4 flex items-center justify-center relative z-10">
      <div class="max-w-5xl space-y-4 text-center">
        <nav class="flex items-center font-primary justify-center text-white/90 text-sm mb-6">
          <NuxtLink to="/" class="hover:text-primary transition-colors duration-300 flex items-center">
            <Icon name="mdi:home-outline" class="mr-1" /> Home
          </NuxtLink>
          <Icon name="iconamoon:arrow-right-2" class="mx-3 text-xs opacity-70" />
          <span class="text-white font-medium">Contact</span>
        </nav>
        <h1 class="text-5xl md:text-7xl font-primary font-bold text-white leading-tight tracking-tight">
          <span class="linear-wipe drop-shadow-lg">Contact Us</span>
        </h1>
        <p class="text-xl font-secondary text-gray-200 mt-4">Find us easily and plan your visit</p>
      </div>
    </div>
  </section>

  <section class="bg-background py-10 lg:pt-28 lg:pb-10">
    <div class="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 px-6">
      <div
        class="relative w-full bg-gray-100 h-[450px] lg:h-[580px] bg-[url('/images/01.jpg')] bg-no-repeat bg-center bg-cover flex flex-col justify-end px-4 lg:px-8 pb-8">
        <div class="bg-white/90 p-6 rounded shadow-sm">
          <NuxtLink to="/" class="inline-block mb-4">
            <img src="/images/logo.png" alt="Logo" class="w-20 h-auto" />
          </NuxtLink>
          <h2 class="text-lg font-primary font-semibold mb-2">Contact with us</h2>
          <p class="text-sm font-secondary mb-4 text-gray-600">Do you have questions? Our support team is here to help.
          </p>
          <div class="flex space-x-4">
            <a v-for="social in ['facebook', 'linkedin', 'youtube', 'instagram']" :key="social"
              :href="settings?.data?.[social + '_link']"
              class="bg-primary/15 p-2 rounded-md hover:scale-110 transition">
              <Icon
                :name="social === 'facebook' ? 'line-md:facebook' : social === 'linkedin' ? 'basil:linkedin-solid' : social === 'youtube' ? 'tdesign:logo-youtube-filled' : 'akar-icons:instagram-fill'"
                class="text-primary" />
            </a>
          </div>
        </div>
      </div>

      <div class="bg-white md:col-span-2 flex flex-col px-10 py-5">
        <h2 class="text-2xl font-primary lg:text-4xl font-bold mb-3 text-gray-800">How can we help?</h2>
        <p class="mb-3 font-secondary text-gray-600 text-sm lg:text-lg">Fill in your details below and we will be in
          touch.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 py-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input v-model="form.name" type="text"
              class="w-full border border-primary/15 px-4 py-2 focus:ring-2 focus:ring-primary outline-none" />
            <p v-if="errors.name" class="text-red-600 text-xs mt-1">{{ errors.name }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input v-model="form.email" type="email"
              class="w-full border border-primary/15 px-4 py-2 focus:ring-2 focus:ring-primary outline-none" />
            <p v-if="errors.email" class="text-red-600 text-xs mt-1">{{ errors.email }}</p>
          </div>
        </div>
        <div class="py-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
          <input v-model="form.phone" type="tel"
            class="w-full border border-primary/15 px-4 py-2 focus:ring-2 focus:ring-primary outline-none" />
          <p v-if="errors.phone" class="text-red-600 text-xs mt-1">{{ errors.phone }}</p>
        </div>
        <div class="py-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
          <input v-model="form.subject" type="text"
            class="w-full border border-primary/15 px-4 py-2 focus:ring-2 focus:ring-primary outline-none" />
          <p v-if="errors.subject" class="text-red-600 text-xs mt-1">{{ errors.subject }}</p>
        </div>
        <div class="py-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Message *</label>
          <textarea v-model="form.message"
            class="w-full h-32 px-4 py-3 border border-primary/15 focus:ring-2 focus:ring-primary outline-none resize-none"></textarea>
          <p v-if="errors.message" class="text-red-600 text-xs mt-1">{{ errors.message }}</p>
        </div>
        <button @click="onSubmit"
          class="mt-4 bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 font-medium hover:shadow-lg transition-all w-full lg:w-max">
          Submit Message
        </button>
      </div>
    </div>
  </section>

  <section class="bg-background pb-20 pt-10">
    <div class="max-w-4xl mx-auto px-6">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-primary font-bold text-gray-900">
          Frequently Asked Questions
        </h2>
        <div class="w-20 h-1 bg-primary mx-auto mt-4"></div>
      </div>

      <div class="space-y-4">
        <div v-for="(faq, index) in faqItems" :key="index"
          class="bg-white border border-gray-100 shadow-sm transition-all duration-300">
          <button @click="toggleFAQ(faq)"
            class="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none group">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 mt-1">
                <div
                  class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <span class="text-primary font-bold">Q</span>
                </div>
              </div>
              <h3 class="text-lg font-primary font-semibold text-gray-800 leading-snug">
                {{ faq.question }}
              </h3>
            </div>

            <Icon name="tabler:chevron-down"
              class="text-primary transition-transform duration-300 w-6 h-6 flex-shrink-0 ml-4"
              :class="{ 'rotate-180': faq.open }" />
          </button>

          <div v-if="faq.open" class="px-6 pb-6 pt-2 animate-fadeIn">
            <div class="flex items-start gap-4 border-t border-gray-50 pt-5">
              <div class="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <span class="text-secondary font-bold">A</span>
              </div>
              <p class="text-gray-600 text-lg leading-relaxed">
                {{ faq.answer }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.linear-wipe {
  background: linear-gradient(to right, #7e1218 20%, #cd986c 40%, #cd986c 60%, #fff 80%);
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

.animate-fadeIn {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>