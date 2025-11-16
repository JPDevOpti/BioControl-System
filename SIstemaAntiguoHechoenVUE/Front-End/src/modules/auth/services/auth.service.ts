import type { LoginRequest, LoginResult, AuthUser } from '../types'

const SESSION_DURATION_MINUTES = 8 * 60 // 8 horas

const demoDirectory: Record<string, Omit<AuthUser, 'email'>> = {
  'admin@medinventory.test': {
    id: 'admin-demo',
    name: 'Administrador Demo',
    role: 'admin',
    avatarColor: 'bg-brand-500'
  },
  'coordinador@medinventory.test': {
    id: 'coordinator-demo',
    name: 'Coordinador Demo',
    role: 'coordinator',
    avatarColor: 'bg-brand-400'
  },
  'tecnico@medinventory.test': {
    id: 'technician-demo',
    name: 'Técnico Demo',
    role: 'technician',
    avatarColor: 'bg-brand-300'
  }
}

function buildUser(email: string): AuthUser {
  const normalized = email.toLowerCase()
  const directoryEntry = demoDirectory[normalized]

  if (directoryEntry) {
    return {
      email: normalized,
      ...directoryEntry
    }
  }

  const identifier = normalized.split('@')[0] || 'usuario'

  return {
    id: `user-${identifier}`,
    email: normalized,
    role: 'technician',
    name: identifier
      .split(/[._-]/)
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join(' '),
    avatarColor: 'bg-brand-200'
  }
}

export async function login(credentials: LoginRequest): Promise<LoginResult> {
  const { email, password } = credentials
  const trimmedEmail = email.trim()

  // Simulación de latencia y validaciones básicas
  await new Promise((resolve) => setTimeout(resolve, 650))

  if (!trimmedEmail || password.length < 6) {
    throw new Error('Credenciales inválidas')
  }

  const user = buildUser(trimmedEmail)
  const token = `demo-token-${btoa(`${user.id}:${Date.now()}`)}`

  return {
    token,
    user,
    expiresIn: SESSION_DURATION_MINUTES * 60
  }
}
