<template>
  <div
    class="bg-background flex items-center justify-center p-4"
  >
    <div
      class="w-full max-w-6xl bg-white my-20 shadow-2xl overflow-hidden flex flex-col lg:flex-row"
    >
      <!-- Left Column - Register Form -->
      <div class="w-full lg:w-1/2 p-8 lg:p-12">
        <!-- Logo and Header -->
        <div class="text-center mb-8">
          <div class="flex justify-center mb-6">
            <div class="relative">
              <NuxtLink
                to="/"
                class="relative flex items-center justify-center group"
              >
                <img
                  class="object-cover w-28 h-auto"
                  src="/images/Logo.png"
                  alt="Logo"
                />
              </NuxtLink>
            </div>
          </div>
          <h1
            class="text-3xl font-bold font-primary bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2"
          >
            Create Your Account
          </h1>
          <p class="text-gray-500 font-secondary">Join our community and start your journey</p>
        </div>

        <!-- Register Form -->
        <UForm
          ref="register-form"
          :schema="registerSchema"
          :state="registerState"
          class="space-y-5 mt-8"
          @submit="onRegister"
        >
          <!-- Name Input -->
          <UFormField label="Full Name" name="name" class="w-full font-secondary">
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <UIcon name="i-lucide-user" class="text-blue-500" />
              </div>
              <UInput
                placeholder="Enter your full name"
                v-model="registerState.name"
                class="w-full font-secondary pl-10"
                size="xl"
                :ui="{
                  base: 'p-3 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300',
                }"
              />
            </div>
          </UFormField>

          <!-- Phone Input -->
          <UFormField label="Phone Number" name="phone" class="w-full font-secondary">
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <UIcon name="i-lucide-phone" class="text-blue-500" />
              </div>
              <UInput
                placeholder="Enter your phone number"
                v-model="registerState.phone"
                class="w-full font-secondary pl-10"
                size="xl"
                :ui="{
                  base: 'p-3 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300',
                }"
              />
            </div>
            <p class="text-xs font-secondary text-gray-500 mt-1">
              We'll never share your phone with anyone else.
            </p>
          </UFormField>

          <!-- Email Input -->
          <UFormField label="Email Address" name="email" class="w-full font-secondary">
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <UIcon name="i-lucide-mail" class="text-blue-500" />
              </div>
              <UInput
                placeholder="Enter your email address"
                v-model="registerState.email"
                class="w-full font-secondary pl-10"
                size="xl"
                :ui="{
                  base: 'p-3 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300',
                }"
              />
            </div>
            <p class="text-xs text-gray-500 mt-1">
              We'll never share your email with anyone else.
            </p>
          </UFormField>

          <!-- Password Input -->
          <UFormField label="Password" name="password" class="w-full font-secondary">
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <UIcon name="i-lucide-lock" class="text-blue-500" />
              </div>
              <UInput
                :type="show ? 'text' : 'password'"
                v-model="registerState.password"
                placeholder="Create a strong password"
                class="w-full font-secondary pl-10 pr-10"
                size="xl"
                :ui="{
                  base: 'p-3 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300',
                }"
              >
                <template #trailing>
                  <UButton
                    color="gray"
                    variant="ghost"
                    size="xs"
                    :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                    :aria-label="show ? 'Hide password' : 'Show password'"
                    :aria-pressed="show"
                    aria-controls="password"
                    @click="show = !show"
                    class="hover:bg-gray-100 rounded-lg"
                  />
                </template>
              </UInput>
            </div>
          </UFormField>

          <!-- Terms and Conditions -->
          <div class="flex font-secondary items-center text-sm">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              required
            />
            <label for="terms" class="ml-2 block text-gray-700">
              I agree to the
              <a
                href="#"
                class="text-indigo-600 hover:text-indigo-500 transition-colors duration-300"
              >
                Terms and Conditions
              </a>
            </label>
          </div>

          <!-- Submit Button -->
          <UButton
            type="submit"
            block
            size="xl"
            loading-auto
            :ui="{
              base: 'w-full group relative font-primary bg-primary text-white py-4 px-6 font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-primary/30 overflow-hidden',
            }"
          >
            <span class="flex items-center justify-center">
              <UIcon name="i-lucide-user-plus" class="mr-2" />
              Create Account
            </span>
            <div
              class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
            ></div>
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

        
        <!-- Sign In Link -->
        <p class="mt-8 text-center font-secondary text-gray-500 text-sm">
          Already have an account?
          <NuxtLink
            to="/auth/login"
            class="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300"
          >
            Sign in
          </NuxtLink>
        </p>
      </div>

      <!-- Right Column - Full Height Image -->
      <div class="w-full lg:w-1/2 relative hidden lg:block">
        <div
          class="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 z-10"
        ></div>
        <img
          src="/images/caffee.png"
          alt="Team collaboration"
          class="w-full h-full object-cover"
        />

        <!-- Overlay Text -->
        <div class="absolute inset-0 flex items-center justify-center z-20 p-8">
          <div class="text-center text-white max-w-md">
            <h2 class="text-3xl font-primary linear-wipe uppercase font-bold mb-4 drop-shadow-lg">
              Start Your Journey
            </h2>
            <p class="text-lg font-secondary drop-shadow-md opacity-90">
              Join thousands of learners and unlock your potential with our
              platform.
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
const registerForm = useTemplateRef("register-form");
const toast = useToast();
const auth = useAuthStore();
const show = ref(false);
useSeoMeta({
  title: "Register",
});
definePageMeta({
  title: "Register",
});

const registerSchema = object({
  name: string().required("Name Field is Required"),
  email: string()
    .email("Please enter a valid email")
    .required("Email Field is Required"),
  phone: string().required("Phone Field is Required"),
  password: string().required("Password Field is Required"),
});

type RegisterSchema = InferType<typeof registerSchema>;
const registerState = reactive({
  name: undefined,
  phone: undefined,
  email: undefined,
  password: "",
});

function checkStrength(str: string) {
  const requirements = [
    { regex: /.{8,}/, text: "At least 8 characters" },
    { regex: /\d/, text: "At least 1 number" },
    { regex: /[a-z]/, text: "At least 1 lowercase letter" },
    { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
  ];

  return requirements.map((req) => ({
    met: req.regex.test(str),
    text: req.text,
  }));
}

const strength = computed(() => checkStrength(registerState.password));
const score = computed(() => strength.value.filter((req) => req.met).length);

const color = computed(() => {
  if (score.value === 0) return "neutral";
  if (score.value <= 1) return "error";
  if (score.value <= 2) return "warning";
  if (score.value === 3) return "warning";
  return "success";
});

const text = computed(() => {
  if (score.value === 0) return "Enter a password";
  if (score.value <= 2) return "Weak password";
  if (score.value === 3) return "Medium password";
  return "Strong password";
});

async function onRegister(event: FormSubmitEvent<RegisterSchema>) {
  registerForm.value?.clear();
  try {
    await auth.register(event.data);
    navigateTo("/student/dashboard");
  } catch (err: any) {
    const error = useApiError(err);
    if (error.isValidationError) {
      registerForm.value?.setErrors(error.bag);
      return;
    }

    toast.add({
      title: "Something went wrong",
      description: "Please try again later",
      icon: "i-lucide-triangle-alert",
      color: "red",
    });
  }
}
</script>

<style scoped>
/* Gradient Text Animation */
.linear-wipe {
  text-align: center;
  background: linear-gradient(
    to right,
    #7e1218 20%,
    #cd986c 40%,
    #cd986c 60%,
    #fff 80%
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
