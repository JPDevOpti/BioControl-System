<!--
  AppSidebar Component
  Barra lateral de navegación principal para MedInventory.
  Menú simplificado sin conexión al backend.
-->
<template>
  <aside
    :class="[
      'fixed mt-16 flex flex-col lg:mt-0 top-0 px-0 left-0 bg-white text-gray-900 h-screen transition-all duration-500 ease-in-out z-99999 border-r border-gray-200',
      isInteractiveOpen ? 'w-[290px] px-5' : 'w-[90px] px-2',
      isInteractiveOpen ? 'sidebar-expanded' : 'sidebar-collapsed',
      'transition-[width,padding] duration-500 ease-in-out',
      isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      :class="[
        'py-8 flex transition-all duration-500',
        isInteractiveOpen ? 'justify-start' : 'justify-center'
      ]"
    >
      <router-link to="/">
        <img
          v-if="isInteractiveOpen"
          class="transition-all duration-500 ml-6"
          :src="logoExpanded"
          alt="Logo MedInventory"
          width="150"
          height="40"
        />
        <img
          v-else
          class="transition-all duration-500"
          :src="logoCollapsed"
          alt="Logo MedInventory"
          width="32"
          height="32"
        />
      </router-link>
    </div>

    <div class="flex flex-1 flex-col">
      <nav class="flex-1 overflow-y-auto py-6 no-scrollbar">
        <div class="flex flex-col gap-6">
          <div
            v-for="(menuGroup, groupIndex) in menuGroups"
            :key="groupIndex"
            class="flex flex-col gap-3"
          >
            <h2
              class="text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-gray-500 transition-opacity duration-200"
              :class="isInteractiveOpen ? 'px-2 opacity-100' : 'px-0 text-center opacity-0'"
            >
              <template v-if="isInteractiveOpen">
                {{ menuGroup.title }}
              </template>
              <HorizontalDots v-else />
            </h2>

            <ul class="flex flex-col gap-2">
              <li v-for="item in menuGroup.items" :key="item.name">
                <router-link
                  v-if="item.path"
                  :to="item.path"
                  exact-active-class="router-link-active"
                  class="menu-item"
                  :class="isInteractiveOpen ? 'justify-start' : 'justify-center'"
                >
                  <span class="flex items-center justify-center">
                    <component :is="item.icon" class="text-xl" />
                  </span>
                  <span v-if="isInteractiveOpen" class="ml-3 whitespace-nowrap text-sm font-medium">
                    {{ item.name }}
                  </span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <footer class="border-t border-gray-200 bg-gray-50 py-4">
        <div v-if="isInteractiveOpen" class="text-center text-xs text-gray-500">
          <p class="mb-2">Desarrollado por</p>
          <a
            href="https://github.com/JPDevOpti"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center gap-1 font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800"
          >
            <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            Juan Pablo Restrepo Mancilla
          </a>
          <p class="text-gray-400">@jpdevopti</p>
        </div>
        <div v-else class="flex justify-center">
          <a
            href="https://github.com/JPDevOpti"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-400 transition-colors duration-200 hover:text-blue-600"
            title="Desarrollado por Juan Pablo Restrepo Mancilla (@jpdevopti)"
          >
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'
import { LayoutDashboardIcon, ListIcon, CalendarIcon, TaskIcon, SupportIcon, HorizontalDots } from '@/assets/icons'
import { useSidebar } from '@/shared/composables'
import logoExpanded from '@/assets/images/Logo-LIME-NoFondo.png'
import logoCollapsed from '@/assets/images/LOGO-LIME-Inicial.png'

const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar()

const isInteractiveOpen = computed(() => isExpanded.value || isMobileOpen.value || isHovered.value)

const handleMouseEnter = () => {
  if (!isExpanded.value && !isMobileOpen.value) {
    setIsHovered(true)
  }
}

const handleMouseLeave = () => {
  if (isHovered.value) {
    setIsHovered(false)
  }
}

interface MenuItem {
  icon: Component
  name: string
  path?: string
}

interface MenuGroup {
  title: string
  items: MenuItem[]
}

const menuItems = computed<MenuItem[]>(() => [
  { icon: LayoutDashboardIcon, name: 'Dashboard', path: '/dashboard' },
  { icon: ListIcon, name: 'Gestión de equipos', path: '/inventory' },
  { icon: CalendarIcon, name: 'Mantenimiento', path: '/maintenance' },
  { icon: TaskIcon, name: 'Planificación', path: '/planning' },
  { icon: SupportIcon, name: 'Soporte', path: '/support' }
])

const menuGroups = computed<MenuGroup[]>(() => [
  {
    title: 'Menú',
    items: menuItems.value
  }
])
</script>

<style scoped>
.sidebar-expanded,
.sidebar-collapsed {
  transition: width 0.5s, padding 0.5s;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-radius: 0.75rem;
  padding: 0.625rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  text-decoration: none;
  transition: all 0.2s ease;
}

.menu-item:hover {
  background-color: #eff6ff;
  color: #1d4ed8;
  transform: translateX(2px);
}

.menu-item.router-link-active {
  background-color: #dbeafe;
  color: #1d4ed8;
  box-shadow: 0 12px 24px -20px rgba(37, 99, 235, 0.6);
}

.menu-item svg {
  color: #8ea0c0;
  transition: color 0.2s ease;
}

.menu-item:hover svg,
.menu-item.router-link-active svg {
  color: #1d4ed8;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
