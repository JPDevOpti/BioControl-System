<template>
  <div :class="dense ? 'space-y-1' : 'space-y-1'">
    <label v-if="label" :class="['block font-medium text-gray-700', dense ? 'text-xs' : 'text-sm']">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div class="relative">
      <input
        :type="type"
        :value="modelValue"
        @input="handleInput"
        @blur="$emit('blur')"
        :placeholder="placeholder"
        :maxlength="maxLength"
        :disabled="disabled"
        :class="inputClasses"
        :autocomplete="autocomplete"
      />
      
      <!-- Icono de error -->
      <div v-if="error" class="absolute inset-y-0 right-0 flex items-center pr-3">
        <svg
          class="h-4 w-4 text-red-500"
          :title="error"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.72-1.36 3.485 0l6.518 11.593c.75 1.334-.213 2.983-1.742 2.983H3.48c-1.53 0-2.492-1.649-1.742-2.983L8.257 3.1zM11 14a1 1 0 10-2 0 1 1 0 002 0zm-1-2a1 1 0 01-1-1V7a1 1 0 112 0v4a1 1 0 01-1 1z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
    
    <!-- Mensaje de error -->
    <p v-if="error" class="text-xs text-red-600 min-h-[0]">
      {{ error }}
    </p>
    
    <!-- Texto de ayuda -->
    <p v-if="helpText && !error" class="text-xs text-gray-500 min-h-[0]">
      {{ helpText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: string | number
  label?: string
  type?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  maxLength?: number
  error?: string
  helpText?: string
  autocomplete?: string
  dense?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  disabled: false,
  autocomplete: 'off',
  dense: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'blur': []
}>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const inputClasses = computed(() => {
  const baseClasses = "w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
  
  if (props.disabled) {
    return `${baseClasses} border-gray-300 bg-gray-50 text-gray-500 cursor-not-allowed`
  }
  
  if (props.error) {
    return `${baseClasses} border-red-500 focus:ring-red-200 focus:border-red-500`
  }
  
  return `${baseClasses} border-gray-300 hover:border-gray-400`
})
</script>
