// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ["@nuxt/icon", "nuxt-swiper", "@nuxt/ui", "@nuxt/image"],
  ssr: false,
});
