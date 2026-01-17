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


