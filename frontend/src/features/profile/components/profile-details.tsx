import { Card } from '@/components/ui/card'

const details = [
  { label: 'Correo institucional', value: 'laura.restrepo@hospitalalmamater.co' },
  { label: 'Rol en plataforma', value: 'Coordinadora' },
  { label: 'Áreas asignadas', value: 'Patología, Dermatopatología, Resonancia' },
  { label: 'Teléfono', value: '+57 300 000 1234' },
  { label: 'Turno principal', value: 'Lunes a viernes · 7:00 a. m. - 4:00 p. m.' },
  { label: 'Último acceso', value: '14 de nov · 07:45 a. m. · IP 190.25.166.10' }
]

const permissions = [
  'Planificar y aprobar mantenimientos preventivos',
  'Registrar correctivos y calibraciones',
  'Gestión total de inventario biomédico',
  'Revisión de indicadores ejecutivos',
  'Acceso a soporte y escalamiento con proveedores'
]

export function ProfileDetails() {
  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <Card title="Información general" className="border-white/10 bg-white/5">
        <dl className="grid gap-4 text-sm text-white/70 sm:grid-cols-2">
          {details.map((detail) => (
            <div key={detail.label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <dt className="text-xs uppercase tracking-wide text-white/40">{detail.label}</dt>
              <dd className="mt-1 text-sm font-medium text-white">{detail.value}</dd>
            </div>
          ))}
        </dl>
      </Card>
      <Card title="Permisos vigentes" className="border-white/10 bg-white/5">
        <ul className="space-y-3 text-sm text-white/70">
          {permissions.map((permission) => (
            <li key={permission} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-400" />
              <span>{permission}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}

