<!--
  Componente Backdrop
  Fondo oscuro que cubre la pantalla cuando el sidebar móvil está abierto.
-->
<template>
  <div
    v-if="isMobileOpen"
  class="fixed inset-0 bg-gray-900/50 z-[9999] lg:hidden"
    @click="toggleMobileSidebar"
  ></div>
</template>

<script setup lang="ts">
import { useSidebar } from '@/shared/composables'

const { toggleMobileSidebar, isMobileOpen } = useSidebar()
</script>
