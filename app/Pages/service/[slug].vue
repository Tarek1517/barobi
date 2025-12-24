<script setup lang="ts">
import type { Service } from '~/types';

type SingleServiceApiResponse = {
  data: Service;
}
const { data: service } = useAPI < SingleServiceApiResponse > (`/get-service/${useRoute().params?.slug}`);
</script>

<template>
  <!-- Enhanced Banner -->
  <section class="">
    <div class="relative h-[400px] lg:h-[500px] overflow-hidden">
      <div class="absolute inset-0">
        <img :src="service?.data?.image" alt="Service Image" class="w-full h-full object-cover transform scale-105" />
        <div class="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-transparent"></div>
      </div>

      <div class="absolute inset-0 flex items-center justify-start">
        <div class="text-white container mx-auto">
          <!-- Category Badge -->
          <div class="flex font-secondary  items-center gap-3 mb-6">
            <span class="bg-primary/90 text-white px-4 py-2 text-sm font-medium backdrop-blur-sm">
              {{ service?.data?.category }}
            </span>
            <span class="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 text-sm">
              <Icon name="mdi:clock-outline" class="w-4 h-4" />
              {{ service?.data?.hours }}
            </span>
          </div>

          <h1 class="text-4xl lg:text-5xl font-primary  font-bold mb-6 leading-tight tracking-tight">
            {{ service?.data?.title }}
          </h1>
          <p class="text-lg text-gray-200 font-secondary mb-8 leading-relaxed max-w-3xl">
            {{ service?.data?.short_description }}
          </p>

          <!-- Price & CTA -->
          <div class="flex items-center gap-6 flex-wrap">
            <div class="flex font-secondary items-center gap-3">
              <div class="text-3xl font-primary font-bold text-primary">
                {{ service?.data?.price }}
              </div>
              <div class="text-gray-300">
                <p class="text-sm">{{ service?.data?.price_note }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div class="animate-bounce">
          <Icon name="mdi:chevron-double-down" class="w-6 h-6 text-white/80" />
        </div>
      </div>
    </div>
  </section>

  <!-- Main Content -->
  <section class="bg-background py-20">
    <div class="container mx-auto">
      <div class="flex flex-col lg:flex-row gap-12">
        <!-- Main Service Content -->
        <div class="w-full lg:w-2/3">
          <article class="bg-primary/10 shadow-2xl p-8 lg:p-12">
            <!-- Content -->
            <div
              v-html="service?.data?.description"
              class="prose prose-lg max-w-full break-words overflow-hidden font-secondary mb-12"
            ></div>
          </article>
        </div>

        <!-- Sidebar -->
        <div class="w-full lg:w-1/3 space-y-8">
          <!-- Related Services -->
          <div class="bg-white shadow-2xl p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div class="w-2 h-8 bg-gradient-to-b from-tertiary to-secondary rounded-full"></div>
              <span class="font-primary">You Might Also Like</span>
            </h3>
            <div class="space-y-5">
              <div v-for="related_service in service?.data?.latest_service" :key="related_service.id"
                class="group hover:bg-gradient-to-r hover:from-gray-50 hover:to-white p-4 rounded-2xl transition-all duration-300 border border-transparent hover:border-gray-200">
                <NuxtLink :to="`/service/${related_service.slug}`" class="flex gap-4">
                  <img :src="related_service.image"
                    class="w-20 h-20 object-cover flex-shrink-0 shadow-sm group-hover:shadow-md transition-all" />
                  <div class="flex-1 min-w-0">
                    <h4
                      class="font-semibold font-primary text-gray-900 group-hover:text-blue-600 line-clamp-2 transition-colors mb-2">
                      {{ related_service.title }}
                    </h4>
                    <p class="text-primary font-primary font-medium text-sm mb-1">
                      {{ related_service.price }}
                    </p>
                    <p class="text-xs font-secondary text-gray-500 line-clamp-2">
                      {{ related_service.short_description }}
                    </p>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Quick Contact -->
          <!-- <div class="bg-gradient-to-br from-primary to-secondary p-6 text-white">
            <div class="text-center">
              <Icon name="mdi:headset" class="w-12 h-12 mx-auto mb-4 text-white/90" />
              <h3 class="text-xl font-primary font-bold mb-2">Need Help?</h3>
              <p class="text-white/80 font-secondary mb-4">
                Our concierge team is available 24/7 to assist with any service
                requests.
              </p>
              <div class="space-y-3">
                <div class="flex font-secondary items-center justify-center gap-2">
                  <Icon name="mdi:phone" class="w-5 h-5" />
                  <span>Front Desk: {{ ServiceDetails.contact.front_desk }}</span>
                </div>
                <div class="flex font-secondary items-center justify-center gap-2">
                  <Icon name="mdi:phone" class="w-5 h-5" />
                  <span>Wellness:
                    {{ ServiceDetails.contact.wellness_center }}</span>
                </div>
                <button
                  class="w-full bg-white font-primary text-primary font-semibold py-3 hover:bg-gray-100 transition-colors mt-4">
                  Call Concierge
                </button>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
