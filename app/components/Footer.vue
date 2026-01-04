<script>
  import { useAuthStore } from '@/stores/auth'
const { $api } = useNuxtApp();

const { data: settings } = await useAsyncData('settings', () =>
    $api('/get-settings')
  );
</script>
<template>
  <footer class="bg-primary text-white pt-20 pb-12">
    <div class="container mx-auto px-4">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-16">
        
        <!-- Brand Section -->
        <div class="lg:col-span-1">
          <div class="flex items-center gap-4 mb-6">
            <div class="relative">
              <img
                src="/images/logo2.png"
                alt="LuxStay Apartments"
                class="h-auto w-24 object-cover"
              />
              <div class="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-sm opacity-30 -z-10"></div>
            </div>
          
          </div>
          <p class="text-gray-300 mb-6 font-secondary leading-relaxed text-sm">
            Experience luxury living with our premium apartment bookings. Unmatched comfort, exceptional service, and memorable stays await you.
          </p>
          <div class="flex gap-3">
            <a :href="`${settings.data?.facebook_link}`" target="_blank" class="p-3 bg-white/10  hover:bg-white/20 transition-all duration-300 hover:scale-110">
              <Icon name="mdi:facebook" class="text-xl text-blue-400" />
            </a>
            <a :href="`${settings.data?.instagram_link}`" target="_blank" class="p-3 bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110">
              <Icon name="mdi:instagram" class="text-xl text-pink-400" />
            </a>
            <a :href="`${settings.data?.linkedin_link}`" target="_blank" class="p-3 bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110">
              <Icon name="mdi:linkedin" class="text-xl text-blue-300" />
            </a>
            <a :href="`${settings.data?.youtube_link}`" target="_blank" class="p-3 bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110">
              <Icon name="mdi:youtube" class="text-xl text-red-400" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
          <!-- Company -->
          <div>
            <h3 class="text-white font-primary  font-bold text-lg mb-6 flex items-center gap-2">
              <div class="w-2 h-2 bg-gradient-to-r from-white to-primary rounded-full"></div>
              Useful Links
            </h3>
            <ul class="space-y-4">
              <li>
                <NuxtLink to="/room" class="text-gray-300 font-secondary hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                  <div class="w-1.5 h-1.5 bg-gray-500 rounded-full group-hover:bg-blue-500 transition-colors"></div>
                  Apartments
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/contact" class="text-gray-300 font-secondary  hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                  <div class="w-1.5 h-1.5 bg-gray-500 rounded-full group-hover:bg-blue-500 transition-colors"></div>
                  Contact Us
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/blog" class="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                  <div class="w-1.5 h-1.5 font-secondary bg-gray-500 rounded-full group-hover:bg-blue-500 transition-colors"></div>
                  Blog
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/gallery" class="text-gray-300 font-secondary hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                  <div class="w-1.5 h-1.5 bg-gray-500 rounded-full group-hover:bg-blue-500 transition-colors"></div>
                  Gallery
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Support -->
          <!-- <div>
            <h3 class="text-white font-bold font-primary  text-lg mb-6 flex items-center gap-2">
              <div class="w-2 h-2 bg-gradient-to-r from-white to-primary rounded-full"></div>
              Support
            </h3>
            <ul class="space-y-4">
              <li>
                <NuxtLink to="/help" class="text-gray-300 font-secondary  hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                  <div class="w-1.5 h-1.5 bg-gray-500 rounded-full group-hover:bg-green-500 transition-colors"></div>
                  Help Center
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/faq" class="text-gray-300 font-secondary  hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                  <div class="w-1.5 h-1.5 bg-gray-500 rounded-full group-hover:bg-green-500 transition-colors"></div>
                  FAQs
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/contact" class="text-gray-300 font-secondary  hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                  <div class="w-1.5 h-1.5 bg-gray-500 rounded-full group-hover:bg-green-500 transition-colors"></div>
                  Contact
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/support" class="text-gray-300 font-secondary  hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                  <div class="w-1.5 h-1.5 bg-gray-500 rounded-full group-hover:bg-green-500 transition-colors"></div>
                  24/7 Support
                </NuxtLink>
              </li>
            </ul>
          </div> -->
        </div>

        <!-- Newsletter & App Download -->
        <div class="lg:col-span-1">
          <!-- Newsletter -->
          <div class="bg-white/5 backdrop-blur-sm p-6 mb-8 border border-white/10">
            <h3 class="text-white font-primary font-bold text-lg mb-3">Stay Updated</h3>
            <p class="text-gray-300 font-secondary  text-sm mb-4">
              Get exclusive deals and apartment updates
            </p>
            <div class="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                class="w-full bg-white/10 border border-white/20  px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <button
                class="w-full font-primary  bg-secondary text-white font-semibold py-3 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
              >
                Subscribe
              </button>
            </div>
          </div>

        </div>
      </div>

      <!-- Divider -->
      <div class="relative mb-8">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-white/10"></div>
        </div>
        <div class="relative flex justify-center">
          <span class="bg-secondary px-4 font-primary  text-sm text-white">Barobi Premium</span>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="flex flex-col lg:flex-row justify-between items-center gap-6">
        <!-- Copyright -->
        <div class="text-center lg:text-left">
          <p class="text-gray-400 font-secondary  text-sm">
            &copy; 2025 Barobi Apartments. All rights reserved.
          </p>
          <div class="flex gap-6 mt-2 text-xs text-gray-500">
            <NuxtLink to="/privacy" class="hover:text-gray-300 font-secondary  transition-colors">Privacy Policy</NuxtLink>
            <NuxtLink to="/terms" class="hover:text-gray-300 font-secondary  transition-colors">Terms of Service</NuxtLink>
            <NuxtLink to="/cookies" class="hover:text-gray-300 font-secondary  transition-colors">Cookie Policy</NuxtLink>
          </div>
        </div>

        <!-- Developer Credit -->
        <div class="text-center lg:text-right">
          <p class="text-gray-400 font-secondary  text-sm">
            Crafted by 
            <a
              href="https://creativetechpark.com/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-white  font-primary hover:text-blue-300 transition-colors duration-300 font-medium"
            >
              Creative Tech Park
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// No script needed for static footer
</script>

<style scoped>
/* Custom smooth transitions */
a, button, input {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom gradient text animation */
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.gradient-text {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>