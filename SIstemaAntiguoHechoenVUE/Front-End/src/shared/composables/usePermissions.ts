/**
 * Composable para manejar permisos y restricciones de roles
 */

import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth.store'

export function usePermissions() {
  const authStore = useAuthStore()

  // Getters para verificar roles específicos
  const isAdmin = computed(() => {
    const role = authStore.user?.role || ''
    return role === 'admin' || role === 'administrator'
  })
  
  // Permisos específicos por funcionalidad
  const canManageUsers = computed(() => isAdmin.value)
  const canDeleteRecords = computed(() => isAdmin.value)
  const canAccessSupport = computed(() => true) // Todos los roles pueden acceder a soporte
  const canManageSupportTickets = computed(() => isAdmin.value) // Solo admin puede gestionar tickets
  
  return {
    // Getters de roles
    isAdmin,
    
    // Permisos específicos
    canManageUsers,
    canDeleteRecords,
    canAccessSupport,
    canManageSupportTickets
  }
}

