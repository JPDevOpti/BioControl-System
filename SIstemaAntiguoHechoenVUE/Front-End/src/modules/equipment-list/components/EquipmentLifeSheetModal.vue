<template>
  <transition name="fade-scale">
    <div 
      v-if="isOpen" 
      :class="['fixed right-0 bottom-0 z-[10000] flex items-center justify-center p-4 bg-black/40 top-16', overlayLeftClass]"
      @click.self="$emit('close')"
    >
      <div class="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <!-- Header fijo -->
        <div class="flex-shrink-0 px-6 py-5 border-b border-gray-200 bg-white rounded-t-2xl">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                  <DocumentIcon class="w-5 h-5 text-green-600" />
                </div>
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-900">Hoja de Vida del Equipo</h3>
                <p class="text-gray-600 text-xs mt-1">Información completa de la hoja de vida</p>
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
          <!-- 1. IDENTIFICACIÓN DEL EQUIPO -->
          <div v-if="hasIdentificationInfo" class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-teal-100">
              <h4 class="text-lg font-semibold text-gray-900 text-center">IDENTIFICACIÓN DEL EQUIPO</h4>
            </div>
            <div class="p-6 overflow-x-auto">
              <div class="border border-gray-300 rounded-xl overflow-hidden">
                <!-- Fila 1: Nombre del equipo y Código Inventario -->
                <div class="grid grid-cols-12 border-b border-gray-300 divide-x divide-gray-300">
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 col-span-3">Nombre del equipo</div>
                  <div class="px-3 py-2 bg-white text-sm text-gray-900 col-span-3">{{ equipment?.name || '-' }}</div>
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 col-span-2">Código Inventario</div>
                  <div class="px-3 py-2 bg-white text-sm text-gray-900 font-mono col-span-2">{{ lifeSheet?.inventoryCode || equipment?.internalCode || '-' }}</div>
                </div>

                <!-- Fila 2: Encabezados Marca, Modelo, Serie -->
                <div class="grid grid-cols-12 border-b border-gray-300 divide-x divide-gray-300">
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 col-span-4">Marca</div>
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 col-span-4">Modelo</div>
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 col-span-4">Serie</div>
                </div>

                <!-- Fila 3: Valores Marca, Modelo, Serie -->
                <div class="grid grid-cols-12 border-b border-gray-300 divide-x divide-gray-300">
                  <div class="px-3 py-2 bg-white text-sm text-gray-900 col-span-4">{{ equipment?.brand || '-' }}</div>
                  <div class="px-3 py-2 bg-white text-sm text-gray-900 col-span-4">{{ equipment?.model || '-' }}</div>
                  <div class="px-3 py-2 bg-white text-sm text-gray-900 font-mono col-span-4">{{ equipment?.serialNumber || '-' }}</div>
                </div>

                <!-- Fila 4: Fecha de fabricación y Vida útil -->
                <div class="grid grid-cols-12 border-b border-gray-300 divide-x divide-gray-300">
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 col-span-3">Fecha de fabricación</div>
                  <div class="px-3 py-2 bg-white text-sm text-gray-900 col-span-3">{{ formatDate(lifeSheet?.manufactureDate || equipment?.manufactureDate) || 'NI' }}</div>
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 col-span-3">Vida útil</div>
                  <div class="px-3 py-2 bg-white text-sm text-gray-900 col-span-3">{{ lifeSheet?.usefulLife || equipment?.usefulLife || 'NI' }}</div>
                </div>

                <!-- Fila 5: Código ECRI -->
                <div class="grid grid-cols-12 border-b border-gray-300 divide-x divide-gray-300">
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 col-span-3">Código ECRI</div>
                  <div class="px-3 py-2 bg-white text-sm text-gray-900 col-span-9">{{ lifeSheet?.ecriCode || equipment?.ecriCode || 'No tiene' }}</div>
                </div>

                <!-- Fila 6: Responsable del equipo -->
                <div class="grid grid-cols-12 border-b border-gray-300 divide-x divide-gray-300">
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 col-span-3">Responsable del equipo</div>
                  <div class="px-3 py-2 bg-white text-sm text-gray-900 col-span-9">{{ equipment?.responsible || '-' }}</div>
                </div>

                <!-- Fila 7: Área y Ubicación física -->
                <div class="grid grid-cols-12 border-b border-gray-300 divide-x divide-gray-300">
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 col-span-3">Área</div>
                  <div class="px-3 py-2 bg-white text-sm text-gray-900 col-span-3">{{ lifeSheet?.area || equipment?.area || '-' }}</div>
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 col-span-3">Ubicación física</div>
                  <div class="px-3 py-2 bg-white text-sm text-gray-900 col-span-3">{{ equipment?.location || '-' }}</div>
                </div>

                <!-- Fila 8: Encabezados Invima -->
                <div class="grid grid-cols-12 border-b border-gray-300 divide-x divide-gray-300">
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 text-center col-span-6">Invima</div>
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 col-span-6">Código del registro o permiso</div>
                </div>

                <!-- Fila 9: Valores Invima -->
                <div class="grid grid-cols-12 border-b border-gray-300 divide-x divide-gray-300">
                  <div class="col-span-6">
                    <div class="grid grid-cols-6 divide-x divide-gray-300">
                      <div class="px-3 py-2 bg-white text-sm">
                        <span :class="invimaTypeIs('RS') ? 'font-semibold text-gray-900' : 'text-gray-400'">RS</span>
                      </div>
                      <div class="px-3 py-2 bg-white text-sm text-center">
                        <span v-if="invimaTypeIs('RS')" class="font-bold">X</span>
                      </div>
                      <div class="px-3 py-2 bg-white text-sm">
                        <span :class="invimaTypeIs('PC') ? 'font-semibold text-gray-900' : 'text-gray-400'">PC</span>
                      </div>
                      <div class="px-3 py-2 bg-white text-sm text-center">
                        <span v-if="invimaTypeIs('PC')" class="font-bold">X</span>
                      </div>
                      <div class="px-3 py-2 bg-white text-sm">
                        <span :class="invimaTypeIs('NR') ? 'font-semibold text-gray-900' : 'text-gray-400'">NR</span>
                      </div>
                      <div class="px-3 py-2 bg-white text-sm text-center">
                        <span v-if="invimaTypeIs('NR')" class="font-bold">X</span>
                      </div>
                    </div>
                  </div>
                  <div class="px-3 py-2 bg-white text-sm text-gray-900 font-mono col-span-6">{{ lifeSheet?.invimaCode || equipment?.invimaRegistry || '-' }}</div>
                </div>

                <!-- Fila 10: Clasificación por riesgo -->
                <div class="grid grid-cols-12 border-b border-gray-300 divide-x divide-gray-300">
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 col-span-4">Clasificación por riesgo</div>
                  <div class="px-3 py-2 bg-white text-sm text-center col-span-2">
                    <span :class="matchesRiskClass(['I', 'Clase I']) ? 'font-bold text-gray-900' : 'text-gray-400'">I</span>
                  </div>
                  <div class="px-3 py-2 bg-white text-sm text-center col-span-2">
                    <span :class="matchesRiskClass(['IIA', 'IIa', 'Clase IIA', 'Clase IIa']) ? 'font-bold text-gray-900' : 'text-gray-400'">IIA</span>
                  </div>
                  <div class="px-3 py-2 bg-white text-sm text-center col-span-2">
                    <span :class="matchesRiskClass(['IIB', 'IIb', 'Clase IIB', 'Clase IIb']) ? 'font-bold text-gray-900' : 'text-gray-400'">IIB</span>
                  </div>
                  <div class="px-3 py-2 bg-white text-sm text-center col-span-2">
                    <span :class="matchesRiskClass(['III', 'Clase III']) ? 'font-bold text-gray-900' : 'text-gray-400'">III</span>
                  </div>
                </div>

                <!-- Fila 11: Componentes/accesorios -->
                <div class="grid grid-cols-12 border-b border-gray-300 divide-x divide-gray-300">
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 col-span-9">Componentes/accesorios</div>
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 col-span-3">Serial identificación</div>
                </div>

                <!-- Fila 12: Valores Componentes/accesorios -->
                <div class="grid grid-cols-12">
                  <div class="px-3 py-2 bg-white text-sm text-gray-900 col-span-9">{{ lifeSheet?.components || '-' }}</div>
                  <div class="px-3 py-2 bg-white text-sm text-gray-900 font-mono col-span-3">{{ equipment?.serialNumber || '-' }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 2. REGISTRO HISTÓRICO DE ADQUISICIÓN -->
          <div v-if="hasHistoricalData" class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-teal-100">
              <h4 class="text-lg font-semibold text-gray-900 text-center">REGISTRO HISTÓRICO</h4>
            </div>
            <div class="p-6 overflow-x-auto">
              <div class="border border-gray-300 rounded-xl overflow-hidden">
                <!-- Fila 1: Header Forma de adquisición -->
                <div class="grid grid-cols-12 border-b border-gray-300">
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 text-center col-span-12">
                    Forma de adquisición
                  </div>
                </div>

                <!-- Fila 2: Opciones de forma de adquisición -->
                <div class="border-b border-gray-300">
                  <div class="grid grid-cols-5 divide-x divide-gray-300">
                    <div
                      v-for="option in acquisitionOptions"
                      :key="option.label"
                      class="flex"
                    >
                      <div class="flex-1 px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900">
                        {{ option.label }}
                      </div>
                      <div class="w-10 px-2 py-2 bg-white text-sm text-gray-900 text-center border-l border-gray-300 flex items-center justify-center">
                        <span v-if="option.isActive" class="font-bold">X</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Fila 3: Tipo de documento y Número de documento -->
                <div class="grid grid-cols-12 border-b border-gray-300 divide-x divide-gray-300">
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 col-span-3">
                    Tipo de documento
                  </div>
                  <div class="px-3 py-2 bg-white text-sm text-gray-900 whitespace-pre-line col-span-4">
                    {{ lifeSheet?.documentType || equipment?.documentType || '-' }}
                  </div>
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 col-span-3">
                    Número de documento
                  </div>
                  <div class="px-3 py-2 bg-white text-sm text-gray-900 font-mono col-span-2">
                    {{ lifeSheet?.documentNumber || equipment?.documentNumber || '-' }}
                  </div>
                </div>

                <!-- Fila 4: Fecha de adquisición y Vencimiento de la garantía -->
                <div class="grid grid-cols-12 border-b border-gray-300 divide-x divide-gray-300">
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 col-span-3">
                    Fecha de adquisición
                  </div>
                  <div class="px-3 py-2 bg-white text-sm text-gray-900 whitespace-pre-line col-span-3">
                    <span v-if="lifeSheet?.acquisitionDate || equipment?.acquisitionDate">
                     {{ formatDate(lifeSheet?.acquisitionDate || equipment?.acquisitionDate) }}
                    </span>
                    <span v-if="lifeSheet?.warrantyReplacementDate" class="block mt-1">
                      Fecha de cambio 2 por garantía: {{ formatDate(lifeSheet.warrantyReplacementDate) }} (equipo que se tiene actualmente).
                    </span>
                    <span v-if="!lifeSheet?.acquisitionDate && !equipment?.acquisitionDate && !lifeSheet?.warrantyReplacementDate">-</span>
                  </div>
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 col-span-3">
                    Vencimiento de la garantía
                  </div>
                  <div class="px-3 py-2 bg-white text-sm text-gray-900 col-span-3">
                    {{ formatDate(lifeSheet?.warrantyExpiration || equipment?.warrantyExpiration) || '-' }}
                  </div>
                </div>

                <!-- Fila 5: Proveedor y NIT -->
                <div class="grid grid-cols-12 border-b border-gray-300 divide-x divide-gray-300">
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 col-span-3">
                    Proveedor
                  </div>
                  <div class="px-3 py-2 bg-white text-sm text-gray-900 col-span-3">
                    {{ lifeSheet?.supplier || equipment?.supplier || '-' }}
                  </div>
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 col-span-3">
                    NIT
                  </div>
                  <div class="px-3 py-2 bg-white text-sm text-gray-900 font-mono col-span-3">
                    {{ lifeSheet?.supplierNIT || equipment?.nit || '-' }}
                  </div>
                </div>

                <!-- Fila 6: Contacto -->
                <div class="grid grid-cols-12  border-gray-300 divide-x divide-gray-300">
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 col-span-3">
                    Contacto
                  </div>
                  <div class="px-3 py-2 bg-white text-sm text-gray-900 whitespace-pre-line col-span-9">
                    {{ lifeSheet?.supplierContact || '-' }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 3. CONDICIONES PARA FUNCIONAMIENTO DEL EQUIPO -->
          <div v-if="hasOperatingConditions" class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-teal-100">
              <h4 class="text-lg font-semibold text-gray-900 text-center">CONDICIONES PARA FUNCIONAMIENTO DEL EQUIPO</h4>
            </div>
            <div class="p-6 overflow-x-auto">
              <div class="border border-gray-300 rounded-xl overflow-hidden">
                <!-- Fila 1: Encabezados principales -->
                <div class="grid grid-cols-12 border-b border-gray-300 divide-x divide-gray-300">
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 text-center col-span-3">Voltaje</div>
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 text-center col-span-3">Corriente</div>
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 text-center col-span-3">Humedad relativa</div>
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 text-center col-span-3">Temperatura</div>
                </div>
                <!-- Fila 2: Valores -->
                <div class="grid grid-cols-12 border-b border-gray-300 divide-x divide-gray-300">
                  <div class="px-3 py-3 bg-white text-sm text-gray-900 text-center col-span-3">
                    {{ lifeSheet?.voltage || equipment?.voltage || '-' }}
                  </div>
                  <div class="px-3 py-3 bg-white text-sm text-gray-900 text-center col-span-3">
                    {{ lifeSheet?.current || equipment?.current || '-' }}
                  </div>
                  <div class="px-3 py-3 bg-white text-sm text-gray-900 text-center col-span-3">
                    {{ lifeSheet?.relativeHumidity || equipment?.relativeHumidity || '-' }}
                  </div>
                  <div class="px-3 py-3 bg-white text-sm text-gray-900 text-center col-span-3">
                    {{ lifeSheet?.temperature || equipment?.temperature || '-' }}
                  </div>
                </div>
                <!-- Fila 3: Encabezados secundarios -->
                <div class="grid grid-cols-12 border-b border-gray-300 divide-x divide-gray-300">
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 text-center col-span-3">Dimensiones</div>
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 text-center col-span-3">Peso</div>
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 text-center col-span-6">Otros</div>
                </div>
                <!-- Fila 4: Valores secundarios -->
                <div class="grid grid-cols-12 divide-x divide-gray-300">
                  <div class="px-3 py-3 bg-white text-sm text-gray-900 text-center col-span-3">
                    {{ lifeSheet?.dimensions || equipment?.dimensions || '-' }}
                  </div>
                  <div class="px-3 py-3 bg-white text-sm text-gray-900 text-center col-span-3">
                    {{ lifeSheet?.weight || equipment?.weight || '-' }}
                  </div>
                  <div class="px-3 py-3 bg-white text-sm text-gray-900 text-center col-span-6">
                    {{ lifeSheet?.otherConditions || equipment?.other || lifeSheet?.frequency || '-' }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 4. DATOS METROLÓGICOS -->
          <div v-if="hasMetrologicalData" class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-teal-100">
              <h4 class="text-lg font-semibold text-gray-900 text-center">DATOS METROLÓGICOS</h4>
            </div>
            <div class="p-6 overflow-x-auto">
              <div class="border border-gray-300 rounded-xl overflow-hidden">
                <!-- Fila 1: Magnitud, Rango del equipo, Rango de uso -->
                <div class="grid grid-cols-12 border-b border-gray-300 divide-x divide-gray-300">
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 text-center col-span-4">Magnitud de medida</div>
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 text-center col-span-4">Rango del equipo</div>
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 text-center col-span-4">Rango de uso en el servicio</div>
                </div>
                <div class="grid grid-cols-12 border-b border-gray-300 divide-x divide-gray-300">
                  <div class="px-3 py-2 bg-white text-sm text-gray-900 text-center col-span-4">{{ lifeSheet?.measurementMagnitude || equipment?.magnitude || '-' }}</div>
                  <div class="px-3 py-2 bg-white text-sm text-gray-900 text-center col-span-4">{{ lifeSheet?.equipmentRange || equipment?.equipmentRange || '-' }}</div>
                  <div class="px-3 py-2 bg-white text-sm text-gray-900 text-center col-span-4">{{ lifeSheet?.serviceUsageRange || equipment?.workingRange || 'NI' }}</div>
                </div>

                <!-- Fila 2: Resolución y Error máximo permitido -->
                <div class="grid grid-cols-12 border-b border-gray-300 divide-x divide-gray-300">
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 text-center col-span-6">Resolución</div>
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 text-center col-span-6">Error máximo permitido</div>
                </div>
                <div class="grid grid-cols-12  border-gray-300 divide-x divide-gray-300">
                  <div class="px-3 py-2 bg-white text-sm text-gray-900 text-center col-span-6">{{ lifeSheet?.resolution || equipment?.resolution || 'NI' }}</div>
                  <div class="px-3 py-2 bg-white text-sm text-gray-900 text-center col-span-6">{{ lifeSheet?.maxAllowedError || equipment?.maxAllowedError || 'N/A' }}</div>
                </div>

                <!-- Fila 3: Frecuencia metrológica y Calibración -->
                <div class="grid grid-cols-12 border-t border-gray-300 divide-x divide-gray-300">
                  <div class="px-2 py-2 bg-teal-50 text-xs font-semibold text-gray-900 text-center col-span-3">
                    Frecuencia metrológica
                  </div>
                  <div class="col-span-4">
                    <div class="grid grid-cols-3 divide-x divide-gray-300">
                      <div class="grid grid-cols-[2fr_1fr] divide-x divide-gray-300">
                        <div class="px-2 py-2 bg-teal-50 text-xs font-semibold text-gray-900 text-center">Anual</div>
                        <div class="px-2 py-2 bg-white text-xs text-gray-900 text-center">
                          {{ isMetrologicalFrequencyAnual ? 'X' : '' }}
                        </div>
                      </div>
                      <div class="grid grid-cols-[2fr_1fr] divide-x divide-gray-300">
                        <div class="px-2 py-2 bg-teal-50 text-xs font-semibold text-gray-900 text-center">Semestral</div>
                        <div class="px-2 py-2 bg-white text-xs text-gray-900 text-center">
                          {{ isMetrologicalFrequencySemestral ? 'X' : '' }}
                        </div>
                      </div>
                      <div class="grid grid-cols-[2fr_1fr] divide-x divide-gray-300">
                        <div class="px-2 py-2 bg-teal-50 text-xs font-semibold text-gray-900 text-center">Otro</div>
                        <div class="px-2 py-2 bg-white text-xs text-gray-900 text-center">
                          {{ otherMetrologicalFrequency || '' }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="px-2 py-2 bg-teal-50 text-xs font-semibold text-gray-900 text-center col-span-3">
                    Requiere calibración o calificación
                  </div>
                  <div class="col-span-2">
                    <div class="grid grid-cols-2 divide-x divide-gray-300">
                      <div class="grid grid-cols-[2fr_1fr] divide-x divide-gray-300">
                        <div class="px-2 py-2 bg-teal-50 text-xs font-semibold text-gray-900 text-center">Sí</div>
                        <div class="px-2 py-2 bg-white text-xs text-gray-900 text-center">
                          {{ requiresCalibration ? 'X' : '' }}
                        </div>
                      </div>
                      <div class="grid grid-cols-[2fr_1fr] divide-x divide-gray-300">
                        <div class="px-2 py-2 bg-teal-50 text-xs font-semibold text-gray-900 text-center">No</div>
                        <div class="px-2 py-2 bg-white text-xs text-gray-900 text-center">
                          {{ requiresCalibration ? '' : 'X' }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 5. REGISTRO HISTÓRICO METROLÓGICO -->
          <div v-if="shouldShowMetrologicalHistory" class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-teal-100">
              <h4 class="text-lg font-semibold text-gray-900 text-center">REGISTRO HISTÓRICO METROLÓGICO</h4>
            </div>
            <div class="p-6 overflow-x-auto">
              <div class="border border-gray-300 rounded-xl overflow-hidden">
                <!-- Encabezado -->
                <div class="grid grid-cols-12 border-b border-gray-300 divide-x divide-gray-300">
                  <div class="flex items-center justify-center px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 text-center col-span-2">
                    Fecha
                  </div>
                  <div class="flex items-center justify-center px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 text-center col-span-2">
                    N° Informe
                  </div>
                  <div class="col-span-3 bg-teal-50 flex flex-col">
                    <div class="flex items-center justify-center px-3 py-2 text-sm font-semibold text-gray-900 text-center border-b border-gray-300">
                      Actividad
                    </div>
                    <div class="grid flex-1 grid-cols-3 divide-x divide-gray-300">
                      <div class="flex h-full items-center justify-center px-3 py-2 text-sm font-semibold text-gray-900 text-center">MP</div>
                      <div class="flex h-full items-center justify-center px-3 py-2 text-sm font-semibold text-gray-900 text-center">MC</div>
                      <div class="flex h-full items-center justify-center px-3 py-2 text-sm font-semibold text-gray-900 text-center">C</div>
                    </div>
                  </div>
                  <div class="flex items-center justify-center px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 text-center col-span-2">
                    Proveedor
                  </div>
                  <div class="flex items-center justify-center px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 text-center col-span-3">
                    Observaciones
                  </div>
                </div>
                  
                  <!-- Filas de datos -->
                <div v-if="!lifeSheet?.metrologicalHistory || lifeSheet.metrologicalHistory.length === 0" class="grid grid-cols-12 border-b border-gray-300">
                  <div class="px-3 py-4 bg-white text-sm text-gray-500 italic text-center col-span-12">
                      No hay registros de mantenimiento disponibles
                  </div>
                </div>
                  
                <div
                  v-for="(record, index) in sortedMetrologicalHistory"
                  :key="index"
                  class="grid grid-cols-12 border-b border-gray-300 divide-x divide-gray-300"
                >
                  <div class="px-3 py-2 bg-white text-sm text-gray-900 text-center col-span-2">
                    {{ formatDate(record.date) }}
                  </div>
                  <div class="px-3 py-2 bg-white text-sm text-gray-900 font-mono text-center col-span-2">
                    {{ record.reportNumber || '' }}
                  </div>
                  <div class="col-span-3 bg-white flex">
                    <div class="grid flex-1 grid-cols-3 divide-x divide-gray-300">
                      <div class="flex h-full items-center justify-center px-3 py-2 text-sm text-gray-900 text-center">
                        <span v-if="isActivitySelected(record.activity, 'MP')" class="font-bold">X</span>
                      </div>
                      <div class="flex h-full items-center justify-center px-3 py-2 text-sm text-gray-900 text-center">
                        <span v-if="isActivitySelected(record.activity, 'MC')" class="font-bold">X</span>
                      </div>
                      <div class="flex h-full items-center justify-center px-3 py-2 text-sm text-gray-900 text-center">
                        <span v-if="isActivitySelected(record.activity, 'C')" class="font-bold">X</span>
                      </div>
                    </div>
                  </div>
                  <div class="px-3 py-2 bg-white text-sm text-gray-900 text-center col-span-2">
                    {{ record.supplier || '' }}
                  </div>
                  <div class="px-3 py-2 bg-white text-sm text-gray-900 whitespace-pre-line col-span-3">
                    {{ record.observations || '' }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 6. OBSERVACIONES ADICIONALES -->
          <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-teal-100">
              <h4 class="text-lg font-semibold text-gray-900 text-center">OBSERVACIONES ADICIONALES</h4>
            </div>
            <div class="p-6 overflow-x-auto">
              <div class="border border-gray-300 rounded-xl overflow-hidden">
                <!-- Encabezado -->
                <div class="grid grid-cols-12 border-b border-gray-300 divide-x divide-gray-300">
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 text-center col-span-3">
                    Fecha
                  </div>
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 text-center col-span-6">
                    Observación
                  </div>
                  <div class="px-3 py-2 bg-teal-50 text-sm font-semibold text-gray-900 text-center col-span-3">
                    Nombre
                  </div>
                </div>
                  
                  <!-- Filas de datos -->
                  <template v-if="lifeSheet?.observations && lifeSheet.observations.length > 0">
                  <div
                    v-for="(obs, index) in sortedObservations"
                    :key="index"
                    class="grid grid-cols-12 border-b border-gray-300 divide-x divide-gray-300 last:border-b-0"
                  >
                    <div class="px-3 py-2 bg-white text-sm text-gray-900 text-center col-span-3">
                      {{ formatDate(obs.date) }}
                    </div>
                    <div class="px-3 py-2 bg-white text-sm text-gray-900 col-span-6">
                      {{ obs.observation }}
                    </div>
                    <div class="px-3 py-2 bg-white text-sm text-gray-900 text-center col-span-3">
                      {{ obs.name || '' }}
                    </div>
                  </div>
                  </template>
                  
                <!-- Filas vacías si no hay observaciones -->
                  <template v-else>
                  <div
                    v-for="i in 3"
                    :key="i"
                    class="grid grid-cols-12 border-b border-gray-300 divide-x divide-gray-300 last:border-b-0"
                  >
                    <div class="px-3 py-2 bg-white text-sm text-gray-900 col-span-3">&nbsp;</div>
                    <div class="px-3 py-2 bg-white text-sm text-gray-900 col-span-6">&nbsp;</div>
                    <div class="px-3 py-2 bg-white text-sm text-gray-900 col-span-3">&nbsp;</div>
                  </div>
                  </template>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer fijo -->
        <div class="flex-shrink-0 flex items-center justify-end pt-3 border-t border-gray-200 px-4 pb-4 bg-white rounded-b-2xl">
          <button
            @click="$emit('close')"
            class="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold border border-green-500 text-green-500 bg-white hover:bg-green-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Equipment, EquipmentLifeSheet, MetrologicalActivityCode } from '../types/equipment.types'
import { DocumentIcon } from '@/assets/icons'
import { useSidebar } from '@/shared/composables/SidebarControl'

const props = defineProps<{ 
  equipment: Equipment | null
  lifeSheet: EquipmentLifeSheet | null
}>()

const emit = defineEmits<{ (e: 'close'): void }>()

const isOpen = computed(() => !!props.equipment)
const { isExpanded, isMobileOpen, isHovered } = useSidebar()

const overlayLeftClass = computed(() => {
  const hasWideSidebar = (isExpanded.value && !isMobileOpen.value) || (!isExpanded.value && isHovered.value)
  return hasWideSidebar ? 'left-0 lg:left-72' : 'left-0 lg:left-20'
})

// Computed para verificar si hay datos en cada sección
const hasIdentificationInfo = computed(() => {
  const eq = props.equipment
  const ls = props.lifeSheet
  return !!(eq?.name || ls?.inventoryCode || eq?.internalCode || eq?.ipsCode || ls?.ecriCode || eq?.ecriCode ||
            eq?.brand || eq?.model || eq?.serialNumber || ls?.manufactureDate || eq?.manufactureDate ||
            ls?.usefulLife || eq?.usefulLife || ls?.area || eq?.area || eq?.responsible || eq?.location ||
            ls?.invimaCode || eq?.invimaRegistry || eq?.riskClass || ls?.components)
})

const hasHistoricalData = computed(() => {
  const eq = props.equipment
  const ls = props.lifeSheet
  return !!(ls?.acquisitionForm || eq?.acquisitionForm || ls?.documentType || eq?.documentType ||
            ls?.documentNumber || eq?.documentNumber || ls?.acquisitionDate || eq?.acquisitionDate ||
            ls?.warrantyReplacementDate || ls?.warrantyExpiration || eq?.warrantyExpiration ||
            ls?.supplier || eq?.supplier || ls?.supplierNIT || eq?.nit || ls?.supplierContact)
})

const hasOperatingConditions = computed(() => {
  const eq = props.equipment
  const ls = props.lifeSheet
  return !!(ls?.voltage || eq?.voltage || ls?.current || eq?.current || ls?.frequency ||
            ls?.relativeHumidity || eq?.relativeHumidity || ls?.temperature || eq?.temperature ||
            ls?.dimensions || eq?.dimensions || ls?.weight || eq?.weight || ls?.otherConditions || eq?.other)
})

const hasMetrologicalData = computed(() => {
  const eq = props.equipment
  const ls = props.lifeSheet
  return !!(ls?.measurementMagnitude || eq?.magnitude || ls?.equipmentRange || eq?.equipmentRange ||
            ls?.serviceUsageRange || eq?.workingRange || ls?.resolution || eq?.resolution ||
            ls?.maxAllowedError || eq?.maxAllowedError || ls?.metrologicalFrequency || eq?.metrologicalFrequency ||
            ls?.requiresCalibration !== undefined || eq?.requiresCalibration !== undefined)
})

const invimaType = computed(() => props.lifeSheet?.invimaType ?? null)
const invimaTypeIs = (value: string) => invimaType.value === value

const normalizedRiskClass = computed(() => {
  const riskClass = props.equipment?.riskClass
  if (!riskClass) return ''
  return String(riskClass).trim().toLowerCase()
})

const matchesRiskClass = (candidates: string[]) => {
  if (!normalizedRiskClass.value) return false
  return candidates.some(candidate => normalizedRiskClass.value === candidate.trim().toLowerCase())
}

const normalizeText = (value: string) => {
  if (!value) return ''
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
}

const acquisitionForm = computed(() => {
  const value = props.lifeSheet?.acquisitionForm ?? props.equipment?.acquisitionForm
  if (value === null || value === undefined) return ''
  return String(value).trim()
})

const normalizedAcquisitionForm = computed(() => normalizeText(acquisitionForm.value))

const acquisitionFormMatches = (...options: string[]) => {
  if (!normalizedAcquisitionForm.value) return false
  return options.some(option => normalizedAcquisitionForm.value === normalizeText(option))
}

const acquisitionOptions = computed(() => [
  {
    label: 'Compra directa',
    isActive: acquisitionFormMatches('Compra directa'),
  },
  {
    label: 'Donación',
    isActive: acquisitionFormMatches('Donación'),
  },
  {
    label: 'Comodato',
    isActive: acquisitionFormMatches('Comodato'),
  },
  {
    label: 'Alquiler',
    isActive: acquisitionFormMatches('Alquiler'),
  },
  {
    label: 'Otro',
    isActive: hasOtherAcquisitionForm.value,
  },
])

const hasOtherAcquisitionForm = computed(() => {
  if (!normalizedAcquisitionForm.value) return false
  return !acquisitionFormMatches('Compra directa', 'Donación', 'Comodato', 'Alquiler')
})

const metrologicalFrequency = computed(() => {
  const value = props.lifeSheet?.metrologicalFrequency ?? props.equipment?.metrologicalFrequency ?? ''
  if (value === null || value === undefined) return ''
  return String(value).trim()
})

const normalizedMetrologicalFrequency = computed(() => metrologicalFrequency.value.toLowerCase())

const isMetrologicalFrequencyAnual = computed(() => normalizedMetrologicalFrequency.value.includes('anual'))
const isMetrologicalFrequencySemestral = computed(() => normalizedMetrologicalFrequency.value.includes('semestral'))

const otherMetrologicalFrequency = computed(() => {
  if (!metrologicalFrequency.value) return ''
  if (isMetrologicalFrequencyAnual.value || isMetrologicalFrequencySemestral.value) return ''
  return metrologicalFrequency.value
})

const requiresCalibration = computed(() => {
  if (props.lifeSheet?.requiresCalibration !== undefined) return !!props.lifeSheet.requiresCalibration
  if (props.equipment?.requiresCalibration !== undefined) return !!props.equipment.requiresCalibration
  return false
})

const shouldShowMetrologicalHistory = computed(() => !!props.lifeSheet)

const activityCodes: MetrologicalActivityCode[] = ['MP', 'MC', 'C']

const normalizeActivityCodes = (activity: unknown): Set<MetrologicalActivityCode> => {
  const normalized = new Set<MetrologicalActivityCode>()
  if (!activity) return normalized

  const tryAdd = (value: unknown) => {
    const token = String(value ?? '').trim().toUpperCase()
    if (activityCodes.includes(token as MetrologicalActivityCode)) {
      normalized.add(token as MetrologicalActivityCode)
    }
  }

  if (Array.isArray(activity)) {
    activity.forEach(item => tryAdd(item))
    return normalized
  }

  if (typeof activity === 'string') {
    activity
      .split(/[^a-zA-Z0-9]+/)
      .filter(Boolean)
      .forEach(segment => tryAdd(segment))
    return normalized
  }

  tryAdd(activity)
  return normalized
}

const isActivitySelected = (activity: unknown, code: MetrologicalActivityCode) =>
  normalizeActivityCodes(activity).has(code)

const parseHistoryDateToTimestamp = (value: string | undefined) => {
  if (!value) return Number.NEGATIVE_INFINITY
  const trimmed = value.trim()
  if (!trimmed) return Number.NEGATIVE_INFINITY

  const rangeMatch = trimmed.match(/(\d{4})\s*-\s*(\d{4})/)
  if (rangeMatch) {
    const endYear = Number.parseInt(rangeMatch[2], 10)
    if (!Number.isNaN(endYear)) {
      return new Date(endYear, 11, 31).getTime()
    }
  }

  const ddMmYyyyMatch = trimmed.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{2,4})$/)
  if (ddMmYyyyMatch) {
    const day = Number.parseInt(ddMmYyyyMatch[1], 10)
    const month = Number.parseInt(ddMmYyyyMatch[2], 10) - 1
    let year = Number.parseInt(ddMmYyyyMatch[3], 10)
    if (year < 100) {
      year += year >= 70 ? 1900 : 2000
    }
    const constructed = new Date(year, month, day).getTime()
    if (!Number.isNaN(constructed)) return constructed
  }

  const parsedDate = Date.parse(trimmed)
  if (!Number.isNaN(parsedDate)) return parsedDate

  const yearMatch = trimmed.match(/(\d{4})/)
  if (yearMatch) {
    const year = Number.parseInt(yearMatch[1], 10)
    if (!Number.isNaN(year)) return new Date(year, 0, 1).getTime()
  }

  return Number.NEGATIVE_INFINITY
}

const sortedMetrologicalHistory = computed(() => {
  if (!props.lifeSheet?.metrologicalHistory) return []
  return [...props.lifeSheet.metrologicalHistory].sort((a, b) => {
    const timestampA = parseHistoryDateToTimestamp(a.date)
    const timestampB = parseHistoryDateToTimestamp(b.date)
    return timestampB - timestampA
  })
})

const sortedObservations = computed(() => {
  if (!props.lifeSheet?.observations) return []
  return [...props.lifeSheet.observations].sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateB - dateA // Más reciente primero
  })
})

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return 'N/A'
  try {
    if (typeof dateString === 'string' && dateString.includes('/') && !dateString.includes('T')) {
      return dateString
    }
    const d = new Date(dateString)
    if (isNaN(d.getTime())) return String(dateString)
    return d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
  } catch {
    return String(dateString)
  }
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

