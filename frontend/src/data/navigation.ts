export interface NavItem {
  label: string
  href: string
  icon?: string
}

export const mainNav: NavItem[] = [
  { label: 'Panel general', href: '/dashboard', icon: 'layout' },
  { label: 'Inventario', href: '/inventario', icon: 'boxes' },
  { label: 'Mantenimiento', href: '/mantenimiento', icon: 'calendar' },
  { label: 'Soporte', href: '/soporte', icon: 'lifebuoy' },
  { label: 'Mi perfil', href: '/perfil', icon: 'user' }
]

export const secondaryNav: NavItem[] = [
  { label: 'Documentación', href: '#', icon: 'book' },
  { label: 'Configuración', href: '#', icon: 'settings' }
]

