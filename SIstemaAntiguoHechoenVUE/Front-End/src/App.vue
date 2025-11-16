<template>
  <div id="app" class="min-h-screen bg-gray-50 text-gray-900">
    <!-- Contenedor principal. El contenido real se agregará en próximas iteraciones. -->
    <router-view />
  </div>
</template>

<script setup lang="ts">
// Este componente actúa como raíz de la aplicación. La lógica se implementará más adelante.
</script>

<style scoped>
/* Estilos temporales para el contenedor principal */
#app {
  display: flex;
  flex-direction: column;
}
</style>
