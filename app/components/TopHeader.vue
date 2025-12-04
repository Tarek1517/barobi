<script setup lang="ts"></script>

<template>
  <!-- Modern Top Header Bar -->
  <div class="bg-primary text-gray-100 text-sm py-2.5">
    <div class="container mx-auto px-1 flex items-center justify-between">
      <!-- Left Side - Info Items -->
      <div class="flex items-start">
        <div class="flex items-center space-x-8">
          <div
            class="flex items-center gap-2 hover:text-gray-400 transition-colors group"
          >
            <Icon
              name="material-symbols:add-call-rounded"
              class="text-xl text-white group-hover:scale-110 transition-transform"
            />
            <span class="font-primary"
              >Contact Us :
              <span class="font-medium font-secondary text-white">09613 787878</span></span
            >
          </div>
          <div
            class="flex items-center gap-2 hover:text-gray-400 transition-colors group"
          >
            <Icon
              name="logos:whatsapp-icon"
              class="text-xl text-white group-hover:scale-110 transition-transform"
            />
            <span class="font-primary">Chat With Us</span>
          </div>
        </div>
      </div>

      <!-- Right Side - Actions -->
      <div class="flex items-center gap-2">
        <div class="flex items-center space-x-4">
          <a
            href="#"
            class="text-white hover:text-blue-400 transition-colors"
            aria-label="Facebook"
          >
            <Icon
              name="mdi:facebook"
              class="text-lg hover:scale-110 transition-transform"
            />
          </a>
          <a
            href="#"
            class="text-white hover:text-pink-400 transition-colors"
            aria-label="Instagram"
          >
            <Icon
              name="mdi:instagram"
              class="text-lg hover:scale-110 transition-transform"
            />
          </a>
          <a
            href="#"
            class="text-white hover:text-blue-400 transition-colors"
            aria-label="Twitter"
          >
            <Icon
              name="mdi:twitter"
              class="text-lg hover:scale-110 transition-transform"
            />
          </a>
          <a
            href="#"
            class="text-white hover:text-red-400 transition-colors"
            aria-label="YouTube"
          >
            <Icon
              name="mdi:youtube"
              class="text-lg hover:scale-110 transition-transform"
            />
          </a>
        </div>
        <div class="h-5 w-px bg-gray-100 mx-3"></div>
        <NuxtLink
          to="/auth/login"
          class="flex items-center font-primary group space-x-1 px-2 py-1 bg-primary hover:bg-background border border-white text-white hover:text-primary font-medium hover:from-primary hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Icon
            name="solar:login-3-bold-duotone"
            class="text-lg group-hover:scale-110 transition-transform"
          />
          <span>Login</span>
        </NuxtLink>
        <NuxtLink
          to="/auth/register"
          class="flex font-primary items-center group space-x-1 px-2 py-1 bg-background hover:bg-primary border border-white text-primary hover:text-white font-bold hover:from-primary hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Icon
            name="carbon:join-node"
            class="text-lg group-hover:scale-110 transition-transform"
          />
          <span>Join Now</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
