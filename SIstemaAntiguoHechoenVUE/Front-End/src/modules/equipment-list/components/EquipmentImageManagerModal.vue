<template>
  <transition name="fade-scale">
    <div
      v-if="isOpen"
      class="fixed right-0 bottom-0 top-16 left-0 z-[10000] flex items-center justify-center bg-black/40 p-4"
      @click.self="handleClose"
    >
      <div class="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div class="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-5">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
              <CameraIcon class="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 class="text-lg font-bold text-gray-900">Gestión de imagen del equipo</h2>
              <p class="text-xs text-gray-600">
                Administre la fotografía del equipo seleccionado para usarla en reportes.
              </p>
            </div>
          </div>
          <button
            type="button"
            class="rounded-lg bg-gray-100 p-2 text-gray-600 transition-all duration-200 hover:bg-gray-200 hover:text-gray-800"
            title="Cerrar"
            @click="handleClose"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
            </svg>
          </button>
        </div>

        <div class="flex flex-1 flex-col gap-6 overflow-y-auto px-6 py-6">
          <div
            v-if="equipment"
            class="flex flex-col gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700"
          >
            <div class="flex flex-wrap items-center gap-2">
              <span class="rounded-lg bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">Equipo</span>
              <span class="font-semibold text-gray-900">{{ equipment.name }}</span>
            </div>
            <div class="flex flex-wrap items-center gap-3 text-xs text-gray-600">
              <div v-if="equipment.internalCode" class="flex items-center gap-1 rounded-md bg-white px-2 py-1">
                <span class="font-medium text-gray-500">Código interno:</span>
                <span class="font-mono text-gray-900">{{ equipment.internalCode }}</span>
              </div>
              <div v-if="equipment.ipsCode" class="flex items-center gap-1 rounded-md bg-white px-2 py-1">
                <span class="font-medium text-gray-500">Código IPS:</span>
                <span class="font-mono text-gray-900">{{ equipment.ipsCode }}</span>
              </div>
              <div v-if="equipment.sede" class="flex items-center gap-1 rounded-md bg-white px-2 py-1">
                <span class="font-medium text-gray-500">Sede:</span>
                <span class="text-gray-900">{{ equipment.sede }}</span>
              </div>
            </div>
          </div>

          <div
            class="relative flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-8 transition-colors"
            :class="[
              isDragOver ? 'border-blue-500 bg-blue-50/60' : 'border-gray-300 bg-gray-50',
              isUploading ? 'opacity-75' : 'opacity-100'
            ]"
            @dragover.prevent="onDragOver"
            @dragleave.prevent="onDragLeave"
            @drop.prevent="onDrop"
          >
            <input
              ref="fileInput"
              type="file"
              class="hidden"
              accept="image/png,image/jpeg,image/svg+xml"
              @change="onFileChange"
            />

            <div v-if="errorMessage" class="w-full rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
              {{ errorMessage }}
            </div>

            <div v-if="hasPreview" class="flex flex-col items-center gap-4">
              <div class="flex h-48 w-full max-w-xs items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <img
                  :src="previewUrl"
                  alt="Vista previa de la imagen del equipo"
                  class="max-h-full w-full object-contain"
                  @error="handleImageError"
                />
              </div>
              <div class="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                  @click="selectNewFile"
                  :disabled="isUploading"
                >
                  Cambiar imagen
                </button>
                <button
                  type="button"
                  class="rounded-lg border border-red-600 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60"
                  @click="handleRemove"
                  :disabled="isUploading || !equipment"
                >
                  Eliminar imagen
                </button>
              </div>
            </div>

            <div v-else class="flex w-full max-w-xl flex-col items-center gap-4 text-center">
              <div class="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <CameraIcon class="h-10 w-10" />
              </div>
              <div>
                <h3 class="text-base font-semibold text-gray-900">Subir imagen del equipo</h3>
                <p class="text-sm text-gray-600">
                  Arrastra y suelta una fotografía del equipo o haz clic en el botón para seleccionarla desde tu computador.
                </p>
              </div>
              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                @click="selectNewFile"
                :disabled="isUploading"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4v16m8-8H4" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                </svg>
                Seleccionar archivo
              </button>
              <p class="text-xs text-gray-500">Formatos permitidos: JPG, PNG, SVG. Tamaño máximo: 2 MB.</p>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
          <p class="text-xs text-gray-500">
            Los cambios se guardarán solo para esta sesión mientras no exista conexión con el backend.
          </p>
          <div class="flex items-center gap-3">
            <button
              type="button"
              class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-white"
              @click="handleClose"
              :disabled="isUploading"
            >
              Cancelar
            </button>
            <button
              type="button"
              class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
              @click="handleSave"
              :disabled="isUploading || !equipment || !hasPreview"
            >
              Guardar imagen
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Equipment } from '../types/equipment.types'
import { CameraIcon } from '@/assets/icons'

interface Props {
  isOpen: boolean
  equipment: Equipment | null
  currentImageUrl?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  equipment: null,
  currentImageUrl: null
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', payload: { equipmentId: string; file: File | null; previewUrl: string | null }): void
  (e: 'remove', equipmentId: string): void
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const isDragOver = ref(false)
const isUploading = ref(false)
const selectedFile = ref<File | null>(null)
const previewUrl = ref<string | null>(null)
const errorMessage = ref<string | null>(null)

const hasPreview = computed(() => !!previewUrl.value)

watch(
  () => props.isOpen,
  open => {
    if (open) {
      initializeState()
    } else {
      resetState()
    }
  },
  { immediate: true }
)

watch(
  () => props.currentImageUrl,
  url => {
    if (props.isOpen && !selectedFile.value) {
      previewUrl.value = url ?? null
    }
  }
)

function initializeState() {
  isDragOver.value = false
  isUploading.value = false
  selectedFile.value = null
  previewUrl.value = props.currentImageUrl ?? null
  errorMessage.value = null
}

function resetState() {
  isDragOver.value = false
  isUploading.value = false
  selectedFile.value = null
  previewUrl.value = null
  errorMessage.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

function onDragOver() {
  if (!isUploading.value) {
    isDragOver.value = true
  }
}

function onDragLeave() {
  isDragOver.value = false
}

async function onDrop(event: DragEvent) {
  if (isUploading.value) return
  const file = event.dataTransfer?.files?.[0]
  if (!file) return
  await handleFile(file)
}

async function onFileChange(event: Event) {
  if (isUploading.value) return
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (file) {
    await handleFile(file)
  }
  input.value = ''
}

function selectNewFile() {
  if (!isUploading.value) {
    fileInput.value?.click()
  }
}

async function handleFile(file: File) {
  errorMessage.value = null
  const validationError = validateFile(file)
  if (validationError) {
    errorMessage.value = validationError
    return
  }

  try {
    isUploading.value = true
    const dataUrl = await readFileAsDataUrl(file)
    selectedFile.value = file
    previewUrl.value = dataUrl
  } catch (error) {
    console.error('Error al leer la imagen:', error)
    errorMessage.value = 'No se pudo cargar la imagen. Inténtalo de nuevo.'
  } finally {
    isUploading.value = false
    isDragOver.value = false
  }
}

function validateFile(file: File): string | null {
  const allowedTypes = ['image/png', 'image/jpeg', 'image/svg+xml']
  const maxSize = 2 * 1024 * 1024

  if (!allowedTypes.includes(file.type)) {
    return 'Formato no soportado. Usa imágenes JPG, PNG o SVG.'
  }

  if (file.size > maxSize) {
    return 'La imagen supera el tamaño máximo permitido de 2 MB.'
  }

  return null
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(new Error('Resultado inválido'))
      }
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function handleImageError() {
  errorMessage.value = 'No fue posible mostrar la vista previa de la imagen.'
}

function handleSave() {
  if (!props.equipment) {
    errorMessage.value = 'Selecciona un equipo válido para continuar.'
    return
  }

  emit('save', {
    equipmentId: props.equipment.id,
    file: selectedFile.value,
    previewUrl: previewUrl.value
  })
}

function handleRemove() {
  if (!props.equipment) {
    errorMessage.value = 'No se encontró el equipo seleccionado.'
    return
  }
  emit('remove', props.equipment.id)
}

function handleClose() {
  emit('close')
}
</script>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.2s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
