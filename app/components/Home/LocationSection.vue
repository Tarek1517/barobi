<script setup lang="ts">

const { $api } = useNuxtApp();

const { data: settings } = await useAsyncData('settings', () =>
    $api('/get-settings')
);
</script>

<template>
  <section class="bg-background py-20">
    <div class="container mx-auto text-center mb-8 px-6">
      <h2 class="text-2xl bg-primary font-primary font-semibold text-white py-3">
        Click Here to get Directions Via google map on your Devices
      </h2>
    </div>

    <div class="container mx-auto flex flex-col lg:flex-row items-stretch gap-8 px-6">
      
      <div class="lg:w-1/2 flex">
        <div class="bg-white shadow-xl overflow-hidden border border-gray-200 w-full flex flex-col">
          <div class="flex-grow min-h-[400px] lg:min-h-full bg-gray-100 border-[18px] border-primary relative">
            <iframe
              :src="settings.data?.google_link"
              width="100%" 
              height="100%" 
              style="border: 0; " 
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              class="absolute inset-0 w-full h-full"
            ></iframe>
            
            </div>
        </div>
      </div>

      <div class="lg:w-1/2 flex">
        <div class="bg-white py-12 px-6 border border-gray-100 shadow-xl w-full flex flex-col justify-center">
          <div class="mb-8 text-center">
            <div class="flex flex-col items-center gap-2">
              <Icon name="ep:home-filled" class="text-primary text-3xl flex-shrink-0" />
              <h3 class="text-xl lg:text-2xl font-primary font-semibold text-gray-800">
                BAROBI APARTMENT
              </h3>
              <p class="text-gray-700 font-secondary w-full max-w-sm leading-relaxed">
                {{ settings.data?.address }}
              </p>
            </div>
          </div>

          <div class="mb-8 text-center">
            <div class="flex flex-col items-center gap-2">
              <Icon name="material-symbols:call-sharp" class="text-primary text-3xl flex-shrink-0" />
              <div class="font-secondary group cursor-pointer p-2 rounded-lg transition-colors">
                <span class="text-base font-primary font-semibold text-gray-900 block">
                  Reservations
                </span>
                <span class="text-gray-900 font-medium group-hover:text-blue-600 transition-colors">
                  {{ settings.data?.phone_number }}
                </span>
              </div>
            </div>
          </div>

          <div class="text-center">
            <div class="flex flex-col items-center gap-2">
              <Icon name="ic:sharp-alternate-email" class="text-red-500 text-3xl flex-shrink-0" />
              <a :href="`mailto:${settings.data?.email}`"
                class="text-gray-900 font-primary font-medium hover:text-blue-600 transition-colors break-all">
                {{ settings.data?.email }}
              </a>
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
