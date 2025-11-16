// Composable para el control del Sidebar en MedInventory
import { ref, computed, onMounted, onUnmounted, provide, inject } from 'vue'
import type { Ref } from 'vue'

// Interface que define la estructura del contexto del sidebar
interface SidebarContextType {
  isExpanded: Ref<boolean>                      // Controla si el sidebar está expandido
  isMobileOpen: Ref<boolean>                    // Controla si el sidebar está abierto en vista móvil
  isHovered: Ref<boolean>                       // Controla si el mouse está sobre el sidebar
  activeItem: Ref<string | null>                // Almacena el ítem activo actual
  openSubmenu: Ref<string | null>               // Almacena el submenú abierto actual
  sidebarOpen: Ref<boolean>                     // Estado combinado del sidebar para compatibilidad
  toggleSidebar: () => void                     // Función para alternar el estado del sidebar
  toggleMobileSidebar: () => void               // Función para alternar el estado móvil
  setIsHovered: (isHovered: boolean) => void    // Función para establecer el estado de hover
  setActiveItem: (item: string | null) => void  // Función para establecer el ítem activo
  toggleSubmenu: (item: string) => void         // Función para alternar submenús
}

// Símbolo único para inyección de dependencias
const SidebarSymbol = Symbol()

// Función principal que provee el contexto del sidebar
export function useSidebarProvider() {
  // Estados reactivos del sidebar
  const isExpanded = ref(true)                    // Sidebar expandido por defecto
  const isMobileOpen = ref(false)                 // Sidebar móvil cerrado por defecto
  const isMobile = ref(false)                     // Estado de detección móvil
  const isHovered = ref(false)                    // Estado de hover
  const activeItem = ref<string | null>(null)     // Ítem activo
  const openSubmenu = ref<string | null>(null)    // Submenú abierto

  // Función para manejar cambios de tamaño de ventana
  const handleResize = () => {
    const mobile = window.innerWidth < 768    // Detecta si es vista móvil (< 768px)
    isMobile.value = mobile
    if (!mobile) {
      isMobileOpen.value = false              // Cierra sidebar móvil en desktop
    }
  }

  // Configuración de eventos al montar el componente
  onMounted(() => {
    handleResize()                                  // Verifica tamaño inicial
    window.addEventListener('resize', handleResize) // Escucha cambios de tamaño
  })

  // Limpieza de eventos al desmontar
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  // Función para alternar el estado del sidebar
  const toggleSidebar = () => {
    if (isMobile.value) {
      isMobileOpen.value = !isMobileOpen.value    // Alterna en móvil
    } else {
      isExpanded.value = !isExpanded.value        // Alterna en desktop
    }
  }

  // Función específica para alternar el sidebar en móvil
  const toggleMobileSidebar = () => {
    isMobileOpen.value = !isMobileOpen.value
  }

  // Función para establecer el estado de hover
  const setIsHovered = (value: boolean) => {
    isHovered.value = value
  }

  // Función para establecer el ítem activo
  const setActiveItem = (item: string | null) => {
    activeItem.value = item
  }

  // Función para alternar submenús
  const toggleSubmenu = (item: string) => {
    openSubmenu.value = openSubmenu.value === item ? null : item
  }

  // Creación del contexto con todos los estados y funciones
  const context: SidebarContextType = {
    isExpanded: computed(() => (isMobile.value ? false : isExpanded.value)), // Computed para manejar expansión móvil
    isMobileOpen,
    isHovered,
    activeItem,
    openSubmenu,
    sidebarOpen: computed(() => isMobile.value ? isMobileOpen.value : isExpanded.value), // Estado combinado
    toggleSidebar,
    toggleMobileSidebar,
    setIsHovered,
    setActiveItem,
    toggleSubmenu,
  }

  // Provee el contexto para componentes hijos
  provide(SidebarSymbol, context)

  return context
}

// Función para consumir el contexto del sidebar en componentes hijos
export function useSidebar(): SidebarContextType {
  const context = inject<SidebarContextType>(SidebarSymbol)
  if (!context) {
    throw new Error(
      'useSidebar debe usarse dentro de un componente que tenga SidebarProvider como ancestro',
    )
  }
  return context
}
