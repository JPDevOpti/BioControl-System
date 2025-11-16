import type { Equipment } from '../types/equipment.types'

// Simulación de API - En producción esto vendría del backend
export async function listEquipment(params?: {
  skip?: number
  limit?: number
  search?: string
  category?: string
  department?: string
  status?: string
  classification?: string
  riskClass?: string
  sede?: string
  invima?: string
}): Promise<Equipment[]> {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 600))

  // Datos mock basados en el Excel real - Cada archivo Excel = una sede, cada hoja = un servicio
  // Servicios por sede:
  // - San Vicente: Patología, Dermatopatología
  // - Prado: LIME Central, Fotodermatología, Resonador, Oftalmología
  // - SIU: IDP, Trasplantes GICIG, Reproducción
  const mockData: Equipment[] = [
    {
      id: '1',
      internalCode: '187701',
      ipsCode: 'BIO-16464',
      ecriCode: '15-157',
      name: 'Criostato',
      sede: 'San Vicente',
      process: 'Patología',
      responsible: 'Juliana',
      location: 'Cuarto criostato',
      brand: 'Leica',
      model: 'CM1860 UV',
      serialNumber: '00000005299',
      missionAxis: 'Investigación',
      classification: 'BIO',
      riskClass: 'Clase I',
      invimaRegistry: 'INVIMA 2015DM-0013759',
      category: 'Histotecnología',
      department: 'Patología',
      status: 'Operativo',
      acquisitionDate: '2020-12-12',
      supplier: 'Sanitas',
      warrantyExpiration: '2022-02-12',
      hasWarranty: false,
      requiresMaintenance: true,
      maintenanceFrequency: 2,
      lastMaintenanceDate: '2025-06-15',
      nextMaintenanceDate: '2025-11-10', // Próximo (4 días)
      nextCalibrationDate: '2025-12-15',
      requiresCalibration: false,
      voltage: '120-127 VAC',
      power: '1440 VA',
      notes: 'Frecuencia: 60 Hz',
      correctiveMaintenanceCount: 2,
      lastCorrectiveMaintenanceDate: '2024-08-15',
      createdAt: '2020-12-01T08:00:00Z',
      updatedAt: '2025-06-15T14:30:00Z'
    },
    {
      id: '2',
      internalCode: '203438',
      ipsCode: 'BIO-16513',
      name: 'Equipo de Inmunohistoquímica',
      sede: 'San Vicente',
      process: 'Patología',
      responsible: 'Martha Londoño',
      location: 'Inmunohistoquímica',
      brand: 'VITRO',
      model: 'MD STAINER',
      serialNumber: 'PC21033',
      missionAxis: 'Investigación',
      classification: 'BIO',
      riskClass: 'Clase IIa',
      invimaRegistry: 'INVIMA 2020DM-0020965',
      category: 'Inmunohistoquímica',
      department: 'Patología',
      status: 'Operativo',
      acquisitionDate: '2022-11-30',
      supplier: 'Labtronics',
      hasWarranty: true,
      requiresMaintenance: true,
      maintenanceFrequency: 2,
      lastMaintenanceDate: '2025-05-20',
      nextMaintenanceDate: '2025-11-04', // Vencido (hace 2 días)
      nextPreventiveDate: '2026-01-20',
      requiresCalibration: false,
      voltage: '100-240 VAC',
      power: '875 W',
      correctiveMaintenanceCount: 1,
      lastCorrectiveMaintenanceDate: '2025-03-10',
      createdAt: '2022-11-30T10:00:00Z',
      updatedAt: '2025-05-20T11:20:00Z'
    },
    {
      id: '3',
      internalCode: '109414 / 063762',
      ipsCode: 'BIO-16453',
      ecriCode: '18-449',
      name: 'Balanza Analítica',
      sede: 'San Vicente',
      process: 'Patología',
      responsible: 'Juliana',
      location: 'Histoquímica',
      brand: 'A&D Company',
      model: 'HR-200',
      serialNumber: '12312707',
      missionAxis: 'Investigación',
      classification: 'BIO',
      category: 'Laboratorio',
      department: 'Patología',
      status: 'Operativo',
      acquisitionDate: '2018-03-15',
      supplier: 'UdeA',
      hasWarranty: false,
      requiresMaintenance: true,
      maintenanceFrequency: 2,
      lastMaintenanceDate: '2025-04-10',
      nextMaintenanceDate: '2025-11-15', // Próxima (9 días)
      nextCalibrationDate: '2026-04-10',
      nextPreventiveDate: '2025-12-10',
      requiresCalibration: true,
      calibrationFrequency: 2,
      lastCalibrationDate: '2025-04-10',
      nextCalibrationDate: '2026-04-10',
      voltage: '120 VAC / 12 VDC',
      correctiveMaintenanceCount: 3,
      lastCorrectiveMaintenanceDate: '2024-11-20',
      createdAt: '2018-03-15T09:00:00Z',
      updatedAt: '2025-04-10T16:00:00Z'
    },
    {
      id: '4',
      internalCode: '114982',
      ipsCode: 'BIO-16497',
      ecriCode: '15-158',
      name: 'Micrótomo de rotación',
      sede: 'San Vicente',
      process: 'Patología',
      responsible: 'Juliana',
      location: 'Histotécnica',
      brand: 'Leica',
      model: 'RM2235',
      serialNumber: '50038604',
      missionAxis: 'Investigación',
      classification: 'BIO',
      category: 'Histotecnología',
      department: 'Patología',
      status: 'Operativo',
      acquisitionDate: '2004-06-01',
      supplier: 'Sanitas',
      hasWarranty: false,
      requiresMaintenance: true,
      maintenanceFrequency: 2,
      lastMaintenanceDate: '2025-03-20',
      nextMaintenanceDate: '2025-11-25', // Próximo (19 días)
      nextPreventiveDate: '2026-03-20',
      requiresCalibration: false,
      correctiveMaintenanceCount: 5,
      lastCorrectiveMaintenanceDate: '2024-12-10',
      createdAt: '2004-06-01T11:00:00Z',
      updatedAt: '2025-03-20T10:30:00Z'
    },
    {
      id: '5',
      internalCode: '50 / 137405 / 064310',
      ipsCode: 'BIO-16526',
      ecriCode: '15-156',
      name: 'Microscopio',
      sede: 'San Vicente',
      process: 'Patología',
      responsible: 'Patologos',
      location: 'Oficinas Patologos',
      brand: 'Olympus',
      model: 'CX31RBSFA',
      serialNumber: '9M05009',
      missionAxis: 'Docencia',
      classification: 'BIO',
      category: 'Microscopía',
      department: 'Patología',
      status: 'Operativo',
      acquisitionDate: '2015-08-10',
      supplier: 'UdeA',
      hasWarranty: false,
      requiresMaintenance: true,
      maintenanceFrequency: 1,
      lastMaintenanceDate: '2025-02-15',
      nextMaintenanceDate: '2026-02-15',
      requiresCalibration: false,
      voltage: '100-120 / 220-240 VAC',
      correctiveMaintenanceCount: 0,
      createdAt: '2015-08-10T09:00:00Z',
      updatedAt: '2025-02-15T16:00:00Z'
    },
    {
      id: '6',
      internalCode: '6/ 168099 / 061549',
      ipsCode: 'BIO-16457',
      ecriCode: '15-107',
      name: 'Baño de Flotación',
      sede: 'San Vicente',
      process: 'Patología',
      responsible: 'Martha Londoño',
      location: 'Inmunohistoquímica',
      brand: 'Lupetec',
      model: 'BH2015',
      serialNumber: '160140',
      missionAxis: 'Investigación',
      classification: 'BIO',
      category: 'Histotecnología',
      department: 'Patología',
      status: 'Operativo',
      acquisitionDate: '2016-12-05',
      supplier: 'UdeA',
      hasWarranty: false,
      requiresMaintenance: true,
      maintenanceFrequency: 2,
      lastMaintenanceDate: '2025-05-10',
      nextMaintenanceDate: '2025-12-20', // OK (44 días)
      nextCalibrationDate: '2026-05-10',
      requiresCalibration: true,
      calibrationFrequency: 2,
      lastCalibrationDate: '2025-05-10',
      nextCalibrationDate: '2026-05-10',
      voltage: '110 VAC',
      power: '350 W',
      notes: 'Rango trabajo: 40-45°C',
      correctiveMaintenanceCount: 1,
      lastCorrectiveMaintenanceDate: '2024-09-25',
      createdAt: '2016-12-05T14:00:00Z',
      updatedAt: '2025-05-10T09:15:00Z'
    },
    {
      id: '7',
      internalCode: '178684 / 061551',
      ipsCode: 'BIO-16467',
      name: 'Estación de inclusión',
      sede: 'San Vicente',
      process: 'Patología',
      responsible: 'Juliana',
      location: 'Histotécnica',
      brand: 'Leica',
      model: 'HistoCore Arcadia H / Arcadia C',
      serialNumber: '1671 / 2048',
      missionAxis: 'Investigación',
      classification: 'BIO',
      category: 'Histotecnología',
      department: 'Patología',
      status: 'Operativo',
      acquisitionDate: '2017-12-01',
      supplier: 'Sanitas',
      warrantyExpiration: '2019-02-06',
      hasWarranty: false,
      requiresMaintenance: true,
      maintenanceFrequency: 2,
      lastMaintenanceDate: '2025-08-05',
      nextMaintenanceDate: '2026-02-05',
      requiresCalibration: false,
      voltage: '100-120 VAC',
      notes: 'Arcadia H: 10 A máx., Arcadia C: 5 A máx.',
      correctiveMaintenanceCount: 2,
      lastCorrectiveMaintenanceDate: '2025-01-15',
      createdAt: '2017-12-01T08:00:00Z',
      updatedAt: '2025-08-05T13:45:00Z'
    },
    {
      id: '8',
      internalCode: '122967',
      ipsCode: 'BIO-16463',
      ecriCode: '10-778',
      name: 'Citocentrífuga',
      sede: 'San Vicente',
      process: 'Patología',
      responsible: 'Juliana',
      location: 'Histoquímica',
      brand: 'Thermo Scientific',
      model: 'Shandon Cytospin 4',
      serialNumber: 'CY3310-0601',
      missionAxis: 'Investigación',
      classification: 'BIO',
      category: 'Laboratorio',
      department: 'Patología',
      status: 'Operativo',
      acquisitionDate: '2010-05-20',
      supplier: 'UdeA',
      hasWarranty: false,
      requiresMaintenance: true,
      maintenanceFrequency: 2,
      lastMaintenanceDate: '2025-07-12',
      nextMaintenanceDate: '2026-01-12',
      requiresCalibration: true,
      calibrationFrequency: 2,
      lastCalibrationDate: '2025-07-12',
      nextCalibrationDate: '2026-01-12',
      voltage: '100-240 VAC',
      power: '150 VA',
      notes: 'Frecuencia: 50/60 Hz',
      correctiveMaintenanceCount: 4,
      lastCorrectiveMaintenanceDate: '2024-10-08',
      createdAt: '2010-05-20T12:00:00Z',
      updatedAt: '2025-07-12T15:20:00Z'
    },
    {
      id: '9',
      internalCode: '111251 / 063760',
      ipsCode: 'BIO-16468',
      ecriCode: '14-410',
      name: 'Horno de Laboratorio',
      sede: 'San Vicente',
      process: 'Patología',
      responsible: 'Juliana',
      location: 'Histoquímica',
      brand: 'Memmert',
      model: 'UM 400',
      serialNumber: 'B402.0874',
      missionAxis: 'Investigación',
      classification: 'BIO',
      category: 'Laboratorio',
      department: 'Patología',
      status: 'Operativo',
      acquisitionDate: '2012-03-08',
      supplier: 'UdeA',
      hasWarranty: false,
      requiresMaintenance: true,
      maintenanceFrequency: 2,
      lastMaintenanceDate: '2025-04-18',
      nextMaintenanceDate: '2025-10-18',
      requiresCalibration: true,
      calibrationFrequency: 2,
      lastCalibrationDate: '2025-04-18',
      nextCalibrationDate: '2025-10-18',
      power: '1400 W',
      notes: 'Frecuencia: 50/60 Hz',
      correctiveMaintenanceCount: 2,
      lastCorrectiveMaintenanceDate: '2024-07-12',
      createdAt: '2012-03-08T10:30:00Z',
      updatedAt: '2025-04-18T14:00:00Z'
    },
    {
      id: '10',
      internalCode: 'LIME 541',
      ipsCode: 'BIO-16512',
      ecriCode: '15-166',
      name: 'Micropipeta',
      sede: 'San Vicente',
      process: 'Patología',
      responsible: 'Martha Londoño',
      location: 'Inmunohistoquímica',
      brand: 'Sartorius',
      model: 'Tacta',
      serialNumber: '42186226',
      missionAxis: 'Investigación',
      classification: 'BIO',
      riskClass: 'Clase I',
      invimaRegistry: 'Certificación No requiere N° 2016020596',
      category: 'Laboratorio',
      department: 'Patología',
      status: 'Operativo',
      acquisitionDate: '2023-09-08',
      supplier: 'Kaika',
      warrantyExpiration: '2024-09-08',
      hasWarranty: true,
      requiresMaintenance: true,
      maintenanceFrequency: 1,
      lastMaintenanceDate: '2025-03-10',
      nextMaintenanceDate: '2026-03-10',
      requiresCalibration: true,
      calibrationFrequency: 1,
      lastCalibrationDate: '2025-03-10',
      nextCalibrationDate: '2026-03-10',
      notes: 'Volumen: 10-100 uL, Resolución 0.1 uL',
      correctiveMaintenanceCount: 0,
      createdAt: '2023-09-08T11:00:00Z',
      updatedAt: '2025-03-10T16:45:00Z'
    },
    {
      id: '11',
      internalCode: '205301',
      ipsCode: 'BIO-16515',
      ecriCode: '10-780',
      name: 'Centrífuga',
      sede: 'San Vicente',
      process: 'Patología',
      responsible: 'Jesica Restrepo',
      location: 'Histoquímica',
      brand: 'HANIL',
      model: 'FLETA 40P',
      serialNumber: 'HICMF223011602001',
      missionAxis: 'Investigación',
      classification: 'BIO',
      riskClass: 'Clase I',
      invimaRegistry: 'INVIMA 2014DM-0011166',
      category: 'Laboratorio',
      department: 'Patología',
      status: 'Operativo',
      acquisitionDate: '2023-08-01',
      supplier: 'BPL MEDICAL S.A.S',
      hasWarranty: true,
      warrantyExpiration: '2024-08-01',
      requiresMaintenance: true,
      maintenanceFrequency: 1,
      lastMaintenanceDate: '2025-05-15',
      nextMaintenanceDate: '2026-05-15',
      requiresCalibration: true,
      calibrationFrequency: 1,
      lastCalibrationDate: '2025-05-15',
      nextCalibrationDate: '2026-05-15',
      voltage: '100-110 VAC',
      notes: 'Potencia 500 VA',
      correctiveMaintenanceCount: 0,
      createdAt: '2023-08-01T10:00:00Z',
      updatedAt: '2025-05-15T12:00:00Z'
    },
    {
      id: '12',
      internalCode: 'NT',
      ipsCode: 'BIO-16516',
      ecriCode: '15-612',
      name: 'Sistema de agua ultra pura',
      sede: 'San Vicente',
      process: 'Patología',
      responsible: 'Martha Londoño',
      location: 'Inmunohistoquímica',
      brand: 'MORA',
      model: 'MORA',
      serialNumber: '202212899',
      missionAxis: 'Investigación',
      classification: 'IND',
      category: 'Laboratorio',
      department: 'Patología',
      status: 'Operativo',
      acquisitionDate: '2023-01-28',
      supplier: 'UdeA',
      hasWarranty: true,
      warrantyExpiration: '2024-01-28',
      requiresMaintenance: true,
      maintenanceFrequency: 1,
      lastMaintenanceDate: '2025-04-20',
      nextMaintenanceDate: '2026-04-20',
      requiresCalibration: false,
      voltage: '110-115 VAC',
      correctiveMaintenanceCount: 1,
      lastCorrectiveMaintenanceDate: '2024-12-05',
      createdAt: '2023-01-28T09:00:00Z',
      updatedAt: '2025-04-20T14:30:00Z'
    },
    {
      id: '13',
      internalCode: 'LIME 644',
      ipsCode: 'Pendiente',
      name: 'Congelador',
      sede: 'San Vicente',
      process: 'Patología',
      responsible: 'Juliana Duque',
      location: 'HSVF Patologia, Bloque 13, Inmunohistoquímica',
      brand: 'Infrico',
      model: 'LTF40SD',
      serialNumber: '3000957835',
      missionAxis: 'Investigación',
      classification: 'BIO',
      riskClass: 'Clase IIa',
      invimaRegistry: 'INVIMA 2023DM-0026731',
      category: 'Almacenamiento',
      department: 'Patología',
      status: 'Operativo',
      acquisitionDate: '2024-12-13',
      supplier: 'BLAMIS DOTACIONES LABORATORIO S.A.S',
      hasWarranty: true,
      warrantyExpiration: '2025-12-11',
      requiresMaintenance: true,
      maintenanceFrequency: 2,
      lastMaintenanceDate: '2025-06-01',
      nextMaintenanceDate: '2025-12-01',
      requiresCalibration: true,
      calibrationFrequency: 2,
      lastCalibrationDate: '2025-06-01',
      nextCalibrationDate: '2025-12-01',
      correctiveMaintenanceCount: 0,
      createdAt: '2024-12-13T08:00:00Z',
      updatedAt: '2025-06-01T10:00:00Z'
    }
  ]

  // Aplicar filtros
  let filtered = mockData

  if (params?.search) {
    const search = params.search.toLowerCase()
    filtered = filtered.filter(
      eq =>
        eq.internalCode.toLowerCase().includes(search) ||
        eq.ipsCode.toLowerCase().includes(search) ||
        (eq.ecriCode && eq.ecriCode.toLowerCase().includes(search)) ||
        eq.name.toLowerCase().includes(search) ||
        eq.serialNumber.toLowerCase().includes(search) ||
        eq.brand.toLowerCase().includes(search) ||
        eq.model.toLowerCase().includes(search)
    )
  }

  if (params?.category) {
    filtered = filtered.filter(eq => eq.category === params.category)
  }

  if (params?.department) {
    filtered = filtered.filter(eq => eq.department === params.department)
  }

  if (params?.status) {
    filtered = filtered.filter(eq => eq.status === params.status)
  }

  if (params?.classification) {
    filtered = filtered.filter(eq => eq.classification === params.classification)
  }

  if (params?.riskClass) {
    filtered = filtered.filter(eq => eq.riskClass === params.riskClass)
  }

  if (params?.sede) {
    filtered = filtered.filter(eq => eq.sede === params.sede)
  }

  if (params?.invima) {
    if (params.invima === 'Con registro') {
      filtered = filtered.filter(eq => eq.invimaRegistry && eq.invimaRegistry.trim() !== '')
    } else if (params.invima === 'Sin registro') {
      filtered = filtered.filter(eq => !eq.invimaRegistry || eq.invimaRegistry.trim() === '')
    }
  }

  if (params?.maintenanceOverdue) {
    const today = new Date().toISOString().split('T')[0]
    filtered = filtered.filter(eq => eq.nextMaintenanceDate && eq.nextMaintenanceDate < today)
  }

  return filtered
}

export async function getEquipmentById(id: string): Promise<Equipment | null> {
  const all = await listEquipment()
  return all.find(eq => eq.id === id) || null
}

export async function updateEquipment(payload: Equipment): Promise<Equipment> {
  await new Promise(resolve => setTimeout(resolve, 400))
  return {
    ...payload,
    updatedAt: new Date().toISOString()
  }
}

export async function createEquipment(payload: Equipment): Promise<Equipment> {
  await new Promise(resolve => setTimeout(resolve, 400))
  return {
    ...payload,
    id: payload.id || String(Date.now()),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
}

// Opciones para filtros basadas en datos reales de Patología
export const equipmentCategories = [
  'Histotecnología',
  'Inmunohistoquímica',
  'Laboratorio',
  'Microscopía'
]

export const equipmentDepartments = ['Patología']

export const equipmentStatuses = [
  'Operativo',
  'En mantenimiento',
  'Fuera de servicio',
  'En reparación',
  'Dado de baja'
]

export const maintenanceTypes = ['Preventivo', 'Correctivo', 'Calibración']
