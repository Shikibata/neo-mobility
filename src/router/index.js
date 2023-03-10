// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/Home.vue'),
      },
      {
        path: 'clients',
        name: 'Clients',
        component: () => import('@/views/Clients.vue'),
      },
      {
        path: 'cars',
        name: 'Cars',
        component: () => import('@/views/Cars.vue'),
      },
      {
        path: 'booking',
        name: 'Booking',
        component: () => import('@/views/Booking.vue'),
      },
      {
        path: 'logs',
        name: 'Logs',
        component: () => import('@/views/Logs.vue'),
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
