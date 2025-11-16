<template>
  <transition name="fade-scale">
    <div 
      v-if="isOpen" 
      :class="['fixed right-0 bottom-0 z-[10000] flex items-center justify-center p-4 bg-black/40 top-16', overlayLeftClass]"
      @click.self="$emit('close')"
    >
      <div class="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <!-- Header fijo -->
        <div class="flex-shrink-0 px-6 py-5 border-b border-gray-200 bg-white rounded-t-2xl">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <ListIcon class="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-900">Detalles del Equipo</h3>
                <p class="text-gray-600 text-xs mt-1">Información completa del equipo médico</p>
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
          <!-- Información General -->
          <div v-if="hasGeneralInfo" class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div class="px-6 py-4 border-b border-gray-200">
              <h4 class="text-lg font-semibold text-gray-900">Información General</h4>
            </div>
            <div class="p-6">
              <!-- Nombre y estado -->
              <div class="mb-6">
                <div class="flex items-center justify-between gap-4 mb-4">
                  <h3 v-if="equipment?.name" class="text-xl font-bold text-gray-900 flex-1">{{ equipment.name }}</h3>
                  <div v-if="equipment?.status" class="flex-shrink-0">
                    <span :class="getStatusBadgeClass(equipment.status)" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold">
                      <span class="w-2 h-2 rounded-full" :class="getStatusDotClass(equipment.status)"></span>
                      {{ equipment.status }}
                    </span>
                  </div>
                </div>
                <!-- Códigos -->
                <div class="flex items-center flex-wrap gap-3">
                  <div v-if="equipment?.internalCode" class="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
                    <span class="text-xs text-gray-600 font-medium">Código Interno</span>
                    <span class="text-sm font-bold text-gray-900 font-mono">{{ equipment.internalCode }}</span>
                  </div>
                  <div v-if="equipment?.ipsCode" class="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg border border-blue-200">
                    <span class="text-xs text-gray-600 font-medium">Código IPS</span>
                    <span class="text-sm font-bold text-gray-900 font-mono">{{ equipment.ipsCode }}</span>
                  </div>
                  <div v-if="equipment?.ecriCode" class="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                    <span class="text-xs text-gray-600 font-medium">Código ECRI</span>
                    <span class="text-sm font-bold text-gray-900 font-mono">{{ equipment.ecriCode }}</span>
                  </div>
                </div>
              </div>

              <!-- Grid de información básica -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div v-if="equipment?.process" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Proceso</p>
                  <p class="text-sm font-bold text-gray-900">{{ equipment.process }}</p>
                </div>
                <div v-if="equipment?.internalCode" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Código de Inventario Interno</p>
                  <p class="text-sm font-bold text-gray-900 font-mono">{{ equipment.internalCode }}</p>
                </div>
                <div v-if="equipment?.ipsCode" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Código IPS</p>
                  <p class="text-sm font-bold text-gray-900 font-mono">{{ equipment.ipsCode }}</p>
                </div>
                <div v-if="equipment?.ecriCode" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Código ECRI</p>
                  <p class="text-sm font-bold text-gray-900 font-mono">{{ equipment.ecriCode }}</p>
                </div>
                <div v-if="equipment?.responsible" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Responsable del equipo</p>
                  <p class="text-sm font-bold text-gray-900">{{ equipment.responsible }}</p>
                </div>
                <div v-if="equipment?.location" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Ubicación Física</p>
                  <p class="text-sm font-bold text-gray-900">{{ equipment.location }}</p>
                </div>
                <div v-if="equipment?.brand" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Marca</p>
                  <p class="text-sm font-bold text-gray-900">{{ equipment.brand }}</p>
                </div>
                <div v-if="equipment?.model" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Modelo</p>
                  <p class="text-sm font-bold text-gray-900">{{ equipment.model }}</p>
                </div>
                <div v-if="equipment?.serialNumber" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Serie</p>
                  <p class="text-sm font-bold text-gray-900 font-mono">{{ equipment.serialNumber }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Información Metrológica Administrativa -->
          <div v-if="hasMetrologicalAdmin" class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div class="px-6 py-4 border-b border-gray-200">
              <h4 class="text-lg font-semibold text-gray-900">Información Metrológica Administrativa</h4>
            </div>
            <div class="p-6 space-y-6">
              <!-- Mantenimiento Preventivo -->
              <div v-if="equipment?.requiresMaintenance !== undefined" class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div class="flex items-center justify-between mb-4">
                  <h5 class="text-sm font-semibold text-gray-900">Mantenimiento Preventivo</h5>
                  <span :class="equipment.requiresMaintenance ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'" class="px-2.5 py-1 rounded-md text-xs font-semibold">
                    {{ equipment.requiresMaintenance ? 'Sí' : 'No' }}
                  </span>
                </div>
                <div v-if="equipment.requiresMaintenance" class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div v-if="equipment.metrologicalFrequency" class="bg-white rounded-lg p-3 border border-gray-200">
                    <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Frecuencia Metrológica Fabricante</p>
                    <p class="text-sm font-bold text-gray-900">{{ equipment.metrologicalFrequency }}</p>
                  </div>
                  <div v-if="equipment.maintenanceFrequency" class="bg-white rounded-lg p-3 border border-gray-200">
                    <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Frecuencia Anual</p>
                    <p class="text-sm font-bold text-gray-900">{{ equipment.maintenanceFrequency }} vez/veces al año</p>
                  </div>
                  <div v-if="equipment.lastMaintenanceDate" class="bg-white rounded-lg p-3 border border-gray-200">
                    <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Último Mantenimiento</p>
                    <p class="text-sm font-bold text-gray-900">{{ formatDate(equipment.lastMaintenanceDate) }}</p>
                  </div>
                  <div v-if="equipment.nextMaintenanceDate" class="bg-white rounded-lg p-3 border border-gray-200">
                    <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Próximo Mantenimiento</p>
                    <p class="text-sm font-bold text-gray-900">{{ formatMonth(equipment.nextMaintenanceDate) }}</p>
                  </div>
                  <div v-if="equipment.nextPreventiveDate" class="bg-white rounded-lg p-3 border border-gray-200">
                    <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Próxima Fecha Preventiva</p>
                    <p class="text-sm font-bold text-gray-900">{{ formatDate(equipment.nextPreventiveDate) }}</p>
                  </div>
                </div>
              </div>

              <!-- Calibración -->
              <div v-if="equipment?.requiresCalibration !== undefined" class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div class="flex items-center justify-between mb-4">
                  <h5 class="text-sm font-semibold text-gray-900">Calibración</h5>
                  <span :class="equipment.requiresCalibration ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'" class="px-2.5 py-1 rounded-md text-xs font-semibold">
                    {{ equipment.requiresCalibration ? 'Sí' : 'No' }}
                  </span>
                </div>
                <div v-if="equipment.requiresCalibration" class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div v-if="equipment.calibrationFrequency" class="bg-white rounded-lg p-3 border border-gray-200">
                    <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Frecuencia Anual</p>
                    <p class="text-sm font-bold text-gray-900">{{ equipment.calibrationFrequency }} vez/veces al año</p>
                  </div>
                  <div v-if="equipment.lastCalibrationDate" class="bg-white rounded-lg p-3 border border-gray-200">
                    <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Última Calibración</p>
                    <p class="text-sm font-bold text-gray-900">{{ formatDate(equipment.lastCalibrationDate) }}</p>
                  </div>
                  <div v-if="equipment.nextCalibrationDate" class="bg-white rounded-lg p-3 border border-gray-200">
                    <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Próxima Calibración</p>
                    <p class="text-sm font-bold text-gray-900">{{ formatMonth(equipment.nextCalibrationDate) }}</p>
                  </div>
                </div>
              </div>

              <!-- Mantenimiento Correctivo -->
              <div v-if="equipment?.correctiveMaintenanceCount !== undefined || equipment?.lastCorrectiveMaintenanceDate" class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div class="flex items-center justify-between mb-4">
                  <h5 class="text-sm font-semibold text-gray-900">Mantenimiento Correctivo</h5>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div v-if="equipment.correctiveMaintenanceCount !== undefined" class="bg-white rounded-lg p-3 border border-gray-200">
                    <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Total Realizados</p>
                    <p class="text-sm font-bold text-gray-900">{{ equipment.correctiveMaintenanceCount }} {{ equipment.correctiveMaintenanceCount === 1 ? 'mantenimiento' : 'mantenimientos' }}</p>
                  </div>
                  <div v-if="equipment.lastCorrectiveMaintenanceDate" class="bg-white rounded-lg p-3 border border-gray-200">
                    <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Último Mantenimiento Correctivo</p>
                    <p class="text-sm font-bold text-gray-900">{{ formatDate(equipment.lastCorrectiveMaintenanceDate) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Clasificaciones Adicionales -->
          <div v-if="equipment?.classification || equipment?.riskClass || equipment?.invimaRegistry || equipment?.missionAxis" class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div class="px-6 py-4 border-b border-gray-200">
              <h4 class="text-lg font-semibold text-gray-900">Clasificaciones y Registros</h4>
            </div>
            <div class="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div v-if="equipment?.classification" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Clasificación IPS</p>
                <p class="text-sm font-bold text-gray-900">{{ equipment.classification }}</p>
              </div>
              <div v-if="equipment?.missionAxis" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Eje Misional</p>
                <p class="text-sm font-bold text-gray-900">{{ equipment.missionAxis }}</p>
              </div>
              <div v-if="equipment?.riskClass" class="bg-orange-50 rounded-lg p-3 border border-orange-200">
                <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Clasificación por Riesgo</p>
                <p class="text-sm font-bold text-orange-900">{{ equipment.riskClass }}</p>
              </div>
              <div v-if="equipment?.invimaRegistry" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Registro Invima / Permiso</p>
                <p class="text-sm font-bold text-gray-900 break-words">{{ equipment.invimaRegistry }}</p>
              </div>
            </div>
          </div>

          <!-- Inventario de Documentos -->
          <div v-if="hasDocuments" class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div class="px-6 py-4 border-b border-gray-200">
              <h4 class="text-lg font-semibold text-gray-900">Inventario de Documentos</h4>
            </div>
            <div class="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div v-if="equipment?.hasLifeSheet !== undefined" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Hoja de vida</p>
                <p class="text-sm font-bold text-gray-900">{{ equipment.hasLifeSheet ? 'Sí' : 'No' }}</p>
              </div>
              <div v-if="equipment?.hasImportRecord !== undefined" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Registro de importación</p>
                <p class="text-sm font-bold text-gray-900">{{ equipment.hasImportRecord ? 'Sí' : 'No' }}</p>
              </div>
              <div v-if="equipment?.hasOperationManual" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Manual operación (Esp)</p>
                <p class="text-sm font-bold text-gray-900">{{ equipment.hasOperationManual }}</p>
              </div>
              <div v-if="equipment?.hasServiceManual" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Manual servicio mto (Esp)</p>
                <p class="text-sm font-bold text-gray-900">{{ equipment.hasServiceManual }}</p>
              </div>
              <div v-if="equipment?.hasQuickGuide !== undefined" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Guía Rápida de uso</p>
                <p class="text-sm font-bold text-gray-900">{{ equipment.hasQuickGuide ? 'Sí' : 'No' }}</p>
              </div>
              <div v-if="equipment?.hasQuickHandlingInstructive !== undefined" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Instructivo de manejo rápido de equipos</p>
                <p class="text-sm font-bold text-gray-900">{{ equipment.hasQuickHandlingInstructive ? 'Sí' : 'No' }}</p>
              </div>
              <div v-if="equipment?.hasPreventiveProtocol !== undefined" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Protocolo Mto Prev.</p>
                <p class="text-sm font-bold text-gray-900">{{ equipment.hasPreventiveProtocol ? 'Sí' : 'No' }}</p>
              </div>
            </div>
          </div>

          <!-- Registro Histórico -->
          <div v-if="hasHistoricalData" class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div class="px-6 py-4 border-b border-gray-200">
              <h4 class="text-lg font-semibold text-gray-900">Registro Histórico</h4>
            </div>
            <div class="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div v-if="equipment?.owner" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Propietario del Equipo</p>
                <p class="text-sm font-bold text-gray-900">{{ equipment.owner }}</p>
              </div>
              <div v-if="equipment?.acquisitionDate" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Fecha de Adquisición</p>
                <p class="text-sm font-bold text-gray-900">{{ formatDate(equipment.acquisitionDate) }}</p>
              </div>
              <div v-if="equipment?.manufactureDate" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Fecha de Fabricación</p>
                <p class="text-sm font-bold text-gray-900">{{ formatDate(equipment.manufactureDate) }}</p>
              </div>
              <div v-if="equipment?.usefulLife" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Tiempo de Vida Útil</p>
                <p class="text-sm font-bold text-gray-900">{{ equipment.usefulLife }}</p>
              </div>
              <div v-if="equipment?.supplier" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Proveedor del Equipo</p>
                <p class="text-sm font-bold text-gray-900">{{ equipment.supplier }}</p>
              </div>
              <div v-if="equipment?.nit" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">NIT</p>
                <p class="text-sm font-bold text-gray-900 font-mono">{{ equipment.nit }}</p>
              </div>
              <div v-if="equipment?.acquisitionForm" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Forma de Adquisición</p>
                <p class="text-sm font-bold text-gray-900">{{ equipment.acquisitionForm }}</p>
              </div>
              <div v-if="equipment?.documentType" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Tipo de Documento</p>
                <p class="text-sm font-bold text-gray-900">{{ equipment.documentType }}</p>
              </div>
              <div v-if="equipment?.documentNumber" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Número de Documento</p>
                <p class="text-sm font-bold text-gray-900 font-mono">{{ equipment.documentNumber }}</p>
              </div>
              <div v-if="equipment?.purchaseValue" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Valor de Compra</p>
                <p class="text-sm font-bold text-gray-900">{{ formatCurrency(equipment.purchaseValue) }}</p>
              </div>
              <div v-if="equipment?.hasWarranty !== undefined" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Garantía</p>
                <p class="text-sm font-bold text-gray-900">{{ equipment.hasWarranty ? 'Sí' : 'No' }}</p>
                <p v-if="equipment.hasWarranty && equipment.warrantyExpiration" class="text-xs text-gray-600 mt-1">
                  Vence: {{ formatDate(equipment.warrantyExpiration) }}
                </p>
              </div>
            </div>
          </div>


          <!-- Información Metrológica Técnica -->
          <div v-if="hasMetrologicalTechnical" class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div class="px-6 py-4 border-b border-gray-200">
              <h4 class="text-lg font-semibold text-gray-900">Información Metrológica Técnica</h4>
            </div>
            <div class="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div v-if="equipment?.magnitude" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Magnitud</p>
                <p class="text-sm font-bold text-gray-900">{{ equipment.magnitude }}</p>
              </div>
              <div v-if="equipment?.equipmentRange" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Rango del Equipo</p>
                <p class="text-sm font-bold text-gray-900">{{ equipment.equipmentRange }}</p>
              </div>
              <div v-if="equipment?.resolution" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Resolución</p>
                <p class="text-sm font-bold text-gray-900">{{ equipment.resolution }}</p>
              </div>
              <div v-if="equipment?.workingRange" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Rango de Trabajo</p>
                <p class="text-sm font-bold text-gray-900">{{ equipment.workingRange }}</p>
              </div>
              <div v-if="equipment?.maxAllowedError" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Error Máximo Permitido</p>
                <p class="text-sm font-bold text-gray-900">{{ equipment.maxAllowedError }}</p>
              </div>
            </div>
          </div>

          <!-- Condiciones de Funcionamiento -->
          <div v-if="hasOperatingConditions" class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div class="px-6 py-4 border-b border-gray-200">
              <h4 class="text-lg font-semibold text-gray-900">Condiciones de Funcionamiento</h4>
            </div>
            <div class="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div v-if="equipment?.voltage" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Voltaje</p>
                <p class="text-sm font-bold text-gray-900">{{ equipment.voltage }}</p>
              </div>
              <div v-if="equipment?.current" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Corriente</p>
                <p class="text-sm font-bold text-gray-900">{{ equipment.current }}</p>
              </div>
              <div v-if="equipment?.power" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Potencia</p>
                <p class="text-sm font-bold text-gray-900">{{ equipment.power }}</p>
              </div>
              <div v-if="equipment?.relativeHumidity" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Humedad Relativa</p>
                <p class="text-sm font-bold text-gray-900">{{ equipment.relativeHumidity }}</p>
              </div>
              <div v-if="equipment?.temperature" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Temperatura</p>
                <p class="text-sm font-bold text-gray-900">{{ equipment.temperature }}</p>
              </div>
              <div v-if="equipment?.dimensions" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Dimensiones</p>
                <p class="text-sm font-bold text-gray-900 break-words">{{ equipment.dimensions }}</p>
              </div>
              <div v-if="equipment?.weight" class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Peso</p>
                <p class="text-sm font-bold text-gray-900">{{ equipment.weight }}</p>
              </div>
              <div v-if="equipment?.other" class="bg-gray-50 rounded-lg p-3 border border-gray-200 sm:col-span-2 lg:col-span-3">
                <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Otros</p>
                <p class="text-sm font-bold text-gray-900 break-words">{{ equipment.other }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer fijo -->
        <div class="flex-shrink-0 flex items-center justify-end pt-3 border-t border-gray-200 px-4 pb-4 bg-white rounded-b-2xl">
          <button
            @click="$emit('close')"
            class="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold border border-blue-500 text-blue-500 bg-white hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
import type { Equipment } from '../types/equipment.types'
import { ListIcon } from '@/assets/icons'
import { useSidebar } from '@/shared/composables/SidebarControl'

const props = defineProps<{ equipment: Equipment | null }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const isOpen = computed(() => !!props.equipment)
const { isExpanded, isMobileOpen, isHovered } = useSidebar()

// Computed class for overlay positioning based on sidebar state
const overlayLeftClass = computed(() => {
  const hasWideSidebar = (isExpanded.value && !isMobileOpen.value) || (!isExpanded.value && isHovered.value)
  return hasWideSidebar ? 'left-0 lg:left-72' : 'left-0 lg:left-20'
})

// Computed para verificar si hay datos en cada sección
const hasGeneralInfo = computed(() => {
  const eq = props.equipment
  return !!(eq?.name || eq?.internalCode || eq?.ipsCode || eq?.ecriCode || eq?.process || eq?.sede || 
            eq?.brand || eq?.model || eq?.serialNumber || eq?.responsible || eq?.location ||
            eq?.status)
})

const hasHistoricalData = computed(() => {
  const eq = props.equipment
  return !!(eq?.acquisitionDate || eq?.manufactureDate || eq?.usefulLife || eq?.owner || 
            eq?.supplier || eq?.nit || eq?.acquisitionForm || eq?.documentType || 
            eq?.documentNumber || eq?.purchaseValue || eq?.hasWarranty !== undefined ||
            eq?.warrantyExpiration)
})

const hasMetrologicalAdmin = computed(() => {
  const eq = props.equipment
  return !!(eq?.requiresMaintenance !== undefined || eq?.maintenanceFrequency || 
            eq?.requiresCalibration !== undefined || eq?.calibrationFrequency || 
            eq?.metrologicalFrequency || eq?.lastMaintenanceDate || eq?.nextMaintenanceDate || 
            eq?.nextPreventiveDate || eq?.lastCalibrationDate || eq?.nextCalibrationDate ||
            eq?.correctiveMaintenanceCount !== undefined || eq?.lastCorrectiveMaintenanceDate)
})

const hasMetrologicalTechnical = computed(() => {
  const eq = props.equipment
  return !!(eq?.magnitude || eq?.equipmentRange || eq?.resolution || eq?.workingRange || eq?.maxAllowedError)
})

const hasOperatingConditions = computed(() => {
  const eq = props.equipment
  return !!(eq?.voltage || eq?.current || eq?.power || eq?.relativeHumidity || eq?.temperature || 
            eq?.dimensions || eq?.weight || eq?.other)
})

const hasDocuments = computed(() => {
  const eq = props.equipment
  return !!(eq?.hasLifeSheet !== undefined || eq?.hasImportRecord !== undefined || 
            eq?.hasOperationManual || eq?.hasServiceManual || eq?.hasQuickGuide !== undefined ||
            eq?.hasQuickHandlingInstructive !== undefined || eq?.hasPreventiveProtocol !== undefined)
})

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return 'N/A'
  try {
    // Si ya es una fecha formateada como string, devolverla
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

const formatMonth = (dateString: string | undefined) => {
  if (!dateString) return 'N/A'
  try {
    const d = new Date(dateString)
    if (isNaN(d.getTime())) return String(dateString)
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    return `${months[d.getMonth()]} ${d.getFullYear()}`
  } catch {
    return String(dateString)
  }
}

const formatCurrency = (value: string | number | undefined) => {
  if (!value) return 'N/A'
  if (typeof value === 'number') {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value)
  }
  return value
}

const getStatusBadgeClass = (status: string) => {
  const statusClasses: Record<string, string> = {
    'Operativo': 'bg-green-50 text-green-700 border border-green-200',
    'En mantenimiento': 'bg-yellow-50 text-yellow-700 border border-yellow-200',
    'Fuera de servicio': 'bg-red-50 text-red-700 border border-red-200',
    'En reparación': 'bg-orange-50 text-orange-700 border border-orange-200',
    'Dado de baja': 'bg-gray-50 text-gray-700 border border-gray-200'
  }
  return statusClasses[status] || 'bg-gray-50 text-gray-700 border border-gray-200'
}

const getStatusDotClass = (status: string) => {
  const dotClasses: Record<string, string> = {
    'Operativo': 'bg-green-500',
    'En mantenimiento': 'bg-yellow-500',
    'Fuera de servicio': 'bg-red-500',
    'En reparación': 'bg-orange-500',
    'Dado de baja': 'bg-gray-500'
  }
  return dotClasses[status] || 'bg-gray-500'
}

const getStatusClass = (status: string) => {
  const statusClasses: Record<string, string> = {
    'Operativo': 'bg-green-100 text-green-800',
    'En mantenimiento': 'bg-yellow-100 text-yellow-800',
    'Fuera de servicio': 'bg-red-100 text-red-800',
    'En reparación': 'bg-orange-100 text-orange-800',
    'Dado de baja': 'bg-gray-100 text-gray-800'
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
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

