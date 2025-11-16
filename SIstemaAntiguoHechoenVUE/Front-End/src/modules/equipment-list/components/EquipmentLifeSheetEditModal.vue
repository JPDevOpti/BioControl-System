<template>
  <transition name="fade-scale">
    <div
      v-if="isOpen"
      :class="['fixed right-0 bottom-0 z-[10000] flex items-center justify-center p-4 bg-black/40 top-16', overlayLeftClass]"
      @click.self="$emit('close')"
    >
      <div class="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <header class="flex items-center justify-between px-6 py-5 border-b border-gray-200 bg-white">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
              <DocumentIcon class="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 class="text-lg font-bold text-gray-900">Editar Hoja de Vida del Equipo</h3>
              <p class="text-xs text-gray-500">Actualiza la información y guarda los cambios</p>
            </div>
          </div>
          <button
            type="button"
            @click="$emit('close')"
            class="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition"
            title="Cerrar"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <form class="flex-1 overflow-y-auto px-6 py-6 space-y-8" @submit.prevent="handleSave">
          <!-- Identificación -->
          <section class="bg-white border border-gray-200 rounded-2xl shadow-sm">
            <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-teal-100 rounded-t-2xl">
              <h4 class="text-lg font-semibold text-gray-900 text-center">Identificación del equipo</h4>
            </div>
            <div class="px-6 py-6 space-y-6">
              <div class="grid gap-4 md:grid-cols-2">
                <label class="form-label">
                  <span>Nombre del equipo</span>
                  <input v-model="form.equipment.name" :class="fieldClass" placeholder="Nombre del equipo" />
                </label>
                <label class="form-label">
                  <span>Código inventario</span>
                  <input v-model="form.lifeSheet.inventoryCode" :class="fieldMonoClass" placeholder="Código inventario" />
                </label>
                <label class="form-label">
                  <span>Código IPS</span>
                  <input v-model="form.equipment.ipsCode" :class="fieldMonoClass" placeholder="Código IPS" />
                </label>
                <label class="form-label">
                  <span>Código ECRI</span>
                  <input v-model="form.lifeSheet.ecriCode" :class="fieldClass" placeholder="Código ECRI" />
                </label>
              </div>

              <div class="grid gap-4 md:grid-cols-3">
                <label class="form-label">
                  <span>Marca</span>
                  <input v-model="form.equipment.brand" :class="fieldClass" placeholder="Marca" />
                </label>
                <label class="form-label">
                  <span>Modelo</span>
                  <input v-model="form.equipment.model" :class="fieldClass" placeholder="Modelo" />
                </label>
                <label class="form-label">
                  <span>Serie</span>
                  <input v-model="form.equipment.serialNumber" :class="fieldMonoClass" placeholder="Serie" />
                </label>
              </div>

              <div class="grid gap-4 md:grid-cols-3">
                <label class="form-label">
                  <span>Fecha de fabricación</span>
                  <input v-model="form.lifeSheet.manufactureDate" :class="fieldClass" placeholder="DD/MM/AAAA" />
                </label>
                <label class="form-label">
                  <span>Vida útil</span>
                  <input v-model="form.lifeSheet.usefulLife" :class="fieldClass" placeholder="Vida útil" />
                </label>
                <label class="form-label">
                  <span>Área</span>
                  <input v-model="form.lifeSheet.area" :class="fieldClass" placeholder="Área" />
                </label>
              </div>

              <div class="grid gap-4 md:grid-cols-2">
                <label class="form-label">
                  <span>Responsable del equipo</span>
                  <input v-model="form.equipment.responsible" :class="fieldClass" placeholder="Responsable" />
                </label>
                <label class="form-label">
                  <span>Ubicación física</span>
                  <input v-model="form.equipment.location" :class="fieldClass" placeholder="Ubicación física" />
                </label>
              </div>

              <div class="grid gap-6 md:grid-cols-2">
                <div>
                  <span class="block text-xs font-semibold text-gray-600 mb-2">Invima</span>
                  <div class="grid grid-cols-3 gap-2">
                    <button
                      v-for="option in invimaOptions"
                      :key="option"
                      type="button"
                      class="px-3 py-2 rounded-lg border transition"
                      :class="form.lifeSheet.invimaType === option ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-300 text-gray-600 hover:border-green-400'"
                      @click="setInvimaType(option)"
                    >
                      {{ option }}
                    </button>
                  </div>
                  <input v-model="form.lifeSheet.invimaCode" :class="[fieldMonoClass, 'mt-3']" placeholder="Código del registro" />
                </div>

                <div>
                  <span class="block text-xs font-semibold text-gray-600 mb-2">Clasificación por riesgo</span>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <button
                      v-for="risk in riskClasses"
                      :key="risk"
                      type="button"
                      class="px-3 py-2 rounded-lg border transition"
                      :class="form.equipment.riskClass === risk ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-300 text-gray-600 hover:border-green-400'"
                      @click="setRiskClass(risk)"
                    >
                      {{ risk }}
                    </button>
                  </div>
                </div>
              </div>

              <label class="form-label">
                <span>Componentes / accesorios</span>
                <textarea v-model="form.lifeSheet.components" :class="textareaClass" rows="2" placeholder="Componentes, accesorios, observaciones adicionales"></textarea>
              </label>
            </div>
          </section>

          <!-- Registro histórico -->
          <section class="bg-white border border-gray-200 rounded-2xl shadow-sm">
            <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-teal-100 rounded-t-2xl">
              <h4 class="text-lg font-semibold text-gray-900 text-center">Registro histórico de adquisición</h4>
            </div>
            <div class="px-6 py-6 space-y-6">
              <div>
                <span class="block text-xs font-semibold text-gray-600 mb-2">Forma de adquisición</span>
                <div class="grid grid-cols-2 md:grid-cols-5 gap-2">
                  <button
                    v-for="option in acquisitionFormOptions"
                    :key="option"
                    type="button"
                    class="px-3 py-2 rounded-lg border transition text-left"
                    :class="form.lifeSheet.acquisitionForm === option ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-300 text-gray-600 hover:border-green-400'"
                    @click="setAcquisitionForm(option)"
                  >
                    {{ option }}
                  </button>
                </div>
              </div>

              <div class="grid gap-4 md:grid-cols-2">
                <label class="form-label">
                  <span>Tipo de documento</span>
                  <input v-model="form.lifeSheet.documentType" :class="fieldClass" placeholder="Tipo de documento" />
                </label>
                <label class="form-label">
                  <span>Número de documento</span>
                  <input v-model="form.lifeSheet.documentNumber" :class="fieldMonoClass" placeholder="Número de documento" />
                </label>
              </div>

              <div class="grid gap-4 md:grid-cols-3">
                <label class="form-label">
                  <span>Fecha de adquisición</span>
                  <input v-model="form.lifeSheet.acquisitionDate" :class="fieldClass" placeholder="DD/MM/AAAA" />
                </label>
                <label class="form-label">
                  <span>Fecha cambio por garantía</span>
                  <input v-model="form.lifeSheet.warrantyReplacementDate" :class="fieldClass" placeholder="DD/MM/AAAA" />
                </label>
                <label class="form-label">
                  <span>Vencimiento de la garantía</span>
                  <input v-model="form.lifeSheet.warrantyExpiration" :class="fieldClass" placeholder="DD/MM/AAAA" />
                </label>
              </div>

              <div class="grid gap-4 md:grid-cols-2">
                <label class="form-label">
                  <span>Proveedor</span>
                  <input v-model="form.lifeSheet.supplier" :class="fieldClass" placeholder="Proveedor" />
                </label>
                <label class="form-label">
                  <span>NIT</span>
                  <input v-model="form.lifeSheet.supplierNIT" :class="fieldMonoClass" placeholder="NIT" />
                </label>
              </div>

              <label class="form-label">
                <span>Contacto (nombre, teléfono, correo electrónico)</span>
                <textarea v-model="form.lifeSheet.supplierContact" :class="textareaClass" rows="3" placeholder="Nombre, teléfono, correo electrónico"></textarea>
              </label>
            </div>
          </section>

          <!-- Condiciones de funcionamiento -->
          <section class="bg-white border border-gray-200 rounded-2xl shadow-sm">
            <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-teal-100 rounded-t-2xl">
              <h4 class="text-lg font-semibold text-gray-900 text-center">Condiciones de funcionamiento</h4>
            </div>
            <div class="px-6 py-6 space-y-6">
              <div class="grid gap-4 md:grid-cols-2">
                <label class="form-label">
                  <span>Voltaje</span>
                  <input v-model="form.lifeSheet.voltage" :class="fieldClass" placeholder="Voltaje" />
                </label>
                <label class="form-label">
                  <span>Corriente</span>
                  <input v-model="form.lifeSheet.current" :class="fieldClass" placeholder="Corriente" />
                </label>
                <label class="form-label">
                  <span>Humedad relativa</span>
                  <input v-model="form.lifeSheet.relativeHumidity" :class="fieldClass" placeholder="Humedad relativa" />
                </label>
                <label class="form-label">
                  <span>Temperatura</span>
                  <input v-model="form.lifeSheet.temperature" :class="fieldClass" placeholder="Temperatura" />
                </label>
              </div>

              <div class="grid gap-4 md:grid-cols-3">
                <label class="form-label">
                  <span>Dimensiones</span>
                  <input v-model="form.lifeSheet.dimensions" :class="fieldClass" placeholder="Dimensiones" />
                </label>
                <label class="form-label">
                  <span>Peso</span>
                  <input v-model="form.lifeSheet.weight" :class="fieldClass" placeholder="Peso" />
                </label>
                <label class="form-label">
                  <span>Otros</span>
                  <textarea v-model="form.lifeSheet.otherConditions" :class="textareaClass" rows="2" placeholder="Otros requisitos"></textarea>
                </label>
              </div>
            </div>
          </section>

          <!-- Datos metrológicos -->
          <section class="bg-white border border-gray-200 rounded-2xl shadow-sm">
            <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-teal-100 rounded-t-2xl">
              <h4 class="text-lg font-semibold text-gray-900 text-center">Datos metrológicos</h4>
            </div>
            <div class="px-6 py-6 space-y-6">
              <div class="grid gap-4 md:grid-cols-3">
                <label class="form-label">
                  <span>Magnitud de medida</span>
                  <input v-model="form.lifeSheet.measurementMagnitude" :class="fieldClass" placeholder="Magnitud" />
                </label>
                <label class="form-label">
                  <span>Rango del equipo</span>
                  <input v-model="form.lifeSheet.equipmentRange" :class="fieldClass" placeholder="Rango del equipo" />
                </label>
                <label class="form-label">
                  <span>Rango de uso en el servicio</span>
                  <input v-model="form.lifeSheet.serviceUsageRange" :class="fieldClass" placeholder="Rango de uso" />
                </label>
              </div>

              <div class="grid gap-4 md:grid-cols-2">
                <label class="form-label">
                  <span>Resolución</span>
                  <input v-model="form.lifeSheet.resolution" :class="fieldClass" placeholder="Resolución" />
                </label>
                <label class="form-label">
                  <span>Error máximo permitido</span>
                  <input v-model="form.lifeSheet.maxAllowedError" :class="fieldClass" placeholder="Error máximo permitido" />
                </label>
              </div>

              <div class="grid gap-4 md:grid-cols-2">
                <div>
                  <span class="block text-xs font-semibold text-gray-600 mb-2">Frecuencia metrológica</span>
                  <div class="grid grid-cols-3 gap-2">
                    <button
                      v-for="option in metrologicalFrequencyOptions"
                      :key="option"
                      type="button"
                      class="px-3 py-2 rounded-lg border transition"
                      :class="form.lifeSheet.metrologicalFrequencyOption === option ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-300 text-gray-600 hover:border-green-400'"
                      @click="setMetrologicalFrequency(option)"
                    >
                      {{ option }}
                    </button>
                  </div>
                  <input
                    v-if="form.lifeSheet.metrologicalFrequencyOption === 'Otro'"
                    v-model="form.lifeSheet.metrologicalFrequencyOther"
                    :class="[fieldClass, 'mt-3']"
                    placeholder="Especifica otra frecuencia"
                  />
                </div>

                <div>
                  <span class="block text-xs font-semibold text-gray-600 mb-2">Requiere calibración o calificación</span>
                  <div class="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      class="px-3 py-2 rounded-lg border transition"
                      :class="form.lifeSheet.requiresCalibration ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-300 text-gray-600 hover:border-green-400'"
                      @click="setRequiresCalibration(true)"
                    >
                      Sí
                    </button>
                    <button
                      type="button"
                      class="px-3 py-2 rounded-lg border transition"
                      :class="!form.lifeSheet.requiresCalibration ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-300 text-gray-600 hover:border-green-400'"
                      @click="setRequiresCalibration(false)"
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Registro metrológico -->
          <section class="bg-white border border-gray-200 rounded-2xl shadow-sm">
            <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-teal-100 rounded-t-2xl flex items-center justify-between">
              <h4 class="text-lg font-semibold text-gray-900">Registro histórico metrológico</h4>
              <button
                type="button"
                class="px-3 py-1.5 text-xs font-semibold border border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition"
                @click="addHistoryRecord"
              >
                Agregar registro
              </button>
            </div>
            <div class="px-6 py-6 space-y-6">
              <div
                v-for="(record, index) in form.lifeSheet.metrologicalHistory"
                :key="`history-${index}`"
                class="border border-gray-200 rounded-xl p-4 space-y-4"
              >
                <div class="grid gap-4 md:grid-cols-3">
                  <label class="form-label">
                    <span>Fecha</span>
                    <input v-model="record.date" :class="fieldClass" placeholder="Fecha o rango" />
                  </label>
                  <label class="form-label">
                    <span>N° informe</span>
                    <input v-model="record.reportNumber" :class="fieldMonoClass" placeholder="Informe" />
                  </label>
                  <label class="form-label">
                    <span>Proveedor</span>
                    <input v-model="record.supplier" :class="fieldClass" placeholder="Proveedor" />
                  </label>
                </div>

                <div>
                  <span class="block text-xs font-semibold text-gray-600 mb-2">Actividad</span>
                  <div class="grid grid-cols-3 gap-2">
                    <button
                      v-for="activity in activityCodes"
                      :key="activity"
                      type="button"
                      class="px-3 py-2 rounded-lg border transition"
                      :class="record.activity.includes(activity) ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-300 text-gray-600 hover:border-green-400'"
                      @click="toggleHistoryActivity(index, activity)"
                    >
                      {{ activity }}
                    </button>
                  </div>
                </div>

                <label class="form-label">
                  <span>Observaciones</span>
                  <textarea v-model="record.observations" :class="textareaClass" rows="2" placeholder="Observaciones del mantenimiento"></textarea>
                </label>

                <div class="flex justify-end">
                  <button
                    type="button"
                    class="text-xs text-red-500 hover:text-red-600 hover:underline"
                    @click="removeHistoryRecord(index)"
                  >
                    Eliminar registro
                  </button>
                </div>
              </div>
            </div>
          </section>

          <!-- Observaciones adicionales -->
          <section class="bg-white border border-gray-200 rounded-2xl shadow-sm">
            <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-teal-100 rounded-t-2xl flex items-center justify-between">
              <h4 class="text-lg font-semibold text-gray-900">Observaciones adicionales</h4>
              <button
                type="button"
                class="px-3 py-1.5 text-xs font-semibold border border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition"
                @click="addObservation"
              >
                Agregar observación
              </button>
            </div>
            <div class="px-6 py-6 space-y-6">
              <div
                v-for="(observation, index) in form.lifeSheet.observations"
                :key="`observation-${index}`"
                class="border border-gray-200 rounded-xl p-4 space-y-4"
              >
                <div class="grid gap-4 md:grid-cols-3">
                  <label class="form-label">
                    <span>Fecha</span>
                    <input v-model="observation.date" :class="fieldClass" placeholder="Fecha" />
                  </label>
                  <label class="form-label">
                    <span>Nombre</span>
                    <input v-model="observation.name" :class="fieldClass" placeholder="Nombre" />
                  </label>
                  <label class="form-label md:col-span-3">
                    <span>Observación</span>
                    <textarea v-model="observation.observation" :class="textareaClass" rows="2" placeholder="Detalle de la observación"></textarea>
                  </label>
                </div>

                <div class="flex justify-end">
                  <button
                    type="button"
                    class="text-xs text-red-500 hover:text-red-600 hover:underline"
                    @click="removeObservation(index)"
                  >
                    Eliminar observación
                  </button>
                </div>
              </div>
            </div>
          </section>
        </form>

        <footer class="flex-shrink-0 flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-white">
          <button
            type="button"
            class="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-300 text-gray-600 bg-white hover:bg-gray-50 transition"
            @click="$emit('close')"
          >
            Cancelar
          </button>
          <button
            type="button"
            class="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold border border-green-500 text-white bg-green-500 hover:bg-green-600 transition"
            @click="handleSave"
          >
            Guardar cambios
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import type {
  Equipment,
  EquipmentLifeSheet,
  ObservationRecord,
  MetrologicalActivityCode,
  MetrologicalHistoryRecord,
} from '../types/equipment.types'
import { DocumentIcon } from '@/assets/icons'
import { useSidebar } from '@/shared/composables/SidebarControl'

const fieldClass = 'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500'
const fieldMonoClass = `${fieldClass} font-mono`
const textareaClass = `${fieldClass} resize-none`

const props = defineProps<{
  equipment: Equipment | null
  lifeSheet: EquipmentLifeSheet | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (
    e: 'save',
    payload: {
      equipment: Partial<Equipment>
      lifeSheet: EquipmentLifeSheet
    }
  ): void
}>()

const { isExpanded, isMobileOpen, isHovered } = useSidebar()
const isOpen = computed(() => !!props.equipment)

const overlayLeftClass = computed(() => {
  const hasWideSidebar = (isExpanded.value && !isMobileOpen.value) || (!isExpanded.value && isHovered.value)
  return hasWideSidebar ? 'left-0 lg:left-72' : 'left-0 lg:left-20'
})

const invimaOptions: EquipmentLifeSheet['invimaType'][] = ['RS', 'PC', 'NR']
const riskClasses = ['I', 'IIA', 'IIB', 'III']
const acquisitionFormOptions: EquipmentLifeSheet['acquisitionForm'][] = [
  'Compra directa',
  'Donación',
  'Comodato',
  'Alquiler',
  'Otro',
]
const metrologicalFrequencyOptions = ['Anual', 'Semestral', 'Otro']
const activityCodes: MetrologicalActivityCode[] = ['MP', 'MC', 'C']

interface EditableHistoryRecord {
  date: string
  reportNumber: string
  activity: MetrologicalActivityCode[]
  supplier: string
  observations: string
}

interface EquipmentFormState {
  name: string
  internalCode: string
  ipsCode: string
  brand: string
  model: string
  serialNumber: string
  serialIdentification: string
  responsible: string
  location: string
  riskClass: string
}

interface LifeSheetFormState {
  inventoryCode: string
  manufactureDate: string
  usefulLife: string
  ecriCode: string
  area: string
  invimaType: EquipmentLifeSheet['invimaType'] | null
  invimaCode: string
  components: string
  acquisitionForm: EquipmentLifeSheet['acquisitionForm'] | ''
  documentType: string
  documentNumber: string
  acquisitionDate: string
  warrantyReplacementDate: string
  warrantyExpiration: string
  supplier: string
  supplierNIT: string
  supplierContact: string
  voltage: string
  current: string
  relativeHumidity: string
  temperature: string
  dimensions: string
  weight: string
  otherConditions: string
  measurementMagnitude: string
  equipmentRange: string
  serviceUsageRange: string
  resolution: string
  maxAllowedError: string
  metrologicalFrequencyOption: string
  metrologicalFrequencyOther: string
  requiresCalibration: boolean
  metrologicalHistory: EditableHistoryRecord[]
  observations: ObservationRecord[]
}

interface FormState {
  equipment: EquipmentFormState
  lifeSheet: LifeSheetFormState
}

const form = reactive<FormState>({
  equipment: {
    name: '',
    internalCode: '',
    ipsCode: '',
    brand: '',
    model: '',
    serialNumber: '',
    serialIdentification: '',
    responsible: '',
    location: '',
    riskClass: '',
  },
  lifeSheet: {
    inventoryCode: '',
    manufactureDate: '',
    usefulLife: '',
    ecriCode: '',
    area: '',
    invimaType: null,
    invimaCode: '',
    components: '',
    acquisitionForm: '',
    documentType: '',
    documentNumber: '',
    acquisitionDate: '',
    warrantyReplacementDate: '',
    warrantyExpiration: '',
    supplier: '',
    supplierNIT: '',
    supplierContact: '',
    voltage: '',
    current: '',
    relativeHumidity: '',
    temperature: '',
    dimensions: '',
    weight: '',
    otherConditions: '',
    measurementMagnitude: '',
    equipmentRange: '',
    serviceUsageRange: '',
    resolution: '',
    maxAllowedError: '',
    metrologicalFrequencyOption: '',
    metrologicalFrequencyOther: '',
    requiresCalibration: false,
    metrologicalHistory: [],
    observations: [],
  },
})

const normalizeActivityCodes = (activity: unknown): MetrologicalActivityCode[] => {
  const normalized = new Set<MetrologicalActivityCode>()
  if (!activity) return []

  const register = (value: unknown) => {
    const token = String(value ?? '').trim().toUpperCase()
    if (activityCodes.includes(token as MetrologicalActivityCode)) {
      normalized.add(token as MetrologicalActivityCode)
    }
  }

  if (Array.isArray(activity)) {
    activity.forEach(register)
    return Array.from(normalized)
  }

  if (typeof activity === 'string') {
    activity
      .split(/[^a-zA-Z0-9]+/)
      .filter(Boolean)
      .forEach(register)
    return Array.from(normalized)
  }

  register(activity)
  return Array.from(normalized)
}

const createEmptyHistoryRecord = (): EditableHistoryRecord => ({
  date: '',
  reportNumber: '',
  activity: [],
  supplier: '',
  observations: '',
})

const createEmptyObservation = (): ObservationRecord => ({
  date: '',
  observation: '',
  name: '',
})

const setInvimaType = (value: EquipmentLifeSheet['invimaType']) => {
  form.lifeSheet.invimaType = value
}

const setRiskClass = (value: string) => {
  form.equipment.riskClass = value
}

const setAcquisitionForm = (value: EquipmentLifeSheet['acquisitionForm']) => {
  form.lifeSheet.acquisitionForm = value
}

const setMetrologicalFrequency = (option: string) => {
  form.lifeSheet.metrologicalFrequencyOption = option
  if (option !== 'Otro') {
    form.lifeSheet.metrologicalFrequencyOther = ''
  }
}

const setRequiresCalibration = (value: boolean) => {
  form.lifeSheet.requiresCalibration = value
}

const toggleHistoryActivity = (index: number, activity: MetrologicalActivityCode) => {
  const activities = form.lifeSheet.metrologicalHistory[index]?.activity
  if (!activities) return

  const activityIndex = activities.indexOf(activity)
  if (activityIndex > -1) {
    activities.splice(activityIndex, 1)
  } else {
    activities.push(activity)
  }
}

const addHistoryRecord = () => {
  form.lifeSheet.metrologicalHistory.push(createEmptyHistoryRecord())
}

const removeHistoryRecord = (index: number) => {
  if (form.lifeSheet.metrologicalHistory.length === 1) {
    form.lifeSheet.metrologicalHistory[0] = createEmptyHistoryRecord()
    return
  }
  form.lifeSheet.metrologicalHistory.splice(index, 1)
}

const addObservation = () => {
  form.lifeSheet.observations.push(createEmptyObservation())
}

const removeObservation = (index: number) => {
  if (form.lifeSheet.observations.length === 1) {
    form.lifeSheet.observations[0] = createEmptyObservation()
    return
  }
  form.lifeSheet.observations.splice(index, 1)
}

const initializeForm = () => {
  const equipment = props.equipment
  const lifeSheet = props.lifeSheet

  form.equipment.name = equipment?.name ?? ''
  form.equipment.internalCode = equipment?.internalCode ?? ''
  form.equipment.ipsCode = equipment?.ipsCode ?? ''
  form.equipment.brand = equipment?.brand ?? ''
  form.equipment.model = equipment?.model ?? ''
  form.equipment.serialNumber = equipment?.serialNumber ?? ''
  form.equipment.serialIdentification = equipment?.serialNumber ?? ''
  form.equipment.responsible = equipment?.responsible ?? ''
  form.equipment.location = equipment?.location ?? ''
  form.equipment.riskClass = equipment?.riskClass ?? ''

  form.lifeSheet.inventoryCode = lifeSheet?.inventoryCode ?? equipment?.internalCode ?? ''
  form.lifeSheet.manufactureDate = lifeSheet?.manufactureDate ?? equipment?.manufactureDate ?? ''
  form.lifeSheet.usefulLife = lifeSheet?.usefulLife ?? equipment?.usefulLife ?? ''
  form.lifeSheet.ecriCode = lifeSheet?.ecriCode ?? equipment?.ecriCode ?? ''
  form.lifeSheet.area = lifeSheet?.area ?? equipment?.area ?? ''
  form.lifeSheet.invimaType = lifeSheet?.invimaType ?? null
  form.lifeSheet.invimaCode = lifeSheet?.invimaCode ?? equipment?.invimaRegistry ?? ''
  form.lifeSheet.components = lifeSheet?.components ?? equipment?.notes ?? ''
  form.lifeSheet.acquisitionForm = lifeSheet?.acquisitionForm ?? (equipment?.acquisitionForm as EquipmentLifeSheet['acquisitionForm']) ?? ''
  form.lifeSheet.documentType = lifeSheet?.documentType ?? equipment?.documentType ?? ''
  form.lifeSheet.documentNumber = lifeSheet?.documentNumber ?? equipment?.documentNumber ?? ''
  form.lifeSheet.acquisitionDate = lifeSheet?.acquisitionDate ?? equipment?.acquisitionDate ?? ''
  form.lifeSheet.warrantyReplacementDate = lifeSheet?.warrantyReplacementDate ?? ''
  form.lifeSheet.warrantyExpiration = lifeSheet?.warrantyExpiration ?? equipment?.warrantyExpiration ?? ''
  form.lifeSheet.supplier = lifeSheet?.supplier ?? equipment?.supplier ?? ''
  form.lifeSheet.supplierNIT = lifeSheet?.supplierNIT ?? equipment?.nit ?? ''
  form.lifeSheet.supplierContact = lifeSheet?.supplierContact ?? ''

  form.lifeSheet.voltage = lifeSheet?.voltage ?? equipment?.voltage ?? ''
  form.lifeSheet.current = lifeSheet?.current ?? equipment?.current ?? ''
  form.lifeSheet.relativeHumidity = lifeSheet?.relativeHumidity ?? equipment?.relativeHumidity ?? ''
  form.lifeSheet.temperature = lifeSheet?.temperature ?? equipment?.temperature ?? ''
  form.lifeSheet.dimensions = lifeSheet?.dimensions ?? equipment?.dimensions ?? ''
  form.lifeSheet.weight = lifeSheet?.weight ?? equipment?.weight ?? ''
  form.lifeSheet.otherConditions = lifeSheet?.otherConditions ?? equipment?.other ?? lifeSheet?.frequency ?? ''

  form.lifeSheet.measurementMagnitude = lifeSheet?.measurementMagnitude ?? equipment?.magnitude ?? ''
  form.lifeSheet.equipmentRange = lifeSheet?.equipmentRange ?? equipment?.equipmentRange ?? ''
  form.lifeSheet.serviceUsageRange = lifeSheet?.serviceUsageRange ?? equipment?.workingRange ?? ''
  form.lifeSheet.resolution = lifeSheet?.resolution ?? equipment?.resolution ?? ''
  form.lifeSheet.maxAllowedError = lifeSheet?.maxAllowedError ?? equipment?.maxAllowedError ?? ''

  const rawFrequency = lifeSheet?.metrologicalFrequency ?? equipment?.metrologicalFrequency ?? ''
  const normalized = rawFrequency.trim().toLowerCase()
  if (normalized.includes('anual')) {
    form.lifeSheet.metrologicalFrequencyOption = 'Anual'
    form.lifeSheet.metrologicalFrequencyOther = ''
  } else if (normalized.includes('semestral')) {
    form.lifeSheet.metrologicalFrequencyOption = 'Semestral'
    form.lifeSheet.metrologicalFrequencyOther = ''
  } else if (rawFrequency) {
    form.lifeSheet.metrologicalFrequencyOption = 'Otro'
    form.lifeSheet.metrologicalFrequencyOther = rawFrequency
  } else {
    form.lifeSheet.metrologicalFrequencyOption = ''
    form.lifeSheet.metrologicalFrequencyOther = ''
  }

  form.lifeSheet.requiresCalibration = lifeSheet?.requiresCalibration ?? equipment?.requiresCalibration ?? false

  const historySource = lifeSheet?.metrologicalHistory ?? []
  form.lifeSheet.metrologicalHistory =
    historySource.length > 0
      ? historySource.map(record => ({
          date: record.date ?? '',
          reportNumber: record.reportNumber ?? '',
          activity: normalizeActivityCodes(record.activity),
          supplier: record.supplier ?? '',
          observations: record.observations ?? '',
        }))
      : [createEmptyHistoryRecord()]

  const observationsSource = lifeSheet?.observations ?? []
  form.lifeSheet.observations =
    observationsSource.length > 0
      ? observationsSource.map(observation => ({
          date: observation.date ?? '',
          observation: observation.observation ?? '',
          name: observation.name ?? '',
        }))
      : [createEmptyObservation()]
}

watch(
  () => [props.equipment, props.lifeSheet],
  () => {
    if (props.equipment) {
      initializeForm()
    }
  },
  { immediate: true }
)

const sanitizeHistory = (records: EditableHistoryRecord[]): MetrologicalHistoryRecord[] =>
  records
    .map(record => {
      const activity =
        record.activity.length === 0
          ? ''
          : record.activity.length === 1
            ? record.activity[0]
            : record.activity

      return {
        date: record.date.trim(),
        reportNumber: record.reportNumber.trim() || undefined,
        activity,
        supplier: record.supplier.trim() || undefined,
        observations: record.observations.trim() || undefined,
      }
    })
    .filter(record => record.date || record.reportNumber || (Array.isArray(record.activity) ? record.activity.length : record.activity) || record.supplier || record.observations)

const sanitizeObservations = (records: ObservationRecord[]): ObservationRecord[] =>
  records
    .map(record => ({
      date: record.date.trim(),
      observation: record.observation.trim(),
      name: record.name?.trim() || undefined,
    }))
    .filter(record => record.date || record.observation || record.name)

const handleSave = () => {
  const metrologicalFrequency =
    form.lifeSheet.metrologicalFrequencyOption === 'Otro'
      ? form.lifeSheet.metrologicalFrequencyOther.trim()
      : form.lifeSheet.metrologicalFrequencyOption

  const payloadLifeSheet: EquipmentLifeSheet = {
    inventoryCode: form.lifeSheet.inventoryCode.trim() || undefined,
    manufactureDate: form.lifeSheet.manufactureDate.trim() || undefined,
    usefulLife: form.lifeSheet.usefulLife.trim() || undefined,
    invimaType: form.lifeSheet.invimaType ?? undefined,
    invimaCode: form.lifeSheet.invimaCode.trim() || undefined,
    components: form.lifeSheet.components.trim() || undefined,
    area: form.lifeSheet.area.trim() || undefined,
    ecriCode: form.lifeSheet.ecriCode.trim() || undefined,
    acquisitionForm: form.lifeSheet.acquisitionForm || undefined,
    documentType: form.lifeSheet.documentType.trim() || undefined,
    documentNumber: form.lifeSheet.documentNumber.trim() || undefined,
    acquisitionDate: form.lifeSheet.acquisitionDate.trim() || undefined,
    warrantyReplacementDate: form.lifeSheet.warrantyReplacementDate.trim() || undefined,
    warrantyExpiration: form.lifeSheet.warrantyExpiration.trim() || undefined,
    supplier: form.lifeSheet.supplier.trim() || undefined,
    supplierNIT: form.lifeSheet.supplierNIT.trim() || undefined,
    supplierContact: form.lifeSheet.supplierContact.trim() || undefined,
    voltage: form.lifeSheet.voltage.trim() || undefined,
    current: form.lifeSheet.current.trim() || undefined,
    frequency: metrologicalFrequency || undefined,
    relativeHumidity: form.lifeSheet.relativeHumidity.trim() || undefined,
    temperature: form.lifeSheet.temperature.trim() || undefined,
    dimensions: form.lifeSheet.dimensions.trim() || undefined,
    weight: form.lifeSheet.weight.trim() || undefined,
    otherConditions: form.lifeSheet.otherConditions.trim() || undefined,
    measurementMagnitude: form.lifeSheet.measurementMagnitude.trim() || undefined,
    equipmentRange: form.lifeSheet.equipmentRange.trim() || undefined,
    serviceUsageRange: form.lifeSheet.serviceUsageRange.trim() || undefined,
    resolution: form.lifeSheet.resolution.trim() || undefined,
    maxAllowedError: form.lifeSheet.maxAllowedError.trim() || undefined,
    metrologicalFrequency: metrologicalFrequency || undefined,
    requiresCalibration: form.lifeSheet.requiresCalibration,
    metrologicalHistory: sanitizeHistory(form.lifeSheet.metrologicalHistory),
    observations: sanitizeObservations(form.lifeSheet.observations),
  }

  const payloadEquipment: Partial<Equipment> = {
    name: form.equipment.name.trim() || undefined,
    internalCode: form.equipment.internalCode.trim() || undefined,
    ipsCode: form.equipment.ipsCode.trim() || undefined,
    brand: form.equipment.brand.trim() || undefined,
    model: form.equipment.model.trim() || undefined,
    serialNumber: form.equipment.serialNumber.trim() || undefined,
    responsible: form.equipment.responsible.trim() || undefined,
    location: form.equipment.location.trim() || undefined,
    riskClass: form.equipment.riskClass.trim() || undefined,
    area: form.lifeSheet.area.trim() || undefined,
    manufactureDate: form.lifeSheet.manufactureDate.trim() || undefined,
    usefulLife: form.lifeSheet.usefulLife.trim() || undefined,
    ecriCode: form.lifeSheet.ecriCode.trim() || undefined,
    acquisitionForm: form.lifeSheet.acquisitionForm || undefined,
    documentType: form.lifeSheet.documentType.trim() || undefined,
    documentNumber: form.lifeSheet.documentNumber.trim() || undefined,
    acquisitionDate: form.lifeSheet.acquisitionDate.trim() || undefined,
    warrantyExpiration: form.lifeSheet.warrantyExpiration.trim() || undefined,
    supplier: form.lifeSheet.supplier.trim() || undefined,
    nit: form.lifeSheet.supplierNIT.trim() || undefined,
    voltage: form.lifeSheet.voltage.trim() || undefined,
    current: form.lifeSheet.current.trim() || undefined,
    relativeHumidity: form.lifeSheet.relativeHumidity.trim() || undefined,
    temperature: form.lifeSheet.temperature.trim() || undefined,
    dimensions: form.lifeSheet.dimensions.trim() || undefined,
    weight: form.lifeSheet.weight.trim() || undefined,
    other: form.lifeSheet.otherConditions.trim() || undefined,
    magnitude: form.lifeSheet.measurementMagnitude.trim() || undefined,
    equipmentRange: form.lifeSheet.equipmentRange.trim() || undefined,
    workingRange: form.lifeSheet.serviceUsageRange.trim() || undefined,
    resolution: form.lifeSheet.resolution.trim() || undefined,
    maxAllowedError: form.lifeSheet.maxAllowedError.trim() || undefined,
    metrologicalFrequency: metrologicalFrequency || undefined,
    requiresCalibration: form.lifeSheet.requiresCalibration,
  }

  emit('save', { equipment: payloadEquipment, lifeSheet: payloadLifeSheet })
}
</script>

<style scoped>
.form-label {
  display: flex;
  flex-direction: column;
  font-size: 0.75rem;
  font-weight: 600;
  color: #4b5563;
}

.form-label > span {
  margin-bottom: 0.25rem;
}

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

