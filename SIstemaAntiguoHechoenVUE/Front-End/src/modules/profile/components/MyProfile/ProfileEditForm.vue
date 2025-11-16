<template>
  <form @submit.prevent="onSubmit" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="md:col-span-2">
        <h4 class="text-lg font-medium text-gray-900 mb-1">Editar Perfil</h4>
        <p class="text-sm text-gray-500">Modifica tus datos básicos</p>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
        <input 
          v-model="formData.firstName" 
          type="text" 
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Apellido *</label>
        <input 
          v-model="formData.lastName" 
          type="text" 
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
        />
      </div>
      <div class="md:col-span-2">
        <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
        <input 
          v-model="formData.email" 
          type="email" 
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          autocomplete="email" 
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
        <input 
          v-model="formData.phone" 
          type="tel" 
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Nueva contraseña (opcional)</label>
        <input 
          v-model="formData.password" 
          type="password" 
          placeholder="••••••••" 
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          autocomplete="new-password" 
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña</label>
        <input 
          v-model="formData.passwordConfirm" 
          type="password" 
          placeholder="••••••••" 
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          autocomplete="new-password" 
        />
      </div>
    </div>

    <!-- Form Actions -->
    <div class="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
      <button
        type="submit"
        :disabled="isLoading || !hasChanges"
        class="flex-1 sm:flex-none sm:order-2 inline-flex items-center justify-center px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <span v-if="!isLoading">Guardar Cambios</span>
        <span v-else class="flex items-center gap-2">
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Guardando...
        </span>
      </button>
      
      <button
        type="button"
        @click="$emit('cancel')"
        :disabled="isLoading"
        class="flex-1 sm:flex-none sm:order-1 inline-flex items-center justify-center px-6 py-2 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Cancelar
      </button>
    </div>

    <!-- Validation Errors -->
    <div v-if="errors.length > 0" class="p-3 bg-red-50 border border-red-200 rounded-lg">
      <ul class="list-disc list-inside text-sm text-red-800">
        <li v-for="error in errors" :key="error.field">{{ error.message }}</li>
      </ul>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import type { UserProfile, ProfileEditPayload, ValidationError } from '../../types/userProfile.types'

interface Props {
  user: UserProfile
  isLoading?: boolean
  errors?: ValidationError[]
}

const props = withDefaults(defineProps<Props>(), { 
  isLoading: false,
  errors: () => []
})

const emit = defineEmits<{ 
  submit: [payload: ProfileEditPayload]
  cancel: []
}>()

const formData = reactive({
  firstName: props.user.firstName,
  lastName: props.user.lastName,
  email: props.user.email,
  phone: props.user.phone || '',
  password: '',
  passwordConfirm: ''
})

const originalState = JSON.stringify(formData)

const hasChanges = computed(() => JSON.stringify(formData) !== originalState)

const validatePasswords = (): boolean => {
  if (!formData.password || !formData.password.trim()) {
    return true
  }
  
  if (formData.password.length < 6) {
    return false
  }
  if (formData.password !== formData.passwordConfirm) {
    return false
  }
  return true
}

const onSubmit = () => {
  if (!validatePasswords()) {
    return
  }
  
  const payload: ProfileEditPayload = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phone: formData.phone || undefined,
    password: formData.password || undefined,
    passwordConfirm: formData.passwordConfirm || undefined
  }
  
  emit('submit', payload)
}
</script>

