<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtRouteAnnouncer />
    <UApp :toaster="appConfig.toaster">
      <NuxtLayout>
        <NuxtPage />
        <NuxtUiToast />
      </NuxtLayout>
    </UApp>
  </div>
</template>

<script setup>
const appConfig = useAppConfig();
</script>

<style>
@import "tailwindcss";
@import "@nuxt/ui";

@theme {
  --color-primary: #7e1218;
  --color-secondary: #d31e28;
  --color-tertiary: #cd986c;
}

/* Hide browser scrollbar completely */
::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for Firefox */
* {
  scrollbar-width: none;
}

/* Hide scrollbar for IE and Edge */
body {
  -ms-overflow-style: none;
  position: relative;
  font-family: "Quicksand", "Raleway", "Roboto Condensed", sans-serif;
  background-color: #fff;
}
</style>
