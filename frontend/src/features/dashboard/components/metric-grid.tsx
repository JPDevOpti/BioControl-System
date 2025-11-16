import { Card } from '@/components/ui/card'
import { TrendingUp, ShieldCheck, Clock, ClipboardList } from 'lucide-react'

const metrics = [
  {
    title: 'Disponibilidad global',
    value: '96,4 %',
    trend: '+1,2 % vs mes anterior',
    icon: TrendingUp,
    color: 'from-emerald-400 to-emerald-600'
  },
  {
    title: 'Cumplimiento normativo',
    value: '88,0 %',
    trend: '4 alertas por resolver',
    icon: ShieldCheck,
    color: 'from-blue-400 to-brand-500'
  },
  {
    title: 'Órdenes activas',
    value: '27',
    trend: '14 preventivos · 8 correctivos · 5 calibraciones',
    icon: ClipboardList,
    color: 'from-amber-400 to-orange-500'
  },
  {
    title: 'Tiempo promedio de atención',
    value: '5h 42m',
    trend: '-38m vs objetivo de 6h 20m',
    icon: Clock,
    color: 'from-purple-400 to-indigo-500'
  }
]

export function MetricGrid() {
  return (
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <Card
          key={metric.title}
          className="relative overflow-hidden border-slate-200 bg-white p-5 shadow-sm"
          title={metric.title}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-semibold text-slate-900">{metric.value}</p>
              <p className="text-xs text-slate-600">{metric.trend}</p>
            </div>
            <span className="grid h-14 w-14 place-items-center rounded-xl bg-slate-100">
              <metric.icon className="h-6 w-6 text-slate-600" strokeWidth={1.5} />
            </span>
          </div>
        </Card>
      ))}
    </section>
  )
}

