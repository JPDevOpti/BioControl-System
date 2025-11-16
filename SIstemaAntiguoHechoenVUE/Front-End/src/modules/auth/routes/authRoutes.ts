import type { RouteRecordRaw } from 'vue-router'

// Definición preliminar de rutas para autenticación. Se completarán con vistas reales posteriormente.
export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'auth-login',
    component: () => import('../views/LoginView.vue'),
    meta: {
      title: 'Iniciar sesión',
      requiresAuth: false
    }
  }
]

export default authRoutes
