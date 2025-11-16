import { Card } from '@/components/ui/card'

const stats = [
  { label: 'Tickets abiertos', value: 12, detail: '+3 en la última semana' },
  { label: 'Resolución promedio', value: '9h 12m', detail: '-1h vs objetivo' },
  { label: 'Satisfacción', value: '4,6 / 5', detail: '28 respuestas del mes' },
  { label: 'Escalamientos', value: 2, detail: 'Se revisan cada lunes' }
]

export function SupportStats() {
  return (
    <Card title="Indicadores de soporte" className="border-white/10 bg-white/5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-xs text-white/50">{stat.label}</p>
            <p className="text-2xl font-semibold text-white">{stat.value}</p>
            <p className="text-xs text-white/40">{stat.detail}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

