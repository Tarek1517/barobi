<!-- components/Modal.vue -->
<template>
  <div
    class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    @click.self="$emit('close')"
  >
    <div class="bg-white rounded-lg w-full max-w-md p-4">
      <header class="mb-2">
        <slot name="header"></slot>
      </header>
      <main class="mb-4">
        <slot name="body"></slot>
      </main>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>
