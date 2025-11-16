<template>
  <div class="flex h-full min-h-screen items-center justify-center bg-gray-50">
    <div class="text-center">
      <div class="mb-6 flex justify-center">
        <div class="rounded-full bg-blue-100 p-6">
          <svg
            class="h-20 w-20 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
      </div>
      <h1 class="mb-3 text-3xl font-bold text-gray-900">Módulo en desarrollo</h1>
      <p class="mb-8 text-lg text-gray-600">
        Esta sección estará disponible próximamente
      </p>
      <router-link
        to="/dashboard"
        class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Volver al Dashboard
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// Componente placeholder para rutas en desarrollo
</script>
