<template>
  <div class="space-y-1.5">
    <label for="password" class="block text-sm font-semibold text-gray-700">
      Contraseña<span class="text-rose-500">*</span>
    </label>
    <div class="relative group">
      <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300 group-focus-within:text-brand-500">
        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </span>
      <input
        id="password"
        v-model="passwordValue"
        :type="showPassword ? 'text' : 'password'"
        placeholder="Ingrese su contraseña"
        class="h-12 w-full rounded-lg border bg-white/70 py-2.5 pl-10 pr-11 text-base text-gray-800 shadow-sm outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200/40"
        :class="{
          'border-brand-500': passwordValue && passwordValue.length >= 6
        }"
      />
      <button
        type="button"
        class="absolute right-4 top-1/2 -translate-y-1/2 rounded-md text-gray-400 transition-colors duration-300 hover:text-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200/40"
        :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
        :aria-pressed="showPassword"
        @click="togglePasswordVisibility"
      >
        <svg
          v-if="!showPassword"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.0002 13.8618C7.23361 13.8618 4.86803 12.1371 3.92328 9.70231C4.86804 7.26751 7.23361 5.54286 10.0002 5.54286C12.7667 5.54286 15.1323 7.26752 16.0771 9.70232C15.1323 12.1371 12.7667 13.8618 10.0002 13.8618ZM10.0002 4.04286C6.48191 4.04286 3.49489 6.30905 2.4155 9.45919C2.3615 9.61676 2.3615 9.78783 2.41549 9.94541C3.49488 13.0955 6.48191 15.3617 10.0002 15.3617C13.5184 15.3617 16.5055 13.0955 17.5849 9.94543C17.6389 9.78785 17.6389 9.61678 17.5849 9.45921C16.5055 6.30907 13.5184 4.04286 10.0002 4.04286ZM9.99151 7.84402C8.96527 7.84402 8.13333 8.67596 8.13333 9.7022C8.13333 10.7284 8.96527 11.5604 9.99151 11.5604H10.0064C11.0326 11.5604 11.8646 10.7284 11.8646 9.7022C11.8646 8.67596 11.0326 7.84402 10.0064 7.84402H9.99151Z"
          />
        </svg>
        <svg
          v-else
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.63803 3.57699C4.34513 3.2841 3.87026 3.2841 3.57737 3.57699C3.28447 3.86989 3.28447 4.34476 3.57737 4.63765L4.85323 5.91351C3.74609 6.84189 2.89363 8.06384 2.4155 9.45926C2.3615 9.61683 2.3615 9.7879 2.41549 9.94548C3.49488 13.0956 6.48191 15.3618 10.0002 15.3618C11.255 15.3618 12.4422 15.0735 13.4994 14.5597L15.3625 16.4227C15.6554 16.7156 16.1302 16.7156 16.4231 16.4227C16.716 16.1298 16.716 15.6549 16.4231 15.362L4.63803 3.57699ZM12.3608 13.4211L10.4475 11.5078C10.3061 11.5422 10.1584 11.5605 10.0064 11.5605H9.99151C8.96527 11.5605 8.13333 10.7285 8.13333 9.70227C8.13333 9.54599 8.15262 9.39424 8.18895 9.24922L5.91885 6.97912C5.03505 7.69005 4.34057 8.62693 3.92328 9.70237C4.86803 12.1372 7.23361 13.8618 10.0002 13.8618C10.8326 13.8618 11.6287 13.7057 12.3608 13.4211ZM16.0771 9.70238C15.7843 10.4568 15.3552 11.1431 14.8199 11.731L15.8813 12.7923C16.6329 11.9812 17.2187 11.0142 17.5849 9.94551C17.6389 9.78793 17.6389 9.61686 17.5849 9.45928C16.5055 6.30915 13.5184 4.04293 10.0002 4.04293C9.13525 4.04293 8.30244 4.1799 7.52218 4.43329L8.75139 5.6625C9.1556 5.58404 9.57311 5.54293 10.0002 5.54293C12.7667 5.54293 15.1323 7.26758 16.0771 9.70238Z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  modelValue: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const showPassword = ref(false)

const passwordValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value)
})

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>
