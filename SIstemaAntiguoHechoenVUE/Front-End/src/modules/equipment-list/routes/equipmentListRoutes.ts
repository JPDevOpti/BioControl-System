import type { RouteRecordRaw } from 'vue-router'

export const equipmentListRoutes: RouteRecordRaw[] = [
  {
    path: '/inventory',
    name: 'inventory-list',
    redirect: '/equipment/list'
  },
  {
    path: '/equipment/list',
    name: 'equipment-list',
    component: () => import('../views/EquipmentListView.vue'),
    meta: {
      title: 'Listado de Equipos',
      requiresAuth: true
    }
  }
]

export default equipmentListRoutes
