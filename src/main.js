// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import router from '@/router/router.js'
import { createPinia } from 'pinia'

// Methods
import { goToMoviePage } from '@/services/goToMoviePage.js';

// Composables
import { createApp } from 'vue'
import '@/styles/styles.css'

const app = createApp(App)
const pinia = createPinia()

registerPlugins(app)
app.config.globalProperties.$goToMoviePage = goToMoviePage;
app
.use(router)
.use(pinia)
.mount('#app')
