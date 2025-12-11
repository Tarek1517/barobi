// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },
   runtimeConfig: {
    public: {
      apiUrl: process.env.PUBLIC_API_URL,
    }
  },

  vite: {
    plugins: [tailwindcss()],
  },

  modules: [
    "@nuxt/icon",
    "nuxt-swiper",
    "@nuxt/ui",
    "@nuxt/image",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
  ],
  ssr: false,
});