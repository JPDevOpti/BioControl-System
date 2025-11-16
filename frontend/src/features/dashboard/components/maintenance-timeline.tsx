'use client'

import { Card } from '@/components/ui/card'
import { Settings, SlidersHorizontal, AlertCircle } from 'lucide-react'
import { useServiceFilter } from '../context/service-filter-context'

const allSchedule = [
  {
    title: 'Preventivo - Centrífuga HANIL FLETA 40P',
    sede: 'Hospital San Vicente',
    servicio: 'Laboratorio Clínico',
    servicioKey: 'laboratorio',
    technician: 'Carlos Méndez',
    type: 'preventivo',
    icon: Settings,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    title: 'Preventivo - Microscopio Olympus CX31',
    sede: 'Clínica León XIII',
    servicio: 'Microbiología',
    servicioKey: 'microbiologia',
    technician: 'Ana Rodríguez',
    type: 'preventivo',
    icon: Settings,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    title: 'Preventivo - Mesa Quirúrgica Motorizada',
    sede: 'Clínica León XIII',
    servicio: 'Quirófano',
    servicioKey: 'quirofano',
    technician: 'Técnico Biomédico',
    type: 'preventivo',
    icon: Settings,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    title: 'Calibración - Balanza Analítica A&D HR-200',
    sede: 'Hospital San Vicente',
    servicio: 'Farmacia',
    servicioKey: 'farmacia',
    technician: 'Laboratorio Metrotech',
    type: 'calibracion',
    icon: SlidersHorizontal,
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600'
  },
  {
    title: 'Calibración - Resonancia Magnética Siemens',
    sede: 'Hospital San Vicente',
    servicio: 'Imágenes Diagnósticas',
    servicioKey: 'imagenes',
    technician: 'Siemens Healthcare',
    type: 'calibracion',
    icon: SlidersHorizontal,
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600'
  },
  {
    title: 'Correctivo - Criostato Leica CM1860 UV',
    sede: 'Hospital Universitario',
    servicio: 'Patología',
    servicioKey: 'patologia',
    technician: 'Soporte externo',
    type: 'correctivo',
    icon: AlertCircle,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600'
  }
]

export function MaintenanceTimeline() {
  const { selectedService } = useServiceFilter()
  
  const filteredSchedule = selectedService === 'all' 
    ? allSchedule 
    : allSchedule.filter(item => item.servicioKey === selectedService)

  return (
    <Card
      title="Agenda de mantenimientos"
      description={`${filteredSchedule.length} intervenciones programadas`}
      className="border-slate-200 bg-white shadow-sm"
    >
      <div className="space-y-3">
        {filteredSchedule.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
            <p className="text-sm text-slate-600">No hay mantenimientos programados para este servicio</p>
          </div>
        ) : (
          filteredSchedule.map((item, index) => (
            <div key={item.title} className="group relative">
              {/* Línea conectora */}
              {index < filteredSchedule.length - 1 && (
                <div className="absolute left-[18px] top-10 h-[calc(100%+0.25rem)] w-[2px] bg-gradient-to-b from-slate-200 to-transparent" />
              )}
              
              {/* Item */}
              <div className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50/50 p-2.5 transition-all hover:border-slate-200 hover:bg-white hover:shadow-sm">
                <span className={`grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg ${item.iconBg}`}>
                  <item.icon className={`h-4.5 w-4.5 ${item.iconColor}`} strokeWidth={2} />
                </span>
                <div className="min-w-0 flex-1 space-y-1">
                  <p className="text-sm font-semibold leading-tight text-slate-900">{item.title}</p>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <span className="font-medium">{item.sede}</span>
                    <span className="text-slate-400">•</span>
                    <span>{item.servicio}</span>
                  </div>
                  <p className="text-xs text-slate-500">{item.technician}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}

