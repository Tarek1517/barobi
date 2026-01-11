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

const { data: accommodation, pending, error } = useAPI<SingleAccommodationApiResponse>(
  `/accommodations/${route.params.slug}`
);
const queryCheckIn = computed(() => route.query.checkIn as string || '')
const queryCheckOut = computed(() => route.query.checkOut as string || '')


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
const member_id = ref<number | null>(null);
if (isLoggedIn && auth.user) {
  formData.fullName = auth.user.name;
  formData.email = auth.user.email;
  formData.telephone = auth.user.phone;
  member_id.value = auth.user.id;
}

const airportPickup = ref("");
const flightNumber = ref("");
const pickupTypePrice = ref(0);
const extraBedPrice = ref(0);
const pickupTypeId = ref<number | null>(null);
const extraBedId = ref<number | null>(null);
const specialNotes = ref("");
const availableRooms = ref<number>(0);
const isCheckingAvailability = ref(false);

const handleAirportPickupChange = () => {
  if (airportPickup.value !== "yes") {
    pickupTypeId.value = null;
    pickupTypePrice.value = 0;
    flightNumber.value = "";
  }
};

const { data: bedCharges } = await useAsyncData("bed-charges", () => $api("/get-bed-charges"));
const { data: pickupTypes } = await useAsyncData("pickup-types", () => $api("/get-pickup-charges"));

const roomRate = computed(() => Number(accommodation.value?.data?.price || 0));

const checkInDate = computed(() => (formData.checkIn ? new Date(formData.checkIn) : new Date()));
const checkOutDate = computed(() => (formData.checkOut ? new Date(formData.checkOut) : new Date(Date.now() + 86400000)));

const nights = computed(() => {
  if (!formData.checkIn || !formData.checkOut) return 1;
  const diffTime = checkOutDate.value.getTime() - checkInDate.value.getTime();
  return Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 1);
});

const roomTotal = computed(() => (nights.value * formData.rooms * roomRate.value));
const grandTotal = computed(
  () => roomTotal.value + Number(extraBedPrice.value) + (airportPickup.value === 'yes' ? Number(pickupTypePrice.value) : 0)
);
const getPaymentMethodName = (method: string) => {
  const methods = { cash: "Cash" };
  return methods[method] || method;
};

const fetchAvailableRooms = async () => {
  if (!formData.checkIn || !formData.checkOut || !accommodation.value?.data?.id) {
    availableRooms.value = 0;
    return;
  }

  isCheckingAvailability.value = true;

  try {
    const res = await $api('/get-available-room', {
      params: {
        accommodation_id: accommodation.value.data.id,
        check_in: formData.checkIn,
        check_out: formData.checkOut,
      },
    });

    availableRooms.value = Number(res.data || 0);

    if (formData.rooms > availableRooms.value) {
      formData.rooms = availableRooms.value > 0 ? 1 : 0;
    }

  } catch (err) {
    availableRooms.value = 0;
    formData.rooms = 0;
  } finally {
    isCheckingAvailability.value = false;
  }
};

watch(
  () => [formData.checkIn, formData.checkOut],
  ([checkIn, checkOut]) => {
    if (checkIn && checkOut) {
      fetchAvailableRooms();
    } else {
      availableRooms.value = 0;
      formData.rooms = 0;
    }
  },
  { immediate: true }
);


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
  room_message: '',
})

const selectedBedCharge = computed(() => {
  return bedCharges.value?.data?.find(bed => bed.id === extraBedId.value) || null;
});

const selectedPickupType = computed(() => {
  return pickupTypes.value?.data?.find(pickup => pickup.id === pickupTypeId.value) || null;
});

watch(selectedBedCharge, (val) => {
  extraBedPrice.value = val ? Number(val.price) : 0;
});

watch(selectedPickupType, (val) => {
  pickupTypePrice.value = val ? Number(val.price) : 0;
});

const validateForm = () => {
  let isValid = true
  errors.fullName = ''
  errors.telephone = ''
  errors.email = ''
  errors.room_message = ''
  if(formData.rooms === 0){
    isValid = false
    errors.room_message = 'At least one room is required'
  }
  if (!formData.fullName.trim()) {
    errors.fullName = 'Full name is required'
    isValid = false
  }
  if (!formData.telephone.trim()) {
    errors.telephone = 'Telephone number is required'
    isValid = false
  }
  if (!formData.email.trim()) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Enter a valid email address'
    isValid = false
  }

  return isValid
}

const isSubmitting = ref(false);
const resetForm = () => {
  formData.roomType = "";
  formData.rooms = 0;
  formData.checkIn = new Date().toISOString().split("T")[0];
  formData.checkOut = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  formData.fullName = isLoggedIn && auth.user ? auth.user.name : "";
  formData.telephone = isLoggedIn && auth.user ? auth.user.phone : "";
  formData.email = isLoggedIn && auth.user ? auth.user.email : "";
  formData.adults = 1;
  formData.children = 0;
  formData.country = "";
  formData.paymentMethod = "cash";
  formData.cardName = "";
  formData.cardNumber = "";
  formData.cardExpiry = "";
  formData.cardCvv = "";
  formData.cardZip = "";

  airportPickup.value = "";
  flightNumber.value = "";
  pickupTypeId.value = null;
  pickupTypePrice.value = 0;
  extraBedId.value = null;
  extraBedPrice.value = 0;
  specialNotes.value = "";
  errors.fullName = "";
  errors.telephone = "";
  errors.email = "";
}

const handleSubmit = async () => {
  if (!validateForm()) return
  isSubmitting.value = true

  try {
    await $api('/booking', {
      method: 'POST',
      body: {
        accommodation_id: accommodation.value?.data?.id,
        member_id: member_id.value ?? null,
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
    resetForm();
  } catch (error: any) {
    console.error(error)
    alert(error?.data?.message || 'Booking failed')
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  formData.checkIn = queryCheckIn.value
    ? queryCheckIn.value
    : today.toISOString().split("T")[0];

  formData.checkOut = queryCheckOut.value
    ? queryCheckOut.value
    : tomorrow.toISOString().split("T")[0];
});

</script>

<template>
  <div class="min-h-screen bg-background py-10">
    <div class="container mx-auto px-2">
      <div class="flex flex-col lg:flex-row gap-8">
        <div class="lg:w-2/3">
          <div class="bg-white rounded-lg shadow-md p-6">
            <section class="mb-4">
              <h2 class="text-xl font-primary font-semibold mb-4">ROOM RESERVATION</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div>
                  <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">No. of rooms</label>
                  <select v-model="formData.rooms" :disabled="isCheckingAvailability || availableRooms === 0"
                    class="w-full font-secondary border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed">
                    <option value="0" disabled>
                      Select rooms
                    </option>

                    <option v-for="n in availableRooms" :key="n" :value="n">
                      {{ n }}
                    </option>
                  </select>

                  <p v-if="isCheckingAvailability" class="text-xs text-gray-500 mt-1">
                    Checking availability...
                  </p>

                  <p v-else-if="availableRooms === 0" class="text-xs text-red-500 mt-1">
                    No rooms available for selected dates
                  </p>

                  <p v-else-if="errors.room_message" class="text-xs text-red-500 mt-1">
                    {{ errors.room_message }}
                  </p>

                  <p v-else class="text-xs text-gray-600 mt-1">
                    {{ availableRooms }} room{{ availableRooms > 1 ? 's' : '' }} available
                  </p>

                </div>
              </div>
            </section>

            <section class="mb-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="col-span-2">
                  <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" v-model="formData.fullName" :readonly="isLoggedIn" :class="[
                    'w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500',
                    isLoggedIn ? 'bg-gray-100 cursor-not-allowed' : ''
                  ]" />
                  <p v-if="errors.fullName" class="text-xs text-red-500 mt-1">{{ errors.fullName }}</p>
                </div>
                <div>
                  <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">Telephone</label>
                  <input type="text" v-model="formData.telephone" :readonly="isLoggedIn" :class="[
                    'w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500',
                    isLoggedIn ? 'bg-gray-100 cursor-not-allowed' : ''
                  ]" />
                  <p v-if="errors.telephone" class="text-xs text-red-500 mt-1">{{ errors.telephone }}</p>
                </div>
                <div>
                  <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" v-model="formData.email" :readonly="isLoggedIn" :class="[
                    'w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500',
                    isLoggedIn ? 'bg-gray-100 cursor-not-allowed' : ''
                  ]" />
                  <p v-if="errors.email" class="text-xs text-red-500 mt-1">{{ errors.email }}</p>
                </div>
              </div>
            </section>

            <section class="mb-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">No. of Adult</label>
                  <select v-model="formData.adults"
                    class="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
                  </select>
                </div>
                <div>
                  <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">No. of Children</label>
                  <select v-model="formData.children"
                    class="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
                  </select>
                </div>
                <div>
                  <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input type="text" v-model="formData.country"
                    class="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </section>

            <section class="mb-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">Extra Bed</label>
                  <select v-model="extraBedId" class="w-full font-secondary border border-gray-300 px-3 py-2">
                    <option :value="null">No Extra Bed</option>
                    <option v-for="bed in bedCharges?.data" :key="bed.id" :value="bed.id">
                      {{ bed.name }} ({{ bed.price }})
                    </option>
                  </select>
                </div>
                <div>
                  <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">Extra Bed Charge</label>
                  <div
                    class="border font-secondary border-gray-300 px-3 py-2 bg-gray-50 min-h-[42px] flex items-center">
                    <span class="font-medium">{{ extraBedPrice || '0' }}</span>
                  </div>
                </div>
                <div>
                  <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">Airport Pickup</label>
                  <select v-model="airportPickup" @change="handleAirportPickupChange"
                    class="w-full font-secondary border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div v-if="airportPickup === 'yes'">
                  <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">Flight Number</label>
                  <input type="text" v-model="flightNumber"
                    class="w-full font-secondary border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <div v-if="airportPickup === 'yes'" class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">Pickup Type</label>
                  <select v-model="pickupTypeId" class="w-full font-secondary border border-gray-300 px-3 py-2">
                    <option :value="null">Select Type</option>
                    <option v-for="type in pickupTypes?.data" :key="type.id" :value="type.id">
                      {{ type.name }} ({{ accommodation?.data?.currency_symbol }} {{ type.price }})
                    </option>
                  </select>
                </div>
                <div>
                  <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">Pickup Charge</label>
                  <input type="text" :value="pickupTypePrice" readonly
                    class="w-full border border-gray-300 px-3 py-2 bg-gray-50 font-medium" />
                </div>
              </div>

              <div class="mt-4">
                <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">Special Notes /
                  Requests</label>
                <textarea v-model="specialNotes" rows="3" placeholder="Any special requests or notes for your pickup..."
                  class="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
              </div>
            </section>

            <section>
              <h2 class="text-xl font-primary font-semibold mb-4">Payment details</h2>
              <p class="text-sm font-secondary text-gray-600 mb-4">Safe, secure transactions. Your personal information
                is protected.</p>
              <div class="mb-4">
                <h3 class="font-medium font-secondary mb-2">Payment Method</h3>
                <div class="flex flex-col space-y-4">
                  <label class="flex items-center">
                    <input type="radio" value="cash" v-model="formData.paymentMethod" class="mr-2" /> Cash
                  </label>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div class="lg:w-1/3 space-y-2 mt-1">
          <div class="bg-white rounded-lg shadow-md">
            <img :src="accommodation?.data?.image" class="w-full h-full object-cover transition-transform duration-700"
              loading="lazy" />
            <div class="flex flex-col p-6">
              <div class="mb-6">
                <h3 class="font-bold font-primary text-xl">
                  {{ accommodation?.data?.title }}, Guest room,
                  <span>{{ formData.adults }} Adult{{ formData.adults > 1 ? 's' : '' }}</span>
                  <span v-if="formData.children">, {{ formData.children }} Child{{ formData.children > 1 ? 'ren' : ''
                    }}</span>
                </h3>
                <p class="text-sm font-secondary text-gray-600 mt-1">Room Details</p>
                <div class="mt-4">
                  <p class="font-medium font-secondary">{{ formatDate(checkInDate) }} - {{ formatDate(checkOutDate) }}
                  </p>
                  <p class="text-sm text-gray-600 font-secondary mt-1">{{ nights }} night{{ nights > 1 ? 's' : '' }} ·
                    {{ formData.rooms }} room{{ formData.rooms > 1 ? 's' : '' }}</p>
                </div>
              </div>

              <div v-if="airportPickup === 'yes' || selectedBedCharge"
                class="mb-4 text-sm font-secondary text-gray-600 space-y-1">
                <p v-if="flightNumber"><strong>Flight Number:</strong> {{ flightNumber }}</p>
                <p v-if="selectedPickupType"><strong>Pickup Type:</strong> {{ selectedPickupType.name }}</p>
                <p v-if="selectedBedCharge"><strong>Extra Bed:</strong> {{ selectedBedCharge.name }}</p>
              </div>

              <div class="border-t border-b border-primary py-4">
                <h3 class="font-medium font-primary mb-2">Price details</h3>
                <div class="space-y-2">
                  <div class="flex justify-between font-secondary">
                    <span>{{ nights }} nights × {{ formData.rooms }} rooms × {{ roomRate }}</span>
                    <span>{{ roomTotal }}</span>
                  </div>
                  <div v-if="selectedBedCharge" class="flex justify-between text-sm font-secondary">
                    <span>Extra Bed ({{ selectedBedCharge.name }})</span>
                    <span>{{ selectedBedCharge.price }}</span>
                  </div>
                  <div v-if="airportPickup === 'yes' && selectedPickupType"
                    class="flex justify-between text-sm font-secondary">
                    <span>Airport Pickup ({{ selectedPickupType.name }})</span>
                    <span>{{ selectedPickupType.price }}</span>
                  </div>
                  <div class="flex justify-between font-secondary font-bold mt-2 text-lg border-t pt-2">
                    <span>Grand Total</span>
                    <span>{{ accommodation?.data?.currency_symbol }} {{ grandTotal }}</span>
                  </div>
                </div>
              </div>

              <p class="text-sm text-gray-600 mt-4 font-secondary">This price may increase if you book later.</p>

              <button @click="handleSubmit" :disabled="isSubmitting"
                class="w-full bg-primary text-white font-primary py-3 font-medium mt-6 hover:bg-secondary transition-colors disabled:bg-gray-400">
                {{ isSubmitting ? "Processing..." : "Confirm Reservation" }}
              </button>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md">
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

            <div class="mt-6">
              <h3 class="font-medium font-primary mb-2">Special check-in instructions</h3>
              <div class="text-sm font-secondary text-gray-600 space-y-2">
                <p>This property offers digital check-in and contactless services. Please contact the property 24 hours
                  prior to arrival using the contact information on the booking confirmation.</p>
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
input:focus,
select:focus {
  outline: none;
  ring: 2px;
}
</style>