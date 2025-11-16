<template>
  <ComponentCard
    title="Cumplimiento"
    description="Seguimiento de intervenciones"
    full-height
  >
    <template #header>
      <div class="flex items-center gap-2">
        <label for="sede-select-compliance" class="text-sm font-medium text-gray-700">
          Sede:
        </label>
        <select
          id="sede-select-compliance"
          v-model="selectedSede"
          @change="handleSedeChange"
          class="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option v-for="sede in availableSedes" :key="sede" :value="sede">
            {{ sede }}
          </option>
        </select>
      </div>
    </template>
    <div class="flex h-full flex-col gap-4">
      <!-- Dos círculos de cumplimiento: Preventivos y Calibraciones -->
      <div v-if="summary" class="flex flex-1 items-center justify-center gap-6 min-h-0">
        <!-- Círculo de Preventivos -->
        <div class="flex flex-col items-center gap-2">
          <div class="relative flex items-center justify-center">
            <svg class="h-32 w-32 -rotate-90 transform" viewBox="0 0 200 200">
              <!-- Círculo de fondo -->
              <circle
                cx="100"
                cy="100"
                r="85"
                stroke="#E2E8F0"
                stroke-width="12"
                fill="none"
                class="drop-shadow-sm"
              />
              <!-- Círculo de progreso -->
              <circle
                cx="100"
                cy="100"
                r="85"
                :stroke="getComplianceColor(summary.compliancePreventivos)"
                stroke-width="12"
                fill="none"
                stroke-linecap="round"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="circumference - (summary.compliancePreventivos / 100) * circumference"
                class="transition-all duration-1000 ease-out drop-shadow-md"
              />
            </svg>

            <!-- Contenido central -->
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <div class="text-center">
                <div class="text-3xl font-bold text-gray-900">
                  {{ summary.compliancePreventivos.toFixed(1) }}<span class="text-xl text-gray-500">%</span>
                </div>
              </div>
            </div>
          </div>
          <div class="text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Preventivos
          </div>
        </div>

        <!-- Círculo de Calibraciones -->
        <div class="flex flex-col items-center gap-2">
          <div class="relative flex items-center justify-center">
            <svg class="h-32 w-32 -rotate-90 transform" viewBox="0 0 200 200">
              <!-- Círculo de fondo -->
              <circle
                cx="100"
                cy="100"
                r="85"
                stroke="#E2E8F0"
                stroke-width="12"
                fill="none"
                class="drop-shadow-sm"
              />
              <!-- Círculo de progreso -->
              <circle
                cx="100"
                cy="100"
                r="85"
                :stroke="getComplianceColor(summary.complianceCalibraciones)"
                stroke-width="12"
                fill="none"
                stroke-linecap="round"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="circumference - (summary.complianceCalibraciones / 100) * circumference"
                class="transition-all duration-1000 ease-out drop-shadow-md"
              />
            </svg>

            <!-- Contenido central -->
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <div class="text-center">
                <div class="text-3xl font-bold text-gray-900">
                  {{ summary.complianceCalibraciones.toFixed(1) }}<span class="text-xl text-gray-500">%</span>
                </div>
              </div>
            </div>
          </div>
          <div class="text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Calibraciones
          </div>
        </div>
      </div>

      <div v-else class="flex h-full items-center justify-center">
        <div class="text-center">
          <div class="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
          <p class="mt-3 text-sm text-gray-500">Cargando datos...</p>
        </div>
      </div>

      <!-- Grid de métricas mejorado con colores LIME -->
      <div class="grid grid-cols-3 gap-2 mt-auto">
        <div
          class="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#CAEAF2] to-[#8FC8DE]/50 p-2.5 transition-all duration-200 hover:shadow-md hover:scale-105"
        >
          <div class="relative z-10">
            <dt class="mb-0.5 text-[9px] font-bold uppercase tracking-wider text-[#064D5F]/80">
              Preventivos
            </dt>
            <dd class="text-xl font-black text-[#064D5F]">
              {{ summary?.preventative ?? 0 }}
            </dd>
          </div>
          <div class="absolute -right-2 -top-2 h-14 w-14 rounded-full bg-[#5CA6C9]/30 blur-2xl"></div>
        </div>

        <div
          class="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#8FC8DE]/30 to-[#5CA6C9]/40 p-2.5 transition-all duration-200 hover:shadow-md hover:scale-105"
        >
          <div class="relative z-10">
            <dt class="mb-0.5 text-[9px] font-bold uppercase tracking-wider text-[#2974A3]/90">
              Correctivos
            </dt>
            <dd class="text-xl font-black text-[#064D5F]">
              {{ summary?.corrective ?? 0 }}
            </dd>
          </div>
          <div class="absolute -right-2 -top-2 h-14 w-14 rounded-full bg-[#5CA6C9]/40 blur-2xl"></div>
        </div>

        <div
          class="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#E6FAEC] to-[#B3EBC7]/50 p-2.5 transition-all duration-200 hover:shadow-md hover:scale-105"
        >
          <div class="relative z-10">
            <dt class="mb-0.5 text-[9px] font-bold uppercase tracking-wider text-[#3D8D5B]/80">
              Calibraciones
            </dt>
            <dd class="text-xl font-black text-[#3D8D5B]">
              {{ summary?.calibrations ?? 0 }}
            </dd>
          </div>
          <div class="absolute -right-2 -top-2 h-14 w-14 rounded-full bg-[#7FCB97]/30 blur-2xl"></div>
        </div>
      </div>
    </div>
  </ComponentCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ComponentCard } from '@/shared/components/layout'
import { useDashboard } from '../composables/useDashboard'

const { 
  maintenanceSummary,
  selectedSede,
  availableSedes,
  loadMaintenanceSummary,
  loadEquipmentTimeline
} = useDashboard()

const summary = computed(() => maintenanceSummary.value)

function handleSedeChange() {
  const sede = selectedSede.value
  loadEquipmentTimeline(sede)
  loadMaintenanceSummary(sede)
}

// Circunferencia del círculo (2πr donde r=85)
const circumference = 2 * Math.PI * 85

// Función para determinar el color según el porcentaje - Colores LIME
function getComplianceColor(percentage: number): string {
  if (percentage >= 90) return '#7FCB97' // Verde LIME (Brand-500)
  if (percentage >= 75) return '#2974A3' // Azul LIME-4
  if (percentage >= 60) return '#5CA6C9' // Azul LIME-3
  return '#F04438' // Error-500 (Rojo)
}
</script>
