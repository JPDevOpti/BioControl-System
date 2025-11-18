"use client"

import { ImageIcon } from 'lucide-react'
import type { EquipmentRecord } from '@/features/inventory/data/mock-equipment'

interface EquipmentImageModalProps {
  isOpen: boolean
  equipment: EquipmentRecord | null
  onClose: () => void
}

export function EquipmentImageModal({ isOpen, equipment, onClose }: EquipmentImageModalProps) {
  if (!isOpen || !equipment) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div 
        className="relative max-h-[95vh] w-full max-w-6xl overflow-auto rounded-lg bg-white p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900">
            Imagen del equipo: {equipment.name}
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Cerrar"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex min-h-[500px] items-center justify-center rounded-lg border-2 border-slate-200 bg-slate-50 p-12">
          <div className="text-center">
            <ImageIcon className="mx-auto h-32 w-32 text-slate-400" />
            <p className="mt-6 text-base font-medium text-slate-600">
              Imagen del equipo: {equipment.code}
            </p>
            <p className="mt-3 text-sm text-slate-400">
              La funcionalidad de carga de imágenes está en desarrollo
            </p>
          </div>
        </div>
        
        <div className="mt-6 grid gap-3 rounded-lg border border-slate-200 bg-white p-4 text-base">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-700">Código:</span>
            <span className="text-slate-900">{equipment.code}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-700">Marca:</span>
            <span className="text-slate-900">{equipment.brand}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-700">Modelo:</span>
            <span className="text-slate-900">{equipment.model}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-700">Serial:</span>
            <span className="text-slate-900">{equipment.serial}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
