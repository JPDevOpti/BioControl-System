"use client"

import { memo } from 'react'
import type { BillingFilters, BillingRecord, MaintenanceType, ProviderSummaryRow } from '../types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface StatisticsTablePanelProps {
  filters: BillingFilters
  providerSummary: ProviderSummaryRow[]
  equipmentRows: BillingRecord[]
  maintenanceTypes: { value: MaintenanceType; label: string }[]
  formatMoney: (value: number) => string
  onClearProvider?: () => void
  selectedMonthLabel?: string
  selectedMaintenanceType?: MaintenanceType
  selectedProviderName?: string
}

export const StatisticsTablePanel = memo(function StatisticsTablePanel({
  filters,
  providerSummary,
  equipmentRows,
  maintenanceTypes,
  formatMoney,
  onClearProvider,
  selectedMonthLabel,
  selectedMaintenanceType,
  selectedProviderName
}: StatisticsTablePanelProps) {
  const showingProviderDetail = Boolean(filters.provider)
  const providerLabel = showingProviderDetail
    ? selectedProviderName ?? providerSummary.find((provider) => provider.provider === filters.provider)?.providerName
    : undefined
  const typeLabel = selectedMaintenanceType
    ? maintenanceTypes.find((type) => type.value === selectedMaintenanceType)?.label
    : undefined
  const activeMaintenanceColumns = selectedMaintenanceType
    ? maintenanceTypes.filter((type) => type.value === selectedMaintenanceType)
    : maintenanceTypes

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="space-y-0">
        {(selectedMonthLabel || selectedMaintenanceType) && (
          <div className="flex flex-wrap gap-2 border-b border-slate-200 bg-slate-50/50 px-6 py-4">
            {selectedMonthLabel && (
              <Badge variant="secondary" className="rounded-full bg-emerald-50 text-emerald-700 border-emerald-200">
                <span className="text-xs">Mes: {selectedMonthLabel}</span>
              </Badge>
            )}
            {typeLabel && (
              <Badge variant="secondary" className="rounded-full bg-blue-50 text-blue-700 border-blue-200">
                <span className="text-xs">Tipo: {typeLabel}</span>
              </Badge>
            )}
          </div>
        )}

        {showingProviderDetail && (
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-200 bg-emerald-50 px-6 py-5">
            <div className="flex-1 space-y-1">
              <p className="text-lg font-semibold text-emerald-900">{providerLabel ?? 'Proveedor seleccionado'}</p>
              <p className="text-sm text-emerald-700">
                {equipmentRows.length} intervención{equipmentRows.length !== 1 ? 'es' : ''} registrada{equipmentRows.length !== 1 ? 's' : ''}
                {selectedMonthLabel && ` en ${selectedMonthLabel}`}
                {typeLabel && ` · Tipo: ${typeLabel}`}
              </p>
            </div>
            {onClearProvider && (
              <Button size="sm" variant="ghost" onClick={onClearProvider} className="rounded-lg border border-emerald-300 bg-white text-emerald-700 hover:bg-emerald-100">
                ← Ver resumen general
              </Button>
            )}
          </div>
        )}

        {showingProviderDetail ? (
          <div className="overflow-x-auto px-6 pb-6 pt-4">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-slate-200 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  <th className="pb-4 pr-6 font-semibold">Equipo</th>
                  <th className="pb-4 pr-6 font-semibold">Código</th>
                  <th className="pb-4 pr-6 font-semibold">Tipo de intervención</th>
                  <th className="pb-4 text-right font-semibold">Costo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {equipmentRows.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-sm text-slate-500">
                      <p>No hay registros para los filtros seleccionados.</p>
                    </td>
                  </tr>
                ) : (
                  equipmentRows.map((record, index) => (
                    <tr key={record.id} className="group transition hover:bg-slate-50/50">
                      <td className="py-4 pr-6">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600">
                            {index + 1}
                          </div>
                          <p className="font-medium text-slate-900">{record.equipmentName}</p>
                        </div>
                      </td>
                      <td className="py-4 pr-6">
                        <code className="rounded bg-slate-100 px-2 py-1 text-xs font-mono text-slate-700">{record.equipmentCode}</code>
                      </td>
                      <td className="py-4 pr-6">
                        <Badge variant="info" size="sm" className="rounded-lg px-3 py-1">
                          {maintenanceTypes.find((type) => type.value === record.maintenanceType)?.label}
                        </Badge>
                      </td>
                      <td className="py-4 text-right">
                        <span className="text-base font-semibold text-slate-900">{formatMoney(record.cost)}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto px-6 pb-6 pt-4">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-slate-200 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  <th className="pb-4 pr-8 font-semibold">Proveedor</th>
                  {activeMaintenanceColumns.map((type) => (
                    <th key={type.value} className="pb-4 pr-8 text-center font-semibold">
                      {type.label}
                    </th>
                  ))}
                  <th className="pb-4 text-right font-semibold">Total facturado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {providerSummary.length === 0 ? (
                  <tr>
                    <td colSpan={activeMaintenanceColumns.length + 2} className="py-12 text-center text-sm text-slate-500">
                      <p>No hay registros de facturación para el periodo seleccionado.</p>
                    </td>
                  </tr>
                ) : (
                  providerSummary.map((provider, index) => (
                    <tr key={provider.provider} className="group transition hover:bg-slate-50/50">
                      <td className="py-5 pr-8">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 text-sm font-bold text-emerald-700">
                            {index + 1}
                          </div>
                          <p className="text-base font-semibold text-slate-900">{provider.providerName}</p>
                        </div>
                      </td>
                      {activeMaintenanceColumns.map((type) => (
                        <td key={type.value} className="py-5 pr-8 text-center">
                          <div className="inline-flex flex-col items-center gap-1 rounded-xl bg-slate-50 px-4 py-3 transition group-hover:bg-white group-hover:shadow-sm">
                            <p className="text-base font-bold text-slate-900">{formatMoney(provider.totals[type.value] ?? 0)}</p>
                            <p className="text-xs font-medium text-slate-500">
                              {provider.count[type.value] ?? 0} orden{(provider.count[type.value] ?? 0) !== 1 ? 'es' : ''}
                            </p>
                          </div>
                        </td>
                      ))}
                      <td className="py-5 text-right">
                        <span className="text-lg font-bold text-emerald-600">{formatMoney(provider.overallCost)}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
})
