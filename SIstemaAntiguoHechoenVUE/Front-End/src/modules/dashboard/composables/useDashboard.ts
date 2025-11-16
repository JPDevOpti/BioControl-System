import { computed, ref } from 'vue'

interface EquipmentMetric {
  label: string
  value: number
  delta: number
  format?: 'number' | 'currency'
  unitLabel?: string
}

interface MaintenanceSummary {
  monthLabel: string
  compliance: number
  compliancePreventivos: number
  complianceCalibraciones: number
  preventative: number
  corrective: number
  calibrations: number
  delta: number
}

interface MonthlyMaintenanceData {
  preventative: number[]
  corrective: number[]
  calibrations: number[]
}

const equipmentByMonth = ref<number[]>([])
const monthlyMaintenance = ref<MonthlyMaintenanceData>({
  preventative: [],
  corrective: [],
  calibrations: []
})
const equipmentMetrics = ref<Record<string, EquipmentMetric>>({})
const maintenanceSummary = ref<MaintenanceSummary | null>(null)

const loadingTimeline = ref(false)
const loadingMetrics = ref(false)
const loadingMaintenance = ref(false)
const lastUpdated = ref<Date | null>(null)
const selectedSede = ref<string>('Todas las sedes') // Por defecto Todas las sedes

const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

// Lista de sedes disponibles
const availableSedes = ['Todas las sedes', 'San Vicente', 'Prado', 'SIU']

function simulateNetworkDelay<T>(payload: T, delay = 600): Promise<T> {
  return new Promise(resolve => {
    setTimeout(() => resolve(payload), delay)
  })
}

async function loadEquipmentTimeline(sede: string = 'Todas las sedes') {
  loadingTimeline.value = true
  
  // Actualizar la sede seleccionada
  selectedSede.value = sede
  
  // Mostrar hasta el mes actual
  const currentMonth = new Date().getMonth()
  const monthsToShow = currentMonth + 1
  
  // Factor de variación según la sede (simular diferentes volúmenes por sede)
  const sedeFactor = sede === 'Todas las sedes' ? 2.4 : sede === 'San Vicente' ? 1 : sede === 'Prado' ? 0.8 : 0.6
  
  // Datos determinísticos para mantenimientos preventivos (más frecuentes)
  const preventativeBase = [42, 38, 45, 48, 52, 56, 54, 58, 51, 49, 46, 43]
  const preventativeData = preventativeBase.slice(0, monthsToShow).map((val, idx) => {
    const variation = [1.05, 0.95, 1.08, 1.02, 0.98, 1.12, 0.97, 1.05, 0.99, 1.03, 0.96, 1.01]
    return Math.round(val * (variation[idx] || 1) * sedeFactor)
  })
  
  // Datos para mantenimientos correctivos (menos frecuentes)
  const correctiveBase = [18, 15, 22, 19, 24, 21, 17, 20, 23, 18, 16, 19]
  const correctiveData = correctiveBase.slice(0, monthsToShow).map((val, idx) => {
    const variation = [0.95, 1.08, 0.92, 1.05, 0.88, 1.15, 1.02, 0.97, 0.93, 1.06, 0.99, 0.94]
    return Math.round(val * (variation[idx] || 1) * sedeFactor)
  })
  
  // Datos para calibraciones (menos frecuentes aún)
  const calibrationsBase = [12, 10, 14, 11, 15, 13, 9, 12, 14, 11, 10, 12]
  const calibrationsData = calibrationsBase.slice(0, monthsToShow).map((val, idx) => {
    const variation = [1.02, 0.97, 1.12, 0.95, 1.08, 0.92, 1.15, 0.98, 1.05, 0.96, 1.03, 0.99]
    return Math.round(val * (variation[idx] || 1) * sedeFactor)
  })

  const payload = await simulateNetworkDelay({ 
    sede, 
    preventative: preventativeData,
    corrective: correctiveData,
    calibrations: calibrationsData
  })
  
  monthlyMaintenance.value = {
    preventative: payload.preventative,
    corrective: payload.corrective,
    calibrations: payload.calibrations
  }
  
  lastUpdated.value = new Date()
  loadingTimeline.value = false
  return payload
}

async function loadEquipmentMetrics() {
  loadingMetrics.value = true

  const payload = await simulateNetworkDelay({
    preventiveMaintenance: {
      label: 'Mantenimientos preventivos',
      value: 38,
      delta: 6.4,
      unitLabel: 'OTs'
    },
    correctiveMaintenance: {
      label: 'Mantenimientos correctivos',
      value: 14,
      delta: -3.2,
      unitLabel: 'OTs'
    },
    calibrations: {
      label: 'Calibraciones realizadas',
      value: 9,
      delta: 2.1,
      unitLabel: 'Equipos'
    },
    totalCost: {
      label: 'Costo total',
      value: 128500000,
      delta: 5.9,
      format: 'currency' as const
    }
  })

  equipmentMetrics.value = payload
  lastUpdated.value = new Date()
  loadingMetrics.value = false
  return payload
}

async function loadMaintenanceSummary(sede: string = 'Todas las sedes') {
  loadingMaintenance.value = true

  // Factor de variación según la sede
  const sedeFactor = sede === 'Todas las sedes' ? 2.4 : sede === 'San Vicente' ? 1 : sede === 'Prado' ? 0.8 : 0.6

  const payload = await simulateNetworkDelay<MaintenanceSummary>({
    monthLabel: 'Octubre 2025',
    compliance: 87.4,
    compliancePreventivos: 89.2,
    complianceCalibraciones: 85.6,
    preventative: Math.round(38 * sedeFactor),
    corrective: Math.round(14 * sedeFactor),
    calibrations: Math.round(9 * sedeFactor),
    delta: -2.6
  })

  maintenanceSummary.value = payload
  lastUpdated.value = new Date()
  loadingMaintenance.value = false
  return payload
}

async function refreshAll() {
  const sede = selectedSede.value
  await Promise.all([
    loadEquipmentTimeline(sede),
    loadEquipmentMetrics(),
    loadMaintenanceSummary(sede)
  ])
}

const seriesTimeline = computed(() => {
  // Mostrar hasta el mes actual
  const monthsToShow = new Date().getMonth() + 1
  
  return [
    {
      name: 'Preventivos',
      data: monthlyMaintenance.value.preventative.length 
        ? monthlyMaintenance.value.preventative.slice(0, monthsToShow)
        : Array(monthsToShow).fill(0)
    },
    {
      name: 'Correctivos',
      data: monthlyMaintenance.value.corrective.length 
        ? monthlyMaintenance.value.corrective.slice(0, monthsToShow)
        : Array(monthsToShow).fill(0)
    },
    {
      name: 'Calibraciones',
      data: monthlyMaintenance.value.calibrations.length 
        ? monthlyMaintenance.value.calibrations.slice(0, monthsToShow)
        : Array(monthsToShow).fill(0)
    }
  ]
})

const timelineCategories = computed(() => {
  // Mostrar hasta el mes actual
  const monthsToShow = new Date().getMonth() + 1
  return monthNames.slice(0, monthsToShow)
})

const metricsList = computed(() => Object.values(equipmentMetrics.value))

const isLoading = computed(() => loadingTimeline.value || loadingMetrics.value || loadingMaintenance.value)

export function useDashboard() {
  return {
    equipmentByMonth,
    equipmentMetrics,
    maintenanceSummary,
    loadingTimeline,
    loadingMetrics,
    loadingMaintenance,
    isLoading,
    lastUpdated,
    seriesTimeline,
    timelineCategories,
    metricsList,
    selectedSede,
    availableSedes,
    loadEquipmentTimeline,
    loadEquipmentMetrics,
    loadMaintenanceSummary,
    refreshAll
  }
}

// Auto inicialización de datos mock (solo en desarrollo)
// Nota: En producción, esto debería ser manejado desde el componente o después de la autenticación
let isInitialized = false
if (!isInitialized && typeof window !== 'undefined') {
  isInitialized = true
  // Usar nextTick para evitar ejecutar durante la importación del módulo
  Promise.resolve().then(() => {
    if (!equipmentByMonth.value.length) {
      const sede = selectedSede.value
      loadEquipmentTimeline(sede)
      loadMaintenanceSummary(sede)
    }
  })
}
