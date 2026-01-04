<script setup lang="ts">

  const { $api } = useNuxtApp();

const { data: settings } = await useAsyncData('settings', () =>
    $api('/get-settings')
  );
</script>

<template>
  <!-- Location & Contact Section -->
  <section class="bg-background py-20">
    <div class="container mx-auto text-center mb-8 px-6">
      <h2 class="text-2xl bg-primary font-primary font-semibold text-white py-3">
        Click Here to get Directions Via google map on your Devices
      </h2>
    </div>
    <div class="container mx-auto flex flex-col lg:flex-row gap-8 px-6">
      <!-- Left Column - Map -->
      <div class="lg:w-1/2">
        <div class="bg-white shadow-xl overflow-hidden border border-gray-200">
          <!-- Map Container -->
          <div class="h-96 lg:h-[540px] bg-gray-100 border-18 border-primary relative">
            <div>
              <iframe
                :src="settings.data?.google_link"
                width="100%" height="500" style="border: 0" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>

            <!-- Map Controls -->
            <div class="absolute top-4 right-4 flex flex-col gap-2">
              <button
                class="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Icon name="mdi:plus" class="text-gray-700" />
              </button>
              <button
                class="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Icon name="mdi:minus" class="text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column - Contact Information -->
      <div class="lg:w-1/2">
        <div class="bg-white py-12">
          <!-- Address -->
          <div class="mb-8">
            <div class="flex flex-col items-center gap-1">
              <Icon name="ep:home-filled" class="text-primary text-2xl flex-shrink-0" />
              <h3 class="text-xl lg:text-2xl font-primary font-semibold text-gray-800">
                BAROBI APARTMENT
              </h3>
              <p class="text-gray-700 text-center font-secondary w-full max-w-sm leading-relaxed">
                {{ settings.data?.address }}
              </p>
            </div>
          </div>

          <!-- Address -->
          <div class="mb-8">
            <div class="flex flex-col items-center gap-1">
              <Icon name="material-symbols:call-sharp" class="text-primary text-2xl flex-shrink-0" />
              <div 
                class="flex items-center gap-1 font-secondary group cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <div class="text-center">
                  <span class="text-base font-primary font-semibold text-gray-900 block">
                    Reservations
                  </span>
                  <span class="text-gray-900 font-medium group-hover:text-blue-600 transition-colors">
                    {{ settings.data?.phone_number }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Email -->
          <div class="mb-8">
            <div class="flex flex-col items-center gap-1">
              <Icon name="ic:sharp-alternate-email" class="text-red-500 mt-1 text-2xl flex-shrink-0" />
              <div>
                <a :href="`mailto:${settings.data?.email}`"
                  class="text-gray-900 font-primary font-medium hover:text-blue-600 transition-colors break-all">
                  {{ settings.data?.email }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.linear-wipe {
  text-align: center;
  background: linear-gradient(to right,
      #7e1218 20%,
      #cd986c 40%,
      #cd986c 60%,
      #1f2d3e 80%);
  background-size: 200% auto;
  color: #000;
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
</style>
