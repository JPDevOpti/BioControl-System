import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import './assets/styles/main.css'

// Punto de montaje principal. La configuración de plugins adicionales se incorporará más adelante.
const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
