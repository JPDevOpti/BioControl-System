import { Card } from '@/components/ui/card'
import { Clock } from 'lucide-react'

const timeline = [
  {
    title: 'Cierre de orden correctiva',
    description: 'Validó informe técnico y cerró ticket SOP-3314',
    date: '14 nov · 09:15 a. m.'
  },
  {
    title: 'Programación preventiva',
    description: 'Agenda mantenimiento preventivo para centrífuga HANIL',
    date: '13 nov · 05:42 p. m.'
  },
  {
    title: 'Actualización inventario',
    description: 'Adjuntó hoja de vida actualizada equipo BIO-16869',
    date: '13 nov · 03:11 p. m.'
  },
  {
    title: 'Escalamiento a proveedor',
    description: 'Escaló ticket SOP-3308 a servicios externos',
    date: '12 nov · 10:08 a. m.'
  }
]

export function ActivityTimeline() {
  return (
    <Card title="Actividad reciente" className="border-white/10 bg-white/5">
      <ul className="space-y-5">
        {timeline.map((item) => (
          <li key={item.title} className="flex gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60">
              <Clock className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-xs text-white/60">{item.description}</p>
              <p className="text-xs text-white/40">{item.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}

