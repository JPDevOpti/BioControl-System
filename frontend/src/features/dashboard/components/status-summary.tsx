import { Card } from '@/components/ui/card'

const items = [
  {
    label: 'Operativos',
    value: 142,
    dot: 'bg-emerald-500',
    bar: 'bg-emerald-500'
  },
  {
    label: 'En mantenimiento',
    value: 18,
    dot: 'bg-blue-500',
    bar: 'bg-blue-500'
  },
  {
    label: 'Fuera de servicio',
    value: 6,
    dot: 'bg-red-500',
    bar: 'bg-red-500'
  }
]

export function StatusSummary() {
  const total = items.reduce((acc, item) => acc + item.value, 0)

  return (
    <div className="space-y-3">
      {/* Estado del parque */}
      <div className="grid grid-cols-1 gap-2.5">
        {items.map((item) => {
          const share = total > 0 ? Math.round((item.value / total) * 100) : 0

          return (
            <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${item.dot}`} />
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                    {item.label}
                  </span>
                </div>
                <span className="text-lg font-bold text-slate-900">{item.value}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 flex-1 rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${item.bar} transition-all`}
                    style={{ width: `${share}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-slate-500">{share}%</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

