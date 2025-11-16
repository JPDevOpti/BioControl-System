<template>
  <section class="grid h-full grid-cols-1 gap-3 sm:grid-cols-2">
    <ComponentCard
      v-for="metric in metrics"
      :key="metric.label"
      hide-header
      dense
      :custom-class="'group relative border-l-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5'"
      :style="{ borderLeftColor: getBorderColor(metric.label) }"
    >
      <div class="flex h-full flex-col justify-between py-1">
        <!-- Valor principal -->
        <div class="mb-2">
          <div class="flex items-baseline gap-2 mb-1">
            <span class="text-3xl font-bold text-gray-900 leading-none tracking-tight">
              {{ formatValue(metric) }}
            </span>
            <span v-if="metric.unitLabel" class="text-xs font-medium text-gray-500">
              {{ metric.unitLabel }}
            </span>
          </div>
          
          <!-- Etiqueta -->
          <h3 class="text-xs font-medium text-gray-600 leading-tight">
            {{ metric.label }}
          </h3>
        </div>

        <!-- Delta e ícono en una fila -->
        <div class="flex items-center justify-between">
          <div
            v-if="typeof metric.delta === 'number'"
            :class="[
              'inline-flex items-center gap-1 text-xs font-semibold',
              metric.delta >= 0 ? 'text-emerald-600' : 'text-rose-600'
            ]"
          >
            <svg
              v-if="metric.delta !== 0"
              class="h-3 w-3 flex-shrink-0"
              viewBox="0 0 12 12"
              fill="currentColor"
            >
              <path
                v-if="metric.delta >= 0"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.53033 1.46967C6.23744 1.17678 5.76256 1.17678 5.46967 1.46967L1.46967 5.46967C1.17678 5.76256 1.17678 6.23744 1.46967 6.53033C1.76256 6.82322 2.23744 6.82322 2.53033 6.53033L5.25 3.81066V10.75C5.25 11.1642 5.58579 11.5 6 11.5C6.41421 11.5 6.75 11.1642 6.75 10.75V3.81066L9.46967 6.53033C9.76256 6.82322 10.2374 6.82322 10.5303 6.53033C10.8232 6.23744 10.8232 5.76256 10.5303 5.46967L6.53033 1.46967Z"
              />
              <path
                v-else
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.46967 10.5303C5.76256 10.8232 6.23744 10.8232 6.53033 10.5303L10.5303 6.53033C10.8232 6.23744 10.8232 5.76256 10.5303 5.46967C10.2374 5.17678 9.76256 5.17678 9.46967 5.46967L6.75 8.18934V1.25C6.75 0.835786 6.41421 0.5 6 0.5C5.58579 0.5 5.25 0.835786 5.25 1.25V8.18934L2.53033 5.46967C2.23744 5.17678 1.76256 5.17678 1.46967 5.46967C1.17678 5.76256 1.17678 6.23744 1.46967 6.53033L5.46967 10.5303Z"
              />
            </svg>
            <span>{{ formatDelta(metric.delta) }}</span>
          </div>

          <!-- Ícono minimalista -->
          <div
            class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-110"
            :style="{ backgroundColor: getIconBgColor(metric.label), color: getIconColor(metric.label) }"
          >
            <component :is="iconForMetric(metric.label)" class="h-4 w-4" />
          </div>
        </div>
      </div>
    </ComponentCard>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ComponentCard } from '@/shared/components/layout'
import { SettingsIcon, WarningIcon, TestIcon, DolarIcon, BoxCubeIcon } from '@/assets/icons'
import { useDashboard } from '../composables/useDashboard'

type EquipmentMetric = {
  label: string
  value: number
  delta: number
  format?: 'number' | 'currency'
  unitLabel?: string
}

const { metricsList, loadingMetrics } = useDashboard()

const metrics = computed<EquipmentMetric[]>(() => (loadingMetrics.value ? placeholderMetrics : metricsList.value))

const placeholderMetrics: EquipmentMetric[] = [
  {
    label: 'Mantenimientos preventivos',
    value: 0,
    delta: 0,
    unitLabel: 'OTs'
  },
  {
    label: 'Mantenimientos correctivos',
    value: 0,
    delta: 0,
    unitLabel: 'OTs'
  },
  {
    label: 'Calibraciones realizadas',
    value: 0,
    delta: 0,
    unitLabel: 'Equipos'
  },
  {
    label: 'Costo total',
    value: 0,
    delta: 0,
    format: 'currency'
  }
]

function formatValue(metric: EquipmentMetric) {
  if (metric.format === 'currency') {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(metric.value)
  }

  return new Intl.NumberFormat('es-CO').format(metric.value)
}

function formatDelta(delta: number) {
  return `${delta > 0 ? '+' : ''}${delta.toFixed(1)}%`
}

function iconForMetric(label: string) {
  if (label.includes('preventivos')) return SettingsIcon
  if (label.includes('correctivos')) return WarningIcon
  if (label.includes('Calibraciones')) return TestIcon
  if (label.includes('Costo')) return DolarIcon
  return BoxCubeIcon
}

// Colores LIME minimalistas para bordes
function getBorderColor(label: string) {
  if (label.includes('preventivos')) return '#2974A3'  // Azul LIME-4
  if (label.includes('correctivos')) return '#5CA6C9'  // Azul LIME-3
  if (label.includes('Calibraciones')) return '#7FCB97' // Verde LIME
  if (label.includes('Costo')) return '#667085'         // Gris
  return '#667085'
}

// Backgrounds sutiles para íconos
function getIconBgColor(label: string) {
  if (label.includes('preventivos')) return '#CAEAF2'  // Azul claro
  if (label.includes('correctivos')) return '#8FC8DE'  // Azul medio claro
  if (label.includes('Calibraciones')) return '#E6FAEC' // Verde claro
  if (label.includes('Costo')) return '#F2F4F7'        // Gris claro
  return '#F2F4F7'
}

// Colores de íconos
function getIconColor(label: string) {
  if (label.includes('preventivos')) return '#064D5F'  // Azul oscuro
  if (label.includes('correctivos')) return '#2974A3' // Azul LIME-4
  if (label.includes('Calibraciones')) return '#3D8D5B' // Verde oscuro
  if (label.includes('Costo')) return '#475467'        // Gris oscuro
  return '#475467'
}
</script>
