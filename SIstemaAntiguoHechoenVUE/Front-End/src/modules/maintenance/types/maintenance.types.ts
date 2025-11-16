export type MaintenanceType = 'Preventivo' | 'Correctivo' | 'Calibración'

export type MaintenanceStatus = 'Pendiente' | 'En Proceso' | 'Completado' | 'Vencido' | 'Cancelado'

export interface MaintenanceEvent {
  id: string
  equipmentId: string
  equipmentName: string
  equipmentCode: string
  type: MaintenanceType
  status: MaintenanceStatus
  scheduledDate: string
  completedDate?: string
  technician?: string
  notes?: string
  sede: string
  location: string
  priority: 'Alta' | 'Media' | 'Baja'
  estimatedDuration?: number // en horas
  cost?: number
}

export interface CalendarDay {
  date: Date
  dateString: string
  isCurrentMonth: boolean
  isToday: boolean
  events: MaintenanceEvent[]
}

export interface MaintenanceFilters {
  selectedMonth: number
  selectedYear: number
  selectedType: MaintenanceType | 'all'
  selectedStatus: MaintenanceStatus | 'all'
  selectedSede: string
  searchQuery: string
}

export interface MonthlyStats {
  total: number
  preventivo: number
  correctivo: number
  calibracion: number
  pendiente: number
  enProceso: number
  completado: number
  vencido: number
}
