import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './controller/router.js'
import './css/style.css'

createApp(App).use(router).mount('#app')
