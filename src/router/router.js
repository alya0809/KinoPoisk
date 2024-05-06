
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import MainPages from '@/pages/mainPages.vue'
import favoritesPage from '@/pages/favoritesPage.vue'
import moviePages from '@/pages/moviePages.vue'
import scorePage from '@/pages/scorePage.vue'
// import aboutPage from '@/pages/aboutPage.vue'
// import examplePage from '@/pages/examplePage.vue'

const routes = [
  {
    path: '/',
    name: MainPages,
    component: MainPages
  },
  {
    path: '/movie/:id',
    name: 'movie',
    component: moviePages,
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: favoritesPage,
  },
  {
    path: '/my_ratings',
    name: scorePage,
    component: scorePage
  }
  // {
  //   path: '/about',
  //   name: aboutPage,
  //   component: aboutPage
  // },
  // {
  //   path: '/example',
  //   name: examplePage,
  //   component: examplePage
  // }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
