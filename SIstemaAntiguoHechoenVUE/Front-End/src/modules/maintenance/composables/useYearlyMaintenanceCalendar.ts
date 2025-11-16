import { ref, computed } from 'vue'
import type { MaintenanceEvent } from '../types/maintenance.types'
import { maintenanceApi } from '../services/maintenanceApi'

interface MonthData {
  number: number
  name: string
  preventivos: number
  correctivos: number
  calibraciones: number
  total: number
  isCurrent: boolean
}

export function useYearlyMaintenanceCalendar() {
  const currentDate = new Date()
  const selectedYear = ref(currentDate.getFullYear())
  
  const events = ref<MaintenanceEvent[]>([])
  const isLoading = ref(false)
  const selectedMonth = ref<number | null>(null)

  // Nombres de meses
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]

  // Título del calendario
  const calendarTitle = computed(() => {
    return `Año ${selectedYear.value}`
  })

  // Generar datos por mes
  const months = computed((): MonthData[] => {
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()

    return monthNames.map((name, index) => {
      // Filtrar eventos del mes
      const monthEvents = events.value.filter(event => {
        const eventDate = new Date(event.scheduledDate)
        return eventDate.getMonth() === index && eventDate.getFullYear() === selectedYear.value
      })

      // Contar por tipo
      const preventivos = monthEvents.filter(e => e.type === 'Preventivo').length
      const correctivos = monthEvents.filter(e => e.type === 'Correctivo').length
      const calibraciones = monthEvents.filter(e => e.type === 'Calibración').length

      return {
        number: index,
        name,
        preventivos,
        correctivos,
        calibraciones,
        total: monthEvents.length,
        isCurrent: index === currentMonth && selectedYear.value === currentYear
      }
    })
  })

  // Cargar eventos
  async function loadEvents() {
    isLoading.value = true
    try {
      // Cargar todos los eventos del año
      const allEvents: MaintenanceEvent[] = []
      
      for (let month = 0; month < 12; month++) {
        const monthEvents = await maintenanceApi.getMaintenanceEvents({
          selectedMonth: month,
          selectedYear: selectedYear.value,
          selectedType: 'all',
          selectedStatus: 'all',
          selectedSede: 'all',
          searchQuery: ''
        })
        allEvents.push(...monthEvents)
      }
      
      events.value = allEvents
    } catch (error) {
      console.error('Error cargando eventos:', error)
    } finally {
      isLoading.value = false
    }
  }

  // Navegación
  function previousYear() {
    selectedYear.value--
    loadEvents()
  }

  function nextYear() {
    selectedYear.value++
    loadEvents()
  }

  function goToToday() {
    selectedYear.value = currentDate.getFullYear()
    loadEvents()
  }

  function selectMonth(month: number) {
    selectedMonth.value = month
    console.log('Mes seleccionado:', monthNames[month], selectedYear.value)
    // Aquí puedes emitir un evento o navegar a una vista detallada del mes
  }

  // Función para obtener eventos filtrados por mes y tipo
  function getEventsByMonthAndType(month: number, type: string) {
    return events.value.filter(event => {
      const eventDate = new Date(event.scheduledDate)
      return eventDate.getMonth() === month && 
             eventDate.getFullYear() === selectedYear.value &&
             event.type === type
    })
  }

  return {
    calendarTitle,
    months,
    isLoading,
    selectedYear,
    selectedMonth,
    events,
    loadEvents,
    previousYear,
    nextYear,
    goToToday,
    selectMonth,
    getEventsByMonthAndType
  }
}
