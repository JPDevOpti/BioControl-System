<template>
  <transition name="fade-scale">
    <div 
      v-if="isOpen" 
      :class="['fixed right-0 bottom-0 z-[10002] flex items-center justify-center p-4 bg-black/40 top-16', overlayLeftClass]"
      @click.self="$emit('close')"
    >
      <div class="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <!-- Header fijo -->
        <div class="flex-shrink-0 px-6 py-5 border-b border-gray-200 bg-white rounded-t-2xl">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-900">Completar Mantenimiento</h3>
                <p class="text-gray-600 text-xs mt-1">Complete la información del mantenimiento realizado</p>
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
        <div class="flex-1 overflow-y-auto p-6 space-y-6">
          <!-- Información del equipo -->
          <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 class="text-sm font-semibold text-gray-900 mb-2">Equipo</h4>
            <p class="text-base font-medium text-gray-900">{{ event?.equipmentName }}</p>
            <p class="text-sm text-gray-600 font-mono">{{ event?.equipmentCode }}</p>
          </div>

          <!-- Fecha exacta -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Fecha Exacta de Completado
            </label>
            <input
              v-model="localData.exactCompletionDate"
              type="datetime-local"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <!-- Número de informe -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Número de Informe
            </label>
            <input
              v-model="localData.reportNumber"
              type="text"
              placeholder="Ej: INF-2025-001"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <!-- Subir informe -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Subir Informe
            </label>
            <div
              class="border border-dashed border-gray-300 rounded-lg bg-gray-50 p-6 hover:border-green-500 transition-colors cursor-pointer"
              :class="{ 'border-green-500 bg-green-50/50': isDragOver }"
              @dragover.prevent="handleDragOver"
              @dragleave.prevent="handleDragLeave"
              @drop.prevent="handleDrop"
              @click="triggerFileInput"
            >
              <div v-if="selectedFile" class="text-center">
                <div class="flex items-center justify-center gap-3 mb-2">
                  <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div class="text-left">
                    <p class="text-sm font-medium text-gray-900">{{ selectedFile.name }}</p>
                    <p class="text-xs text-gray-500">{{ formatFileSize(selectedFile.size) }}</p>
                  </div>
                  <button
                    @click.stop="removeFile"
                    class="ml-2 p-1 rounded-full hover:bg-red-100 text-red-600 transition-colors"
                    title="Eliminar archivo"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div v-else class="text-center">
                <div class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p class="text-sm font-medium text-gray-700 mb-1">Haz clic para seleccionar o arrastra el archivo aquí</p>
                <p class="text-xs text-gray-500">Formatos aceptados: PDF, DOC, DOCX. Tamaño máximo: 10MB</p>
              </div>
              <input
                ref="fileInput"
                type="file"
                class="hidden"
                accept=".pdf,.doc,.docx"
                @change="handleFileSelect"
              />
            </div>
          </div>

          <!-- Observaciones -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Observaciones
            </label>
            <textarea
              v-model="localData.completionNotes"
              rows="4"
              placeholder="Ingrese las observaciones del mantenimiento realizado..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            ></textarea>
          </div>
        </div>

        <!-- Footer fijo -->
        <div class="flex-shrink-0 flex items-center justify-end gap-3 pt-3 border-t border-gray-200 px-6 pb-4 bg-white rounded-b-2xl">
          <button
            @click="$emit('close')"
            class="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancelar
          </button>
          <button
            @click="handleComplete"
            :disabled="!isFormValid"
            class="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Completar Mantenimiento
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { MaintenanceEvent } from '../types/maintenance.types'
import { useSidebar } from '@/shared/composables/SidebarControl'

interface Props {
  isOpen: boolean
  event: MaintenanceEvent | null
}

const props = defineProps<Props>()
const emit = defineEmits<{ 
  (e: 'close'): void
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

const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const isDragOver = ref(false)

const localData = ref({
  exactCompletionDate: '',
  reportNumber: '',
  completionNotes: ''
})

// Inicializar fecha actual cuando se abre el modal
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    const now = new Date()
    // Formato: YYYY-MM-DDTHH:mm para datetime-local
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    localData.value.exactCompletionDate = `${year}-${month}-${day}T${hours}:${minutes}`
    
    // Limpiar otros campos
    localData.value.reportNumber = ''
    localData.value.completionNotes = ''
    selectedFile.value = null
  }
})

const isFormValid = computed(() => {
  return !!localData.value.exactCompletionDate
})

const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
  isDragOver.value = true
}

const handleDragLeave = () => {
  isDragOver.value = false
}

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  isDragOver.value = false
  const files = e.dataTransfer?.files
  if (files && files.length > 0) {
    handleFile(files[0])
  }
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = (e: Event) => {
  const input = e.target as HTMLInputElement
  const files = input.files
  if (files && files.length > 0) {
    handleFile(files[0])
  }
}

const handleFile = (file: File) => {
  // Validar tipo de archivo
  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  if (!allowedTypes.includes(file.type)) {
    alert('Formato de archivo no válido. Solo se permiten PDF, DOC y DOCX.')
    return
  }
  
  // Validar tamaño (10MB)
  const maxSize = 10 * 1024 * 1024
  if (file.size > maxSize) {
    alert('El archivo es demasiado grande. El tamaño máximo es 10MB.')
    return
  }
  
  selectedFile.value = file
}

const removeFile = () => {
  selectedFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

const handleComplete = () => {
  if (!props.event || !isFormValid.value) return
  
  emit('complete', {
    eventId: props.event.id,
    exactCompletionDate: localData.value.exactCompletionDate,
    reportNumber: localData.value.reportNumber || undefined,
    reportFile: selectedFile.value || undefined,
    completionNotes: localData.value.completionNotes || undefined
  })
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

