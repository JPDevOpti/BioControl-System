<template>
  <ComponentCard
    :title="`Mantenimientos por mes - ${selectedSede}`"
    description="Registro mensual de preventivos, correctivos y calibraciones realizadas"
    :loading="loadingTimeline"
    loading-text="Cargando series de mantenimientos..."
    full-height
  >
    <template #header>
      <div class="flex items-center gap-2">
        <label for="sede-select" class="text-sm font-medium text-gray-700">
          Sede:
        </label>
        <select
          id="sede-select"
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

    <div v-if="!loadingTimeline" class="-mx-6 -mb-6 flex-1 px-6 pb-6">
      <div class="h-full min-w-0">
        <VueApexCharts
          type="bar"
          :height="chartHeight"
          :options="chartOptions"
          :series="seriesTimeline"
          class="w-full"
        />
      </div>
    </div>
  </ComponentCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import type { ApexOptions } from 'apexcharts'
import { ComponentCard } from '@/shared/components/layout'
import { useDashboard } from '../composables/useDashboard'

const {
  seriesTimeline,
  timelineCategories,
  loadingTimeline,
  selectedSede,
  availableSedes,
  loadEquipmentTimeline,
  loadMaintenanceSummary
} = useDashboard()

const chartHeight = 220

function handleSedeChange() {
  const sede = selectedSede.value
  loadEquipmentTimeline(sede)
  loadMaintenanceSummary(sede)
}

const chartOptions = computed<ApexOptions>(() => ({
  chart: {
    type: 'bar',
    fontFamily: 'Outfit, sans-serif',
    toolbar: { show: false },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 600,
      animateGradually: { enabled: true, delay: 80 }
    }
  },
  colors: ['#2974A3', '#5CA6C9', '#7FCB97'], // Preventivos, Correctivos, Calibraciones (Colores LIME)
  plotOptions: {
    bar: {
      columnWidth: '75%',
      borderRadius: 4,
      borderRadiusApplication: 'end',
      dataLabels: {
        position: 'top'
      }
    }
  },
  dataLabels: {
    enabled: true,
    offsetY: -20,
    style: {
      fontSize: '10px',
      fontWeight: 600,
      colors: ['#334155']
    }
  },
  stroke: { show: true, width: 2, colors: ['transparent'] },
  xaxis: {
    categories: timelineCategories.value,
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: {
      style: {
        fontSize: '11px',
        fontWeight: 500
      }
    }
  },
  yaxis: {
    labels: {
      formatter: (val: number) => Math.round(val).toString(),
      style: {
        fontSize: '11px'
      }
    },
    title: {
      text: 'Cantidad',
      style: {
        fontSize: '12px',
        fontWeight: 500,
        color: '#6B7280'
      }
    }
  },
  legend: {
    show: true,
    position: 'top',
    horizontalAlign: 'right',
    fontSize: '12px',
    fontWeight: 500,
    markers: {
      width: 10,
      height: 10,
      radius: 10, // Hacer círculos
      offsetX: -2
    },
    itemMargin: {
      horizontal: 12,
      vertical: 0
    }
  },
  grid: { 
    strokeDashArray: 4,
    borderColor: '#E5E7EB',
    padding: {
      top: 0,
      right: 8,
      bottom: 0,
      left: 0
    }
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: (val: number) => `${val} OTs`
    }
  }
}))
</script>
