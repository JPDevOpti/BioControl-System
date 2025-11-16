import type { RouteRecordRaw } from 'vue-router'

export const profileRoutes: RouteRecordRaw[] = [
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/MyProfileView.vue'),
    meta: {
      title: 'Mi Perfil',
      requiresAuth: true
    }
  }
]

