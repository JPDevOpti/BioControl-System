"use client"

import { useEffect, useRef, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import type { EquipmentRecord } from '@/features/inventory/data/mock-equipment'
import { cn } from '@/lib/cn'
import {
  AlertCircle,
  CalendarDays,
  ClipboardList,
  FileText,
  Image as ImageIcon,
  MapPin,
  Package2,
  PencilLine,
  ShieldCheck
} from 'lucide-react'

interface EquipmentTableProps {
  equipment: EquipmentRecord[]
  filteredTotal: number
  total: number
  page: number
  pageSize: number
  totalPages: number
  onPageChange?: (page: number) => void
  onExportSelected?: (ids: string[]) => void
  className?: string
  emptyMessage?: string
}

const dateFormatter = new Intl.DateTimeFormat('es-CO', {
  month: 'short',
  day: '2-digit'
})

const statusVariant = (status: string) => {
  const normalized = status.toLowerCase()
  if (normalized.includes('operativo')) return 'success'
  if (normalized.includes('preventivo')) return 'warning'
  if (normalized.includes('correctivo') || normalized.includes('fuera')) return 'error'
  if (normalized.includes('calib')) return 'info'
  return 'secondary'
}

const criticalityVariant = (level: EquipmentRecord['criticality']) => {
  if (level === 'Alta') return 'error'
  if (level === 'Media') return 'warning'
  return 'success'
}

const invimaVariant = (status: EquipmentRecord['invimaStatus']) => {
  return status === 'Con registro' ? 'success' : 'warning'
}

const maintenanceVariant = (type: EquipmentRecord['maintenanceType']) => {
  return type === 'Preventivo' ? 'info' : 'warning'
}

const calibrationVariant = (status: EquipmentRecord['calibrationStatus']) => {
  if (status === 'Al día') return 'success'
  if (status === 'Por vencer') return 'warning'
  return 'error'
}

const formatDate = (value: string) => {
  if (!value) return 'Sin registro'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : dateFormatter.format(date)
}

export function EquipmentTable({
  equipment,
  filteredTotal,
  total,
  page,
  pageSize,
  totalPages,
  onPageChange,
  onExportSelected,
  className,
  emptyMessage = 'No se encontraron equipos con los filtros aplicados.'
}: EquipmentTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const selectAllRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setSelectedIds((prev) => prev.filter((id) => equipment.some((item) => item.id === id)))
  }, [equipment])

  useEffect(() => {
    if (!selectAllRef.current) return
    selectAllRef.current.indeterminate = selectedIds.length > 0 && selectedIds.length < equipment.length
  }, [selectedIds, equipment.length])

  const isAllSelected = equipment.length > 0 && selectedIds.length === equipment.length

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([])
      return
    }
    setSelectedIds(equipment.map((item) => item.id))
  }

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id]))
  }

  const clearSelection = () => setSelectedIds([])

  const handleExportSelected = () => {
    if (selectedIds.length === 0) return
    onExportSelected?.(selectedIds)
  }

  const rangeStart = filteredTotal === 0 ? 0 : (page - 1) * pageSize + 1
  const rangeEnd = filteredTotal === 0 ? 0 : rangeStart + equipment.length - 1

  const handlePrevPage = () => {
    if (page === 1) return
    onPageChange?.(page - 1)
  }

  const handleNextPage = () => {
    if (page >= totalPages) return
    onPageChange?.(page + 1)
  }

  const emptyState = (
    <div className="flex flex-col items-center gap-3 px-6 py-12 text-center text-slate-500">
      <AlertCircle className="h-12 w-12 text-slate-300" />
      <div className="space-y-1">
        <p className="text-base font-semibold text-slate-700">Sin resultados</p>
        <p className="text-sm text-slate-500">{emptyMessage}</p>
      </div>
      {selectedIds.length > 0 && (
        <Button variant="ghost" size="sm" onClick={clearSelection}>
          Limpiar selección
        </Button>
      )}
    </div>
  )

  return (
    <div className={cn('overflow-hidden rounded-2xl border border-slate-200 bg-white', className)}>
      {selectedIds.length > 0 && (
        <div className="flex flex-col gap-2 border-b border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-semibold">{selectedIds.length} equipo{selectedIds.length > 1 ? 's' : ''} seleccionado{selectedIds.length > 1 ? 's' : ''}</span>
            <button className="text-sm font-medium text-emerald-700 hover:underline" onClick={clearSelection}>
              Deseleccionar todo
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="border border-emerald-100 bg-white text-emerald-700 hover:bg-emerald-50"
              onClick={handleExportSelected}
              disabled={!onExportSelected}
            >
              <FileText className="h-4 w-4" /> Exportar seleccionados
            </Button>
          </div>
        </div>
      )}

      {filteredTotal === 0 ? (
        emptyState
      ) : (
        <>
          <div className="hidden lg:block">
            <div className="max-w-full overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-600">
                    <th className="w-12 px-3 py-4 text-center">
                      <div className="flex justify-center">
                        <Checkbox ref={selectAllRef} checked={isAllSelected} onChange={toggleSelectAll} aria-label="Seleccionar todos" />
                      </div>
                    </th>
                    <th className="min-w-[150px] px-4 py-4 text-left">Códigos</th>
                    <th className="min-w-[200px] px-4 py-4 text-left">Equipo</th>
                    <th className="min-w-[160px] px-4 py-4 text-left">Sede / Servicio</th>
                    <th className="min-w-[170px] px-4 py-4 text-left">Responsable / Área</th>
                    <th className="min-w-[180px] px-4 py-4 text-left">Seguimiento</th>
                    <th className="min-w-[160px] px-4 py-4 text-left">Clasificación</th>
                    <th className="min-w-[160px] px-4 py-4 text-left">Invima</th>
                    <th className="w-36 px-4 py-4 text-left">Estado</th>
                    <th className="w-28 px-4 py-4 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {equipment.map((item) => (
                    <tr key={item.id} className="hover:bg-emerald-50/30">
                      <td className="px-3 py-4 text-center align-middle">
                        <div className="flex justify-center">
                          <Checkbox checked={selectedIds.includes(item.id)} onChange={() => toggleSelect(item.id)} aria-label={`Seleccionar ${item.name}`} />
                        </div>
                      </td>
                      <td className="px-4 py-4 align-middle">
                        <div className="flex flex-col items-start gap-2">
                          <Badge size="sm" variant="success" className="font-mono">
                            {item.code}
                          </Badge>
                          <Badge size="sm" variant="secondary">
                            {item.category}
                          </Badge>
                        </div>
                      </td>
                      <td className="px-4 py-4 align-middle">
                        <div className="space-y-1">
                          <p className="font-semibold text-slate-900">{item.name}</p>
                          <p className="text-xs text-slate-500">Proveedor: {item.provider}</p>
                          <p className="text-xs text-slate-500">Garantía: {item.warrantyActive ? 'Activa' : 'No aplica'}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4 align-middle">
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2 text-slate-700">
                            <MapPin className="h-4 w-4 text-slate-400" />
                            <span>{item.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-500">
                            <ClipboardList className="h-4 w-4 text-slate-400" />
                            <span>{item.process}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 align-middle">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-slate-700">
                            <ShieldCheck className="h-4 w-4 text-slate-400" />
                            <span>{item.assignedTo}</span>
                          </div>
                          <div className="text-xs text-slate-500">Área: {item.area}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4 align-middle">
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-1">
                            <Badge size="sm" variant={maintenanceVariant(item.maintenanceType)}>
                              {item.maintenanceType}
                            </Badge>
                            <Badge size="sm" variant={calibrationVariant(item.calibrationStatus)}>
                              {item.calibrationStatus}
                            </Badge>
                            <Badge size="sm" variant={criticalityVariant(item.criticality)}>
                              Criticidad {item.criticality}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                            <span className="inline-flex items-center gap-1">
                              <CalendarDays className="h-3.5 w-3.5" /> Último: {formatDate(item.lastMaintenance)}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <CalendarDays className="h-3.5 w-3.5 text-emerald-500" /> Próximo: {formatDate(item.nextMaintenance)}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 align-middle">
                        <div className="flex flex-col gap-2">
                          <Badge size="sm" variant="info">
                            {item.classification}
                          </Badge>
                          <Badge size="sm" variant="secondary">
                            {item.riskClass}
                          </Badge>
                        </div>
                      </td>
                      <td className="px-4 py-4 align-middle">
                        <div className="flex flex-col gap-2">
                          <Badge size="sm" variant={invimaVariant(item.invimaStatus)}>
                            {item.invimaStatus}
                          </Badge>
                          <Badge size="sm" variant={item.warrantyActive ? 'success' : 'warning'}>
                            {item.warrantyActive ? 'Garantía activa' : 'Sin garantía'}
                          </Badge>
                        </div>
                      </td>
                      <td className="px-4 py-4 align-middle">
                        <Badge size="sm" variant={statusVariant(item.status)}>
                          {item.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 text-center align-middle">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            className="rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:border-emerald-200 hover:text-emerald-600"
                            aria-label="Gestionar imágenes"
                          >
                            <ImageIcon className="h-4 w-4" />
                          </button>
                          <button
                            className="rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:border-amber-200 hover:text-amber-600"
                            aria-label="Editar registro"
                          >
                            <PencilLine className="h-4 w-4" />
                          </button>
                          <button
                            className="rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:border-emerald-200 hover:text-emerald-600"
                            aria-label="Ver hoja de vida"
                          >
                            <FileText className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="divide-y divide-slate-200 lg:hidden">
            {equipment.map((item) => (
              <div key={item.id} className="space-y-4 px-4 py-5">
                <div className="flex items-start gap-3">
                  <Checkbox checked={selectedIds.includes(item.id)} onChange={() => toggleSelect(item.id)} aria-label={`Seleccionar ${item.name}`} />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="text-base font-semibold text-slate-900">{item.name}</p>
                        <p className="font-mono text-xs text-slate-500">{item.code}</p>
                      </div>
                      <Badge size="sm" variant={statusVariant(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                    <div className="mt-3 grid gap-2 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-slate-400" /> {item.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Package2 className="h-4 w-4 text-slate-400" /> {item.category}
                      </div>
                      <div className="flex items-center gap-2">
                        <ClipboardList className="h-4 w-4 text-slate-400" /> {item.process}
                      </div>
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-slate-400" /> {item.assignedTo}
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <CalendarDays className="h-3.5 w-3.5" /> Último {formatDate(item.lastMaintenance)} · Próximo {formatDate(item.nextMaintenance)}
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge size="sm" variant={maintenanceVariant(item.maintenanceType)}>
                        {item.maintenanceType}
                      </Badge>
                      <Badge size="sm" variant={calibrationVariant(item.calibrationStatus)}>
                        {item.calibrationStatus}
                      </Badge>
                      <Badge size="sm" variant={criticalityVariant(item.criticality)}>
                        {item.riskClass}
                      </Badge>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <button className="rounded-xl border border-slate-200 p-2 text-slate-500">
                        <ImageIcon className="h-4 w-4" />
                      </button>
                      <button className="rounded-xl border border-slate-200 p-2 text-slate-500">
                        <PencilLine className="h-4 w-4" />
                      </button>
                      <button className="rounded-xl border border-slate-200 p-2 text-slate-500">
                        <FileText className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="border-t border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {filteredTotal === 0 ? (
              <span>Sin equipos para mostrar · {total} en catálogo</span>
            ) : (
              <span>
                Mostrando {rangeStart}-{rangeEnd} de {filteredTotal} equipos · Catálogo total: {total}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handlePrevPage} disabled={page === 1}>
              Anterior
            </Button>
            <span className="text-slate-500">
              Página {page} de {totalPages}
            </span>
            <Button variant="ghost" size="sm" onClick={handleNextPage} disabled={page >= totalPages}>
              Siguiente
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
