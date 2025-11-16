<!--
  Componente UserMenu
  Menú de usuario en el encabezado para MedInventory.
  Muestra el perfil del usuario con datos simulados del auth store.
-->
<template>
  <div class="relative" ref="dropdownRef">
    <button
      class="flex items-center text-gray-700 hover:text-brand-500 transition-colors duration-200"
      @click.prevent="toggleDropdown"
    >
      <span class="mr-3 flex items-center justify-center rounded-full h-12 w-12 ring-2 ring-gray-200 hover:ring-brand-500 transition-all duration-200 bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700">
        <UserCircleIcon class="w-[80%] h-[80%]" />
      </span>

      <div class="mr-1 text-left">
        <span class="block font-medium text-sm">{{ userName }}</span>
      </div>

      <ChevronDownIcon 
        :class="{ 'rotate-180': dropdownOpen }" 
        class="transition-transform duration-200 ml-2 w-4 h-4"
      />
    </button>

    <!-- Dropdown Start -->
    <div
      v-if="dropdownOpen"
      class="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-xl animate-fadeIn"
    >
      <div class="p-2">
        <span class="block font-medium text-gray-700 text-sm">
          {{ userName }}
        </span>
        <span class="mt-0.5 block text-xs text-gray-500">
          {{ userEmail }}
        </span>
      </div>

      <ul class="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200">
        <li v-for="item in menuItems" :key="item.href">
          <router-link
            :to="item.href"
            class="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-sm hover:bg-gray-100 hover:text-brand-500 transition-all duration-200"
          >
            <component
              :is="item.icon"
              class="text-gray-500 group-hover:text-brand-500 transition-colors duration-200 w-5 h-5"
            />
            {{ item.text }}
          </router-link>
        </li>
      </ul>
      <button
        @click="signOut"
        class="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-sm hover:bg-red-50 hover:text-red-500 transition-all duration-200 w-full text-left"
      >
        <LogoutIcon
          class="text-gray-500 group-hover:text-red-500 transition-colors duration-200 w-5 h-5"
        />
        Cerrar Sesión
      </button>
    </div>
    <!-- Dropdown End -->
  </div>
</template>

<script setup lang="ts">
import { UserCircleIcon, ChevronDownIcon, LogoutIcon } from '@/assets/icons'
import { RouterLink, useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()
const router = useRouter()
const dropdownOpen = ref(false)
const dropdownRef = ref<HTMLDivElement | null>(null)

// Computed properties para datos del usuario (simulados del auth store)
const userName = computed(() => {
  return authStore.user?.name || authStore.user?.email?.split('@')[0] || 'Usuario'
})

const userEmail = computed(() => {
  return authStore.user?.email || 'demo@medinventory.test'
})

const userRole = computed(() => {
  return authStore.user?.role || 'Administrador'
})

const menuItems = [
  { href: '/profile', icon: UserCircleIcon, text: 'Mi Perfil' },
]

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const closeDropdown = () => {
  dropdownOpen.value = false
}

const signOut = async () => {
  try {
    await authStore.logout()
    closeDropdown()
    router.push('/login')
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}
</style>
