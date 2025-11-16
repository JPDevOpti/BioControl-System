import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { authRoutes } from '@/modules/auth/routes/authRoutes'
import { inventoryRoutes } from '@/modules/inventory/routes/inventoryRoutes'
import { maintenanceRoutes } from '@/modules/maintenance/routes/maintenanceRoutes'
import { dashboardRoutes } from '@/modules/dashboard/routes/dashboardRoutes'

// Rutas base para futuras vistas. Se completarán con componentes reales en el desarrollo.
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/modules/dashboard/views/DashboardView.vue'),
    meta: {
      title: 'Dashboard - MedInventory',
      requiresAuth: true
    }
  },
  // Rutas placeholder para módulos pendientes
  {
    path: '/planning',
    name: 'planning',
    component: () => import('@/shared/components/layout/PlaceholderView.vue'),
    meta: {
      title: 'Planificación - MedInventory',
      requiresAuth: true
    }
  },
  {
    path: '/support',
    name: 'support',
    component: () => import('@/shared/components/layout/PlaceholderView.vue'),
    meta: {
      title: 'Soporte - MedInventory',
      requiresAuth: true
    }
  },
  ...dashboardRoutes,
  ...authRoutes,
  ...inventoryRoutes,
  ...maintenanceRoutes
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
