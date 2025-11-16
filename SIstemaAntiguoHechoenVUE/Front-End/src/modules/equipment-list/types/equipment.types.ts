export interface Equipment {
  id: string
  
  // INFORMACIÓN GENERAL
  process?: string // Proceso
  name: string // Nombre del equipo
  internalCode: string // Código de inventario interno
  ipsCode: string // Código IPS
  ecriCode?: string // Código ECRI
  responsible: string // Responsable del proceso
  location: string // Ubicación física
  area?: string // Área del equipo
  brand: string // Marca
  model: string // Modelo
  serialNumber: string // Serie
  imageUrl?: string // URL de la imagen asociada al equipo
  missionAxis?: string // Clasificación según eje misional (Docencia/Investigación/Extensión/N/A)
  classification: 'BIO' | 'IND' | 'GASES' | 'N/A' // Clasificación IPS
  riskClass?: string // Clasificación por riesgo (Clase I, IIa, IIb, III)
  invimaRegistry?: string // Registro Invima/Permiso comercialización/No Requiere
  sede: string // Sede
  
  // REGISTRO HISTÓRICO
  usefulLife?: string // Tiempo de vida útil
  acquisitionDate?: string // Antigüedad del eq. (F. adquisición)
  owner?: string // Propietario del equipo
  manufactureDate?: string // Fecha de fabricación
  nit?: string // NIT
  supplier?: string // Proveedor equipo
  hasWarranty?: boolean // Está en garantía (Si/No)
  warrantyExpiration?: string // Fecha finalización garantía
  acquisitionForm?: string // Forma de adquisición
  documentType?: string // Tipo de documento
  documentNumber?: string // Número de documento
  purchaseValue?: string // Valor de compra
  
  // INVENTARIO DE DOCUMENTOS
  hasLifeSheet?: boolean // Hoja de vida
  hasImportRecord?: boolean // Registro de importación
  hasOperationManual?: string // Manual operación (Esp) - valores: "Si", "No", "Ing", "Ficha técnica"
  hasServiceManual?: string // Manual servicio mto (Esp) - valores: "Si", "No", "Ing"
  hasQuickGuide?: boolean // Guía Rápida de uso
  hasQuickHandlingInstructive?: boolean // Instructivo de manejo rápido de equipos
  hasPreventiveProtocol?: boolean // Protocolo Mto Prev.
  
  // INFORMACIÓN METROLÓGICA ADMINISTRATIVA
  metrologicalFrequency?: string // Frecuencia metrológica fabricante (mantenimiento)
  requiresMaintenance: boolean // Mantenimiento Si/No
  maintenanceFrequency?: number // Frecuencia anual mantenimiento
  requiresCalibration: boolean // Calibración Si/No
  metrologicalFrequencyCalibration?: string // Frecuencia metrológica fabricante (calibración)
  calibrationFrequency?: number // Frecuencia anual calibración
  
  // INFORMACIÓN METROLÓGICA TÉCNICA
  magnitude?: string // Magnitud
  equipmentRange?: string // Rango del equipo
  resolution?: string // Resolución
  workingRange?: string // Rango de trabajo
  maxAllowedError?: string // Error máximo permitido
  
  // CONDICIONES DE FUNCIONAMIENTO
  voltage?: string // Voltaje
  current?: string // Corriente
  relativeHumidity?: string // Humedad relativa
  temperature?: string // Temperatura
  dimensions?: string // Dimensiones
  weight?: string // Peso
  other?: string // Otros
  
  // Campos adicionales para filtros y detalles
  category: string // Categoría del equipo
  department: string // Departamento
  status: EquipmentStatus
  lastMaintenanceDate?: string
  nextMaintenanceDate?: string
  lastCalibrationDate?: string
  nextCalibrationDate?: string
  nextPreventiveDate?: string
  correctiveMaintenanceCount?: number // Cantidad de mantenimientos correctivos realizados
  lastCorrectiveMaintenanceDate?: string // Fecha del último mantenimiento correctivo
  power?: string
  notes?: string
  createdAt?: string
  updatedAt?: string
}

export type EquipmentStatus = 
  | 'Operativo'
  | 'En mantenimiento'
  | 'Fuera de servicio'
  | 'En reparación'
  | 'Dado de baja'

export interface EquipmentFilters {
  searchQuery: string // Buscar por código (interno, IPS, ECRI), nombre, marca, modelo, serie
  selectedCategory: string
  selectedDepartment: string
  selectedStatus: string
  selectedClassification: string // BIO, IND, GASES, N/A
  selectedRiskClass: string // Clase I, IIa, IIb, III
  selectedSede: string // Sede (San Vicente, Prado, SIU)
  selectedInvima: string // Invima (con registro, sin registro)
}

export type EquipmentSortKey = keyof Pick<
  Equipment,
  'internalCode' | 'name' | 'category' | 'status' | 'acquisitionDate' | 'nextMaintenanceDate'
>
export type SortOrder = 'asc' | 'desc'

export interface EquipmentColumn {
  key: EquipmentSortKey | 'actions'
  label: string
  class?: string
  sortable?: boolean
}

// Tipos para la hoja de vida del equipo
export type MetrologicalActivityCode = 'MP' | 'MC' | 'C'

export interface MetrologicalHistoryRecord {
  date: string
  reportNumber?: string
  activity: MetrologicalActivityCode | MetrologicalActivityCode[] | string // Permitir múltiples códigos o texto libre
  supplier?: string
  observations?: string // Observaciones detalladas del mantenimiento
}

export interface ObservationRecord {
  date: string
  observation: string
  name?: string // Nombre de quien registra la observación
}

export interface EquipmentLifeSheet {
  // IDENTIFICACIÓN DEL EQUIPO
  inventoryCode?: string // Código inventario (puede ser múltiple, separado por /)
  manufactureDate?: string // Fecha de fabricación
  usefulLife?: string // Vida útil
  invimaType?: 'RS' | 'PC' | 'NR' // Registro Sanitario / Permiso Comercialización / No Requiere
  invimaCode?: string // Código del registro Invima
  components?: string // Componentes/accesorios
  area?: string // Área del equipo
  ecriCode?: string // Código ECRI
  
  // REGISTRO HISTÓRICO
  acquisitionForm?: 'Compra directa' | 'Donación' | 'Comodato' | 'Alquiler' | 'Otro'
  documentType?: string // Tipo de documento
  documentNumber?: string // Número de documento
  acquisitionDate?: string // Fecha de adquisición
  warrantyReplacementDate?: string // Fecha de cambio por garantía
  warrantyExpiration?: string // Vencimiento de la garantía
  supplier?: string // Nombre del proveedor
  supplierNIT?: string // NIT del proveedor
  supplierContact?: string // Contacto del proveedor (nombre, teléfono, correo) - puede ser texto multilínea
  
  // CONDICIONES DE FUNCIONAMIENTO
  voltage?: string // Voltaje
  current?: string // Corriente
  frequency?: string // Frecuencia eléctrica
  relativeHumidity?: string // Humedad relativa
  temperature?: string // Temperatura
  dimensions?: string // Dimensiones
  weight?: string // Peso
  otherConditions?: string // Otros (frecuencia, etc.)
  
  // DATOS METROLÓGICOS
  measurementMagnitude?: string // Magnitud de medida
  equipmentRange?: string // Rango del equipo
  serviceUsageRange?: string // Rango de uso en el servicio
  resolution?: string // Resolución
  maxAllowedError?: string // Error máximo permitido
  metrologicalFrequency?: 'Anual' | 'Semestral' | string // Frecuencia metrológica
  requiresCalibration?: boolean // Requiere calibración o calificación
  
  // REGISTRO HISTÓRICO METROLÓGICO
  metrologicalHistory?: MetrologicalHistoryRecord[]
  
  // OBSERVACIONES ADICIONALES
  observations?: ObservationRecord[]
}
