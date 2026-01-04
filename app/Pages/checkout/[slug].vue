<script setup lang="ts">
import { reactive, ref, computed, onMounted, watch } from "vue";
import type { Accommodation } from "~/types";
import { useRoute } from "vue-router";
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
type SingleAccommodationApiResponse = {
  data: Accommodation;
};

const route = useRoute();
const { $api } = useNuxtApp();

// Fetch accommodation data
const { data: accommodation, pending, error } = useAPI<SingleAccommodationApiResponse>(
  `/accommodations/${route.params.slug}`
);

// Form data
const formData = reactive({
  roomType: "",
  rooms: 1,
  checkIn: "",
  checkOut: "",
  fullName: "",
  telephone: "",
  email: "",
  adults: 1,
  children: 0,
  country: "",
  paymentMethod: "cash",
  cardName: "",
  cardNumber: "",
  cardExpiry: "",
  cardCvv: "",
  cardZip: "",
});
const isLoggedIn = auth.loggedIn

if (isLoggedIn && auth.user) {
  formData.fullName = auth.user.name;
  formData.email = auth.user.email;
  formData.telephone = auth.user.phone;
}

// Airport pickup & extras
const airportPickup = ref("");
const flightNumber = ref("");
const pickupTypePrice = ref(0);
const extraBedPrice = ref(0);
const pickupTypeId = ref<number | null>(null);
const extraBedId = ref<number | null>(null);
const specialNotes = ref("");

const handlePickupTypeChange = (price: number) => {
  pickupTypePrice.value = price;
};

// Handle extra bed change
const handleExtraBedChange = (price: number) => {
  extraBedPrice.value = price;
};
// Reset airport pickup fields
const handleAirportPickupChange = () => {
  if (airportPickup.value !== "yes") {
    pickupTypeId.value = null;
    flightNumber.value = "";
  }
};

// Fetch supporting data
const { data: countries } = await useAsyncData("countries", () => $api("/get-countries"));
const { data: bedCharges } = await useAsyncData("bed-charges", () => $api("/get-bed-charges"));
const { data: pickupTypes } = await useAsyncData("pickup-types", () => $api("/get-pickup-charges"));

// Room rate reactive
const roomRate = computed(() => Number(accommodation.value?.data?.price || 0));

// Date calculations
const checkInDate = computed(() => (formData.checkIn ? new Date(formData.checkIn) : new Date()));
const checkOutDate = computed(() => (formData.checkOut ? new Date(formData.checkOut) : new Date(Date.now() + 86400000)));
const nights = computed(() => {
  if (!formData.checkIn || !formData.checkOut) return 1;
  const diffTime = checkOutDate.value.getTime() - checkInDate.value.getTime();
  return Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 1);
});
// Charges
const roomTotal = computed(() => (nights.value * formData.rooms * roomRate.value));
const grandTotal = computed(
  () => roomTotal.value + Number(extraBedPrice.value ? extraBedPrice.value : 0) + (airportPickup.value === "yes" ? Number(pickupTypePrice.value ? pickupTypePrice.value : 0) : 0)
);
// Payment helper
const getPaymentMethodName = (method: string) => {
  const methods = { cash: "Cash" };
  return methods[method] || method;
};

// Format date
const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};
const errors = reactive({
  fullName: '',
  telephone: '',
  email: '',
})

const validateForm = () => {
  let isValid = true

  // reset errors
  errors.fullName = ''
  errors.telephone = ''
  errors.email = ''

  // Full name
  if (!formData.fullName.trim()) {
    errors.fullName = 'Full name is required'
    isValid = false
  }

  // Phone
  if (!formData.telephone.trim()) {
    errors.telephone = 'Telephone number is required'
    isValid = false
  }

  // Email
  if (!formData.email.trim()) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Enter a valid email address'
    isValid = false
  }

  return isValid
}

// Submit
const isSubmitting = ref(false);

const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true

  try {
    await $api('/booking', {
      method: 'POST',
      body: {
        accommodation_id: accommodation.value?.data?.id,

        name: formData.fullName,
        email: formData.email,
        phone: formData.telephone,

        rooms: formData.rooms,
        adults: formData.adults,
        children: formData.children,
        country: formData.country,

        bed_charge_id: extraBedId.value,
        pickup_charge_id: pickupTypeId.value,

        special_notes: specialNotes.value,
        flight_number: flightNumber.value,

        check_in: formData.checkIn,
        check_out: formData.checkOut,
        total_nights: nights.value,
        total_amount: grandTotal.value,

        payment_method: 'cash', 
      }
    })

    alert('Reservation confirmed successfully!')
  } catch (error: any) {
    console.error(error)
    alert(error?.data?.message || 'Booking failed')
  } finally {
    isSubmitting.value = false
  }
}


// Default dates
onMounted(() => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  formData.checkIn = today.toISOString().split("T")[0];
  formData.checkOut = tomorrow.toISOString().split("T")[0];
});
</script>

<template>
  <div class="min-h-screen bg-background py-10">
    <div class="container mx-auto px-2">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Left Column - Form (w-2/3) -->
        <div class="lg:w-2/3">
          <div class="bg-white rounded-lg shadow-md p-6">
            <!-- Room Type Section -->
            <section class="mb-4">
              <h2 class="text-xl font-primary font-semibold mb-4">ROOM RESERVATION</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">No. of rooms</label>
                  <select v-model="formData.rooms"
                    class="w-full font-secondary border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
                  </select>
                </div>
                <div>
                  <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">Check in date</label>
                  <input type="date" v-model="formData.checkIn"
                    class="w-full font-secondary border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">Check out date</label>
                  <input type="date" v-model="formData.checkOut"
                    class="w-full font-secondary border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </section>

            <!-- Guest Information Section -->
            <section class="mb-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="col-span-2">
                  <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                      type="text"
                      v-model="formData.fullName"
                      :readonly="isLoggedIn"
                      :class="[
                        'w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500',
                        isLoggedIn ? 'bg-gray-100 cursor-not-allowed' : ''
                      ]"
                    />
                    <p v-if="errors.fullName" class="text-xs text-red-500 mt-1">
                      {{ errors.fullName }}
                    </p>
                </div>
                <div>
                  <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">Telephone</label>
                  <input
                      type="text"
                      v-model="formData.telephone"
                      :readonly="isLoggedIn"
                      :class="[
                        'w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500',
                        isLoggedIn ? 'bg-gray-100 cursor-not-allowed' : ''
                      ]"
                    />
                    <p v-if="errors.telephone" class="text-xs text-red-500 mt-1">
                      {{ errors.telephone }}
                    </p>
                </div>
                <div>
                  <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                      type="email"
                      v-model="formData.email"
                      :readonly="isLoggedIn"
                      :class="[
                        'w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500',
                        isLoggedIn ? 'bg-gray-100 cursor-not-allowed' : ''
                      ]"
                    />
                    <p v-if="errors.email" class="text-xs text-red-500 mt-1">
                      {{ errors.email }}
                    </p>
                </div>
              </div>
            </section>

            <!-- Guest Count Section -->
            <section class="mb-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">No. of Adult</label>
                  <select v-model="formData.adults"
                    class="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option v-for="n in 6" :key="n" :value="n">{{ n }}</option>
                  </select>
                </div>
                <div>
                  <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">No. of Children</label>
                  <select v-model="formData.children"
                    class="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
                  </select>
                </div>
                <div>
                  <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">Country</label>
                  <select v-if="countries" v-model="formData.country"
                    class="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Country</option>
                    <option v-for="country in countries?.data" :key="country" :value="country">{{ country }}</option>
                  </select>
                </div>
              </div>
            </section>

            <!-- Airport Pickup Section -->
            <section class="mb-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">
                    Airport Pickup
                  </label>
                  <select v-model="airportPickup" @change="handleAirportPickupChange"
                    class="w-full font-secondary border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div>
                  <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">
                    Flight Number
                  </label>
                  <input type="text" v-model="flightNumber"
                    class="w-full font-secondary border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <!-- Show this section only when airportPickup is 'yes' -->
              <div class="mt-4 space-y-4">
                <!-- Pickup Type and Charge Section -->
                <div v-if="airportPickup === 'yes'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">Pickup Type</label>
                    <select v-model="pickupTypeId"
                      @change="handlePickupTypeChange($event.target.options[$event.target.selectedIndex].dataset.price)"
                      class="w-full font-secondary border border-gray-300 px-3 py-2">
                      <option value="">Select Type</option>
                      <option v-for="type in pickupTypes?.data" :key="type.id" :value="type.id"
                        :data-price="type.price">
                        {{ type.name }} (${{ type.price }})
                      </option>
                    </select>
                  </div>
                  <div>
                    <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">Pickup Charge</label>
                    <input type="text" v-model="pickupTypePrice" readonly
                      class="w-full border border-gray-300 px-3 py-2 bg-gray-50 font-medium flex items-center" />
                  </div>
                </div>

                <!-- Extra Services Section -->
                <div class="pt-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">
                        Extra Bed
                      </label>
                      <select v-model="extraBedId"
                        @change="handleExtraBedChange($event.target.options[$event.target.selectedIndex].dataset.price)"
                        class="w-full font-secondary border border-gray-300 px-3 py-2">
                        <option value="">No Extra Bed</option>
                        <option v-for="bed in bedCharges?.data" :key="bed.id" :value="bed.id" :data-price="bed.price">
                          {{ bed.name }} (${{ bed.price }})
                        </option>
                      </select>
                    </div>
                    <div>
                      <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">
                        Extra Bed Charge
                      </label>
                      <div
                        class="border font-secondary border-gray-300 px-3 py-2 bg-gray-50 min-h-[42px] flex items-center">
                        <span class="font-medium">
                          {{ extraBedPrice ? `$${extraBedPrice}` : '$0' }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="mt-4">
                    <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">
                      Special Notes / Requests
                    </label>
                    <textarea v-model="specialNotes" rows="3"
                      placeholder="Any special requests or notes for your pickup..."
                      class="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                  </div>
                </div>
              </div>
            </section>

            <!-- Payment Details Section -->
            <section>
              <h2 class="text-xl font-primary font-semibold mb-4">Payment details</h2>
              <p class="text-sm font-secondary text-gray-600 mb-4">
                Safe, secure transactions. Your personal information is protected.
              </p>

              <div class="mb-4">
                <h3 class="font-medium font-secondary mb-2">Payment Method</h3>
                <div class="flex flex-col space-y-4">
                  <label class="flex items-center">
                    <input type="radio" value="cash" v-model="formData.paymentMethod" class="mr-2" />
                    Cash
                  </label>
                </div>
              </div>
            </section>
          </div>
        </div>

        <!-- Right Column - Summary (w-1/3) -->
        <div class="lg:w-1/3 space-y-2 mt-1">
          <div class="bg-white rounded-lg shadow-md top-4">
            <div>
              <img :src="accommodation?.data?.image" alt="room-13"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy" />
            </div>
            <div class="flex flex-col p-6">
              <!-- Room Details -->
              <div class="mb-6">
                <h3 class="font-bold font-primary text-xl">
                  <span v-if="formData.roomType" class="capitalize">{{ formData.roomType }}</span>
                  <span v-else>{{ accommodation?.data?.title }}</span>
                  , Guest room,
                  <span v-if="formData.adults">{{ formData.adults }} Adult{{ formData.adults > 1 ? 's' : '' }}</span>
                  <span v-if="formData.children">, {{ formData.children }} Child{{ formData.children > 1 ? 'ren' : ''
                  }}</span>
                </h3>
                <p class="text-sm font-secondary text-gray-600 mt-1">Room Details</p>

                <div class="mt-4">
                  <p class="font-medium font-secondary">
                    {{ formatDate(checkInDate) }} -
                    {{ formatDate(checkOutDate) }}
                  </p>
                  <p class="text-sm text-gray-600 font-secondary mt-1">
                    {{ nights }} night{{ nights > 1 ? 's' : '' }}
                    · {{ formData.rooms }} room{{ formData.rooms > 1 ? 's' : '' }}
                  </p>
                </div>
              </div>



              <!-- Airport Pickup Summary -->
              <div v-if="airportPickup === 'yes'">
                <div class="text-sm font-secondary text-gray-600 space-y-1">
                  <p v-if="flightNumber">
                    <strong>Flight Number:</strong> {{ flightNumber }}
                  </p>
                  <p v-if="selectedPickupType">
                    <strong>Pickup Type:</strong> {{ selectedPickupType.name }}
                  </p>
                </div>
                <p v-if="selectedBedCharge">
                  <strong>Extra Bed:</strong> {{ selectedBedCharge.name }}
                </p>
              </div>

              <!-- Payment Method Summary -->
              <div class="mb-4 pt-4">
                <h3 class="font-medium font-primary mb-2">Payment Method</h3>
                <div class="text-sm font-secondary text-gray-600">
                  <p>
                    <strong>{{ getPaymentMethodName(formData.paymentMethod) }}</strong>
                  </p>
                  <p v-if="formData.paymentMethod === 'card' && formData.cardName" class="mt-1">
                    Card: {{ formData.cardName }}
                  </p>
                </div>
              </div>

              <!-- Price Details -->
              <div class="border-t border-b border-primary py-4">
                <h3 class="font-medium font-primary mb-2">Price details</h3>
                <div class="space-y-2">
                  <div class="flex justify-between font-secondary">
                    <span>
                      {{ nights }} night{{ nights > 1 ? 's' : '' }} ×
                      {{ formData.rooms }} room{{ formData.rooms > 1 ? 's' : '' }}
                      × ${{ roomRate }}
                    </span>
                    <span>${{ roomTotal }}</span>
                  </div>

                  <!-- Airport Pickup Charges -->
                  <div v-if="airportPickup === 'yes' && selectedPickupType"
                    class="flex justify-between text-sm font-secondary">
                    <span>Airport Pickup</span>
                    <span>${{ pickupCharge }}</span>
                  </div>

                  <div class="flex justify-between font-secondary font-bold mt-2 text-lg border-t pt-2">
                    <span>Grand Total</span>
                    <span>${{ grandTotal }}</span>
                  </div>
                </div>
              </div>

              <p class="text-sm text-gray-600 mt-4 font-secondary">
                This price may increase if you book later.
              </p>

              <!-- Confirm Button -->
              <button @click="handleSubmit" :disabled="isSubmitting"
                class="w-full bg-primary text-white font-primary py-3 font-medium mt-6 hover:bg-secondary transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                {{ isSubmitting ? "Processing..." : "Confirm Reservation" }}
              </button>
            </div>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md">
            <!-- Cancellation Policy -->
            <div>
              <h3 class="font-medium font-primary mb-2">Cancellation policy</h3>
              <div class="text-sm font-secondary text-gray-600 space-y-2">
                <p><strong>Non-refundable</strong></p>
                <p class="font-secondary">
                  This rate is non-cancellable. If you change or cancel your
                  booking you will not get a refund or credit to use for a
                  future trip.
                </p>
              </div>
            </div>

            <!-- Special Check-in Instructions -->
            <div class="mt-6">
              <h3 class="font-medium font-primary mb-2">Special check-in instructions</h3>
              <div class="text-sm font-secondary text-gray-600 space-y-2">
                <p>This property offers digital check-in and contactless services. Please contact the property 24 hours prior to arrival using the contact information on the booking confirmation.</p>
                <p>Guests must provide a record of full COVID-19 vaccination if required by local regulations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
/* Additional custom styles */
input:focus,
select:focus {
  outline: none;
  ring: 2px;
}
</style>