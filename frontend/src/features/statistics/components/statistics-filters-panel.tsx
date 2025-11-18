"use client"

import { memo } from 'react'
import type { ChangeEvent } from 'react'
import type { BillingFilterKey, BillingFilters, FilterField } from '../types'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/cn'

interface StatisticsFiltersPanelProps {
  filters: BillingFilters
  filterFields: FilterField[]
  onFilterChange: (key: BillingFilterKey, value: string) => void
  onResetFilters: () => void
  onApplyFilters?: () => void
  title?: string
  description?: string
}

export const StatisticsFiltersPanel = memo(function StatisticsFiltersPanel({
  filters,
  filterFields,
  onFilterChange,
  onResetFilters,
  onApplyFilters,
  title = 'Filtros de búsqueda',
  description = 'Ajusta los parámetros para refinar los indicadores de facturación.'
}: StatisticsFiltersPanelProps) {
  const handleSelectChange = (key: BillingFilterKey) => (event: ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(key, event.target.value)
  }

  return (
    <Card className="overflow-hidden border border-emerald-200 shadow-sm">
      <div className="bg-emerald-50 px-6 py-5 border-b border-emerald-200">
        <p className="text-sm font-semibold text-emerald-900">{title}</p>
        <p className="text-sm text-emerald-700">{description}</p>
      </div>
      <div className="space-y-6 px-6 pb-6 pt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {filterFields.map((field) => {
            const isFilled = Boolean(filters[field.key])
            return (
              <div key={field.key} className="space-y-2">
                <Label htmlFor={`filter-${field.key}`} className="text-sm font-medium text-slate-700">
                  {field.label}
                </Label>
                <Select
                  id={`filter-${field.key}`}
                  value={filters[field.key]}
                  onChange={handleSelectChange(field.key)}
                  aria-label={field.ariaLabel}
                  className="h-11 rounded-2xl border-slate-200 bg-white text-slate-900"
                >
                  <option value="">{field.placeholder}</option>
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </div>
            )
          })}
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-200 pt-4">
          <Button type="button" variant="ghost" onClick={onResetFilters} className="text-slate-600 hover:text-slate-900">
            Limpiar filtros
          </Button>
          <Button type="button" onClick={() => onApplyFilters?.()} className="min-w-[160px]">
            Aplicar filtros
          </Button>
        </div>
      </div>
    </Card>
  )
})
