
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import MainPages from '@/pages/mainPages.vue'
import moviePages from '@/pages/moviePages.vue'
// import SplitPage from '@/pages/SplitPage.vue'
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
  }
  // {
  //   path: '/split',
  //   name: SplitPage,
  //   component: SplitPage
  // },
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
