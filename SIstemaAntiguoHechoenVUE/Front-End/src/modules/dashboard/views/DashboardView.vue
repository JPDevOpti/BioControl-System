<!--
  Vista Dashboard de MedInventory
  Página principal que muestra el layout con header y sidebar
-->
<template>
  <AdminLayout>
    <div class="space-y-6 2xl:space-y-8">
      <!-- Fila superior: Gráfico de barras + Porcentaje de cumplimiento -->
      <section
        class="grid min-w-0 gap-6 items-stretch [grid-template-columns:minmax(0,1fr)] xl:[grid-template-columns:minmax(0,1.3fr)_minmax(0,0.7fr)] 2xl:gap-8"
      >
        <div class="min-w-0">
          <EquipmentByMonth />
        </div>
        <div class="min-w-0">
          <MaintenanceCompliance />
        </div>
      </section>

      <!-- Fila inferior: Gráfico de tendencia ocupando toda la línea -->
      <section class="min-w-0">
        <EquipmentTrend />
      </section>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { AdminLayout } from '@/shared/layouts'
import EquipmentByMonth from '../components/EquipmentByMonth.vue'
import MaintenanceCompliance from '../components/MaintenanceCompliance.vue'
import EquipmentTrend from '../components/EquipmentTrend.vue'
</script>

