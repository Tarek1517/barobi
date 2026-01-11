<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtRouteAnnouncer />
    <GlobalPreloader :is-loading="isLoading" />
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
const isLoading = ref(true);

onMounted(() => {
  // Simulate loading time for initial visit
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
});
</script>

<style>
@import "tailwindcss";
@import "@nuxt/ui";
@font-face {
  font-family: "cambria";
  src: url("/fonts/cambria/cambria.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "effra";
  src: url("/fonts/Effra-VF-Trial/Effra-VF.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

@theme {
  --color-primary: #7e1218;
  --color-secondary: #d31e28;
  --color-tertiary: #cd986c;
  --color-background: #F4F3E2;
}

.font-primary {
  font-family: "cambria", serif !important;
}

.font-secondary {
  font-family: "effra", sans-serif;
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
