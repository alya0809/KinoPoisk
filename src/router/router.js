import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('@/pages/MainPages.vue') },
  { path: '/favorites', name: 'favorites', component: () => import('@/pages/FavoritesPage.vue') },
  { path: '/movie/:id', name: 'movie', component: () => import('@/pages/MoviePages.vue') },
  { path: '/my_ratings', component: () => import('@/pages/ScorePage.vue') }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
