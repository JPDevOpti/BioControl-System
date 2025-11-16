<template>
  <div :class="dense ? 'space-y-1' : 'space-y-1'">
    <label v-if="label" :class="['block font-medium text-gray-700', dense ? 'text-xs' : 'text-sm']">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div class="relative">
      <select
        :value="modelValue"
        @change="handleChange"
        :disabled="disabled"
        :class="selectClasses"
      >
        <option value="" disabled>{{ placeholder }}</option>
        <option 
          v-for="option in options" 
          :key="getOptionValue(option)" 
          :value="getOptionValue(option)"
        >
          {{ getOptionLabel(option) }}
        </option>
      </select>
      
      <!-- Custom dropdown arrow -->
      <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <svg 
          :class="[
            'h-5 w-5 transition-colors',
            disabled ? 'text-gray-300' : 'text-gray-400'
          ]"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
    
    <!-- Mensaje de error -->
    <p v-if="error" class="text-xs text-red-600">
      {{ error }}
    </p>
    
    <!-- Texto de ayuda -->
    <p v-if="helpText && !error" class="text-xs text-gray-500">
      {{ helpText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Option {
  value: string | number
  label: string
}

interface Props {
  modelValue: string | number
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  options: Option[] | string[]
  error?: string
  helpText?: string
  dense?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  disabled: false,
  placeholder: 'Seleccione una opción',
  dense: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}

const getOptionValue = (option: Option | string): string | number => {
  return typeof option === 'string' ? option : option.value
}

const getOptionLabel = (option: Option | string): string => {
  return typeof option === 'string' ? option : option.label
}

const selectClasses = computed(() => {
  const baseClasses = "w-full px-3 py-2 pr-10 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white appearance-none cursor-pointer"
  
  if (props.disabled) {
    return `${baseClasses} border-gray-300 bg-gray-50 text-gray-500 cursor-not-allowed`
  }
  
  if (props.error) {
    return `${baseClasses} border-red-500 focus:ring-red-200 focus:border-red-500`
  }
  
  return `${baseClasses} border-gray-300 hover:border-gray-400`
})
</script>
