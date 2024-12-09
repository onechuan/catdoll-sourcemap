import { createRouter, createWebHashHistory } from 'vue-router'
const Home = () => import('../views/HomeView.vue')
const About = () => import('../views/AboutView.vue')
const Error = () => import('../views/ErrorView.vue')

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/error',
      name: 'error',
      component: Error
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: About
    }
  ]
})

export default router
