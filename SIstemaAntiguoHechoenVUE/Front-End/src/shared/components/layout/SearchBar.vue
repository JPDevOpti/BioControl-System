<!--
  Componente SearchBar
  Barra de búsqueda simplificada para MedInventory (frontend-only).
-->
<template>
  <div class="hidden lg:block">
    <form @submit.prevent="handleSearch">
      <div class="relative max-w-[430px]" ref="containerRef">
        <button 
          type="button"
          class="absolute -translate-y-1/2 left-4 top-1/2 hover:text-brand-500 transition-colors duration-200"
        >
          <svg
            class="fill-current"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
              fill=""
            />
          </svg>
        </button>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar en MedInventory..."
          class="h-11 w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-12 pr-3 text-sm text-gray-800 shadow-sm placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all duration-200"
          @focus="openDropdown()"
          @keydown.down.prevent="moveActive(1)"
          @keydown.up.prevent="moveActive(-1)"
          @keydown.enter.prevent="selectActive()"
          @keydown.esc.prevent="closeDropdown()"
        />

        <!-- Dropdown de sugerencias -->
        <div
          v-if="isOpen && filteredItems.length"
          class="absolute z-[9999] mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden"
          role="listbox"
        >
          <ul class="max-h-72 overflow-auto">
            <li
              v-for="(item, index) in filteredItems"
              :key="item.path"
              :class="[
                'px-3 py-2 text-sm cursor-pointer flex items-center gap-2',
                index === activeIndex ? 'bg-brand-50 text-brand-700' : 'hover:bg-gray-50 text-gray-700'
              ]"
              role="option"
              :aria-selected="index === activeIndex"
              @mousedown.prevent
              @click="navigate(item.path)"
              @mouseenter="activeIndex = index"
            >
              <span class="font-medium">{{ item.title }}</span>
              <span class="ml-auto text-xs text-gray-400">{{ item.path }}</span>
            </li>
          </ul>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const searchQuery = ref('')
const router = useRouter()
const isOpen = ref(false)
const activeIndex = ref(0)
const containerRef = ref<HTMLElement | null>(null)

interface QuickNavItem {
  title: string
  path: string
  keywords: string[]
}

// Mapeo de destinos para MedInventory (simplificado)
const quickNavItems: QuickNavItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    keywords: ['dashboard', 'inicio', 'panel', 'principal']
  },
  {
    title: 'Mi Perfil',
    path: '/profile',
    keywords: ['perfil', 'mi perfil', 'usuario', 'cuenta']
  }
]

// Filtrar items basándose en la búsqueda
const filteredItems = computed(() => {
  if (!searchQuery.value.trim()) {
    return quickNavItems.slice(0, 5)
  }
  
  const query = searchQuery.value.toLowerCase()
  return quickNavItems.filter(item => {
    return item.keywords.some(keyword => keyword.includes(query)) ||
           item.title.toLowerCase().includes(query) ||
           item.path.toLowerCase().includes(query)
  }).slice(0, 8)
})

const openDropdown = () => {
  isOpen.value = true
}

const closeDropdown = () => {
  isOpen.value = false
  activeIndex.value = 0
}

const moveActive = (direction: number) => {
  const len = filteredItems.value.length
  if (len === 0) return
  activeIndex.value = (activeIndex.value + direction + len) % len
}

const selectActive = () => {
  if (filteredItems.value[activeIndex.value]) {
    navigate(filteredItems.value[activeIndex.value].path)
  }
}

const navigate = (path: string) => {
  router.push(path)
  searchQuery.value = ''
  closeDropdown()
}

const handleSearch = () => {
  selectActive()
}

const handleClickOutside = (event: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
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
