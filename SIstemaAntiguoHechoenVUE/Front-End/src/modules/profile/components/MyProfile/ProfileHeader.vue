<template>
  <ComponentCard :hide-header="true" customClass="mb-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
      <!-- User Info Section -->
      <div class="flex flex-col sm:flex-row sm:items-center gap-4">
        <!-- Avatar -->
        <div class="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto sm:mx-0">
          <div
            class="w-full h-full rounded-full overflow-hidden border-2 border-blue-200 shadow-lg group"
          >
            <div class="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-gray-700">
              <component :is="getRoleIcon()" class="w-[86%] h-[86%]" />
            </div>
          </div>
          
          <!-- Status Indicator -->
          <div 
            class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white shadow-sm"
            :class="user.isActive ? 'bg-green-500' : 'bg-gray-400'"
            :title="user.isActive ? 'Usuario activo' : 'Usuario inactivo'"
          ></div>
        </div>

        <!-- User Details -->
        <div class="text-center sm:text-left">
          <h2 class="text-2xl font-bold text-gray-900 mb-1">
            {{ user.firstName }} {{ user.lastName }}
          </h2>

          <p class="text-sm text-gray-600">
            {{ user.email }}
          </p>

          <p v-if="user.lastLogin" class="text-xs text-gray-500 mt-1">
            Último acceso: {{ formatLastLogin(user.lastLogin) }}
          </p>
        </div>
      </div>

    </div>
  </ComponentCard>
</template>

<script setup lang="ts">
import type { UserProfile, UserRole } from '../../types/userProfile.types'
import ComponentCard from '@/shared/components/layout/ComponentCard.vue'
import { UserCircleIcon } from '@/assets/icons'

interface Props {
  user: UserProfile
}

const props = defineProps<Props>()

// Normalización defensiva del rol para el icono
const normalizeRole = (role: string): UserRole => {
  const r = String(role || '').toLowerCase()
  if (['admin', 'administrator'].includes(r)) return 'admin'
  if (['coordinator', 'coordinador'].includes(r)) return 'coordinator'
  if (['technician', 'tecnico', 'técnico'].includes(r)) return 'technician'
  return 'technician'
}

const normalizedRole = normalizeRole((props as any).user?.role)

const formatLastLogin = (date: Date): string => {
  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}

const getRoleIcon = () => {
  return UserCircleIcon
}
</script>

