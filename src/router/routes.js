import Home from '@/views/home/home.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/about/about.vue')
  }
]
