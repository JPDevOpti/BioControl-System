<template>
  <label :for="id" class="flex cursor-pointer select-none items-center text-sm font-medium text-gray-700">
    <span class="relative mr-3 flex h-5 w-5 items-center justify-center">
      <input
        :id="id"
        type="checkbox"
        class="sr-only"
        :checked="modelValue"
        @change="onChange"
      />
      <span
        :class="[
          'flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 transition-all duration-300',
          modelValue
            ? 'scale-110 border-brand-500 bg-gradient-to-tr from-brand-400 to-brand-600 shadow-lg'
            : 'bg-white/70'
        ]"
      >
        <svg
          v-if="modelValue"
          class="h-3.5 w-3.5 text-white"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </span>
    <span>{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  id?: string
  label: string
}

withDefaults(defineProps<Props>(), {
  id: () => `checkbox-${Math.random().toString(36).slice(2, 10)}`
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}
</script>
