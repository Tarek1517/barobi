<template>
  <div class="bg-background flex items-center justify-center p-4">
    <div class="w-full max-w-6xl bg-white shadow-2xl my-20 overflow-hidden flex flex-col lg:flex-row">
      <!-- Left Column - Login Form -->
      <div class="w-full lg:w-1/2 p-8 lg:p-12">
        <!-- Logo and Header -->
        <div class="text-center mb-8">
          <div class="flex justify-center mb-6">
            <div class="relative">
              <NuxtLink to="/" class="relative flex items-center justify-center group">
                <img class="object-cover w-28 h-auto" src="/images/Logo.png" alt="Logo" />
              </NuxtLink>
            </div>
          </div>
          <h1
            class="text-3xl font-primary font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p class="text-gray-500 font-secondary">Sign in to your account to continue</p>
        </div>

        <!-- Login Form -->
        <UForm ref="login-form" :schema="schema" :state="state" class="space-y-6 mt-8" @submit="onSubmit">
          <!-- Phone Input -->
          <UFormField label="Phone Number" name="phone" class="w-full">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UIcon name="i-lucide-phone" class="text-blue-500" />
              </div>
              <UInput placeholder="Enter your phone number" v-model="state.phone" class="w-full font-secondary pl-10"
                size="xl" :ui="{
                  base: 'p-3 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300',
                }" />
            </div>
            <p class="text-xs font-secondary text-gray-500 mt-1">
              We'll never share your phone with anyone else.
            </p>
          </UFormField>

          <!-- Password Input -->
          <UFormField label="Password" name="password" class="w-full">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UIcon name="i-lucide-lock" class="text-blue-500" />
              </div>
              <UInput :type="show ? 'text' : 'password'" v-model="state.password"
                class="w-full font-secondary pl-10 pr-10" size="xl" :ui="{
                  base: 'p-3 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300',
                }">
                <template #trailing>
                  <UButton color="gray" variant="ghost" size="xs" :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                    :aria-label="show ? 'Hide password' : 'Show password'" :aria-pressed="show" aria-controls="password"
                    @click="show = !show" class="hover:bg-gray-100 rounded-lg" />
                </template>
              </UInput>
            </div>
          </UFormField>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between text-sm">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox"
                class="h-4 w-4 font-secondary text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
              <label for="remember-me" class="ml-2 block text-gray-700">
                Remember me
              </label>
            </div>
            <a href="#"
              class="font-medium font-secondary text-indigo-600 hover:text-indigo-500 transition-colors duration-300">
              Forgot password?
            </a>
          </div>

          <!-- Submit Button -->
          <UButton type="submit" block size="xl" loading-auto :ui="{
            base: 'w-full group font-primary relative bg-primary text-white py-4 px-6 font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-primary/30 overflow-hidden',
          }">
            <span class="flex items-center justify-center">
              <UIcon name="i-lucide-log-in" class="mr-2" />
              Sign in to your account
            </span>
            <div
              class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000">
            </div>
          </UButton>
        </UForm>

        <!-- Divider -->
        <div class="mt-8">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>
        </div>

        <!-- Sign Up Link -->
        <p class="mt-8 font-secondary text-center text-gray-500 text-sm">
          Don't have an account?
          <NuxtLink to="/auth/register"
            class="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300">
            Create account
          </NuxtLink>
        </p>
      </div>

      <!-- Right Column - Full Height Image -->
      <div class="w-full lg:w-1/2 relative hidden lg:block">
        <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 z-10"></div>
        <img src="/images/01.jpg" alt="Modern workspace" class="w-full h-auto object-cover" />

        <!-- Overlay Text -->
        <div class="absolute inset-0 flex items-center justify-center z-20 p-8">
          <div class="text-center max-w-md">
            <h2 class="text-3xl font-primary linear-wipe uppercase font-bold mb-4 drop-shadow-lg">
              Brobi Appartments
            </h2>
            <p class="text-lg font-secondary drop-shadow-md text-gray-500 opacity-90">
              Discover amazing features and connect with like-minded people
              around the world.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { object, string, type InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";
const toast = useToast();
const form = useTemplateRef("login-form");
const auth = useAuthStore();
const show = ref(false);
useSeoMeta({
  title: "Login",
});
definePageMeta({
  title: "Login",
});

const schema = object({
  phone: string().required("Phone Field is Required"),
  password: string().required("Password Field is Required"),
});

type Schema = InferType<typeof schema>;

const state = reactive({
  phone: undefined,
  password: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  form.value?.clear();

  try {
    await auth.login(event.data);
    navigateTo("/dashboard");
  } catch (err: any) {

    if (err.type === 'validation') {
      form.value?.setErrors(err.errors);
      return;
    }

    toast.add({
      title: "Login failed",
      description: err.message || "Invalid phone or password",
      icon: "i-lucide-triangle-alert",
    });
  }
}


</script>

<style scoped>
/* Gradient Text Animation */
.linear-wipe {
  text-align: center;
  background: linear-gradient(to right,
      #7e1218 20%,
      #cd986c 40%,
      #cd986c 60%,
      #fff 80%);
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
