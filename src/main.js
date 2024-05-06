// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import router from '@/router/router.js'

// Methods
import { goToMoviePage } from '@/services/goToMoviePage.js';

// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)
app.config.globalProperties.$goToMoviePage = goToMoviePage;
app
.use(router)
.mount('#app')
