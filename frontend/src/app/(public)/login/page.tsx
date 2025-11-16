"use client"

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, User, Lock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push('/dashboard')
  }

  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
      {/* Logo LIME */}
      <div className="mb-6 flex items-center justify-center">
        <Image
          src="/Images/Logo-LIME-NoFondo.png"
          alt="Logo LIME"
          width={1000}
          height={800}
          className="h-24 w-auto object-contain"
          priority
        />
      </div>

      {/* Separador */}
      <div className="mb-6 border-b border-slate-200"></div>

      {/* Título */}
      <h1 className="mb-2 text-center text-2xl font-bold text-slate-900">Bienvenido de nuevo</h1>
      
      {/* Subtítulo */}
      <p className="mb-8 text-center text-sm text-slate-600">
        Ingrese sus credenciales para acceder al sistema
      </p>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Campo Correo electrónico */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-slate-700">
            Correo electrónico<span className="ml-1 text-red-500">*</span>
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input
              id="email"
              type="email"
              placeholder="correo@ejemplo.com"
              fullWidth
              className="h-11 border-slate-300 bg-white pl-10 transition-colors focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Campo Contraseña */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-slate-700">
            Contraseña<span className="ml-1 text-red-500">*</span>
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Ingrese su contraseña"
              fullWidth
              className="h-11 border-slate-300 bg-white pl-10 pr-10 transition-colors focus:border-cyan-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Checkbox Mantenerme conectado */}
        <div className="pt-1">
          <Checkbox
            id="remember"
            label="Mantenerme conectado"
          />
        </div>

        {/* Botón Ingresar */}
        <div className="pt-2">
          <Button 
            type="submit" 
            className="h-11 w-full rounded-lg bg-emerald-500 font-medium text-white transition-colors hover:bg-emerald-600"
          >
            <ArrowRight className="h-4 w-4" />
            Ingresar
          </Button>
        </div>
      </form>
    </div>
  )
}

