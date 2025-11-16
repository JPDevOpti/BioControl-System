<template>
  <AdminLayout>
    <div class="space-y-4">
      <FiltersBar
        v-model="filters"
        :totalFiltered="filteredEquipment.length"
        :totalAll="equipment.length"
        :isLoading="isLoading"
        :canExport="filteredEquipment.length > 0"
        @refresh="reload"
        @export="exportExcel"
        @search="() => loadEquipment()"
      />

      <div v-if="isLoading" class="bg-white rounded-xl border border-gray-200 p-8">
        <div class="flex items-center justify-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>

      <div v-else-if="error" class="bg-white rounded-xl border border-gray-200 p-8">
        <div class="text-center">
          <p class="text-red-600 mb-4">{{ error }}</p>
          <button
            @click="reload"
            class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>

      <template v-else>
        <div class="bg-white rounded-xl border border-gray-200">
          <EquipmentTable
            :equipment="paginatedEquipment"
            :selected-ids="selectedEquipmentIds"
            :is-all-selected="isAllSelected"
            :columns="columns"
            :sort-key="sortKey"
            :sort-order="sortOrder"
            :current-page="currentPage"
            :total-pages="totalPages"
            :items-per-page="itemsPerPage"
            :total-items="filteredEquipment.length"
            :no-results-message="
              hasActiveFilters
                ? 'No se encontraron equipos con los filtros aplicados'
                : 'No hay equipos disponibles'
            "
            @toggle-select="toggleSelect"
            @toggle-select-all="toggleSelectAll"
            @clear-selection="selectedEquipmentIds = []"
            @sort="handleSort"
            @manage-images="manageEquipmentImages"
            @edit-life-sheet="editLifeSheet"
            @show-life-sheet="showLifeSheet"
            @update-items-per-page="(v: number) => (itemsPerPage = v)"
            @prev-page="() => currentPage--"
            @next-page="() => currentPage++"
          />
        </div>
      </template>

      <!-- Modal de detalles del equipo -->
      <EquipmentDetailsModal
        :equipment="selectedEquipment"
        @close="closeDetails"
      />

      <!-- Modal de hoja de vida del equipo -->
      <EquipmentLifeSheetModal
        :equipment="lifeSheetEquipment"
        :life-sheet="equipmentLifeSheet"
        @close="closeLifeSheet"
      />

      <EquipmentLifeSheetEditModal
        :equipment="lifeSheetEditEquipment"
        :life-sheet="equipmentLifeSheetEdit"
        @close="closeLifeSheetEdit"
        @save="handleLifeSheetSave"
      />

      <EquipmentImageManagerModal
        :is-open="isImageManagerOpen"
        :equipment="imageManagerEquipment"
        :current-image-url="imagePreviewUrl"
        @close="closeImageManager"
        @save="handleEquipmentImageSave"
        @remove="handleEquipmentImageRemove"
      />

      <!-- Modal de edición del equipo -->
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { AdminLayout } from '@/shared/layouts'

import { FiltersBar, EquipmentTable, EquipmentDetailsModal, EquipmentLifeSheetModal, EquipmentLifeSheetEditModal, EquipmentImageManagerModal } from '../components'
import { useEquipmentList } from '../composables/useEquipmentList'
import type { Equipment, EquipmentLifeSheet, EquipmentSortKey } from '../types/equipment.types'

const {
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
  columns,
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
  showLifeSheet,
  closeLifeSheet,
  editLifeSheet,
  closeLifeSheetEdit,
  reload
} = useEquipmentList()

const imageManagerEquipment = ref<Equipment | null>(null)
const imagePreviewUrl = ref<string | null>(null)
const isImageManagerOpen = computed(() => imageManagerEquipment.value !== null)

function handleSort(key: EquipmentSortKey | 'actions') {
  if (key !== 'actions') {
    sortBy(key)
  }
}

function exportExcel() {
  console.log('Exportar a Excel')
  // Implementar exportación a Excel
}

function manageEquipmentImages(equipmentItem: Equipment) {
  imageManagerEquipment.value = equipmentItem
  imagePreviewUrl.value = equipmentItem.imageUrl ?? null
}

function closeImageManager() {
  imageManagerEquipment.value = null
  imagePreviewUrl.value = null
}

function handleEquipmentImageSave(payload: { equipmentId: string; file: File | null; previewUrl: string | null }) {
  const target = equipment.value.find(item => item.id === payload.equipmentId)
  if (target) {
    target.imageUrl = payload.previewUrl ?? undefined
  }
  closeImageManager()
}

function handleEquipmentImageRemove(equipmentId: string) {
  const target = equipment.value.find(item => item.id === equipmentId)
  if (target) {
    delete target.imageUrl
  }
  closeImageManager()
}

function handleLifeSheetSave(payload: { equipment: Partial<Equipment>; lifeSheet: EquipmentLifeSheet }) {
  console.log('Guardar hoja de vida (mock):', payload)
  closeLifeSheetEdit()
  // TODO: Integrar con API y refrescar listado
}

onMounted(() => {
  loadEquipment()
})
</script>
