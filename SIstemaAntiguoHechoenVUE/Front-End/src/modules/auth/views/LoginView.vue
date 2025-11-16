<template>
  <FullScreenLayout>
    <div class="fixed inset-0 z-0 bg-login-gradient"></div>
    <div class="fixed inset-0 z-0 bg-pattern opacity-5"></div>

    <div class="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 sm:py-16">
      <div class="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-LIME-Azul-2/70 via-transparent to-transparent blur-3xl"></div>

      <div class="absolute top-10 left-8 h-80 w-80 rounded-full bg-LIME-Azul-3 mix-blend-multiply blur-3xl opacity-25 animate-blob"></div>
      <div class="absolute -top-12 right-12 h-96 w-96 rounded-full bg-LIME-Azul-Claro mix-blend-multiply blur-3xl opacity-35 animate-blob animation-delay-2000"></div>
      <div class="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-LIME-Azul-4 mix-blend-multiply blur-3xl opacity-25 animate-blob animation-delay-4000"></div>

      <div class="relative z-20 w-full max-w-6xl text-center animate-fadeIn">
        <div class="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-12">
          <router-link to="/" class="inline-block transition-all duration-500 hover:-translate-y-2 hover:scale-110">
            <img src="@/assets/images/Logo-LIME-NoFondo.png" alt="Logo LIME" class="h-12 sm:h-14 lg:h-16 w-auto rounded-xl drop-shadow-xl" />
          </router-link>
          <router-link to="/" class="inline-block transition-all duration-500 hover:-translate-y-2 hover:scale-110">
            <img src="@/assets/images/Banner_UDEA.png" alt="Logo UDEA" class="h-12 sm:h-14 lg:h-16 w-auto rounded-xl drop-shadow-xl" />
          </router-link>
          <router-link to="/" class="inline-block transition-all duration-500 hover:-translate-y-2 hover:scale-110">
            <img src="@/assets/images/Banner_HAMA.png" alt="Logo HAMA" class="h-14 sm:h-20 lg:h-25 w-auto drop-shadow-xl" />
          </router-link>
        </div>
      </div>

      <div class="relative z-20 mt-6 w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/95 p-10 shadow-[0_45px_90px_-45px_rgba(6,77,95,0.45)] backdrop-blur-xl transition-all duration-500 hover:shadow-[0_50px_100px_-45px_rgba(6,77,95,0.55)]">
        <div class="absolute -right-28 -top-24 h-48 w-48 rounded-full bg-gradient-to-br from-brand-100 to-brand-300 blur-3xl opacity-60"></div>
        <div class="absolute -bottom-24 -left-24 h-44 w-44 rounded-full bg-gradient-to-tr from-LIME-Azul-2/70 to-brand-200 blur-3xl opacity-50"></div>
        <div class="relative z-10 text-center">
          <p class="text-xs font-bold uppercase tracking-[0.4em] text-LIME-Azul-4">
            MedInventory
          </p>
          <h1 class="mt-4 text-3xl font-extrabold tracking-tight text-LIME-Azul-Oscuro sm:text-4xl lg:text-[2.8rem]">
            Bienvenido de nuevo
          </h1>
          <p class="mt-3 text-sm font-medium text-gray-600">
            Ingresa tus credenciales para acceder al sistema de inventario clínico.
          </p>
        </div>

        <form class="relative z-10 mt-10 space-y-6" @submit.prevent="onSubmit">
          <EmailInput v-model="email" />
          <PasswordInput v-model="password" />

          <div class="flex items-center justify-between pt-3">
            <RememberMeCheckbox v-model="rememberMe" />
            <a
              href="#"
              class="text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
              @click.prevent
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <div v-if="error" class="animate-shake">
            <ErrorMessage :message="error" />
          </div>

          <FormButton
            type="submit"
            text="Ingresar"
            loading-text="Ingresando..."
            :loading="isLoading"
            :disabled="!isFormValid || isLoading"
            :icon="LoginIcon"
          />
        </form>

        <p class="relative z-10 mt-7 text-center text-xs text-gray-500">
          Usa las credenciales demo, por ejemplo <strong>admin@medinventory.test</strong> con cualquier contraseña de 6 o más caracteres.
        </p>
      </div>

      <div class="relative z-20 mt-10 text-center text-xs text-gray-600 animate-fadeIn animation-delay-500">
        <p>© {{ currentYear }} Laboratorio LIME · Sistema MedInventory</p>
      </div>
    </div>
  </FullScreenLayout>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { FullScreenLayout } from '@/shared/layouts'
import { FormButton } from '@/shared/components/ui/forms'
import { ErrorMessage } from '@/shared/components/ui/feedback'
import { useAuthStore } from '@/stores/auth.store'
import EmailInput from '../components/EmailInput.vue'
import PasswordInput from '../components/PasswordInput.vue'
import RememberMeCheckbox from '../components/RememberMeCheckbox.vue'
import { useLoginForm } from '../composables/useLoginForm'
import { LoginIcon } from '@/assets/icons'

const router = useRouter()
const authStore = useAuthStore()

const {
  email,
  password,
  rememberMe,
  isLoading,
  error,
  isFormValid,
  handleSubmit,
  loadSavedData,
  saveData
} = useLoginForm()

const onSubmit = async () => {
  const success = await handleSubmit()
  if (success) {
    saveData()
    router.push('/dashboard')
  }
}

const currentYear = computed(() => new Date().getFullYear())

onMounted(() => {
  authStore.restoreSession()

  if (authStore.isAuthenticated) {
    router.replace('/dashboard')
    return
  }

  loadSavedData()
})
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes blob {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(20px, -50px) scale(1.1);
  }
  50% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  75% {
    transform: translate(50px, 50px) scale(1.05);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-10px);
  }
  75% {
    transform: translateX(10px);
  }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animation-delay-500 {
  animation-delay: 0.5s;
}

.bg-pattern {
  background-image: radial-gradient(circle at 1px 1px, rgba(41, 116, 163, 0.06) 1px, transparent 0);
  background-size: 40px 40px;
}

.bg-login-gradient {
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.98), 
    rgba(240, 248, 255, 0.96), 
    rgba(224, 242, 254, 0.95), 
    rgba(202, 234, 242, 0.93)
  );
}

@media (max-width: 640px) {
  .bg-pattern {
    background-size: 28px 28px;
  }
}
</style>
