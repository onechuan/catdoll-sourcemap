import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)
app.config.errorHandler = (err, vm, info) => {
  console.error(err, vm, info)
}
app.mount('#app')
