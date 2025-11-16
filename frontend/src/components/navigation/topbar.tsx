"use client"

import { useState } from 'react'
import { Menu, Search, UserRound } from 'lucide-react'

interface TopbarProps {
  onToggleSidebar?: () => void
}

export function Topbar({ onToggleSidebar }: TopbarProps) {
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-4 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-xl shadow-sm lg:px-6">
      <div className="flex flex-1 items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
          aria-label="Alternar sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Buscador */}
        <div className="relative flex-1 max-w-2xl">
          <div className={`relative flex items-center transition-all ${searchFocused ? 'scale-[1.02]' : ''}`}>
            <Search className="absolute left-4 h-5 w-5 text-slate-400 transition-colors" />
            <input
              type="search"
              placeholder="Buscar equipos, mantenimientos, técnicos..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-12 pr-4 text-sm text-slate-900 placeholder-slate-500 transition-all focus:border-emerald-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Usuario */}
  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 shadow-sm shadow-emerald-500/30">
            <UserRound className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <div className="hidden text-sm sm:block">
            <p className="font-semibold text-slate-900">Sara Ochoa</p>
            <p className="text-xs text-slate-600">Ingeniera biomédica</p>
          </div>
        </div>
      </div>
    </header>
  )
}

