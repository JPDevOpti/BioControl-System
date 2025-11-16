<template>
  <ComponentCard 
    title="Inventario de Equipos Médicos"
    description="Filtre los equipos por código, nombre, marca, categoría, estado o clasificación."
  >
    <template #icon>
      <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    </template>

    <!-- Primera línea: Buscar equipo (ocupa toda la línea) -->
    <div class="flex flex-col gap-3">
        <FormInputField
          v-model="local.searchQuery"
          label=" Buscar equipo"
        placeholder="Código (interno, IPS, ECRI), nombre, marca, modelo o serie..."
          @keydown.enter.prevent="search"
        />
    </div>

    <!-- Segunda línea: Filtros listados -->
    <div class="flex flex-col md:flex-row gap-3 mt-3">
      <div class="flex-1">
        <FormSelect
          v-model="local.selectedSede"
          label="Sede"
          :options="sedeOptions"
          placeholder="Todas las sedes"
        />
      </div>
      <div class="flex-1">
        <FormSelect
          v-model="local.selectedStatus"
          label="Estado"
          :options="statusOptions"
          placeholder="Todos los estados"
        />
      </div>
      <div class="flex-1">
        <FormSelect
          v-model="local.selectedClassification"
          label="Clasificación"
          :options="classificationOptions"
          placeholder="Todas las clasificaciones"
        />
      </div>
      <div class="flex-1">
        <FormSelect
          v-model="local.selectedInvima"
          label="Invima"
          :options="invimaOptions"
          placeholder="Todos"
        />
      </div>
      <div class="flex-1">
        <FormSelect
          v-model="local.selectedCategory"
          label="Categoría"
          :options="categoryOptions"
          placeholder="Todas las categorías"
        />
      </div>
      <div class="flex-1">
        <FormSelect
          v-model="local.selectedRiskClass"
          label="Clase de Riesgo"
          :options="riskClassOptions"
          placeholder="Todas las clases"
        />
      </div>
    </div>


    <template #footer>
      <div class="flex flex-col sm:flex-row justify-end gap-2">
        <div class="flex flex-col sm:flex-row gap-2">
          <button
            @click="clearAll"
            class="inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Limpiar
          </button>
          <button
            @click="$emit('export')"
            :disabled="!canExport"
            class="inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ExcelIcon :size="16" class="text-gray-700" />
            Exportar Excel
          </button>
          <button
            @click="$emit('refresh')"
            :disabled="isLoading"
            class="inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <svg class="w-4 h-4" :class="{ 'animate-spin': isLoading }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Actualizar
          </button>
          <button
            @click="search"
            :disabled="isLoading"
            class="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Buscar
          </button>
        </div>
      </div>
    </template>
  </ComponentCard>
</template>

<script setup lang="ts">
import { reactive, watch, computed } from 'vue'
import ComponentCard from '@/shared/components/layout/ComponentCard.vue'
import { FormInputField, FormSelect } from '@/shared/components/ui/forms'
import { ExcelIcon } from '@/assets/icons'
import type { EquipmentFilters } from '../types/equipment.types'
import {
  equipmentCategories,
  equipmentStatuses
} from '../services/equipmentApi'

interface Props {
  modelValue: EquipmentFilters
  totalFiltered: number
  totalAll: number
  isLoading?: boolean
  canExport?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', v: EquipmentFilters): void
  (e: 'refresh'): void
  (e: 'export'): void
  (e: 'search', v: EquipmentFilters): void
}>()

const local = reactive<EquipmentFilters>({ ...props.modelValue })

// Opciones para los FormSelect (agregar opción vacía al inicio)
const categoryOptions = computed(() => ['Todas las categorías', ...equipmentCategories])
const statusOptions = computed(() => ['Todos los estados', ...equipmentStatuses])

// Nuevas opciones basadas en la data real
const classificationOptions = computed(() => ['Todas las clasificaciones', 'BIO', 'IND', 'GASES', 'N/A'])
const riskClassOptions = computed(() => ['Todas las clases', 'Clase I', 'Clase IIa', 'Clase IIb', 'Clase III'])
const sedeOptions = computed(() => ['Todas las sedes', 'San Vicente', 'Prado', 'SIU'])
const invimaOptions = computed(() => ['Todos', 'Con registro', 'Sin registro'])

watch(local, newVal => {
  emit('update:modelValue', { ...newVal })
})

function search() {
  emit('search', { ...local })
}

function clearAll() {
  Object.assign(local, {
    searchQuery: '',
    selectedCategory: '',
    selectedDepartment: '',
    selectedStatus: '',
    selectedClassification: '',
    selectedRiskClass: '',
          selectedSede: '',
          selectedInvima: ''
  })
  search()
}
</script>
