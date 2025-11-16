"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

interface ServiceFilterContextType {
  selectedService: string
  setSelectedService: (service: string) => void
}

const ServiceFilterContext = createContext<ServiceFilterContextType | undefined>(undefined)

export function ServiceFilterProvider({ children }: { children: ReactNode }) {
  const [selectedService, setSelectedService] = useState('all')

  return (
    <ServiceFilterContext.Provider value={{ selectedService, setSelectedService }}>
      {children}
    </ServiceFilterContext.Provider>
  )
}

export function useServiceFilter() {
  const context = useContext(ServiceFilterContext)
  if (context === undefined) {
    throw new Error('useServiceFilter must be used within a ServiceFilterProvider')
  }
  return context
}
