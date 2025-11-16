<template>
  <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
    <!-- Grid de meses - 4 columnas para ver todos los meses claramente -->
    <div class="p-4 relative">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        <div
          v-for="month in months"
          :key="month.number"
          @click="$emit('select-month', month.number)"
          :class="[
            'relative bg-white border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md',
            month.isCurrent 
              ? 'border-blue-500 ring-1 ring-blue-200' 
              : 'border-gray-200 hover:border-gray-300'
          ]"
        >
          <!-- Nombre del mes -->
          <div class="mb-3 -mx-4 -mt-4 px-4 pt-3 pb-3 rounded-t-lg" 
               :class="month.isCurrent ? 'bg-[#E6FAEC] border-b-2 border-[#7FCB97]' : 'bg-[#CAEAF2] border-b-2 border-[#5CA6C9]'">
            <div class="flex items-center justify-between">
              <h3 
                :class="[
                  'text-base font-bold',
                  month.isCurrent 
                    ? 'text-[#3D8D5B]' 
                    : 'text-[#064D5F]'
                ]"
              >
                {{ month.name }}
              </h3>
              <span 
                v-if="month.isCurrent"
                class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-[#7FCB97] text-white"
              >
                Actual
              </span>
            </div>
          </div>

          <!-- Información compacta -->
          <div class="space-y-2">
            <!-- Preventivos -->
            <div 
              @click.stop="$emit('show-events', month.number, 'Preventivo')"
              class="flex items-center justify-between text-sm p-2 rounded-md bg-[#CAEAF2]/30 border border-[#8FC8DE]/30 cursor-pointer hover:bg-[#CAEAF2]/50 transition-colors"
            >
              <div class="flex items-center gap-2">
                <SettingsIcon class="w-4 h-4 text-[#064D5F]" />
                <span class="text-gray-700 font-medium">Preventivos</span>
              </div>
              <span class="font-bold text-[#064D5F]">{{ month.preventivos }}</span>
            </div>

            <!-- Correctivos -->
            <div 
              @click.stop="$emit('show-events', month.number, 'Correctivo')"
              class="flex items-center justify-between text-sm p-2 rounded-md bg-orange-50/50 border border-orange-100/50 cursor-pointer hover:bg-orange-50/70 transition-colors"
            >
              <div class="flex items-center gap-2">
                <AlertIcon class="w-4 h-4 text-orange-600" />
                <span class="text-gray-700 font-medium">Correctivos</span>
              </div>
              <span class="font-bold text-orange-600">{{ month.correctivos }}</span>
            </div>

            <!-- Calibraciones -->
            <div 
              @click.stop="$emit('show-events', month.number, 'Calibración')"
              class="flex items-center justify-between text-sm p-2 rounded-md bg-[#E6FAEC]/50 border border-[#B3EBC7]/50 cursor-pointer hover:bg-[#E6FAEC]/70 transition-colors"
            >
              <div class="flex items-center gap-2">
                <CalibrationIcon class="w-4 h-4 text-[#3D8D5B]" />
                <span class="text-gray-700 font-medium">Calibraciones</span>
              </div>
              <span class="font-bold text-[#3D8D5B]">{{ month.calibraciones }}</span>
            </div>
          </div>

          <!-- Total -->
          <div class="mt-3 pt-3 border-t border-gray-200">
            <div class="flex items-center justify-between">
              <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">Total</span>
              <span class="text-lg font-bold text-gray-900">{{ month.total }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading overlay -->
      <div
        v-if="isLoading"
        class="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-xl"
      >
        <div class="flex flex-col items-center gap-3">
          <div class="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
          <p class="text-sm text-gray-600 font-medium">Cargando datos...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SettingsIcon, AlertIcon, CalibrationIcon } from '@/assets/icons'

interface MonthData {
  number: number
  name: string
  preventivos: number
  correctivos: number
  calibraciones: number
  total: number
  isCurrent: boolean
}

interface Props {
  months: MonthData[]
  isLoading: boolean
}

defineProps<Props>()

defineEmits<{
  (e: 'select-month', month: number): void
  (e: 'show-events', month: number, type: 'Preventivo' | 'Correctivo' | 'Calibración'): void
}>()
</script>
