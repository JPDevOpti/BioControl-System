<template>
  <div class="space-y-1.5">
    <label for="email" class="block text-sm font-semibold text-gray-700">
      Correo electrónico<span class="text-rose-500">*</span>
    </label>
    <div class="relative group">
      <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300 group-focus-within:text-brand-500">
        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </span>
      <input
        id="email"
        v-model="emailValue"
        type="email"
        name="email"
        autocomplete="email"
        placeholder="correo@ejemplo.com"
        class="h-12 w-full rounded-lg border bg-white/70 py-2.5 pl-10 pr-10 text-base text-gray-800 shadow-sm outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200/40"
        :class="{
          'border-brand-500': emailValue && isValidEmail(emailValue),
          'border-rose-500': emailValue && !isValidEmail(emailValue)
        }"
        :aria-invalid="Boolean(emailError)"
        :aria-describedby="emailError ? errorId : undefined"
      />
      <span v-if="emailValue" class="absolute right-3 top-1/2 -translate-y-1/2">
        <svg
          v-if="isValidEmail(emailValue)"
          class="h-5 w-5 text-brand-500 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <svg
          v-else
          class="h-5 w-5 text-rose-500 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </span>
    </div>
    <p v-if="emailError" :id="errorId" class="text-sm text-rose-500">
      {{ emailError }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthValidation } from '../composables/useAuthValidation'

const { isValidEmail } = useAuthValidation()

interface Props {
  modelValue: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const emailValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value)
})

const errorId = 'email-error'

const emailError = computed(() => {
  if (!emailValue.value) return ''
  if (!isValidEmail(emailValue.value)) return 'Ingrese un correo electrónico válido'
  return ''
})
</script>
