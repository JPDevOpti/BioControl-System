<template>
  <div>
    <transition name="fade-scale">
      <div 
        v-if="isOpen" 
        :class="['fixed right-0 bottom-0 z-[10000] flex items-center justify-center p-4 bg-black/40 top-16', overlayLeftClass]"
        @click.self="$emit('close')"
      >
        <div class="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
          <!-- Header fijo -->
          <div class="flex-shrink-0 px-6 py-5 border-b border-gray-200 bg-white rounded-t-2xl">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="flex-shrink-0">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center" :class="headerIconClass">
                    <component :is="headerIcon" class="w-5 h-5" :class="headerIconColorClass" />
                  </div>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900">{{ modalTitle }}</h3>
                  <p class="text-gray-600 text-xs mt-1">{{ modalSubtitle }}</p>
                </div>
              </div>
              
              <!-- Close button -->
              <button
                @click="$emit('close')"
                class="flex-shrink-0 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-200 text-gray-600 hover:text-gray-800"
                title="Cerrar"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Contenido scrolleable -->
          <div class="flex-1 overflow-y-auto p-6">
            <!-- Tabla de eventos -->
            <div class="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Equipo / Código
                      </th>
                      <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Sede / Servicio
                      </th>
                      <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Marca / Modelo / Serie
                      </th>
                      <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Proveedor
                      </th>
                      <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Estado
                      </th>
                      <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Costo
                      </th>
                      <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Proceso
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr 
                      v-for="event in events" 
                      :key="event.id"
                      class="hover:bg-gray-50 transition-colors"
                    >
                      <td class="px-4 py-3 whitespace-nowrap">
                        <div class="text-sm font-medium text-gray-900">{{ event.equipmentName }}</div>
                        <div class="text-xs text-gray-500 font-mono">{{ event.equipmentCode }}</div>
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap">
                        <div class="text-sm text-gray-900 font-medium">{{ event.sede }}</div>
                        <div v-if="event.service" class="text-xs text-gray-500">{{ event.service }}</div>
                        <div v-else class="text-xs text-gray-400 italic">Sin servicio</div>
                      </td>
                      <td class="px-4 py-3">
                        <div v-if="event.brand" class="text-sm text-gray-900 font-medium">{{ event.brand }}</div>
                        <div v-else class="text-sm text-gray-400">-</div>
                        <div v-if="event.model" class="text-xs text-gray-700 mt-0.5">{{ event.model }}</div>
                        <div v-if="event.serialNumber" class="text-xs text-gray-500 font-mono mt-0.5">{{ event.serialNumber }}</div>
                        <div v-if="!event.brand && !event.model && !event.serialNumber" class="text-sm text-gray-400">-</div>
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{{ event.supplier || '-' }}</div>
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap">
                        <span 
                          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                          :class="getEquipmentStatusClass(event.equipmentStatus)"
                        >
                          {{ event.equipmentStatus || 'N/A' }}
                        </span>
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap">
                        <div class="text-sm text-gray-900 font-medium">
                          {{ event.cost ? formatCurrency(event.cost) : '-' }}
                        </div>
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap">
                        <select
                          :ref="el => { if (el) selectRefs[event.id] = el as HTMLSelectElement }"
                          :value="getSelectValue(event)"
                          @change="handleProcessChange(event.id, ($event.target as HTMLSelectElement).value, event, $event.target as HTMLSelectElement)"
                          class="text-xs font-medium rounded-full border-0 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                          :class="getProcessSelectClass(getSelectValue(event) as any)"
                        >
                          <option value="">Seleccionar</option>
                          <option value="En proceso">En proceso</option>
                          <option value="Pendiente">Pendiente</option>
                          <option value="Completado">Completado</option>
                        </select>
                      </td>
                    </tr>
                    <tr v-if="events.length === 0">
                      <td colspan="7" class="px-4 py-8 text-center text-gray-500">
                        No hay eventos para mostrar
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Footer fijo -->
          <div class="flex-shrink-0 flex items-center justify-between pt-3 border-t border-gray-200 px-6 pb-4 bg-white rounded-b-2xl">
            <div class="text-sm text-gray-600">
              Total: <span class="font-semibold text-gray-900">{{ events.length }}</span> evento{{ events.length !== 1 ? 's' : '' }}
            </div>
            <button
              @click="$emit('close')"
              class="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold border border-blue-500 text-blue-500 bg-white hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Modal de completar mantenimiento (fuera del transition para evitar el error) -->
    <MaintenanceCompleteModal
      :is-open="isCompleteModalOpen"
      :event="selectedEventForComplete"
      @close="closeCompleteModal"
      @complete="handleComplete"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from 'vue'
import type { MaintenanceEvent, MaintenanceType } from '../types/maintenance.types'
import { SettingsIcon, AlertIcon, CalibrationIcon } from '@/assets/icons'
import { useSidebar } from '@/shared/composables/SidebarControl'
import MaintenanceCompleteModal from './MaintenanceCompleteModal.vue'

interface Props {
  isOpen: boolean
  events: MaintenanceEvent[]
  type: MaintenanceType | null
  month: number | null
  year: number | null
}

const props = defineProps<Props>()
const emit = defineEmits<{ 
  (e: 'close'): void
  (e: 'update-process', eventId: string, process: 'En proceso' | 'Pendiente' | 'Completado' | ''): void
  (e: 'complete', data: {
    eventId: string
    exactCompletionDate: string
    reportNumber?: string
    reportFile?: File
    completionNotes?: string
  }): void
}>()

const { isExpanded, isMobileOpen, isHovered } = useSidebar()

const overlayLeftClass = computed(() => {
  const hasWideSidebar = (isExpanded.value && !isMobileOpen.value) || (!isExpanded.value && isHovered.value)
  return hasWideSidebar ? 'left-0 lg:left-72' : 'left-0 lg:left-20'
})

const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

const modalTitle = computed(() => {
  if (!props.type || props.month === null) return 'Eventos de Mantenimiento'
  const monthName = monthNames[props.month]
  return `${props.type}s - ${monthName} ${props.year || new Date().getFullYear()}`
})

const modalSubtitle = computed(() => {
  return `Lista de eventos de mantenimiento ${props.type?.toLowerCase() || ''}`
})

const headerIcon = computed(() => {
  if (props.type === 'Preventivo') return SettingsIcon
  if (props.type === 'Correctivo') return AlertIcon
  if (props.type === 'Calibración') return CalibrationIcon
  return SettingsIcon
})

const headerIconClass = computed(() => {
  if (props.type === 'Preventivo') return 'bg-[#CAEAF2]'
  if (props.type === 'Correctivo') return 'bg-orange-50'
  if (props.type === 'Calibración') return 'bg-[#E6FAEC]'
  return 'bg-blue-50'
})

const headerIconColorClass = computed(() => {
  if (props.type === 'Preventivo') return 'text-[#064D5F]'
  if (props.type === 'Correctivo') return 'text-orange-600'
  if (props.type === 'Calibración') return 'text-[#3D8D5B]'
  return 'text-blue-600'
})

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(amount)
}

const getEquipmentStatusClass = (status?: string) => {
  const statusClasses: Record<string, string> = {
    'Operativo': 'bg-green-100 text-green-800',
    'Inactivo': 'bg-gray-100 text-gray-800',
    'Reparación': 'bg-orange-100 text-orange-800'
  }
  return statusClasses[status || ''] || 'bg-gray-100 text-gray-800'
}

const getProcessSelectClass = (process?: string) => {
  const processClasses: Record<string, string> = {
    'En proceso': 'bg-blue-100 text-blue-800 px-3 py-1.5',
    'Pendiente': 'bg-yellow-100 text-yellow-800 px-3 py-1.5',
    'Completado': 'bg-green-100 text-green-800 px-3 py-1.5'
  }
  return processClasses[process || ''] || 'bg-gray-100 text-gray-800 px-3 py-1.5'
}

const selectedEventForComplete = ref<MaintenanceEvent | null>(null)
const isCompleteModalOpen = ref(false)
const pendingCompleteEventId = ref<string | null>(null)

const selectRefs: Record<string, HTMLSelectElement> = {}

const handleProcessChange = async (eventId: string, process: string, event: MaintenanceEvent, selectElement: HTMLSelectElement) => {
  if (process === 'Completado') {
    // Guardar el ID del evento pendiente de completar
    pendingCompleteEventId.value = eventId
    // Guardar referencia al select para restaurarlo si se cancela
    selectRefs[eventId] = selectElement
    // Buscar el evento seleccionado
    if (event) {
      selectedEventForComplete.value = event
      isCompleteModalOpen.value = true
    }
    // Restaurar el valor anterior del select usando nextTick
    await nextTick()
    selectElement.value = event.process || ''
  } else if (process && (process === 'En proceso' || process === 'Pendiente')) {
    pendingCompleteEventId.value = null
    emit('update-process', eventId, process as 'En proceso' | 'Pendiente')
  } else {
    pendingCompleteEventId.value = null
    emit('update-process', eventId, '')
  }
}

// Función para obtener el valor del select (si está pendiente de completar, mantener el valor anterior)
const getSelectValue = (event: MaintenanceEvent) => {
  // Siempre devolver el valor actual del proceso del evento
  return event.process || ''
}

const handleComplete = (data: {
  eventId: string
  exactCompletionDate: string
  reportNumber?: string
  reportFile?: File
  completionNotes?: string
}) => {
  // Primero actualizar el proceso a Completado
  emit('update-process', data.eventId, 'Completado')
  // Luego emitir el evento de completado con los datos adicionales
  emit('complete', data)
  // Limpiar el estado pendiente
  pendingCompleteEventId.value = null
  // Cerrar el modal
  isCompleteModalOpen.value = false
  selectedEventForComplete.value = null
}

const closeCompleteModal = () => {
  // Limpiar el estado pendiente (el select volverá a su valor anterior automáticamente)
  pendingCompleteEventId.value = null
  isCompleteModalOpen.value = false
  selectedEventForComplete.value = null
}
</script>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>

