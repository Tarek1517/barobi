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
                  <label class="block text-sm font-secondary font-medium text-gray-700 mb-1">Room Type</label>
                  <select v-model="formData.roomType"
                    class="w-full border font-secondary border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Room Type</option>
                    <option value="premium">Premium</option>
                    <option value="standard">Standard</option>
                    <option value="business">Business</option>
                    <option value="ultra">Ultra</option>
                  </select>
                </div>
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
                <div>
                  <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" v-model="formData.firstName"
                    class="w-full font-secondary border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" v-model="formData.lastName"
                    class="w-full font-secondary border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">Telephone</label>
                  <input type="tel" v-model="formData.telephone"
                    class="w-full font-secondary border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" v-model="formData.email"
                    class="w-full font-secondary border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
              <div v-if="airportPickup === 'yes'" class="mt-4 space-y-4">
                <!-- Pickup Type and Charge Section -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">Pickup Type</label>
                    <select v-model="pickupTypeId" class="w-full font-secondary border border-gray-300 px-3 py-2">
                      <option value="">Select Type</option>
                      <option v-for="type in pickupTypes?.data" :key="type.id" :value="type.id">
                        {{ type.name }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">Pickup Charge</label>
                    <div class="border px-3 py-2 bg-gray-50 min-h-[42px] flex items-center">
                      <span class="font-medium">
                        {{ selectedPickupType ? `$${selectedPickupType.price}` : '$0' }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Extra Services Section -->
                <div class="pt-4">

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">
                        Extra Bed
                      </label>

                    <select v-model="extraBedId" class="w-full font-secondary border border-gray-300 px-3 py-2">
                      <option value="">No Extra Bed</option>
                      <option v-for="bed in bedCharges?.data" :key="bed.id" :value="bed.id">
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
                          {{ selectedBedCharge ? `$${selectedBedCharge.price}` : '$0' }}
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
                Safe, secure transactions. Your personal information is
                protected.
              </p>

              <div class="mb-4">
                <h3 class="font-medium font-secondary mb-2">Payment Method</h3>
                <div class="flex flex-col space-y-4">
                  <label class="flex items-center">
                    <input type="radio" value="affirm" v-model="formData.paymentMethod" class="mr-2" />
                    Affirm
                  </label>
                  <label class="flex items-center">
                    <input type="radio" value="paypal" v-model="formData.paymentMethod" class="mr-2" />
                    PayPal
                  </label>
                  <label class="flex items-center">
                    <input type="radio" value="card" v-model="formData.paymentMethod" class="mr-2" />
                    Credit Card
                  </label>
                </div>
              </div>

              <div v-if="formData.paymentMethod === 'card'" class="mb-4">
                <h3 class="font-medium mb-2">Card Details</h3>
                <div class="space-y-4">
                  <div>
                    <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">Name on card *</label>
                    <input type="text" v-model="formData.cardName"
                      class="w-full font-secondary border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <p class="text-xs font-secondary text-gray-500 mt-1">
                      Please enter the cardholders name exactly as it appears on
                      the card.
                    </p>
                  </div>
                  <div>
                    <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">Card number *</label>
                    <input type="text" v-model="formData.cardNumber" placeholder="0000 0000 0000 0000"
                      class="w-full font-secondary border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">Expiration date
                        *</label>
                      <input type="text" v-model="formData.cardExpiry" placeholder="MM/YY"
                        class="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label class="block font-secondary text-sm font-medium text-gray-700 mb-1">Security code *</label>
                      <input type="text" v-model="formData.cardCvv" placeholder="CVV"
                        class="w-full font-secondary border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Billing ZIP code *</label>
                      <input type="text" v-model="formData.cardZip"
                        class="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <!-- Right Column - Summary (w-1/3) -->
        <div class="lg:w-1/3 space-y-2 mt-1">
          <div class="bg-white rounded-lg shadow-md top-4">
            <div>
              <img src="/images/room-13.jpg" alt="room-13"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy" />
            </div>
            <div class="flex flex-col p-6">
              <!-- Room Details -->
              <div class="mb-6">
                <h3 class="font-bold font-primary text-xl">
                  <span v-if="formData.roomType" class="capitalize">{{ formData.roomType }}</span>
                  <span v-else>Deluxe King Room</span>
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
                  <p v-if="selectedBedCharge">
                    <strong>Extra Bed:</strong> {{ selectedBedCharge.name }}
                  </p>

                </div>
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
                      × ${{ roomRate.toFixed(2) }}
                    </span>
                    <span>${{ calculateRoomTotal() }}</span>
                  </div>

                  <!-- Airport Pickup Charges -->
                  <div v-if="airportPickup === 'yes' && selectedPickupType"
                    class="flex justify-between text-sm font-secondary">
                    <span>Airport Pickup</span>
                    <span>${{ totalCharge.toFixed(2) }}</span>
                  </div>

                  <div class="flex justify-between font-secondary">
                    <span>Taxes & fees</span>
                    <span>${{ calculateTaxes() }}</span>
                  </div>

                  <div class="flex justify-between font-secondary font-bold mt-2 text-lg border-t pt-2">
                    <span>Grand Total</span>
                    <span>${{ calculateGrandTotal() }}</span>
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
                <p>
                  This property offers digital check-in and contactless
                  services. Please contact the property 24 hours prior to
                  arrival using the contact information on the booking
                  confirmation.
                </p>
                <p>
                  Guests must provide a record of full COVID-19 vaccination if
                  required by local regulations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Reactive data
const formData = reactive({
  roomType: "",
  rooms: 1,
  checkIn: "",
  checkOut: "",
  firstName: "",
  lastName: "",
  telephone: "",
  email: "",
  adults: 1,
  children: 0,
  country: "",
  paymentMethod: "card",
  cardName: "",
  cardNumber: "",
  cardExpiry: "",
  cardCvv: "",
  cardZip: "",
});

const airportPickup = ref("")
const flightNumber = ref("")
const pickupTypeId = ref(null)
const extraBedId = ref(null)
const specialNotes = ref("")

// Handle airport pickup change
const handleAirportPickupChange = () => {
  if (airportPickup.value !== "yes") {
    pickupTypeId.value = null
    extraBedId.value = null
    flightNumber.value = ""
    specialNotes.value = ""
  }
};


// Update charges function
const updateCharges = () => {
  // This triggers computed property recalculation
};

// Computed total charge for airport pickup
const totalCharge = computed(() => {
  let total = 0
  if (selectedPickupType.value) total += Number(selectedPickupType.value.price)
  if (selectedBedCharge.value) total += Number(selectedBedCharge.value.price)
  return total
})


// State
const isSubmitting = ref(false);

// Constants
const roomRate = 82.8;
const taxRate = 0.18; // 18% tax

// Computed values
const checkInDate = computed(() =>
  formData.checkIn ? new Date(formData.checkIn) : new Date("2025-03-03")
);
const checkOutDate = computed(() =>
  formData.checkOut ? new Date(formData.checkOut) : new Date("2025-03-05")
);
const nights = computed(() => {
  if (!formData.checkIn || !formData.checkOut) return 2;
  const diffTime = Math.abs(checkOutDate.value - checkInDate.value);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

const { $api } = useNuxtApp();

const { data: countries } = await useAsyncData('countries', () =>
  $api('/get-countries')
);

const { data: bedCharges } = await useAsyncData('bed-charges', () =>
  $api('/get-bed-charges')
);

const { data: pickupTypes } = await useAsyncData('pickup-types', () =>
  $api('/get-pickup-charges')
);

const selectedPickupType = computed(() => {
  return pickupTypes.value?.data?.find(
    p => p.id === Number(pickupTypeId.value)
  )
})

const selectedBedCharge = computed(() => {
  return bedCharges.value?.data?.find(
    b => b.id === Number(extraBedId.value)
  )
})

const getPaymentMethodName = (method) => {
  const methods = {
    affirm: "Affirm",
    paypal: "PayPal",
    card: "Credit Card"
  };
  return methods[method] || method;
};

const truncateText = (text, length) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
};

// Calculation methods
const calculateRoomTotal = () => {
  return (nights.value * formData.rooms * roomRate).toFixed(2);
};

const calculateTaxes = () => {
  return (parseFloat(calculateRoomTotal()) * taxRate).toFixed(2);
};

const calculateGrandTotal = () => {
  let total = parseFloat(calculateRoomTotal()) + parseFloat(calculateTaxes());

  // Add airport pickup charges if selected
  if (airportPickup.value === "yes" && selectedPickupType.value) {
    total += totalCharge.value;
  }

  return total.toFixed(2);
};

const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

const handleSubmit = async () => {
  isSubmitting.value = true;

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Here you would typically send the data to your backend
  console.log("Form submitted:", {
    ...formData,
    airportPickup: airportPickup.value,
    flightNumber: flightNumber.value,
    selectedPickupType: selectedPickupType.value,
    extraBed: extraBed.value,
    specialNotes: specialNotes.value,
    totalCharge: totalCharge.value,
    grandTotal: calculateGrandTotal()
  });

  isSubmitting.value = false;
  alert("Reservation confirmed successfully!");
};

// Set default dates
onMounted(() => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  formData.checkIn = today.toISOString().split("T")[0];
  formData.checkOut = tomorrow.toISOString().split("T")[0];
});
</script>

<style scoped>
/* Additional custom styles */
input:focus,
select:focus {
  outline: none;
  ring: 2px;
}
</style>