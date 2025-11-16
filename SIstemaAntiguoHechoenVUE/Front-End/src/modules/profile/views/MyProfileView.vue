<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="p-3 sm:p-4 md:p-6">
      <div class="max-w-6xl mx-auto">
        <div v-if="isLoading" class="space-y-6">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="animate-pulse">
              <div class="flex items-center space-x-4 mb-6">
                <div class="w-24 h-24 bg-gray-200 rounded-full"></div>
                <div class="space-y-2">
                  <div class="h-6 bg-gray-200 rounded w-48"></div>
                  <div class="h-4 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="userProfile" class="space-y-6">
          <ProfileHeader 
            :user="userProfile" 
          />
          <ProfileInfo :user="userProfile" />
        </div>

        <div v-else-if="error" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="text-center">
            <ErrorIcon class="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Error al cargar el perfil</h3>
            <p class="text-gray-600 mb-4">{{ error }}</p>
            <button
              @click="loadUserProfile"
              class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    </div>

  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { AdminLayout } from '@/shared/layouts'
import { PageBreadcrumb } from '@/shared/components/navigation'
import { ErrorIcon } from '@/assets/icons'
import { ProfileHeader, ProfileInfo } from '../components'
import type { UserProfile } from '../types/userProfile.types'
import { useAuthStore } from '@/stores/auth.store'
import { useNotifications } from '@/shared/composables'

const currentPageTitle = ref('Mi Perfil')
const isLoading = ref(true)
const error = ref<string | null>(null)
const userProfile = ref<UserProfile | null>(null)
const { showError } = useNotifications()

const authStore = useAuthStore()
const router = useRouter()

const loadUserProfile = async () => {
  try {
    isLoading.value = true
    error.value = null
    
    // Restaurar sesión si no hay usuario
    if (!authStore.user && !authStore.isAuthenticated) {
      authStore.restoreSession()
    }
    
    const authUser = authStore.user
    
    // Si después de restaurar aún no hay usuario, redirigir al login
    if (!authUser) {
      router.push('/login')
      return
    }

    // Crear perfil básico desde el usuario autenticado
    const fullName = authUser.name || ''
    const [firstName, ...rest] = fullName.split(' ').filter(Boolean)
    const lastName = rest.join(' ') || ''

    userProfile.value = {
      id: authUser.id,
      firstName: firstName || authUser.email.split('@')[0],
      lastName: lastName,
      email: authUser.email,
      phone: '',
      document: '',
      documentType: 'CC',
      role: authUser.role,
      avatar: undefined,
      isActive: true,
      lastLogin: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
      roleSpecificData: {}
    }

  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Error desconocido'
    // Solo mostrar error si no es por falta de autenticación
    if (!error.value.includes('autenticado')) {
      showError('Error al cargar el perfil', error.value)
    } else {
      router.push('/login')
    }
  } finally {
    isLoading.value = false
  }
}


onMounted(() => {
  loadUserProfile()
})
</script>

