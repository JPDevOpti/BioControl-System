import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Settings, LogOut } from 'lucide-react'

export function ProfileHeader() {
  return (
    <Card className="border-white/10 bg-white/5">
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="https://i.pravatar.cc/100?img=32"
            alt="Avatar de usuario"
            width={80}
            height={80}
            className="rounded-3xl border border-white/20"
          />
          <div>
            <h2 className="text-2xl font-semibold text-white">Laura Restrepo</h2>
            <p className="text-sm text-white/60">Coordinadora biomédica · Hospital AlmaMáter</p>
            <p className="text-xs text-white/40">Miembro desde 14 de marzo de 2021</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="secondary" className="gap-2">
            <Settings className="h-4 w-4" />
            Configurar perfil
          </Button>
          <Button variant="ghost" className="gap-2 text-white/70 hover:text-white">
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </Button>
        </div>
      </div>
    </Card>
  )
}

