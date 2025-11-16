<template>
  <transition name="fade-scale">
    <div
      v-if="visible"
      :class="['fixed right-0 bottom-0 z-[10000] flex items-center justify-center p-4 bg-black/40 top-16', overlayLeftClass]"
      @click.self="emit('close')"
    >
      <div class="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <button
          @click="emit('close')"
          class="absolute top-4 right-4 z-10 p-2 rounded-lg bg-white/90 hover:bg-white transition-all duration-200 text-gray-600 hover:text-gray-800 ring-1 ring-transparent hover:ring-gray-200 hover:scale-105"
          title="Cerrar"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="relative flex h-full flex-col overflow-y-auto">
          <div class="px-6 py-6 pr-16 border-b border-gray-200 shrink-0 sticky top-0 bg-white z-10">
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <div class="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center">
                  <EquipmentIcon class="w-7 h-7 text-green-600" />
                </div>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900">{{ successTitle }}</h3>
                <p class="text-gray-600 text-sm mt-1">{{ successMessage }}</p>
              </div>
            </div>
          </div>

          <div class="flex-1">
            <div class="p-6 space-y-6">
              <div class="bg-white rounded-lg p-5 border border-gray-200 space-y-4">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-4 border-b border-gray-200">
                  <div>
                    <p class="text-xs uppercase tracking-wide text-gray-500 font-medium mb-1">Código Interno</p>
                    <div class="flex items-center flex-wrap gap-2">
                      <h4 class="text-2xl font-semibold text-gray-900 font-mono break-all">{{ equipment?.internalCode || 'Sin código' }}</h4>
                      <button
                        v-if="equipment?.internalCode"
                        type="button"
                        @click="copyInternalCode"
                        class="inline-flex items-center px-3 py-1.5 rounded-md border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors duration-150"
                      >
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>{{ copied ? 'Copiado' : 'Copiar' }}</span>
                      </button>
                    </div>
                    <p class="text-sm text-gray-600 mt-2">
                      Equipo: <span class="font-semibold text-gray-900">{{ equipment?.name || '—' }}</span>
                    </p>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-if="equipment?.status"
                      class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100"
                    >
                      Estado: {{ equipment.status }}
                    </span>
                    <span
                      v-if="equipment?.classification"
                      class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-50 text-gray-700 border border-gray-200"
                    >
                      Clasificación: {{ equipment.classification }}
                    </span>
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div class="flex items-center space-x-3">
                      <div class="flex-shrink-0">
                        <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                          <SedeIcon class="w-5 h-5 text-gray-700" />
                        </div>
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-xs text-gray-500 font-medium uppercase tracking-wide">Sede</p>
                        <p class="text-lg font-bold text-gray-900">{{ equipment?.sede || '—' }}</p>
                      </div>
                    </div>
                  </div>

                  <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div class="flex items-center space-x-3">
                      <div class="flex-shrink-0">
                        <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                          <EquipmentIcon class="w-5 h-5 text-gray-700" />
                        </div>
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-xs text-gray-500 font-medium uppercase tracking-wide">Código IPS</p>
                        <p class="text-lg font-bold text-gray-900 font-mono">{{ equipment?.ipsCode || '—' }}</p>
                      </div>
                    </div>
                  </div>

                  <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div class="flex items-center space-x-3">
                      <div class="flex-shrink-0">
                        <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                          <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-xs text-gray-500 font-medium uppercase tracking-wide">Serie</p>
                        <p class="text-lg font-bold text-gray-900 font-mono">{{ equipment?.serialNumber || '—' }}</p>
                      </div>
                    </div>
                  </div>

                  <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div class="flex items-center space-x-3">
                      <div class="flex-shrink-0">
                        <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                          <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-xs text-gray-500 font-medium uppercase tracking-wide">Ubicación</p>
                        <p class="text-lg font-bold text-gray-900">{{ equipment?.location || '—' }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="equipment?.brand || equipment?.model" class="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0">
                      <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                        <EquipmentIcon class="w-6 h-6 text-gray-700" />
                      </div>
                    </div>
                    <div class="flex-1">
                      <p class="text-xs uppercase tracking-wide text-gray-500 font-medium mb-1">Información Técnica</p>
                      <p v-if="equipment?.brand" class="text-lg font-semibold text-gray-900">
                        Marca: {{ equipment.brand }}
                      </p>
                      <p v-if="equipment?.model" class="text-sm text-gray-600 mt-1">
                        Modelo: {{ equipment.model }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="px-6 py-4 border-t border-gray-200 bg-white shrink-0 sticky bottom-0 z-10">
            <div class="flex flex-col gap-3">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2">
                <button
                  class="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold border border-green-500 text-green-500 bg-white hover:bg-green-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  @click="handleGoToList"
                >
                  Listado de equipos
                </button>
                <button
                  class="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold border border-red-500 text-red-500 bg-white hover:bg-red-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  @click="emit('close')"
                >
                  Cerrar
                </button>
              </div>
              <div class="flex items-center space-x-2 text-sm text-gray-500">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{{ mode === 'created' ? 'Creado' : 'Actualizado' }} el {{ formattedUpdatedAt }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useSidebar } from '@/shared/composables/SidebarControl'
import EquipmentIcon from '@/assets/icons/EquipmentIcon.vue'
import SedeIcon from '@/assets/icons/SedeIcon.vue'
import type { Equipment } from '@/modules/equipment-list/types/equipment.types'

interface Props {
  visible: boolean
  equipment: Equipment | null
  closeOnEsc?: boolean
  mode?: 'created' | 'updated'
}

const props = withDefaults(defineProps<Props>(), {
  closeOnEsc: true,
  mode: 'created',
  equipment: null
})

const emit = defineEmits<{ (e: 'close'): void }>()

const router = useRouter()
const { isExpanded, isMobileOpen, isHovered } = useSidebar()

const overlayLeftClass = computed(() => {
  const hasWideSidebar = (isExpanded.value && !isMobileOpen.value) || (!isExpanded.value && isHovered.value)
  return hasWideSidebar ? 'left-0 lg:left-72' : 'left-0 lg:left-20'
})

const successTitle = computed(() => {
  return props.mode === 'created' ? 'Equipo creado exitosamente' : 'Equipo actualizado exitosamente'
})

const successMessage = computed(() => {
  return props.mode === 'created' 
    ? 'El equipo ha sido registrado en el sistema' 
    : 'Los cambios han sido guardados correctamente'
})

const copied = ref(false)
let copyResetTimeout: ReturnType<typeof setTimeout> | undefined

const copyInternalCode = async () => {
  const code = props.equipment?.internalCode
  if (!code || !props.equipment) return

  const fallbackCopy = () => {
    const textarea = document.createElement('textarea')
    textarea.value = code
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'absolute'
    textarea.style.left = '-9999px'
    document.body.appendChild(textarea)
    textarea.select()
    try { document.execCommand('copy') } catch {}
    document.body.removeChild(textarea)
  }

  try {
    await navigator.clipboard.writeText(code)
  } catch {
    fallbackCopy()
  }

  copied.value = true
  if (copyResetTimeout) clearTimeout(copyResetTimeout)
  copyResetTimeout = setTimeout(() => { copied.value = false }, 2000)
}

watch(() => props.equipment?.internalCode, () => {
  copied.value = false
  if (copyResetTimeout) {
    clearTimeout(copyResetTimeout)
    copyResetTimeout = undefined
  }
})

const updatedAt = computed(() => props.equipment?.updatedAt || props.equipment?.createdAt || new Date().toISOString())

const formattedUpdatedAt = computed(() => {
  if (!updatedAt.value) {
    return formatDateTime(new Date())
  }
  const parsed = new Date(updatedAt.value)
  if (Number.isNaN(parsed.getTime())) {
    return String(updatedAt.value)
  }
  return formatDateTime(parsed)
})

function formatDateTime(date: Date) {
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

const handleGoToList = () => {
  emit('close')
  router.push('/equipment/list')
}

function onKey(event: KeyboardEvent) {
  if (!props.visible) return
  if (event.key === 'Escape' && props.closeOnEsc) {
    emit('close')
  }
}

onMounted(() => {
  if (props.closeOnEsc) {
    window.addEventListener('keydown', onKey)
  }
})

onBeforeUnmount(() => {
  if (copyResetTimeout) {
    clearTimeout(copyResetTimeout)
  }
  if (props.closeOnEsc) {
    window.removeEventListener('keydown', onKey)
  }
})
</script>

<style scoped>
.fade-scale-enter-active { transition: all 0.18s ease-out; }
.fade-scale-leave-active { transition: all 0.12s ease-in; }
.fade-scale-enter-from, .fade-scale-leave-to { opacity: 0; transform: scale(.95); }
</style>

