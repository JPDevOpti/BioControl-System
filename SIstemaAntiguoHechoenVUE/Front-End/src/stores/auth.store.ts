import { defineStore } from 'pinia'
import type { AuthUser, LoginRequest } from '@/modules/auth/types'
import { authService } from '@/modules/auth/services'

interface AuthState {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

const SESSION_STORAGE_KEY = 'medinventory::auth-session'
const REMEMBER_EMAIL_KEY = 'medinventory::remember-email'

interface PersistedSession {
  token: string
  user: AuthUser
  expiresAt: number
}

const hasWindow = typeof window !== 'undefined'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  }),
  actions: {
    async login(credentials: LoginRequest, rememberMe: boolean): Promise<boolean> {
      this.isLoading = true
      this.error = null

      try {
        const result = await authService.login(credentials)

        this.user = result.user
        this.token = result.token
        this.isAuthenticated = true

        this.persistSession(result)

        if (rememberMe) {
          this.setRememberedEmail(credentials.email)
        } else {
          this.clearRememberedEmail()
        }

        return true
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'No se pudo iniciar sesión'
        this.user = null
        this.token = null
        this.isAuthenticated = false
        this.clearSession()
        return false
      } finally {
        this.isLoading = false
      }
    },
    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      this.error = null
      this.clearSession()
    },
    restoreSession() {
      if (!hasWindow) return
      try {
        const raw = window.localStorage.getItem(SESSION_STORAGE_KEY)
        if (!raw) return

        const persisted: PersistedSession = JSON.parse(raw)

        if (persisted.expiresAt > Date.now()) {
          this.user = persisted.user
          this.token = persisted.token
          this.isAuthenticated = true
        } else {
          this.clearSession()
        }
      } catch (error) {
        console.warn('No fue posible restaurar la sesión guardada', error)
        this.clearSession()
      }
    },
    persistSession(result: { token: string; user: AuthUser; expiresIn: number }) {
      if (!hasWindow) return
      const payload: PersistedSession = {
        token: result.token,
        user: result.user,
        expiresAt: Date.now() + result.expiresIn * 1000
      }
      window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(payload))
    },
    clearSession() {
      if (!hasWindow) return
      window.localStorage.removeItem(SESSION_STORAGE_KEY)
    },
    setRememberedEmail(email: string) {
      if (!hasWindow) return
      window.localStorage.setItem(REMEMBER_EMAIL_KEY, email)
    },
    clearRememberedEmail() {
      if (!hasWindow) return
      window.localStorage.removeItem(REMEMBER_EMAIL_KEY)
    },
    getRememberedEmail(): string {
      if (!hasWindow) return ''
      return window.localStorage.getItem(REMEMBER_EMAIL_KEY) ?? ''
    }
  }
})
