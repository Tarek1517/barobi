<template>
  <Transition name="fade">
    <div
      v-if="isLoading"
      class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F4F3E2]"
    >
      <div class="relative flex flex-col items-center justify-center">
        <!-- Logo or Brand Icon Placeholder -->
        <div class="mb-8 relative">
          <div
            class="absolute inset-0 rounded-full bg-[#7e1218] opacity-20 animate-ping"
          ></div>
          <div
            class="relative flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-xl border-2 border-[#7e1218]/10"
          >
            <!-- Using a simple SVG icon for premium feel if no logo available -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-12 h-12 text-[#7e1218]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"
              />
              <path
                d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"
              />
            </svg>
          </div>
        </div>

        <!-- Loading Text -->
        <div class="space-y-3 text-center">
          <h1
            class="text-2xl font-bold tracking-widest text-[#7e1218] font-primary uppercase"
          >
            Barobi
          </h1>
          <div class="w-32 h-1 mx-auto overflow-hidden bg-[#7e1218]/10 rounded-full">
            <div class="w-full h-full bg-[#7e1218] animate-progress"></div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  isLoading: boolean;
}>();
</script>

<style scoped>
.font-primary {
  font-family: "cambria", serif;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes progress {
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-progress {
  animation: progress 1.5s infinite linear;
}
</style>
