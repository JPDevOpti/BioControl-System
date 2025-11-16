import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageCircle, Plus } from 'lucide-react'

const tickets = [
  {
    id: 'SOP-3321',
    title: 'Alarma recurrente en incubadora',
    priority: 'Alta',
    assignee: 'Laura Restrepo',
    status: 'En curso',
    updatedAt: 'Hace 2 horas'
  },
  {
    id: 'SOP-3316',
    title: 'Actualización de firmware - Citocentrífuga',
    priority: 'Media',
    assignee: 'Carlos Méndez',
    status: 'Pendiente de proveedor',
    updatedAt: 'Hace 5 horas'
  },
  {
    id: 'SOP-3302',
    title: 'Solicitud de insumos para calibración',
    priority: 'Baja',
    assignee: 'Ana Rodríguez',
    status: 'Resuelto',
    updatedAt: 'Ayer'
  }
]

const priorityColor: Record<string, string> = {
  Alta: 'bg-rose-400/20 text-rose-200 border-rose-500/30',
  Media: 'bg-amber-400/20 text-amber-200 border-amber-500/30',
  Baja: 'bg-emerald-400/20 text-emerald-200 border-emerald-500/30'
}

export function TicketBoard() {
  return (
    <Card
      title="Tickets recientes"
      description="Gestión visual de soporte interno. Integración futura con API y WebSockets."
      className="border-white/10 bg-white/5"
      actions={
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Nuevo ticket
        </Button>
      }
    >
      <div className="space-y-3">
        {tickets.map((ticket) => (
          <article
            key={ticket.id}
            className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70 md:flex-row md:items-center md:justify-between"
          >
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest text-white/40">{ticket.id}</p>
              <p className="text-sm font-semibold text-white">{ticket.title}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="rounded-full border bg-white/5 px-3 py-1 text-white/60">{ticket.status}</span>
              <span className={`rounded-full border px-3 py-1 ${priorityColor[ticket.priority]}`}>{ticket.priority}</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/60">
                Asignado a {ticket.assignee}
              </span>
              <span className="text-white/40">{ticket.updatedAt}</span>
            </div>
          </article>
        ))}
      </div>
    </Card>
  )
}

