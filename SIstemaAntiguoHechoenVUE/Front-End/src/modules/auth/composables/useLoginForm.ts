import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import type { LoginRequest } from '../types'
import { useAuthValidation } from './useAuthValidation'

export function useLoginForm() {
  const authStore = useAuthStore()
  const { isValidEmail, isValidPassword } = useAuthValidation()

  const email = ref('')
  const password = ref('')
  const rememberMe = ref(false)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const emailError = computed(() => {
    if (!email.value) return ''
    return isValidEmail(email.value) ? '' : 'Ingrese un correo electrónico válido'
  })

  const passwordError = computed(() => {
    if (!password.value) return ''
    return isValidPassword(password.value) ? '' : 'La contraseña debe tener al menos 6 caracteres'
  })

  const isFormValid = computed(() => {
    return Boolean(email.value && password.value && isValidEmail(email.value) && isValidPassword(password.value))
  })

  const handleSubmit = async (): Promise<boolean> => {
    if (!isFormValid.value) {
      error.value = 'Por favor complete todos los campos correctamente'
      return false
    }

    isLoading.value = true
    error.value = null

    try {
      const credentials: LoginRequest = {
        email: email.value.trim(),
        password: password.value
      }

      const success = await authStore.login(credentials, rememberMe.value)

      if (success) {
        resetForm(false)
        return true
      }

      const message = authStore.error?.toLowerCase() ?? ''
      if (message.includes('credenciales')) {
        error.value = 'Credenciales inválidas. Verifique correo y contraseña.'
      } else if (message.includes('conexión')) {
        error.value = 'Error de conexión. Intente nuevamente.'
      } else {
        error.value = 'No fue posible iniciar sesión. Vuelva a intentarlo.'
      }

      return false
    } catch (err) {
      console.error('Error inesperado durante el login', err)
      error.value = 'Ocurrió un error inesperado. Intente nuevamente.'
      return false
    } finally {
      isLoading.value = false
    }
  }

  const resetForm = (clearRemember = true) => {
    email.value = clearRemember ? '' : email.value
    password.value = ''
    if (clearRemember) rememberMe.value = false
    error.value = null
  }

  const loadSavedData = () => {
    const rememberedEmail = authStore.getRememberedEmail()?.trim()
    if (rememberedEmail) {
      email.value = rememberedEmail
      rememberMe.value = true
    }
  }

  const saveData = () => {
    if (rememberMe.value) {
      authStore.setRememberedEmail(email.value)
    } else {
      authStore.clearRememberedEmail()
    }
  }

  return {
    email,
    password,
    rememberMe,
    isLoading,
    error,
    emailError,
    passwordError,
    isFormValid,
    handleSubmit,
    resetForm,
    loadSavedData,
    saveData
  }
}
