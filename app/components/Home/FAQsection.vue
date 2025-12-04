<script setup>
import { ref } from 'vue'

const faqs = ref([
  {
    question: 'What are the check-in and check-out times at Barobi Apartments?',
    answer: 'Check-in time is at 3:00 PM and check-out time is at 11:00 AM. Early check-in and late check-out may be available upon request, subject to availability and additional charges.',
    open: false
  },
  {
    question: 'Is parking available at Barobi Apartments?',
    answer: 'Yes, we offer complimentary parking for our guests. Each apartment comes with one designated parking space. Additional parking may be available upon request.',
    open: false
  },
  {
    question: 'Are the apartments pet-friendly?',
    answer: 'Barobi Apartments welcomes pets with prior notification. We allow up to 2 pets per apartment with a non-refundable pet fee. Please ensure pets are leashed in common areas.',
    open: false
  },
  {
    question: 'What amenities are included in the apartments?',
    answer: 'All our apartments include fully equipped kitchens, high-speed Wi-Fi, smart TVs, air conditioning, heating, linens, towels, and basic toiletries. Some units also feature balconies with city views.',
    open: false
  },
  {
    question: 'Is there a minimum stay requirement?',
    answer: 'Yes, we have a minimum stay of 2 nights for most periods. During peak seasons and holidays, the minimum stay may extend to 3-5 nights.',
    open: false
  },
  
])

const toggleFAQ = (index) => {
  faqs.value[index].open = !faqs.value[index].open
}
</script>

<template>
  <section
    class="py-16 bg-background relative overflow-hidden"
    id="faqs"
  >
    <div class="container mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <div
          class="inline-flex items-center gap-3 bg-primary/10 px-4 py-2 mb-4"
        >
          <div class="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span
            class="text-primary font-secondary font-semibold text-sm uppercase tracking-wide"
            >FAQ's</span
          >
        </div>
        <h2 class="text-4xl font-primary md:text-5xl font-bold text-gray-900 mb-6">
          FAQ's For
          <span class="linear-wipe animate-gradient">Barobi Appartment</span>
        </h2>
        <p class="text-xl text-gray-600 font-secondary max-w-3xl mx-auto leading-relaxed">
          Do you have any questions? Don't hesitate to ask. We're here to help!
        </p>
      </div>

      <!-- FAQ Accordion -->
      <div class="max-w-4xl mx-auto">
        <div class="space-y-4">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="bg-white shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl"
          >
            <button
              @click="toggleFAQ(index)"
              class="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <div class="flex items-start gap-4">
                <div class="flex-shrink-0 mt-1">
                  <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span class="text-primary font-bold">Q</span>
                  </div>
                </div>
                <h3 class="text-lg md:text-xl font-primary font-semibold text-gray-900 pr-8">
                  {{ faq.question }}
                </h3>
              </div>
              <div class="flex-shrink-0">
                <svg
                  class="w-6 h-6 text-primary transition-transform duration-300"
                  :class="{ 'rotate-180': faq.open }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>
            
            <div
              v-show="faq.open"
              class="px-6 pb-5 transition-all duration-300"
              :class="{ 'border-t border-gray-100 pt-5': faq.open }"
            >
              <div class="flex items-start gap-4">
                <div class="flex-shrink-0 mt-1">
                  <div class="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                    <span class="text-secondary font-bold">A</span>
                  </div>
                </div>
                <p class="text-gray-700 font-secondary text-lg leading-relaxed">
                  {{ faq.answer }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Gradient Text Animation */
.linear-wipe {
  text-align: center;
  background: linear-gradient(
    to right,
    #7e1218 20%,
    #cd986c 40%,
    #cd986c 60%,
    #1f2d3e 80%
  );
  background-size: 200% auto;
  color: #000;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 3s linear infinite;
}

/* Move Keyframes Outside */
@keyframes shine {
  to {
    background-position: 200% center;
  }
}
</style>