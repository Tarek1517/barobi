import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  ssr: false,   
  
  devtools: { enabled: false },

  app: {
    baseURL: '/', 
    buildAssetsDir: '/_nuxt/',
  },

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
});