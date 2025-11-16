<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 focus:outline-none focus:ring-4',
      disabled || loading 
        ? 'cursor-not-allowed bg-gray-400 opacity-70' 
        : '',
      variant === 'primary' && !disabled && !loading ? 'bg-gradient-to-tr from-brand-500 to-brand-700 hover:scale-105 hover:shadow-2xl focus:ring-brand-200/40' : '',
      variant === 'secondary' && !disabled && !loading ? 'bg-gradient-to-tr from-slate-500 to-slate-700 hover:scale-105 hover:shadow-2xl focus:ring-slate-200/40' : '',
      variant === 'danger' && !disabled && !loading ? 'bg-gradient-to-tr from-rose-500 to-rose-700 hover:scale-105 hover:shadow-2xl focus:ring-rose-200/40' : '',
      size === 'sm' ? 'px-3 py-2 text-sm' : '',
      size === 'lg' ? 'px-6 py-4 text-lg' : ''
    ]"
  >
    <svg
      v-if="loading"
      class="h-5 w-5 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    <component v-else-if="icon" :is="icon" class="h-5 w-5" />
    <span>{{ loading ? loadingText : text }}</span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  text: string
  loadingText?: string
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  icon?: any
}

withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  loadingText: 'Cargando...'
})
</script>
