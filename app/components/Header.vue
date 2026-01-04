<script setup lang="ts"></script>
<template>
  <header class="hidden lg:block">
    <nav class="relative">
      <div class="">
        <TopHeader />
        <NavBar />
      </div>
    </nav>
  </header>
  <header class="lg:hidden">
    <MobileNavbar />
  </header>
</template>
<style scoped></style>
