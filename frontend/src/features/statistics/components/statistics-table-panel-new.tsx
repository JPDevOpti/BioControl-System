"use client"

import { memo } from 'react'
import type { BillingRecord } from '../types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/cn'

interface StatisticsTablePanelProps {
  records: BillingRecord[]
  formatMoney: (value: number) => string
  formatDate: (date: string) => string
}

export const StatisticsTablePanel = memo(function StatisticsTablePanel({
  records,
  formatMoney,
  formatDate
}: StatisticsTablePanelProps) {
  const totalCost = records.reduce((sum, record) => sum + record.cost, 0)

  return (
    <Card className="overflow-hidden border border-slate-200 shadow-sm">
      <div className="bg-emerald-50 px-6 py-5 border-b border-emerald-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-900">Equipos intervenidos</p>
            <p className="text-sm text-emerald-700">
              {records.length} {records.length === 1 ? 'registro' : 'registros'} encontrados
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium text-emerald-700 uppercase tracking-wide">Total</p>
            <p className="text-lg font-bold text-emerald-900">{formatMoney(totalCost)}</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="px-6 py-6">
          {records.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
              <p className="text-base font-medium text-slate-700">No se encontraron registros</p>
              <p className="text-sm text-slate-500">No hay equipos intervenidos con los filtros seleccionados</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="border-b border-slate-200">
                <tr>
                  <th className="pb-3 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">#</th>
                  <th className="pb-3 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Nombre del equipo</th>
                  <th className="pb-3 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Servicio</th>
                  <th className="pb-3 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Tipo de mantenimiento</th>
                  <th className="pb-3 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Proveedor</th>
                  <th className="pb-3 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Fecha</th>
                  <th className="pb-3 pr-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-600">Costo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {records.map((record, idx) => (
                  <tr key={record.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="py-4 pr-4 text-sm">
                      <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-slate-200 h-7 w-7 text-xs font-semibold text-slate-700 group-hover:from-emerald-50 group-hover:to-emerald-100 group-hover:text-emerald-700 transition-all">
                        {idx + 1}
                      </span>
                    </td>
                    <td className="py-4 pr-4 text-sm">
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-slate-900">{record.equipmentName}</span>
                        <span className="text-xs text-slate-500">{record.equipmentCode}</span>
                      </div>
                    </td>
                    <td className="py-4 pr-4 text-sm">
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                        {record.service}
                      </Badge>
                    </td>
                    <td className="py-4 pr-4 text-sm">
                      <Badge
                        variant="secondary"
                        className={cn(
                          'text-xs',
                          record.maintenanceType === 'preventivo' && 'bg-green-50 text-green-700 border-green-200',
                          record.maintenanceType === 'correctivo' && 'bg-amber-50 text-amber-700 border-amber-200',
                          record.maintenanceType === 'calibracion' && 'bg-purple-50 text-purple-700 border-purple-200'
                        )}
                      >
                        {record.maintenanceType === 'preventivo' && 'Preventivo'}
                        {record.maintenanceType === 'correctivo' && 'Correctivo'}
                        {record.maintenanceType === 'calibracion' && 'Calibración'}
                      </Badge>
                    </td>
                    <td className="py-4 pr-4 text-sm">
                      <span className="text-slate-900">{record.providerName}</span>
                    </td>
                    <td className="py-4 pr-4 text-sm">
                      <span className="text-slate-700">{formatDate(record.date)}</span>
                    </td>
                    <td className="py-4 pr-4 text-sm text-right">
                      <span className="font-semibold text-slate-900">{formatMoney(record.cost)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Card>
  )
})
