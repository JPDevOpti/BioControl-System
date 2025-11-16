<template>
  <div class="overflow-hidden rounded-xl border border-gray-200 bg-white">
    <!-- Barra de selección -->
    <div v-if="selectedIds.length > 0" class="bg-blue-50 border-b border-blue-200 px-4 py-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span class="text-sm font-medium text-blue-800">
            {{ selectedIds.length }} equipo{{ selectedIds.length > 1 ? 's' : '' }} seleccionado{{ selectedIds.length > 1 ? 's' : '' }}
          </span>
          <button
            @click="$emit('clear-selection')"
            class="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Deseleccionar todo
          </button>
        </div>
        
        <div class="flex items-center gap-2">
          <button
            @click="handleBatchExport"
            class="inline-flex items-center gap-2 px-3 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <ExcelIcon :size="16" class="text-gray-700" />
            Exportar Seleccionados
          </button>
        </div>
      </div>
    </div>

    <!-- Tabla Desktop -->
    <div class="hidden lg:block max-w-full overflow-x-auto custom-scrollbar">
      <table class="min-w-full">
        <thead>
          <tr class="border-b-2 border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
            <!-- Checkbox -->
            <th class="px-3 py-4 text-center w-12 align-middle">
              <input
                type="checkbox"
                :checked="isAllSelected"
                @change="$emit('toggle-select-all')"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </th>
            <!-- Columna 1: Códigos -->
            <th class="px-3 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[180px] align-middle">
              <div class="flex items-center justify-center gap-1">
                <svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
                <span>Códigos</span>
              </div>
            </th>
            <!-- Columna 2: Equipo -->
            <th class="px-3 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[180px] align-middle">
              <div class="flex items-center justify-center gap-1">
                <EquipmentIcon :size="14" class="text-gray-500" />
                <span>Equipo</span>
              </div>
            </th>
            <!-- Columna 3: Sede y Servicio -->
            <th class="px-3 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[160px] align-middle">
              <div class="flex items-center justify-center gap-1">
                <SedeIcon :size="14" class="text-gray-500" />
                <span>Sede / Servicio</span>
              </div>
            </th>
            <!-- Columna 4: Responsable / Ubicación -->
            <th class="px-3 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[160px] align-middle">
              <div class="flex items-center justify-center gap-1">
                <svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span>Resp. / Ubicación</span>
              </div>
            </th>
            <!-- Columna 5: Especificaciones -->
            <th class="px-3 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[160px] align-middle">
              <div class="flex items-center justify-center gap-1">
                <svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                <span>Especificaciones</span>
              </div>
            </th>
            <!-- Columna 6: Clasificación -->
            <th class="px-3 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-40 align-middle">
              <div class="flex items-center justify-center gap-1">
                <svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span>Clasificación</span>
              </div>
            </th>
            <!-- Columna 7: Invima -->
            <th class="px-3 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-36 align-middle">
              <div class="flex items-center justify-center gap-1">
                <svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Invima</span>
              </div>
            </th>
            <!-- Columna 8: Estado -->
            <th class="px-3 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-32 align-middle">
              <div class="flex items-center justify-center gap-1">
                <svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Estado</span>
              </div>
            </th>
            <!-- Columna 9: Acciones -->
            <th class="px-3 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-24 align-middle">
              <span>Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 bg-white">
          <tr
            v-for="eq in equipment"
            :key="eq.id"
            class="hover:bg-blue-50/30 transition-all duration-150"
          >
            <td class="px-4 py-5 text-center align-middle">
              <input
                type="checkbox"
                :checked="selectedIds.includes(eq.id)"
                @change="$emit('toggle-select', eq.id)"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </td>
            
            <!-- Columna 1: Códigos -->
            <td class="px-3 py-4 align-middle">
              <div class="flex flex-col gap-1.5 items-center">
                <span class="inline-flex items-center px-2 py-1 rounded-md bg-green-50 text-xs font-mono font-semibold text-green-700">
                  {{ eq.internalCode }}
                </span>
                <span class="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-xs font-mono font-medium text-blue-700">
                  {{ eq.ipsCode }}
                </span>
              </div>
            </td>
            
            <!-- Columna 2: Equipo -->
            <td class="px-3 py-4 align-middle">
              <div class="flex flex-col gap-1.5 items-center">
                <span class="text-sm font-semibold text-gray-900 leading-tight text-center">{{ eq.name }}</span>
              </div>
            </td>
            
            <!-- Columna 3: Sede y Servicio -->
            <td class="px-3 py-4 align-middle">
              <div class="flex flex-col gap-1.5 items-center">
                <div class="flex items-center justify-center gap-1.5">
                  <SedeIcon :size="14" class="text-gray-400 flex-shrink-0" />
                  <span class="text-sm text-gray-800 font-medium">{{ eq.sede }}</span>
                </div>
                <div v-if="eq.process" class="flex items-center justify-center gap-1.5">
                  <svg class="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span class="text-sm text-gray-700">{{ eq.process }}</span>
                </div>
              </div>
            </td>
            
            <!-- Columna 4: Responsable / Ubicación -->
            <td class="px-3 py-4 align-middle">
              <div class="flex flex-col gap-1.5 items-center">
                <div class="flex items-center justify-center gap-1.5">
                  <svg class="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span class="text-sm text-gray-800 font-medium">{{ eq.responsible }}</span>
                </div>
                <div class="flex items-center justify-center gap-1.5">
                  <svg class="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span class="text-sm text-gray-700">{{ eq.location }}</span>
                </div>
              </div>
            </td>
            
            <!-- Columna 5: Especificaciones -->
            <td class="px-3 py-4 align-middle">
              <div class="flex flex-col gap-1.5 items-center">
                <span class="text-sm font-semibold text-gray-900">{{ eq.brand }}</span>
                <div class="flex items-center justify-center gap-1.5 text-xs text-gray-600">
                  <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <span>{{ eq.model }}</span>
                </div>
                <div class="flex items-center justify-center gap-1.5 text-xs text-gray-500">
                  <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                  <span>{{ eq.serialNumber }}</span>
                </div>
              </div>
            </td>
            
            <!-- Columna 6: Clasificación -->
            <td class="px-3 py-4 align-middle">
              <div class="flex flex-col gap-1.5 items-center">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg text-xs font-medium">
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                  {{ eq.missionAxis }}
                </span>
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 border border-green-200 text-green-700 rounded-lg text-xs font-medium">
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clip-rule="evenodd" />
                  </svg>
                  {{ eq.classification }}
                </span>
              </div>
            </td>
            
            <!-- Columna 7: Invima -->
            <td class="px-3 py-4 align-middle">
              <div class="flex flex-col gap-1.5 items-center">
                <!-- Registro Invima -->
                <div v-if="eq.invimaRegistry" class="flex items-center justify-center gap-1.5">
                  <svg class="w-3.5 h-3.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-xs text-gray-700">{{ eq.invimaRegistry }}</span>
                </div>
                <div v-else class="flex items-center justify-center gap-1.5">
                  <svg class="w-3.5 h-3.5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-xs text-gray-400 italic">No registrado</span>
                </div>
                <!-- Clasificación por riesgo -->
                <span v-if="eq.riskClass" class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 border border-orange-200 text-orange-700 rounded-lg text-xs font-medium">
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  {{ eq.riskClass }}
                </span>
              </div>
            </td>
            
            <!-- Columna 8: Estado -->
            <td class="px-3 py-4 align-middle">
              <div class="flex justify-center">
                <span 
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                  :class="getStatusClass(eq.status)"
                >
                  <span class="w-2 h-2 rounded-full" :class="getStatusDotClass(eq.status)"></span>
                  {{ eq.status }}
                </span>
              </div>
            </td>
            
            <!-- Columna 9: Acciones -->
            <td class="px-2 py-4 align-middle">
              <div class="flex items-center justify-center gap-0">
                <button
                  @click="$emit('manage-images', eq)"
                  class="group relative p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-150"
                  title="Gestionar imagen"
                >
                  <CameraIcon class="w-4 h-4" />
                </button>
                <button
                  @click="$emit('edit-life-sheet', eq)"
                  class="group relative p-1.5 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all duration-150"
                  title="Editar hoja de vida"
                >
                  <EditIcon class="w-4 h-4" />
                </button>
                <button
                  @click="$emit('show-life-sheet', eq)"
                  class="group relative p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-150"
                  title="Hoja de vida"
                >
                  <DocumentIcon class="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Vista Mobile (Cards) -->
    <div class="lg:hidden divide-y divide-gray-200">
      <div v-for="eq in equipment" :key="eq.id" class="p-4 hover:bg-gray-50">
        <div class="flex items-start gap-3">
          <input
            type="checkbox"
            :checked="selectedIds.includes(eq.id)"
            @change="$emit('toggle-select', eq.id)"
            class="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <div class="flex-1 min-w-0">
            <!-- Encabezado -->
            <div class="mb-3">
              <p class="font-semibold text-gray-900 text-base">{{ eq.name }}</p>
              <p class="text-xs text-gray-500 font-mono mt-1">{{ eq.internalCode }}</p>
              <p class="text-xs text-blue-600 font-mono">{{ eq.ipsCode }}</p>
            </div>
            
            <!-- Grid de información -->
            <div class="space-y-2 text-sm mb-3">
              <div class="flex justify-between">
                <span class="text-gray-500">Sede:</span>
                <span class="text-gray-900 font-medium">{{ eq.sede }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Responsable:</span>
                <span class="text-gray-900">{{ eq.responsible }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Ubicación:</span>
                <span class="text-gray-900">{{ eq.location }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Marca:</span>
                <span class="text-gray-900">{{ eq.brand }} {{ eq.model }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-500">Clasificación:</span>
                <span class="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">{{ eq.classification }}</span>
              </div>
            </div>

            <!-- Botones de acción -->
            <div class="flex items-center gap-0 mt-2">
              <button
                @click="$emit('manage-images', eq)"
                class="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg border border-gray-300"
                title="Gestionar imagen"
              >
                <CameraIcon class="w-4 h-4" />
              </button>
              <button
                @click="$emit('edit-life-sheet', eq)"
                class="p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg border border-gray-300"
                title="Editar hoja de vida"
              >
                <EditIcon class="w-4 h-4" />
              </button>
              <button
                @click="$emit('show-life-sheet', eq)"
                class="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg border border-gray-300"
                title="Hoja de vida"
              >
                <DocumentIcon class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Paginación -->
    <div class="border-t border-gray-200 px-4 py-3 bg-gray-50">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div class="flex items-center gap-2 text-sm text-gray-700">
          <span>Mostrar:</span>
          <select
            :value="itemsPerPage"
            @change="$emit('update-items-per-page', Number(($event.target as HTMLSelectElement).value))"
            class="px-2 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option :value="10">10</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
          </select>
          <span class="text-gray-500">
            {{ (currentPage - 1) * itemsPerPage + 1 }}-{{ Math.min(currentPage * itemsPerPage, totalItems) }} de {{ totalItems }}
          </span>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="$emit('prev-page')"
            :disabled="currentPage === 1"
            class="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          <span class="text-sm text-gray-700">
            Página {{ currentPage }} de {{ totalPages }}
          </span>
          <button
            @click="$emit('next-page')"
            :disabled="currentPage >= totalPages"
            class="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>

    <!-- Sin resultados -->
    <div v-if="equipment.length === 0" class="p-8 text-center text-gray-500">
      <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
      <p class="text-lg font-medium">{{ noResultsMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Equipment } from '../types/equipment.types'
import { CameraIcon, ExcelIcon, EquipmentIcon, SedeIcon, DocumentIcon, EditIcon } from '@/assets/icons'

interface Props {
  equipment: Equipment[]
  selectedIds: string[]
  isAllSelected: boolean
  currentPage: number
  totalPages: number
  itemsPerPage: number
  totalItems: number
  noResultsMessage?: string
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'toggle-select', id: string): void
  (e: 'toggle-select-all'): void
  (e: 'clear-selection'): void
  (e: 'manage-images', equipment: Equipment): void
  (e: 'edit-life-sheet', equipment: Equipment): void
  (e: 'show-life-sheet', equipment: Equipment): void
  (e: 'update-items-per-page', value: number): void
  (e: 'prev-page'): void
  (e: 'next-page'): void
}>()

function handleBatchExport() {
  console.log('Exportar seleccionados')
  // Implementar exportación
}

// Función para obtener las clases CSS del estado
function getStatusClass(status: string): string {
  const statusClasses: Record<string, string> = {
    'Operativo': 'bg-green-100 text-green-800 border border-green-200',
    'En mantenimiento': 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    'Fuera de servicio': 'bg-red-100 text-red-800 border border-red-200',
    'En reparación': 'bg-orange-100 text-orange-800 border border-orange-200',
    'Dado de baja': 'bg-gray-100 text-gray-800 border border-gray-200'
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800 border border-gray-200'
}

// Función para obtener la clase del punto indicador de estado
function getStatusDotClass(status: string): string {
  const statusDotClasses: Record<string, string> = {
    'Operativo': 'bg-green-500',
    'En mantenimiento': 'bg-yellow-500',
    'Fuera de servicio': 'bg-red-500',
    'En reparación': 'bg-orange-500',
    'Dado de baja': 'bg-gray-500'
  }
  return statusDotClasses[status] || 'bg-gray-500'
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  height: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
