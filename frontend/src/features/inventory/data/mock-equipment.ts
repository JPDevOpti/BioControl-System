export type CriticalityLevel = 'Alta' | 'Media' | 'Baja'
export type CalibrationStatus = 'Al día' | 'Por vencer' | 'Expirada'
export type MaintenanceFocus = 'Preventivo' | 'Correctivo'
export type EquipmentClassification = 'BIO' | 'IND' | 'GASES' | 'N/A'
export type RiskClass = 'Clase I' | 'Clase IIa' | 'Clase IIb' | 'Clase III'
export type InvimaStatus = 'Con registro' | 'Sin registro'
export type EquipmentCategory =
  | 'Diagnóstico'
  | 'Laboratorio'
  | 'Cadena de frío'
  | 'Investigación'
  | 'Esterilización'
  | 'Control de calidad'
  | 'Soporte clínico'

export interface EquipmentRecord {
  id: string
  code: string
  name: string
  location: string
  process: string
  area: string
  status: string
  maintenanceType: MaintenanceFocus
  criticality: CriticalityLevel
  calibrationStatus: CalibrationStatus
  category: EquipmentCategory
  classification: EquipmentClassification
  riskClass: RiskClass
  invimaStatus: InvimaStatus
  lastMaintenance: string
  nextMaintenance: string
  assignedTo: string
  provider: string
  warrantyActive: boolean
}

export const equipmentInventory: EquipmentRecord[] = [
  {
    id: 'eq-001',
    code: '187701',
    name: 'Criostato Leica CM1860 UV',
    location: 'San Vicente',
    process: 'Patología',
    area: 'Diagnóstico histológico',
    status: 'Operativo',
    maintenanceType: 'Preventivo',
    criticality: 'Alta',
    calibrationStatus: 'Al día',
  category: 'Diagnóstico',
  classification: 'BIO',
  riskClass: 'Clase IIa',
  invimaStatus: 'Con registro',
    lastMaintenance: '2025-09-10',
    nextMaintenance: '2025-11-20',
    assignedTo: 'Juliana Duque',
    provider: 'Leica Biosystems',
    warrantyActive: true
  },
  {
    id: 'eq-002',
    code: '203438',
    name: 'Inmunohistoquímica MD Stainer',
    location: 'San Vicente',
    process: 'Patología',
    area: 'Marcadores especiales',
    status: 'Preventivo pendiente',
    maintenanceType: 'Preventivo',
    criticality: 'Alta',
    calibrationStatus: 'Por vencer',
  category: 'Diagnóstico',
  classification: 'BIO',
  riskClass: 'Clase IIb',
  invimaStatus: 'Con registro',
    lastMaintenance: '2025-07-15',
    nextMaintenance: '2025-11-18',
    assignedTo: 'Martha Londoño',
    provider: 'Agilent',
    warrantyActive: false
  },
  {
    id: 'eq-003',
    code: '114982',
    name: 'Micrótomo RM2235',
    location: 'San Vicente',
    process: 'Patología',
    area: 'Corte y inclusión',
    status: 'Correctivo activo',
    maintenanceType: 'Correctivo',
    criticality: 'Media',
    calibrationStatus: 'Expirada',
  category: 'Diagnóstico',
  classification: 'BIO',
  riskClass: 'Clase IIa',
  invimaStatus: 'Con registro',
    lastMaintenance: '2025-08-02',
    nextMaintenance: '2025-10-28',
    assignedTo: 'Soporte externo',
    provider: 'Leica Biosystems',
    warrantyActive: false
  },
  {
    id: 'eq-004',
    code: '205301',
    name: 'Centrífuga HANIL FLETA 40P',
    location: 'San Vicente',
    process: 'Banco de sangre',
    area: 'Procesamiento de muestras',
    status: 'En calibración',
    maintenanceType: 'Preventivo',
    criticality: 'Media',
    calibrationStatus: 'Al día',
  category: 'Laboratorio',
  classification: 'IND',
  riskClass: 'Clase I',
  invimaStatus: 'Con registro',
    lastMaintenance: '2025-09-28',
    nextMaintenance: '2025-11-15',
    assignedTo: 'Jesica Restrepo',
    provider: 'Hanil Scientific',
    warrantyActive: true
  },
  {
    id: 'eq-005',
    code: 'LIME-644',
    name: 'Congelador Infrico LTF40SD',
    location: 'Rionegro',
    process: 'Banco de sangre',
    area: 'Criopreservación',
    status: 'Operativo',
    maintenanceType: 'Preventivo',
    criticality: 'Alta',
    calibrationStatus: 'Al día',
  category: 'Cadena de frío',
  classification: 'IND',
  riskClass: 'Clase I',
  invimaStatus: 'Con registro',
    lastMaintenance: '2025-08-30',
    nextMaintenance: '2025-12-01',
    assignedTo: 'Juliana Duque',
    provider: 'Infrico',
    warrantyActive: true
  },
  {
    id: 'eq-006',
    code: 'SV-90812',
    name: 'Analizador Cobas c311',
    location: 'San Vicente',
    process: 'Química clínica',
    area: 'Laboratorio automatizado',
    status: 'Operativo',
    maintenanceType: 'Preventivo',
    criticality: 'Alta',
    calibrationStatus: 'Por vencer',
  category: 'Laboratorio',
  classification: 'BIO',
  riskClass: 'Clase IIb',
  invimaStatus: 'Con registro',
    lastMaintenance: '2025-08-21',
    nextMaintenance: '2025-11-05',
    assignedTo: 'Laura Escobar',
    provider: 'Roche Diagnostics',
    warrantyActive: true
  },
  {
    id: 'eq-007',
    code: 'SV-65012',
    name: 'Bioshaker IKA KS 4000',
    location: 'Rionegro',
    process: 'Investigación',
    area: 'Cultivos celulares',
    status: 'Fuera de servicio',
    maintenanceType: 'Correctivo',
    criticality: 'Media',
    calibrationStatus: 'Expirada',
  category: 'Investigación',
  classification: 'IND',
  riskClass: 'Clase IIa',
  invimaStatus: 'Sin registro',
    lastMaintenance: '2025-06-11',
    nextMaintenance: '2025-10-05',
    assignedTo: 'Carlos Pérez',
    provider: 'IKA',
    warrantyActive: false
  },
  {
    id: 'eq-008',
    code: 'UDEA-114',
    name: 'Incubadora Thermo Scientific 3111',
    location: 'Medellín',
    process: 'Microbiología',
    area: 'Cultivos',
    status: 'Operativo',
    maintenanceType: 'Preventivo',
    criticality: 'Media',
    calibrationStatus: 'Al día',
  category: 'Investigación',
  classification: 'BIO',
  riskClass: 'Clase IIa',
  invimaStatus: 'Con registro',
    lastMaintenance: '2025-07-18',
    nextMaintenance: '2025-11-30',
    assignedTo: 'Gloria Roldán',
    provider: 'Thermo Scientific',
    warrantyActive: false
  },
  {
    id: 'eq-009',
    code: 'UDEA-275',
    name: 'Espectrofotómetro UV-Vis Shimadzu',
    location: 'Medellín',
    process: 'Investigación',
    area: 'Análisis molecular',
    status: 'Preventivo pendiente',
    maintenanceType: 'Preventivo',
    criticality: 'Alta',
    calibrationStatus: 'Por vencer',
  category: 'Investigación',
  classification: 'BIO',
  riskClass: 'Clase IIb',
  invimaStatus: 'Con registro',
    lastMaintenance: '2025-07-02',
    nextMaintenance: '2025-10-14',
    assignedTo: 'Soporte externo',
    provider: 'Shimadzu',
    warrantyActive: false
  },
  {
    id: 'eq-010',
    code: 'SV-11802',
    name: 'Autoclave Tuttnauer 5075HSG',
    location: 'San Vicente',
    process: 'Esterilización',
    area: 'Central de equipos',
    status: 'Correctivo activo',
    maintenanceType: 'Correctivo',
    criticality: 'Alta',
    calibrationStatus: 'Expirada',
  category: 'Esterilización',
  classification: 'BIO',
  riskClass: 'Clase IIb',
  invimaStatus: 'Con registro',
    lastMaintenance: '2025-05-12',
    nextMaintenance: '2025-10-25',
    assignedTo: 'Mantenimiento interno',
    provider: 'Tuttnauer',
    warrantyActive: false
  },
  {
    id: 'eq-011',
    code: 'SV-73351',
    name: 'Agitador Vortex VELP WIZARD',
    location: 'San Vicente',
    process: 'Investigación',
    area: 'Preparación de muestras',
    status: 'Operativo',
    maintenanceType: 'Preventivo',
    criticality: 'Baja',
    calibrationStatus: 'Al día',
  category: 'Laboratorio',
  classification: 'IND',
  riskClass: 'Clase I',
  invimaStatus: 'Sin registro',
    lastMaintenance: '2025-09-03',
    nextMaintenance: '2025-12-12',
    assignedTo: 'Daniela Henao',
    provider: 'VELP',
    warrantyActive: true
  },
  {
    id: 'eq-012',
    code: 'SV-45581',
    name: 'Balanza analítica Ohaus AX224',
    location: 'Medellín',
    process: 'Investigación',
    area: 'Control de calidad',
    status: 'Operativo',
    maintenanceType: 'Preventivo',
    criticality: 'Media',
    calibrationStatus: 'Por vencer',
    category: 'Control de calidad',
    classification: 'BIO',
    riskClass: 'Clase I',
    invimaStatus: 'Con registro',
    lastMaintenance: '2025-09-09',
    nextMaintenance: '2025-12-05',
    assignedTo: 'Laboratorio central',
    provider: 'Ohaus',
    warrantyActive: true
  }
]
