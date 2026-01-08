<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const user = useAuthStore().user
const bookings = [
  {
    id: 1,
    apartment: {
      name: "Luxury Skyview Apartment",
      image: "/images/room-8.jpg",
      location: "Downtown, New York",
      type: "2 Bedroom, 2 Bath",
    },
    checkIn: "2024-12-15",
    checkOut: "2024-12-22",
    guests: 2,
    total: 1250,
    status: "confirmed",
    bookingDate: "2024-11-10",
  },
  {
    id: 2,
    apartment: {
      name: "Modern City Loft",
      image: "/images/room-2.jpg",
      location: "Manhattan, NY",
      type: "Studio Apartment",
    },
    checkIn: "2025-01-05",
    checkOut: "2025-01-12",
    guests: 1,
    total: 850,
    status: "confirmed",
    bookingDate: "2024-11-28",
  },
  {
    id: 3,
    apartment: {
      name: "Beachfront Paradise",
      image: "/images/room-6.jpg",
      location: "Miami Beach, FL",
      type: "3 Bedroom, 2 Bath",
    },
    checkIn: "2024-11-20",
    checkOut: "2024-11-25",
    guests: 4,
    total: 1800,
    status: "completed",
    bookingDate: "2024-10-15",
  },
];

// Upcoming stays
const upcomingStays = bookings.filter(
  (booking) =>
    new Date(booking.checkIn) > new Date() && booking.status === "confirmed"
);

// Past stays
const pastStays = bookings.filter(
  (booking) =>
    new Date(booking.checkOut) < new Date() || booking.status === "completed"
);

// Settings form state
import { ref } from "vue";
const settingsForm = ref({
  name: user.name,
  email: user.email,
  phone: user.phone,
});

// Active tab state
const activeTab = ref("overview");

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// Format date
const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Calculate days until check-in
const daysUntilCheckIn = (checkInDate) => {
  const today = new Date();
  const checkIn = new Date(checkInDate);
  const diffTime = checkIn - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Save settings
const saveSettings = () => {
  // In a real app, this would call an API
  alert("Settings saved successfully!");
};

// Cancel booking
const cancelBooking = (bookingId) => {
  if (confirm("Are you sure you want to cancel this booking?")) {
    // In a real app, this would call an API
    alert("Booking cancelled successfully!");
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold font-primary text-gray-900">Customer Dashboard</h1>
            <p class="text-gray-600 font-secondary">
              Manage your apartment bookings and preferences
            </p>
          </div>
          <div class="flex items-center gap-4">
            <NuxtLink to="/room"
              class="bg-primary font-primary text-white px-6 py-2 hover:bg-primary/90 transition-colors">
              Book New Stay
            </NuxtLink>
            <div
              class="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <span class="text-white font-primary font-semibold">{{ user.name.charAt(0) }}</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar Navigation -->
        <div class="lg:w-1/4">
          <div class="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
            <!-- Customer Profile Summary -->
            <div class="text-center mb-8">
              <div
                class="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-white font-primary text-2xl font-bold">{{ user.name.charAt(0) }}</span>
              </div>
              <h3 class="font-semibold font-primary text-gray-900">{{ user.name }}</h3>
              <p class="text-gray-600 font-secondary text-sm">{{ user.email }}</p>
              <p class="text-gray-500 font-secondary text-xs mt-1">
                Member since {{ formatDate(user.created_at) }}
              </p>
            </div>

            <!-- Navigation -->
            <nav class="space-y-2">
              <button @click="activeTab = 'overview'" :class="[
                'w-full text-left px-4 py-3 transition-all duration-200 font-medium',
                activeTab === 'overview'
                  ? 'bg-primary/10 font-primary text-primary border-l-4 border-primary'
                  : 'text-gray-600 font-primary hover:bg-gray-100',
              ]">
                <div class="flex items-center gap-3">
                  <Icon name="mdi:view-dashboard" class="w-5 h-5" />
                  <span>Overview</span>
                </div>
              </button>

              <!-- <button
                @click="activeTab = 'bookings'"
                :class="[
                  'w-full text-left px-4 py-3 transition-all duration-200 font-medium',
                  activeTab === 'bookings'
                    ? 'bg-primary/10 font-primary text-primary border-l-4 border-primary'
                    : 'text-gray-600 font-primary hover:bg-gray-100',
                ]"
              >
                <div class="flex items-center gap-3">
                  <Icon name="mdi:calendar-check" class="w-5 h-5" />
                  <span>My Bookings</span>
                  <span
                    class="bg-primary text-white text-xs px-2 py-1 rounded-full ml-auto"
                  >
                    {{ bookings.length }}
                  </span>
                </div>
              </button> -->

              <button @click="activeTab = 'settings'" :class="[
                'w-full text-left px-4 py-3 transition-all duration-200 font-medium',
                activeTab === 'settings'
                  ? 'bg-primary/10 font-primary text-primary border-l-4 border-primary'
                  : 'text-gray-600 font-primary hover:bg-gray-100',
              ]">
                <div class="flex items-center gap-3">
                  <Icon name="mdi:cog-outline" class="w-5 h-5" />
                  <span>Account Settings</span>
                </div>
              </button>
            </nav>
          </div>
        </div>

        <!-- Main Content -->
        <div class="lg:w-3/4">
          <!-- Overview Tab -->
          <div v-if="activeTab === 'overview'" class="space-y-8">
            <!-- Welcome Card -->
            <div class="bg-gradient-to-r from-primary to-secondary text-white p-8">
              <div class="flex flex-col md:flex-row items-center justify-between">
                <div>
                  <h2 class="text-3xl font-primary font-bold mb-2">
                    Welcome back, {{ user.name }}! 👋
                  </h2>
                  <p class="text-white/90 font-secondary text-lg">
                    Ready for your next apartment stay?
                  </p>
                </div>
                <NuxtLink to="/room"
                  class="bg-white font-primary text-primary px-8 py-3 font-semibold hover:bg-gray-100 transition-colors mt-4 md:mt-0 inline-block">
                  Book New Stay
                </NuxtLink>
              </div>
            </div>

            <!-- Quick Stats -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="bg-white p-6 shadow-sm border">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Icon name="mdi:calendar-check" class="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p class="text-gray-600 font-primary text-sm">Upcoming Stays</p>
                    <p class="text-2xl font-primary font-bold text-gray-900">
                      {{ upcomingStays.length }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="bg-white p-6 shadow-sm border">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Icon name="mdi:history" class="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p class="text-gray-600 font-primary text-sm">Past Stays</p>
                    <p class="text-2xl font-primary font-bold text-gray-900">
                      {{ pastStays.length }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bookings Tab -->
          <div v-if="activeTab === 'bookings'" class="space-y-6">
            <div class="bg-white rounded-2xl shadow-sm p-6">
              <h3 class="text-xl font-bold font-primary text-gray-900 mb-6">All Bookings</h3>
              <div class="space-y-4">
                <div v-for="booking in bookings" :key="booking.id"
                  class="border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div class="flex flex-col md:flex-row gap-6">
                    <img :src="booking.apartment.image" :alt="booking.apartment.name"
                      class="w-full md:w-32 h-32 object-cover" />
                    <div class="flex-1">
                      <div class="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <h4 class="text-lg font-primary font-semibold text-gray-900">
                          {{ booking.apartment.name }}
                        </h4>
                        <span :class="[
                          'px-3 py-1 font-primary rounded-full text-sm font-medium',
                          booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800',
                        ]">
                          {{
                            booking.status.charAt(0).toUpperCase() +
                            booking.status.slice(1)
                          }}
                        </span>
                      </div>

                      <p class="text-gray-600 font-secondary mb-2">
                        {{ booking.apartment.location }}
                      </p>
                      <p class="text-gray-500 font-secondary text-sm mb-4">
                        {{ booking.apartment.type }}
                      </p>

                      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p class="text-gray-500 font-secondary">Check-in</p>
                          <p class="font-semibold">
                            {{ formatDate(booking.checkIn) }}
                          </p>
                        </div>
                        <div>
                          <p class="text-gray-500 font-secondary">Check-out</p>
                          <p class="font-semibold font-primary">
                            {{ formatDate(booking.checkOut) }}
                          </p>
                        </div>
                        <div>
                          <p class="text-gray-500 font-secondary">Guests</p>
                          <p class="font-semibold font-primary">{{ booking.guests }}</p>
                        </div>
                        <div>
                          <p class="text-gray-500 font-secondary">Total</p>
                          <p class="font-semibold font-primary text-primary">
                            {{ formatCurrency(booking.total) }}
                          </p>
                        </div>
                      </div>

                      <div class="flex gap-3 mt-4">
                        <button
                          class="bg-primary font-primary text-white px-4 py-2 text-sm hover:bg-primary/90 transition-colors">
                          View Details
                        </button>
                        <button v-if="
                          booking.status === 'confirmed' &&
                          new Date(booking.checkIn) > new Date()
                        " @click="cancelBooking(booking.id)"
                          class="border border-gray-300 text-gray-700 px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
                          Cancel
                        </button>
                        <button
                          class="border border-gray-300 font-primary text-gray-700 px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
                          Contact Support
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Settings Tab -->
          <div v-if="activeTab === 'settings'" class="space-y-6">
            <div class="bg-white shadow-sm p-6">
              <h3 class="text-xl font-primary font-bold text-gray-900 mb-6">
                Account Settings
              </h3>

              <div class="space-y-8">
                <!-- Personal Information -->
                <div>
                  <h4 class="text-lg font-primary font-semibold text-gray-900 mb-4">
                    Personal Information
                  </h4>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label class="block text-sm font-secondary font-medium text-gray-700 mb-2">Full Name</label>
                      <input v-model="settingsForm.name" type="text"
                        class="w-full p-3 font-secondary border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                    </div>
                    <div>
                      <label class="block text-sm font-secondary font-medium text-gray-700 mb-2">Email Address</label>
                      <input v-model="settingsForm.email" type="email"
                        class="w-full p-3 font-secondary border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                    </div>
                    <div>
                      <label class="block text-sm font-secondary font-medium text-gray-700 mb-2">Phone Number</label>
                      <input v-model="settingsForm.phone" type="tel"
                        class="w-full p-3 border font-secondary border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                    </div>
                  </div>
                </div>
              </div>

              <h3 class="text-xl font-bold font-primary text-gray-900 my-6">
                Password Settings
              </h3>

              <div class="space-y-8">
                <!-- Personal Information -->
                <div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label class="block text-sm font-secondary font-medium text-gray-700 mb-2">Current
                        Password</label>
                      <input v-model="settingsForm.current_password" type="password"
                        class="w-full p-3 font-secondary border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                    </div>
                    <div>
                      <label class="block text-sm font-secondary font-medium text-gray-700 mb-2">Old Password</label>
                      <input v-model="settingsForm.old_password" type="password"
                        class="w-full p-3 font-secondary border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                    </div>
                    <div>
                      <label class="block font-secondary text-sm font-medium text-gray-700 mb-2">Confirm
                        Password</label>
                      <input v-model="settingsForm.confirm_password" type="password"
                        class="w-full p-3 font-secondary border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                    </div>
                  </div>
                </div>

                <!-- Save Button -->
                <div class="flex justify-end">
                  <button @click="saveSettings"
                    class="bg-primary font-primary text-white px-8 py-3 font-semibold hover:bg-primary/90 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
