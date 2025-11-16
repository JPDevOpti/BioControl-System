<template>
  <div
    :class="[
      'rounded-2xl border border-gray-200 bg-white transition-all duration-300 shadow-sm hover:shadow-md',
      { 'cursor-pointer card-hover': clickable },
      { 'opacity-50 cursor-not-allowed': disabled },
      { 'flex flex-col': $slots.footer },
      customClass
    ]"
    @click="handleClick"
  >
    <div
      v-if="!hideHeader && (title || description || $slots.header)"
      class="border-b border-gray-100 px-6 py-5"
    >
      <div class="flex items-center justify-between">
        <div v-if="title || description">
          <h3 v-if="title" class="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <slot name="icon" />
            <span>{{ title }}</span>
          </h3>
          <p v-if="description" class="mt-1 text-sm text-gray-600">
            {{ description }}
          </p>
        </div>
        <div v-if="$slots.header" class="ml-4">
          <slot name="header" />
        </div>
      </div>
    </div>

    <div
      :class="[
        'px-6',
        { 'bg-gray-50': loading },
        { 'flex-1 flex flex-col min-h-0': $slots.footer },
        { 'flex-1 flex flex-col min-h-0': fullHeight && !$slots.footer },
        { 'py-3': dense },
        { 'py-4': !dense && fullHeight },
        { 'py-6': !dense && !fullHeight }
      ]"
    >
      <div v-if="loading" class="flex items-center justify-center py-8">
        <div class="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
        <span class="ml-3 text-sm text-gray-500">{{ loadingText }}</span>
      </div>
      <div v-else :class="fullHeight ? 'flex-1 flex flex-col min-h-0' : 'space-y-4'">
        <slot />
      </div>
    </div>

    <div
      v-if="$slots.footer"
      class="rounded-b-2xl border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  customClass?: string
  clickable?: boolean
  disabled?: boolean
  loading?: boolean
  loadingText?: string
  dense?: boolean
  hideHeader?: boolean
  fullHeight?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  description: '',
  customClass: '',
  clickable: false,
  disabled: false,
  loading: false,
  loadingText: 'Cargando...',
  dense: false,
  hideHeader: false
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

function handleClick(event: MouseEvent) {
  if (props.disabled || props.loading) return
  if (props.clickable) emit('click', event)
}
</script>

<style scoped>
.card-hover {
  transform: translateY(0);
}

.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
