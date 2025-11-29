<template>
  <div class="min-h-screen bg-gray-50 py-10">
    <div class="container mx-auto px-2">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Left Column - Form (w-2/3) -->
        <div class="lg:w-2/3">
          <div class="bg-white rounded-lg shadow-md p-6">
            <!-- Room Type Section -->
            <section class="mb-4">
              <h2 class="text-xl font-semibold mb-4">ROOM RESERVATION</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Room Type</label
                  >
                  <select
                    v-model="formData.country"
                    class="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Room Type</option>
                    <option value="US">Premium</option>
                    <option value="CA">Standard</option>
                    <option value="UK">Business</option>
                    <option value="AU">Ultra</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >No. of rooms</label
                  >
                  <select
                    v-model="formData.rooms"
                    class="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Check in date</label
                  >
                  <input
                    type="date"
                    v-model="formData.checkIn"
                    class="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Check out date</label
                  >
                  <input
                    type="date"
                    v-model="formData.checkOut"
                    class="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </section>

            <!-- Guest Information Section -->
            <section class="mb-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >First Name</label
                  >
                  <input
                    type="text"
                    v-model="formData.firstName"
                    class="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Last Name</label
                  >
                  <input
                    type="text"
                    v-model="formData.lastName"
                    class="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Telephone</label
                  >
                  <input
                    type="tel"
                    v-model="formData.telephone"
                    class="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Email</label
                  >
                  <input
                    type="email"
                    v-model="formData.email"
                    class="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </section>

            <!-- Guest Count Section -->
            <section class="mb-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >No. of Adult</label
                  >
                  <select
                    v-model="formData.adults"
                    class="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option v-for="n in 6" :key="n" :value="n">{{ n }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >No. of Children</label
                  >
                  <select
                    v-model="formData.children"
                    class="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Country</label
                  >
                  <select
                    v-model="formData.country"
                    class="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>
              </div>
            </section>

            <!-- Airport Pickup Section -->
            <section class="mb-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Airport Pickup</label
                  >
                  <select
                    v-model="formData.country"
                    class="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select </option>
                    <option value="US">Yes</option>
                    <option value="CA">No</option
                    >\
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Flight Number</label
                  >
                  <input
                    type="text"
                    v-model="formData.flightNumber"
                    class="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </section>

            <!-- Payment Details Section -->
            <section>
              <h2 class="text-xl font-semibold mb-4">Payment details</h2>
              <p class="text-sm text-gray-600 mb-4">
                Safe, secure transactions. Your personal information is
                protected.
              </p>

              <div class="mb-4">
                <h3 class="font-medium mb-2">Payment Method</h3>
                <div class="flex flex-col space-y-4">
                  <label class="flex items-center">
                    <input
                      type="radio"
                      value="affirm"
                      v-model="formData.paymentMethod"
                      class="mr-2"
                    />
                    Affirm
                  </label>
                  <label class="flex items-center">
                    <input
                      type="radio"
                      value="paypal"
                      v-model="formData.paymentMethod"
                      class="mr-2"
                    />
                    PayPal
                  </label>
                  <label class="flex items-center">
                    <input
                      type="radio"
                      value="card"
                      v-model="formData.paymentMethod"
                      class="mr-2"
                    />
                    Credit Card
                  </label>
                </div>
              </div>

              <div v-if="formData.paymentMethod === 'card'" class="mb-4">
                <h3 class="font-medium mb-2">Card Details</h3>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                      >Name on card *</label
                    >
                    <input
                      type="text"
                      v-model="formData.cardName"
                      class="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p class="text-xs text-gray-500 mt-1">
                      Please enter the cardholders name exactly as it appears on
                      the card.
                    </p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                      >Card number *</label
                    >
                    <input
                      type="text"
                      v-model="formData.cardNumber"
                      placeholder="0000 0000 0000 0000"
                      class="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >Expiration date *</label
                      >
                      <input
                        type="text"
                        v-model="formData.cardExpiry"
                        placeholder="MM/YY"
                        class="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >Security code *</label
                      >
                      <input
                        type="text"
                        v-model="formData.cardCvv"
                        placeholder="CVV"
                        class="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >Billing ZIP code *</label
                      >
                      <input
                        type="text"
                        v-model="formData.cardZip"
                        class="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
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
              <img
                src="/images/room-13.jpg"
                alt="room-13"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <div class="flex flex-col p-6">
              <!-- Room Details -->
              <div class="mb-6">
                <h3 class="font-medium text-lg">
                  Deluxe King Room, Guest room, 1 King, City view, Poolside
                </h3>
                <p class="text-sm text-gray-600 mt-1">Room Details</p>

                <div class="mt-4">
                  <p class="font-medium">
                    {{ formatDate(checkInDate) }} -
                    {{ formatDate(checkOutDate) }}
                  </p>
                </div>
              </div>

              <!-- Price Details -->
              <div class="border-t border-b border-primary py-4">
                <h3 class="font-medium mb-2">Price details</h3>
                <div class="flex justify-between mb-1">
                  <span
                    >{{ nights }} nights x {{ formData.rooms }} room{{
                      formData.rooms > 1 ? "s" : ""
                    }}
                    x ${{ roomRate }}</span
                  >
                  <span>${{ calculateRoomTotal() }}</span>
                </div>
                <div class="flex justify-between mb-1">
                  <span>Taxes & fees</span>
                  <span>${{ calculateTaxes() }}</span>
                </div>
                <div class="flex justify-between font-bold mt-2 text-lg">
                  <span>Total</span>
                  <span>${{ calculateTotal() }}</span>
                </div>
              </div>

              <p class="text-sm text-gray-600 mt-4">
                This price may increase if you book later.
              </p>

              <!-- Confirm Button -->
              <button
                @click="handleSubmit"
                :disabled="isSubmitting"
                class="w-full bg-primary text-white py-3 font-medium mt-6 hover:bg-secondary transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {{ isSubmitting ? "Processing..." : "Confirm Reservation" }}
              </button>
            </div>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md">
            <!-- Cancellation Policy -->
            <div>
              <h3 class="font-medium mb-2">Cancellation policy</h3>
              <div class="text-sm text-gray-600 space-y-2">
                <p><strong>Non-refundable</strong></p>
                <p>
                  This rate is non-cancellable. If you change or cancel your
                  booking you will not get a refund or credit to use for a
                  future trip.
                </p>
              </div>
            </div>

            <!-- Special Check-in Instructions -->
            <div class="mt-6">
              <h3 class="font-medium mb-2">Special check-in instructions</h3>
              <div class="text-sm text-gray-600 space-y-2">
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
  flightNumber: "",
  pickupPhone: "",
  paymentMethod: "card",
  cardName: "",
  cardNumber: "",
  cardExpiry: "",
  cardCvv: "",
  cardZip: "",
});

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

// Methods
const calculateRoomTotal = () => {
  return (nights.value * formData.rooms * roomRate).toFixed(2);
};

const calculateTaxes = () => {
  return (parseFloat(calculateRoomTotal()) * taxRate).toFixed(2);
};

const calculateTotal = () => {
  return (
    parseFloat(calculateRoomTotal()) + parseFloat(calculateTaxes())
  ).toFixed(2);
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
  console.log("Form submitted:", formData);

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
