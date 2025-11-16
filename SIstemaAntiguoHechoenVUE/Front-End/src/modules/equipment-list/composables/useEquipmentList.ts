import { computed, ref } from 'vue'
import type {
  Equipment,
  EquipmentFilters,
  EquipmentSortKey,
  SortOrder,
  EquipmentLifeSheet,
  MetrologicalActivityCode,
  MetrologicalHistoryRecord
} from '../types/equipment.types'
import { listEquipment } from '../services/equipmentApi'

export function useEquipmentList() {
  const equipment = ref<Equipment[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const filters = ref<EquipmentFilters>({
    searchQuery: '',
    selectedCategory: '',
    selectedDepartment: '',
    selectedStatus: '',
    selectedClassification: '',
    selectedRiskClass: '',
    selectedSede: '',
    selectedInvima: ''
  })

  const sortKey = ref<EquipmentSortKey>('internalCode')
  const sortOrder = ref<SortOrder>('asc')
  const currentPage = ref(1)
  const itemsPerPage = ref(10)
  const selectedEquipmentIds = ref<string[]>([])
  const selectedEquipment = ref<Equipment | null>(null)
  const lifeSheetEquipment = ref<Equipment | null>(null)
  const equipmentLifeSheet = ref<EquipmentLifeSheet | null>(null)
  const lifeSheetEditEquipment = ref<Equipment | null>(null)
  const equipmentLifeSheetEdit = ref<EquipmentLifeSheet | null>(null)

  const loadEquipment = async () => {
    isLoading.value = true
    error.value = null
    try {
      const params: any = {}

      if (filters.value.searchQuery) params.search = filters.value.searchQuery
      if (filters.value.selectedCategory) params.category = filters.value.selectedCategory
      if (filters.value.selectedDepartment) params.department = filters.value.selectedDepartment
      if (filters.value.selectedStatus) params.status = filters.value.selectedStatus
      if (filters.value.selectedClassification) params.classification = filters.value.selectedClassification
      if (filters.value.selectedRiskClass) params.riskClass = filters.value.selectedRiskClass
      if (filters.value.selectedSede) params.sede = filters.value.selectedSede
      if (filters.value.selectedInvima) params.invima = filters.value.selectedInvima

      const data = await listEquipment(params)
      equipment.value = data
    } catch (e: any) {
      error.value = 'Error al cargar el inventario de equipos'
      equipment.value = []
    } finally {
      isLoading.value = false
    }
  }

  // Filtrado y ordenamiento local
  const filteredEquipment = computed(() => {
    let result = [...equipment.value]

    // Ordenamiento
    result.sort((a, b) => {
      const aVal = a[sortKey.value]
      const bVal = b[sortKey.value]

      if (aVal == null) return 1
      if (bVal == null) return -1

      let comparison = 0
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        comparison = aVal.localeCompare(bVal)
      } else if (typeof aVal === 'number' && typeof bVal === 'number') {
        comparison = aVal - bVal
      } else {
        comparison = String(aVal).localeCompare(String(bVal))
      }

      return sortOrder.value === 'asc' ? comparison : -comparison
    })

    return result
  })

  // Paginación
  const paginatedEquipment = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredEquipment.value.slice(start, end)
  })

  const totalPages = computed(() => Math.ceil(filteredEquipment.value.length / itemsPerPage.value))

  const isAllSelected = computed(() => {
    if (paginatedEquipment.value.length === 0) return false
    return paginatedEquipment.value.every(eq => selectedEquipmentIds.value.includes(eq.id))
  })

  const hasActiveFilters = computed(() => {
    return (
      filters.value.searchQuery !== '' ||
      filters.value.selectedCategory !== '' ||
      filters.value.selectedDepartment !== '' ||
      filters.value.selectedStatus !== '' ||
      filters.value.selectedClassification !== '' ||
      filters.value.selectedRiskClass !== '' ||
      filters.value.selectedSede !== '' ||
      filters.value.selectedInvima !== ''
    )
  })

  // Acciones
  const toggleSelectAll = () => {
    if (isAllSelected.value) {
      selectedEquipmentIds.value = selectedEquipmentIds.value.filter(
        id => !paginatedEquipment.value.some(eq => eq.id === id)
      )
    } else {
      const newIds = paginatedEquipment.value.map(eq => eq.id)
      selectedEquipmentIds.value = [...new Set([...selectedEquipmentIds.value, ...newIds])]
    }
  }

  const toggleSelect = (id: string) => {
    const index = selectedEquipmentIds.value.indexOf(id)
    if (index > -1) {
      selectedEquipmentIds.value.splice(index, 1)
    } else {
      selectedEquipmentIds.value.push(id)
    }
  }

  const sortBy = (key: EquipmentSortKey) => {
    if (sortKey.value === key) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortKey.value = key
      sortOrder.value = 'asc'
    }
  }

  const showDetails = (equipmentItem: Equipment) => {
    selectedEquipment.value = equipmentItem
  }

  const closeDetails = () => {
    selectedEquipment.value = null
  }

  const scheduleMainten = (equipmentItem: Equipment) => {
    console.log('Schedule maintenance:', equipmentItem)
    // Implementar programación de mantenimiento
  }

  const showLifeSheet = (equipmentItem: Equipment) => {
    lifeSheetEquipment.value = equipmentItem
    // Simular carga de hoja de vida basada en el equipo
    // En producción, esto vendría de una API
    equipmentLifeSheet.value = getMockLifeSheet(equipmentItem)
  }

  const closeLifeSheet = () => {
    lifeSheetEquipment.value = null
    equipmentLifeSheet.value = null
  }

  const editLifeSheet = (equipmentItem: Equipment) => {
    lifeSheetEditEquipment.value = equipmentItem
    equipmentLifeSheetEdit.value = getMockLifeSheet(equipmentItem)
  }

  const closeLifeSheetEdit = () => {
    lifeSheetEditEquipment.value = null
    equipmentLifeSheetEdit.value = null
  }

  // Función mock para generar hoja de vida basada en el equipo
  const getMockLifeSheet = (equipment: Equipment): EquipmentLifeSheet => {
    const seedSource = `${equipment.id}-${equipment.internalCode}-${equipment.category}`
    const seed = seedSource
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0)

    const pick = <T>(list: T[], offset = 0): T =>
      list[(seed + offset) % list.length]

    const invimaOptions: EquipmentLifeSheet['invimaType'][] = ['RS', 'PC', 'NR']
    const acquisitionForms: EquipmentLifeSheet['acquisitionForm'][] = [
      'Compra directa',
      'Donación',
      'Comodato',
      'Alquiler',
      'Otro',
    ]

    const documentTypes = [
      'Factura',
      'Acta de entrega',
      'Orden de compra',
      'Contrato de comodato',
    ]

    const contacts = [
      `Silvia Bejarano – Directora Comercial\nCelular: 312 467 2818\nEmail: directorcomercial@example.com\nJuan Manuel Laíseca\nCelular: 320 370 9895\nEmail: ingenieria@example.com`,
      `Carlos Méndez – Representante Técnico\nTeléfono: (604) 444 55 66 ext. 204\nEmail: soporte@tecnosalud.com\nLaura Torres – Ejecutiva de Cuenta\nCelular: 301 555 7788`,
      `Mariana Ruiz – Coordinadora Comercial\nCelular: 315 888 9900\nEmail: mruiz@biomedica.co\nSergio Hoyos – Servicio Postventa\nTeléfono: (605) 300 1122`,
    ]

    const componentsList = [
      'Módulo de análisis principal, lector de tarjetas, UPS de respaldo',
      'Cabezal óptico, pedal de control, kit de calibración',
      'Software de adquisición, monitor táctil, impresora térmica integrada',
    ]

    const dimensionsList = [
      '43 x 50,5 x 24,5 cm (ancho x profundidad x alto)',
      '120 x 75 x 180 cm (ancho x profundidad x alto)',
      '90 x 60 x 150 cm (ancho x profundidad x alto)',
    ]

    const weightList = ['25 kg', '180 kg', '72 kg']

    const otherConditionsList = [
      'Frecuencia 47 – 63 Hz',
      'Requiere red regulada y toma a tierra independiente',
      'Usar en salas con iluminación controlada, vibración < 0,1 g',
    ]

    const measurementMagnitudes = [
      'Longitud de onda',
      'Presión arterial',
      'Concentración de gases anestésicos',
    ]

    const equipmentRanges = [
      'Láser reportero 532 nm y láser clasificador 635 nm',
      '0 – 300 mmHg',
      '0 – 10 vol. % (O₂ / N₂O / Isoflurano)',
    ]

    const serviceRanges = [
      'NI',
      '70 – 180 mmHg en quirófano',
      '0 – 8 vol. % en sala de cirugía',
    ]

    const resolutions = ['NI', '0,1 mmHg', '0,01 vol. %']
    const maxErrors = ['N/A', '± 1 mmHg', '± 0,1 vol. %']

    const metrologicalFrequencies = ['Anual', 'Semestral', 'Trimestral']

    const metrologicalHistorySamples: MetrologicalHistoryRecord[][] = [
      [
        {
          date: '2018 - 2019',
          reportNumber: 'MP-001/19',
          activity: ['MP', 'MC'] as MetrologicalActivityCode[],
          supplier: 'Biosciences',
          observations: 'PDF con recopilación de mantenimientos preventivos y correctivos.',
        },
        {
          date: '2022-07-01',
          reportNumber: '3600',
          activity: ['MP'] as MetrologicalActivityCode[],
          supplier: 'Biosciences',
          observations: 'Equipo funcionando correctamente.',
        },
        {
          date: '2023-09-15',
          reportNumber: '4024',
          activity: ['MC'] as MetrologicalActivityCode[],
          supplier: 'Biosciences',
          observations: 'Se cambia vávula y se realiza correctivo paralelo al preventive.',
        },
        {
          date: '2024-03-13',
          reportNumber: '4192',
          activity: ['MP'] as MetrologicalActivityCode[],
          supplier: 'Biosciences',
          observations: 'Se realiza rutina de mantenimiento anual.',
        },
      ],
      [
        {
          date: '2023-02-10',
          reportNumber: 'MP-2302',
          activity: ['MP'] as MetrologicalActivityCode[],
          supplier: 'TecnoSalud S.A.',
          observations: 'Se realiza limpieza profunda, verificación de alarmas y actualización de firmware.',
        },
        {
          date: '2023-08-05',
          reportNumber: 'CAL-0805',
          activity: ['C'] as MetrologicalActivityCode[],
          supplier: 'Metrotech Labs',
          observations: 'Calibración trazable con certificado ISO/IEC 17025, ajuste del sensor óptico.',
        },
        {
          date: '2024-01-16',
          reportNumber: 'CORR-0116',
          activity: ['MC', 'C'] as MetrologicalActivityCode[],
          supplier: 'TecnoSalud S.A.',
          observations: 'Reemplazo de módulo de potencia y recalibración posterior.',
        },
      ],
      [
        {
          date: '2021-11-22',
          reportNumber: 'MP-1122',
          activity: ['MP'] as MetrologicalActivityCode[],
          supplier: 'BioCare Ltda.',
          observations: 'Verificación de parámetros y actualización de planillas de control.',
        },
        {
          date: '2022-05-18',
          reportNumber: 'CORR-0518',
          activity: ['MC'] as MetrologicalActivityCode[],
          supplier: 'BioCare Ltda.',
          observations: 'Reemplazo de componentes electrónicos afectados por sobrecarga.',
        },
        {
          date: '2023-05-18',
          reportNumber: 'CAL-0518',
          activity: ['C'] as MetrologicalActivityCode[],
          supplier: 'BioCare Ltda.',
          observations: 'Calibración completa con reporte trazable y ajuste fino de medición.',
        },
        {
          date: '2024-04-02',
          reportNumber: 'MP-2404',
          activity: ['MP', 'C'] as MetrologicalActivityCode[],
          supplier: 'BioCare Ltda.',
          observations: 'Mantenimiento preventivo y recalibración en la misma visita.',
        },
      ],
    ]

    const observationSamples = [
      [
        {
          date: '2024-01-30',
          observation: 'Se evidencia mejora en tiempos de respuesta tras el cambio de firmware.',
          name: 'Laura Ospina',
        },
        {
          date: '2023-10-12',
          observation: 'Solicitan incluir checklist de inicio rápido para nuevo personal.',
          name: 'Santiago Mejía',
        },
      ],
      [
        {
          date: '2024-03-05',
          observation: 'Equipo trasladado temporalmente a sala híbrida para prueba piloto.',
          name: 'Marcela Restrepo',
        },
      ],
      [
        {
          date: '2023-07-19',
          observation: 'Sugerido agregar UPS externo para mejorar autonomía.',
          name: 'Ana González',
        },
        {
          date: '2022-12-02',
          observation: 'Capacitación completada por equipo biomédico externo.',
          name: 'Jorge Arango',
        },
      ],
    ]

    const selectedHistory = pick(metrologicalHistorySamples)
    const selectedObservations = pick(observationSamples)

    const lifeSheet: EquipmentLifeSheet = {
      inventoryCode: equipment.internalCode || `${equipment.id}-${seed % 9999}`,
      manufactureDate: equipment.manufactureDate ?? '2016-09-29',
      usefulLife: equipment.usefulLife ?? `${5 + (seed % 10)} años`,
      invimaType:
        equipment.invimaRegistry?.includes('RS')
          ? 'RS'
          : equipment.invimaRegistry?.includes('PC')
            ? 'PC'
            : pick(invimaOptions),
      invimaCode: equipment.invimaRegistry ?? `INVIMA-${seed % 9000 + 1000}-00${seed % 90}`,
      components: equipment.notes ?? pick(componentsList),
      area: equipment.area ?? 'Inmunología de Trasplantes',
      ecriCode: equipment.ecriCode ?? `ECRI-${seed % 10000}`,
      acquisitionForm: (equipment.acquisitionForm as EquipmentLifeSheet['acquisitionForm']) ?? pick(acquisitionForms),
      documentType: equipment.documentType ?? pick(documentTypes),
      documentNumber: equipment.documentNumber ?? `${seed % 5000 + 1000}`,
      acquisitionDate: equipment.acquisitionDate ?? '2016-09-29',
      warrantyReplacementDate: seed % 3 === 0 ? '2018-03-16' : undefined,
      warrantyExpiration: equipment.warrantyExpiration ?? '2019-03-16',
      supplier: equipment.supplier ?? pick(['Biosciences S.A.S.', 'TecnoSalud S.A.', 'BioCare Ltda.']),
      supplierNIT: equipment.nit ?? `900.${seed % 999}.${seed % 9000}`,
      supplierContact: pick(contacts),
      voltage: equipment.voltage ?? '100 - 120 VAC / 200 - 240 VAC',
      current: equipment.current ?? '1,4 A / 0,8 A',
      frequency: equipment.other?.includes('Hz')
        ? equipment.other.match(/\d+\s*-\s*\d+\s*Hz/)?.[0]
        : '47 - 63 Hz',
      relativeHumidity: equipment.relativeHumidity ?? 'Entre 20 % y 80 %, sin condensación',
      temperature: equipment.temperature ?? '15 - 30 °C',
      dimensions: equipment.dimensions ?? pick(dimensionsList),
      weight: equipment.weight ?? pick(weightList),
      otherConditions: equipment.other ?? pick(otherConditionsList),
      measurementMagnitude: equipment.magnitude ?? pick(measurementMagnitudes),
      equipmentRange: equipment.equipmentRange ?? pick(equipmentRanges),
      serviceUsageRange: equipment.workingRange ?? pick(serviceRanges),
      resolution: equipment.resolution ?? pick(resolutions),
      maxAllowedError: equipment.maxAllowedError ?? pick(maxErrors),
      metrologicalFrequency: equipment.metrologicalFrequency ?? pick(metrologicalFrequencies),
      requiresCalibration:
        equipment.requiresCalibration ?? seed % 2 === 0,
      metrologicalHistory: [
        ...selectedHistory,
        ...(equipment.lastMaintenanceDate
          ? [
              {
          date: equipment.lastMaintenanceDate,
                reportNumber: `MP-${seed % 1000}`,
                activity: ['MP'] as MetrologicalActivityCode[],
                supplier: equipment.supplier ?? pick(['Biosciences S.A.S.', 'TecnoSalud S.A.']),
                observations: 'Registro generado a partir de la última fecha de mantenimiento del inventario.',
              },
            ]
          : []),
      ],
      observations: selectedObservations,
    }

    return lifeSheet
  }

  const clearFilters = () => {
    filters.value = {
      searchQuery: '',
      selectedCategory: '',
      selectedDepartment: '',
      selectedStatus: '',
      selectedClassification: '',
      selectedRiskClass: '',
      selectedSede: '',
      selectedInvima: ''
    }
    loadEquipment()
  }

  const reload = () => {
    currentPage.value = 1
    selectedEquipmentIds.value = []
    loadEquipment()
  }

  return {
    // State
    equipment,
    isLoading,
    error,
    filters,
    sortKey,
    sortOrder,
    currentPage,
    itemsPerPage,
    selectedEquipmentIds,
    selectedEquipment,
    lifeSheetEquipment,
    equipmentLifeSheet,
    lifeSheetEditEquipment,
    equipmentLifeSheetEdit,
    // Computed
    filteredEquipment,
    paginatedEquipment,
    totalPages,
    isAllSelected,
    hasActiveFilters,
    // Actions
    loadEquipment,
    toggleSelectAll,
    toggleSelect,
    sortBy,
    showDetails,
    closeDetails,
    scheduleMainten,
    showLifeSheet,
    closeLifeSheet,
    editLifeSheet,
    closeLifeSheetEdit,
    clearFilters,
    reload
  }
}
