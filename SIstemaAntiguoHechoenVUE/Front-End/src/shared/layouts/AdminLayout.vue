<template>
  <div class="bg-gray-50">
    <div class="flex h-screen overflow-hidden">
      <AppSidebar />

      <div
        class="relative flex min-w-0 flex-1 flex-col overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out"
        :class="contentOffsetClasses"
      >
        <AppHeader />

        <main class="flex-1">
          <div class="mx-auto w-full max-w-screen-2xl p-2 sm:p-4 2xl:p-6">
            <slot />
          </div>
        </main>
      </div>
    </div>

    <Backdrop />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import AppSidebar from '@/shared/components/layout/AppSidebar.vue'
import AppHeader from '@/shared/components/layout/AppHeader.vue'
import Backdrop from '@/shared/components/layout/Backdrop.vue'
import { useSidebarProvider } from '@/shared/composables'

const { toggleSidebar, isExpanded, isMobileOpen, isHovered } = useSidebarProvider()

const contentOffsetClasses = computed(() => {
  const classes: string[] = []

  classes.push(isExpanded.value && !isMobileOpen.value ? 'lg:ml-72' : 'lg:ml-20')

  if (isHovered.value && !isExpanded.value && !isMobileOpen.value) {
    classes.push('lg:ml-72')
  }

  return classes
})

const handleKeydown = (event: KeyboardEvent) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'b') {
    event.preventDefault()
    toggleSidebar()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>
