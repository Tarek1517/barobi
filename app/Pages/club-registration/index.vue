<template>
  <div class="bg-background flex items-center justify-center p-4">
    <div class="w-full max-w-6xl bg-white my-20 shadow-2xl overflow-hidden flex flex-col lg:flex-row">
      <div class="w-full lg:w-1/2 p-8 lg:p-12">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-6">
            <div class="relative">
              <NuxtLink to="/" class="relative flex items-center justify-center group">
                <img class="object-cover w-28 h-auto" src="/images/Logo.png" alt="Logo" />
              </NuxtLink>
            </div>
          </div>
          <h1 class="text-3xl font-bold font-primary bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            Join Barobi Privilege Club
          </h1>
          <p class="text-gray-500 font-secondary">{{ settings?.data?.club_description }}</p>
        </div>

        <UForm ref="clubFormRef" :schema="clubSchema" :state="clubState" class="space-y-5 mt-8" @submit="onSubmit">
          <UFormField label="Full Name" name="name" class="w-full font-secondary">
            <div class="relative w-full">
              <UInput 
                placeholder="Enter your full name" 
                v-model="clubState.name" 
                class="w-full"
                size="xl" 
                :ui="{ base: 'pl-10 p-3 border border-gray-300 focus:ring-2 focus:ring-indigo-500 transition-all duration-300' }" 
              />
            </div>
          </UFormField>

          <UFormField label="Email Address" name="email" class="w-full font-secondary">
            <div class="relative w-full">
              <UInput 
                placeholder="Enter your email address" 
                v-model="clubState.email"
                class="w-full" 
                size="xl" 
                :ui="{ base: 'pl-10 p-3 border border-gray-300 focus:ring-2 focus:ring-indigo-500 transition-all duration-300' }" 
              />
            </div>
            <p class="text-xs text-gray-500 mt-1">We'll never share your email with anyone else.</p>
          </UFormField>

          <UFormField label="Phone Number" name="phone" class="w-full font-secondary">
            <div class="relative w-full">
              <UInput 
                placeholder="Enter your phone number" 
                v-model="clubState.phone"
                class="w-full" 
                size="xl" 
                :ui="{ base: 'pl-10 p-3 border border-gray-300 focus:ring-2 focus:ring-indigo-500 transition-all duration-300' }" 
              />
            </div>
          </UFormField>

          <UFormField label="Reservation Number" name="reservation_number" class="w-full font-secondary">
            <div class="relative w-full">
              <UInput 
                placeholder="Enter your reservation number" 
                v-model="clubState.reservation_number"
                class="w-full" 
                size="xl" 
                :ui="{ base: 'pl-10 p-3 border border-gray-300 focus:ring-2 focus:ring-indigo-500 transition-all duration-300' }" 
              />
            </div>
          </UFormField>

          <UFormField name="terms">
            <div class="flex font-secondary items-center text-sm">
              <UCheckbox v-model="clubState.terms" id="terms" label="I agree to the Club Terms and Conditions" />
            </div>
          </UFormField>

          <UButton type="submit" block size="xl" :ui="{
            base: 'w-full group relative font-primary bg-primary text-white py-4 px-6 font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-primary/30 overflow-hidden',
          }">
            <span class="flex items-center justify-center">
              <UIcon name="i-lucide-user-plus" class="mr-2" />
              Join Club
            </span>
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </UButton>
        </UForm>
      </div>

      <div class="w-full lg:w-1/2 relative hidden lg:block">
        <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 z-10"></div>
        <img :src="settings?.data?.club_image || '/images/placeholder.jpg'" alt="Club Privileges" class="w-full h-full object-cover" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { object, string, boolean, type InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";

const { $api } = useNuxtApp();
const toast = useToast();
const clubFormRef = ref(null);

const { data: settings } = await useAsyncData('settings', () => $api('/get-settings'));

useSeoMeta({ title: "Club Registration" });

const clubSchema = object({
  name: string().required("Name is required"),
  email: string().email("Invalid email").required("Email is required"),
  phone: string().required("Phone is required"),
  reservation_number: string().required("Reservation number is required"),
  terms: boolean().oneOf([true], "You must accept the terms")
});

type ClubSchema = InferType<typeof clubSchema>;

const clubState = reactive({
  name: undefined,
  phone: undefined,
  email: undefined,
  reservation_number: undefined,
  terms: false
});

async function onSubmit(event: FormSubmitEvent<ClubSchema>) {
  try {
    const response: any = await $api('/club-register', {
      method: 'POST',
      body: event.data,
    });

    toast.add({
      title: "Success!",
      description: response.message,
      icon: "i-lucide-check-circle",
    });

    // Reset form
    Object.assign(clubState, {
      name: undefined,
      phone: undefined,
      email: undefined,
      reservation_number: undefined,
      terms: false
    });
    
  } catch (error: any) {
    const errorMsg = error?.data?.errors 
      ? Object.values(error.data.errors).flat()[0] 
      : (error?.data?.message || "Something went wrong");

    toast.add({
      title: "Registration Failed",
      description: errorMsg,
      color: "red",
      icon: "i-lucide-x-circle",
    });
  }
}
</script>