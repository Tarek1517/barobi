<script setup lang="ts">
import type { Offer } from '~/types';

const route = useRoute();
const slug = route.params.slug as string;

// Fetch offers using the existing API endpoint
// In a real app, we would prefer an endpoint like `/get-offer/${slug}`
type ApiResponse = {
  data: Offer[];    
}

const { data: offer, error } = await useAPI<ApiResponse>('/get-offer/' + slug);

// Format dates
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
</script>

<template>
    <div class="min-h-screen bg-neutral-50 font-primary">
        <!-- Loading State -->
        <div v-if="!offer?.data && !error" class="flex items-center justify-center h-screen">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>

        <!-- Error State -->
        <div v-else-if="error || (!offer?.data)" class="container mx-auto px-4 py-20 text-center">
            <h1 class="text-3xl font-bold text-gray-800 mb-4">Offer Not Found</h1>
            <p class="text-gray-600 mb-8">Sorry, looking for this offer seems to have expired or does not exist.</p>
            <NuxtLink to="/" class="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                Back to Home
            </NuxtLink>
        </div>

        <div v-else-if="offer?.data" class="animate-fade-in">
            <div class="relative h-[50vh] min-h-[400px] w-full overflow-hidden group">
                <div class="absolute inset-0 bg-black/40 z-10 transition-opacity duration-700 group-hover:bg-black/30"></div>
                <img 
                    :src="offer?.data.image" 
                    :alt="offer?.data.title" 
                    class="w-full h-full object-cover transition-transform duration-1000 scale-105 group-hover:scale-100"
                />
                <div class="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                    <span class="inline-block py-1 px-3 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-white font-secondary text-sm tracking-widest uppercase mb-4 animate-slide-up">
                        {{ offer?.data.category }}
                    </span>
                    <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl animate-scale-in">
                        {{ offer?.data.title }}
                    </h1>
                     <div class="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 animate-slide-up animation-delay-200">
                         <span class="text-2xl md:text-3xl font-bold text-white">{{ offer?.data.offer }}</span>
                     </div>
                </div>
            </div>

            <div class="container mx-auto px-4 py-12 -mt-20 relative z-30">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div class="lg:col-span-2 space-y-8">
                        <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 transition-transform hover:-translate-y-1 duration-300">
                            <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span class="w-2 h-8 bg-gradient-to-b from-primary to-orange-400 rounded-full"></span>
                                Offer Details
                            </h2>
                            <div class="prose max-w-none text-gray-600 leading-relaxed font-secondary text-lg">
                                <p>{{ offer?.data?.description }}</p>
                            </div>
                            
                            <!-- Tags -->
                            <div class="mt-8 flex flex-wrap gap-2">
                                <span v-for="tag in offer?.data?.tag_line" :key="tag" 
                                    class="px-3 py-1 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium border border-gray-200 hover:border-primary/50 hover:text-primary transition-colors cursor-default"
                                >
                                    # {{ tag }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column: Sidebar info -->
                    <div class="lg:col-span-1 space-y-6">
                        <!-- Validity Card -->
                         <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/50 sticky top-24">
                            <h3 class="text-xl font-bold text-gray-900 mb-6 border-b pb-2">Validity</h3>
                            
                            <div class="space-y-4">
                                <div class="flex items-center gap-4 group">
                                    <div class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                    </div>
                                    <div>
                                        <p class="text-xs text-gray-500 uppercase font-semibold">Start Date</p>
                                        <p class="text-gray-800 font-medium">{{ formatDate(offer?.data?.start_date) }}</p>
                                    </div>
                                </div>

                                <div class="flex items-center gap-4 group">
                                    <div class="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                    </div>
                                    <div>
                                        <p class="text-xs text-gray-500 uppercase font-semibold">Expiry Date</p>
                                        <p class="text-gray-800 font-medium">{{ formatDate(offer?.data?.expiry_date) }}</p>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-8">
                                <a 
                                    :href="`https://wa.me/${offer?.data?.whatsapp_number}?text=I'm interested in the offer: ${offer?.data?.title}`"
                                    target="_blank"
                                    class="w-full py-4 bg-[#25D366] text-white rounded-xl font-bold shadow-lg shadow-green-500/20 hover:shadow-green-500/40 hover:-translate-y-0.5 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <Icon name="iconamoon:whatsapp" class="w-6 h-6" />
                                    WhatsApp
                                </a>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.8s ease-out;
}
.animate-slide-up {
    animation: slideUp 0.8s ease-out forwards;
    opacity: 0;
    transform: translateY(20px);
}
.animate-scale-in {
    animation: scaleIn 0.8s ease-out 0.2s forwards;
    opacity: 0;
    transform: scale(0.9);
}
.animation-delay-200 {
    animation-delay: 0.2s;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
@keyframes slideUp {
    to { opacity: 1; transform: translateY(0); }
}
@keyframes scaleIn {
    to { opacity: 1; transform: scale(1); }
}
</style>
