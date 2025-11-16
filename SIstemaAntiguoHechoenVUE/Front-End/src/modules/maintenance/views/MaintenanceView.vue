<template>
  <AdminLayout>
    <div class="space-y-4">
      <!-- Calendar -->
      <MaintenanceCalendar
        :months="months"
        :is-loading="isLoading"
        @select-month="selectMonth"
        @show-events="handleShowEvents"
      />
    </div>

    <!-- Modal de eventos -->
    <MaintenanceEventsModal
      :is-open="isModalOpen"
      :events="selectedEvents"
      :type="selectedType"
      :month="selectedMonth"
      :year="selectedYear"
      @close="closeModal"
      @update-process="handleProcessUpdate"
      @complete="handleMaintenanceComplete"
    />
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { AdminLayout } from '@/shared/layouts'
import MaintenanceCalendar from '../components/MaintenanceCalendar.vue'
import MaintenanceEventsModal from '../components/MaintenanceEventsModal.vue'
import { useYearlyMaintenanceCalendar } from '../composables/useYearlyMaintenanceCalendar'
import { maintenanceApi } from '../services/maintenanceApi'
import type { MaintenanceType, MaintenanceEvent } from '../types/maintenance.types'

const {
  months,
  isLoading,
  selectedYear,
  loadEvents,
  selectMonth,
  getEventsByMonthAndType
} = useYearlyMaintenanceCalendar()

const isModalOpen = ref(false)
const selectedEvents = ref<MaintenanceEvent[]>([])
const selectedType = ref<MaintenanceType | null>(null)
const selectedMonth = ref<number | null>(null)

function handleShowEvents(month: number, type: MaintenanceType) {
  selectedMonth.value = month
  selectedType.value = type
  selectedEvents.value = getEventsByMonthAndType(month, type)
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  selectedType.value = null
  selectedMonth.value = null
  selectedEvents.value = []
}

async function handleProcessUpdate(eventId: string, process: 'En proceso' | 'Pendiente' | 'Completado' | '') {
  try {
    // Buscar el evento en la lista
    const eventIndex = selectedEvents.value.findIndex(e => e.id === eventId)
    if (eventIndex !== -1) {
      // Actualizar el proceso localmente
      selectedEvents.value[eventIndex].process = process || undefined
      
      // Actualizar en el API (simulado)
      await maintenanceApi.updateMaintenanceEvent(eventId, {
        process: process || undefined
      })
      
      // Recargar eventos para sincronizar con el proceso actualizado
      if (selectedMonth.value !== null && selectedType.value) {
        selectedEvents.value = getEventsByMonthAndType(selectedMonth.value, selectedType.value)
      }
    }
  } catch (error) {
    console.error('Error actualizando proceso:', error)
  }
}

async function handleMaintenanceComplete(data: {
  eventId: string
  exactCompletionDate: string
  reportNumber?: string
  reportFile?: File
  completionNotes?: string
}) {
  try {
    // Buscar el evento en la lista
    const eventIndex = selectedEvents.value.findIndex(e => e.id === data.eventId)
    if (eventIndex !== -1) {
      // Actualizar los datos localmente
      const event = selectedEvents.value[eventIndex]
      event.process = 'Completado'
      event.completedDate = data.exactCompletionDate.split('T')[0] // Solo la fecha
      event.exactCompletionDate = data.exactCompletionDate
      event.reportNumber = data.reportNumber
      event.completionNotes = data.completionNotes
      
      // Si hay archivo, procesarlo
      if (data.reportFile) {
        // En producción, aquí se subiría el archivo al servidor
        // Por ahora, solo guardamos el nombre del archivo
        event.reportFile = data.reportFile.name
        console.log('Archivo a subir:', data.reportFile.name)
      }
      
      // Actualizar en el API (simulado)
      await maintenanceApi.updateMaintenanceEvent(data.eventId, {
        process: 'Completado',
        completedDate: data.exactCompletionDate.split('T')[0],
        exactCompletionDate: data.exactCompletionDate,
        reportNumber: data.reportNumber,
        completionNotes: data.completionNotes,
        reportFile: data.reportFile ? data.reportFile.name : undefined
      })
      
      // Recargar eventos para sincronizar
      if (selectedMonth.value !== null && selectedType.value) {
        selectedEvents.value = getEventsByMonthAndType(selectedMonth.value, selectedType.value)
      }
    }
  } catch (error) {
    console.error('Error completando mantenimiento:', error)
    alert('Error al completar el mantenimiento. Por favor, inténtelo de nuevo.')
  }
}

// Cargar eventos al montar el componente
onMounted(() => {
  loadEvents()
})
</script>
