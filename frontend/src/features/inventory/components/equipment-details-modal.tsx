"use client"

import { 
  X, 
  Package2, 
  Hash, 
  Tag, 
  Building2, 
  Users, 
  MapPin,
  Calendar,
  Wrench,
  Activity,
  AlertCircle,
  Shield,
  Zap,
  Thermometer,
  Droplets,
  Ruler,
  Weight,
  FileText,
  Truck,
  CreditCard,
  DollarSign,
  CheckCircle2,
  Clock
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { EquipmentRecord } from '@/features/inventory/data/mock-equipment'

interface EquipmentDetailsModalProps {
  isOpen: boolean
  equipment: EquipmentRecord | null
  onClose: () => void
  onEdit: (equipment: EquipmentRecord) => void
}

export function EquipmentDetailsModal({ isOpen, equipment, onClose, onEdit }: EquipmentDetailsModalProps) {
  if (!isOpen || !equipment) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div 
        className="relative max-h-[95vh] w-full max-w-6xl overflow-auto rounded-2xl bg-white shadow-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-slate-200 bg-gradient-to-r from-emerald-50 to-teal-50 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Detalles del equipo</h2>
              <p className="text-sm text-slate-600 mt-1">{equipment.name}</p>
            </div>
            <button
              onClick={onClose}
              className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5 text-slate-700" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 p-6 overflow-y-auto flex-1">
          {/* 1. Información general */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="border-b border-slate-200 bg-gradient-to-r from-emerald-50 to-teal-50 px-8 py-6 text-center">
              <h2 className="text-xl font-bold text-slate-900">Información general</h2>
              <p className="text-sm text-slate-600 mt-1">Datos básicos de identificación del equipo</p>
            </div>
            <div className="p-8 space-y-8">
              {/* Datos básicos */}
              <div className="grid gap-6 md:grid-cols-10">
                {/* Primera línea: Nombre del equipo y códigos */}
                {/* Nombre del equipo - 4 columnas */}
                <div className="space-y-2 md:col-span-4">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Package2 className="h-4 w-4 flex-shrink-0" />
                    <p className="text-sm font-semibold text-slate-700">Nombre del equipo</p>
                  </div>
                  <p className="text-base text-slate-900 pl-6">{equipment.name}</p>
                </div>
                
                {/* Código UdeA - 2 columnas */}
                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Hash className="h-4 w-4 flex-shrink-0" />
                    <p className="text-sm font-semibold text-slate-700">Código UdeA</p>
                  </div>
                  <p className="text-base text-slate-900 font-mono pl-6">{equipment.code}</p>
                </div>
                
                {/* Código IPS - 2 columnas */}
                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Hash className="h-4 w-4 flex-shrink-0" />
                    <p className="text-sm font-semibold text-slate-700">Código IPS</p>
                  </div>
                  <p className="text-base text-slate-900 font-mono pl-6">{equipment.ipsCode || 'N/A'}</p>
                </div>
                
                {/* Código ECRI - 2 columnas */}
                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Hash className="h-4 w-4 flex-shrink-0" />
                    <p className="text-sm font-semibold text-slate-700">Código ECRI</p>
                  </div>
                  <p className="text-base text-slate-900 font-mono pl-6">N/A</p>
                </div>
                
                {/* Segunda línea: Marca, Modelo y Serie */}
                {/* Marca - 4 columnas */}
                <div className="space-y-2 md:col-span-4">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Tag className="h-4 w-4 flex-shrink-0" />
                    <p className="text-sm font-semibold text-slate-700">Marca</p>
                  </div>
                  <p className="text-base text-slate-900 pl-6">{equipment.brand}</p>
                </div>
                
                {/* Modelo - 3 columnas */}
                <div className="space-y-2 md:col-span-3">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Tag className="h-4 w-4 flex-shrink-0" />
                    <p className="text-sm font-semibold text-slate-700">Modelo</p>
                  </div>
                  <p className="text-base text-slate-900 pl-6">{equipment.model}</p>
                </div>
                
                {/* Serie - 3 columnas */}
                <div className="space-y-2 md:col-span-3">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Hash className="h-4 w-4 flex-shrink-0" />
                    <p className="text-sm font-semibold text-slate-700">Serie</p>
                  </div>
                  <p className="text-base text-slate-900 font-mono pl-6">{equipment.serial}</p>
                </div>
              </div>

              {/* Clasificaciones - todas en una línea */}
              <div className="space-y-4 pt-4">
                {/* Título en medio de la línea divisora */}
                <div className="relative flex items-center pb-6">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <h3 className="px-4 text-xs font-bold uppercase tracking-wider text-slate-500">Clasificaciones</h3>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>
                <div className="grid gap-6 md:grid-cols-10">
                  {/* Clasificación por eje misional - 3 columnas */}
                  <div className="space-y-2 md:col-span-3">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Tag className="h-4 w-4 flex-shrink-0" />
                      <p className="text-sm font-semibold text-slate-700">Clasificación por eje misional</p>
                    </div>
                    <p className="text-base text-slate-900 pl-6">{equipment.missionClassification || 'N/A'}</p>
                  </div>
                  
                  {/* Clasificación IPS - 2 columnas */}
                  <div className="space-y-2 md:col-span-2">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Tag className="h-4 w-4 flex-shrink-0" />
                      <p className="text-sm font-semibold text-slate-700">Clasificación IPS</p>
                    </div>
                    <p className="text-base text-slate-900 pl-6">{equipment.classification}</p>
                  </div>
                  
                  {/* Clasificación Invima - 2 columnas */}
                  <div className="space-y-2 md:col-span-2">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Shield className="h-4 w-4 flex-shrink-0" />
                      <p className="text-sm font-semibold text-slate-700">Clasificación Invima</p>
                    </div>
                    <p className="text-base text-slate-900 pl-6">{equipment.riskClass || 'N/A'}</p>
                  </div>
                  
                  {/* Código del registro Invima - 3 columnas */}
                  <div className="space-y-2 md:col-span-3">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Shield className="h-4 w-4 flex-shrink-0" />
                      <p className="text-sm font-semibold text-slate-700">Código del registro Invima</p>
                    </div>
                    <p className="text-base text-slate-900 font-mono pl-6">{equipment.invimaStatus || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Ubicación y responsable */}
              <div className="space-y-4 pt-4">
                {/* Título en medio de la línea divisora */}
                <div className="relative flex items-center pb-6">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <h3 className="px-4 text-xs font-bold uppercase tracking-wider text-slate-500">Ubicación y responsable</h3>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>
                <div className="grid gap-6 md:grid-cols-10">
                  {/* Sede - 3 columnas */}
                  <div className="space-y-2 md:col-span-3">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Building2 className="h-4 w-4 flex-shrink-0" />
                      <p className="text-sm font-semibold text-slate-700">Sede</p>
                    </div>
                    <p className="text-base text-slate-900 pl-6">N/A</p>
                  </div>
                  
                  {/* Servicio - 2 columnas */}
                  <div className="space-y-2 md:col-span-2">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Building2 className="h-4 w-4 flex-shrink-0" />
                      <p className="text-sm font-semibold text-slate-700">Servicio</p>
                    </div>
                    <p className="text-base text-slate-900 pl-6">N/A</p>
                  </div>
                  
                  {/* Ubicación - 2 columnas */}
                  <div className="space-y-2 md:col-span-2">
                    <div className="flex items-center gap-2 text-slate-500">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <p className="text-sm font-semibold text-slate-700">Ubicación</p>
                    </div>
                    <p className="text-base text-slate-900 pl-6">{equipment.location}</p>
                  </div>
                  
                  {/* Responsable - 3 columnas */}
                  <div className="space-y-2 md:col-span-3">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Users className="h-4 w-4 flex-shrink-0" />
                      <p className="text-sm font-semibold text-slate-700">Responsable</p>
                    </div>
                    <p className="text-base text-slate-900 pl-6">{equipment.assignedTo}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Información metrológica administrativa */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="border-b border-slate-200 bg-gradient-to-r from-emerald-50 to-teal-50 px-8 py-6 text-center">
              <h2 className="text-xl font-bold text-slate-900">Información metrológica administrativa</h2>
              <p className="text-sm text-slate-600 mt-1">Datos de mantenimiento y calibración</p>
            </div>
            <div className="p-8">
              <div className="grid gap-6 md:grid-cols-10">
                {/* Mantenimiento Si/No - 2 columnas */}
                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Wrench className="h-4 w-4 flex-shrink-0" />
                    <p className="text-sm font-semibold text-slate-700">Mantenimiento Si/No</p>
                  </div>
                  <p className="text-base text-slate-900 pl-6">{equipment.maintenanceType}</p>
                </div>
                
                {/* Frecuencia anual mantenimiento - 3 columnas */}
                <div className="space-y-2 md:col-span-3">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Clock className="h-4 w-4 flex-shrink-0" />
                    <p className="text-sm font-semibold text-slate-700">Frecuencia anual mantenimiento</p>
                  </div>
                  <p className="text-base text-slate-900 font-mono pl-6">N/A</p>
                </div>
                
                {/* Calibración Si/No - 2 columnas */}
                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Ruler className="h-4 w-4 flex-shrink-0" />
                    <p className="text-sm font-semibold text-slate-700">Calibración Si/No</p>
                  </div>
                  <p className="text-base text-slate-900 pl-6">{equipment.calibrationStatus}</p>
                </div>
                
                {/* Frecuencia anual calibración - 3 columnas */}
                <div className="space-y-2 md:col-span-3">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Clock className="h-4 w-4 flex-shrink-0" />
                    <p className="text-sm font-semibold text-slate-700">Frecuencia anual calibración</p>
                  </div>
                  <p className="text-base text-slate-900 pl-6">N/A</p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Condiciones de funcionamiento */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="border-b border-slate-200 bg-gradient-to-r from-emerald-50 to-teal-50 px-8 py-6 text-center">
              <h2 className="text-xl font-bold text-slate-900">Condiciones de funcionamiento</h2>
              <p className="text-sm text-slate-600 mt-1">Especificaciones técnicas y requisitos operativos</p>
            </div>
            <div className="p-8">
              <div className="grid gap-6 md:grid-cols-4">
                {/* Primera fila: 4 elementos */}
                {/* Voltaje */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Zap className="h-4 w-4 flex-shrink-0" />
                    <p className="text-sm font-semibold text-slate-700">Voltaje</p>
                  </div>
                  <p className="text-base text-slate-900 pl-6">N/A</p>
                </div>
                
                {/* Corriente */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Zap className="h-4 w-4 flex-shrink-0" />
                    <p className="text-sm font-semibold text-slate-700">Corriente</p>
                  </div>
                  <p className="text-base text-slate-900 pl-6">N/A</p>
                </div>
                
                {/* Humedad relativa */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Droplets className="h-4 w-4 flex-shrink-0" />
                    <p className="text-sm font-semibold text-slate-700">Humedad relativa</p>
                  </div>
                  <p className="text-base text-slate-900 pl-6">N/A</p>
                </div>
                
                {/* Temperatura */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Thermometer className="h-4 w-4 flex-shrink-0" />
                    <p className="text-sm font-semibold text-slate-700">Temperatura</p>
                  </div>
                  <p className="text-base text-slate-900 pl-6">N/A</p>
                </div>
                
                {/* Segunda fila: 4 elementos */}
                {/* Dimensiones */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Ruler className="h-4 w-4 flex-shrink-0" />
                    <p className="text-sm font-semibold text-slate-700">Dimensiones</p>
                  </div>
                  <p className="text-base text-slate-900 pl-6">N/A</p>
                </div>
                
                {/* Peso */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Weight className="h-4 w-4 flex-shrink-0" />
                    <p className="text-sm font-semibold text-slate-700">Peso</p>
                  </div>
                  <p className="text-base text-slate-900 pl-6">N/A</p>
                </div>
                
                {/* Potencia */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Zap className="h-4 w-4 flex-shrink-0" />
                    <p className="text-sm font-semibold text-slate-700">Potencia</p>
                  </div>
                  <p className="text-base text-slate-900 pl-6">N/A</p>
                </div>
                
                {/* Otros */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-500">
                    <FileText className="h-4 w-4 flex-shrink-0" />
                    <p className="text-sm font-semibold text-slate-700">Otros</p>
                  </div>
                  <p className="text-base text-slate-900 pl-6">N/A</p>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Registro Histórico */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="border-b border-slate-200 bg-gradient-to-r from-emerald-50 to-teal-50 px-8 py-6 text-center">
              <h2 className="text-xl font-bold text-slate-900">Registro Histórico</h2>
              <p className="text-sm text-slate-600 mt-1">Información de adquisición y garantía del equipo</p>
            </div>
            <div className="p-8 space-y-8">
              {/* Fechas */}
              <div className="grid gap-6 md:grid-cols-4">
                {/* Fecha de adquisición */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Calendar className="h-4 w-4 flex-shrink-0" />
                    <p className="text-sm font-semibold text-slate-700">Fecha de adquisición</p>
                  </div>
                  <p className="text-base text-slate-900 pl-6">N/A</p>
                </div>
                
                {/* Fecha de fabricación */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Calendar className="h-4 w-4 flex-shrink-0" />
                    <p className="text-sm font-semibold text-slate-700">Fecha de fabricación</p>
                  </div>
                  <p className="text-base text-slate-900 pl-6">N/A</p>
                </div>
                
                {/* Fecha fin garantía */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Calendar className="h-4 w-4 flex-shrink-0" />
                    <p className="text-sm font-semibold text-slate-700">Fecha fin garantía</p>
                  </div>
                  <p className="text-base text-slate-900 pl-6">N/A</p>
                </div>

                {/* Está en garantía */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-500">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                    <p className="text-sm font-semibold text-slate-700">Está en garantía</p>
                  </div>
                  <p className="text-base text-slate-900 pl-6">{equipment.warrantyActive ? 'Sí' : 'No'}</p>
                </div>
              </div>

              {/* Propietario del equipo */}
              <div className="space-y-4 pt-4">
                {/* Título en medio de la línea divisora */}
                <div className="relative flex items-center pb-6">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <h3 className="px-4 text-xs font-bold uppercase tracking-wider text-slate-500">Propietario del equipo</h3>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>
                <div className="grid gap-6 md:grid-cols-4">
                  {/* Propietario del equipo - 2 columnas */}
                  <div className="space-y-2 md:col-span-2">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Users className="h-4 w-4 flex-shrink-0" />
                      <p className="text-sm font-semibold text-slate-700">Propietario del equipo</p>
                    </div>
                    <p className="text-base text-slate-900 pl-6">N/A</p>
                  </div>
                  
                  {/* NIT */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Hash className="h-4 w-4 flex-shrink-0" />
                      <p className="text-sm font-semibold text-slate-700">NIT</p>
                    </div>
                    <p className="text-base text-slate-900 font-mono pl-6">N/A</p>
                  </div>
                  
                  {/* Forma de adquisición */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-500">
                      <FileText className="h-4 w-4 flex-shrink-0" />
                      <p className="text-sm font-semibold text-slate-700">Forma de adquisición</p>
                    </div>
                    <p className="text-base text-slate-900 pl-6">N/A</p>
                  </div>
                </div>
              </div>

              {/* Información de compra */}
              <div className="space-y-4 pt-4">
                {/* Título en medio de la línea divisora */}
                <div className="relative flex items-center pb-6">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <h3 className="px-4 text-xs font-bold uppercase tracking-wider text-slate-500">Información de compra</h3>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>
                <div className="grid gap-6 md:grid-cols-4">
                  {/* Proveedor equipo */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Truck className="h-4 w-4 flex-shrink-0" />
                      <p className="text-sm font-semibold text-slate-700">Proveedor equipo</p>
                    </div>
                    <p className="text-base text-slate-900 pl-6">{equipment.provider}</p>
                  </div>

                  {/* Tipo de documento */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-500">
                      <FileText className="h-4 w-4 flex-shrink-0" />
                      <p className="text-sm font-semibold text-slate-700">Tipo de documento</p>
                    </div>
                    <p className="text-base text-slate-900 pl-6">N/A</p>
                  </div>
                  
                  {/* Número de documento */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Hash className="h-4 w-4 flex-shrink-0" />
                      <p className="text-sm font-semibold text-slate-700">Número de documento</p>
                    </div>
                    <p className="text-base text-slate-900 font-mono pl-6">N/A</p>
                  </div>

                  {/* Valor de compra */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-500">
                      <DollarSign className="h-4 w-4 flex-shrink-0" />
                      <p className="text-sm font-semibold text-slate-700">Valor de compra</p>
                    </div>
                    <p className="text-base text-slate-900 font-mono pl-6">N/A</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Inventario de documentos */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="border-b border-slate-200 bg-gradient-to-r from-emerald-50 to-teal-50 px-8 py-6 text-center">
              <h2 className="text-xl font-bold text-slate-900">Inventario de documentos</h2>
              <p className="text-sm text-slate-600 mt-1">Documentación asociada al equipo</p>
            </div>
            <div className="p-8">
              <div className="grid gap-6 md:grid-cols-10">
                {/* Hoja de vida - 2 columnas */}
                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center gap-2 text-slate-500">
                    <FileText className="h-4 w-4 flex-shrink-0" />
                    <p className="text-sm font-semibold text-slate-700">Hoja de vida</p>
                  </div>
                  <p className="text-base text-slate-900 pl-6">N/A</p>
                </div>
                
                {/* Registro de importación - 2 columnas */}
                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center gap-2 text-slate-500">
                    <FileText className="h-4 w-4 flex-shrink-0" />
                    <p className="text-sm font-semibold text-slate-700">Registro de importación</p>
                  </div>
                  <p className="text-base text-slate-900 pl-6">N/A</p>
                </div>
                
                {/* Manual operación (Esp) - 2 columnas */}
                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center gap-2 text-slate-500">
                    <FileText className="h-4 w-4 flex-shrink-0" />
                    <p className="text-sm font-semibold text-slate-700">Manual operación (Esp)</p>
                  </div>
                  <p className="text-base text-slate-900 pl-6">N/A</p>
                </div>
                
                {/* Manual servicio mto (Esp) - 2 columnas */}
                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center gap-2 text-slate-500">
                    <FileText className="h-4 w-4 flex-shrink-0" />
                    <p className="text-sm font-semibold text-slate-700">Manual servicio mto (Esp)</p>
                  </div>
                  <p className="text-base text-slate-900 pl-6">N/A</p>
                </div>
                
                {/* Guía Rápida de uso - 2 columnas */}
                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center gap-2 text-slate-500">
                    <FileText className="h-4 w-4 flex-shrink-0" />
                    <p className="text-sm font-semibold text-slate-700">Guía Rápida de uso</p>
                  </div>
                  <p className="text-base text-slate-900 pl-6">N/A</p>
                </div>
                
                {/* Instructivo de manejo rápido - 2 columnas */}
                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center gap-2 text-slate-500">
                    <FileText className="h-4 w-4 flex-shrink-0" />
                    <p className="text-sm font-semibold text-slate-700">Instructivo de manejo rápido</p>
                  </div>
                  <p className="text-base text-slate-900 pl-6">N/A</p>
                </div>
                
                {/* Protocolo Mto Prev. - 2 columnas */}
                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center gap-2 text-slate-500">
                    <FileText className="h-4 w-4 flex-shrink-0" />
                    <p className="text-sm font-semibold text-slate-700">Protocolo Mto Prev.</p>
                  </div>
                  <p className="text-base text-slate-900 pl-6">N/A</p>
                </div>
                
                {/* Frecuencia metrológica fabricante - 2 columnas */}
                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Clock className="h-4 w-4 flex-shrink-0" />
                    <p className="text-sm font-semibold text-slate-700">Frecuencia metrológica fabricante</p>
                  </div>
                  <p className="text-base text-slate-900 pl-6">N/A</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 border-t border-slate-200 bg-white px-6 py-4 flex justify-end gap-3">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            Cerrar
          </Button>
          <Button 
            onClick={() => onEdit(equipment)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Editar Equipo
          </Button>
        </div>
      </div>
    </div>
  )
}
