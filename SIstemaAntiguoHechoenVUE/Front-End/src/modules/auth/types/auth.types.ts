/**
 * Tipos de apoyo para el módulo de autenticación del Front-End.
 * Esta iteración solamente simula la respuesta del backend.
 */

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthUser {
  id: string
  email: string
  name: string
  role: 'admin' | 'coordinator' | 'technician'
  avatarColor?: string
}

export interface LoginResult {
  token: string
  user: AuthUser
  expiresIn: number
}
