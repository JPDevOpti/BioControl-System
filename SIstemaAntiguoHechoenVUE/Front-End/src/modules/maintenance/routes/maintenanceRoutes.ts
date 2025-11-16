import type { RouteRecordRaw } from 'vue-router'

export const maintenanceRoutes: RouteRecordRaw[] = [
  {
    path: '/maintenance',
    name: 'maintenance-home',
    component: () => import('../views/MaintenanceView.vue'),
    meta: {
      title: 'Mantenimiento',
      requiresAuth: true
    }
  }
]

export default maintenanceRoutes
