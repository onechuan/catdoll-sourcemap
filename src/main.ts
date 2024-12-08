import { createApp } from 'vue'
import ErrorStackParser from 'error-stack-parser'
import './style.css'
import App from './App.vue'
import { findCodeBySourceMap } from "./utils";
import router from './router'

const app = createApp(App)
app.config.errorHandler = (err) => {
  const errorStack = ErrorStackParser.parse(err as Error)
  findCodeBySourceMap(errorStack[0])
  console.log("ERROR", errorStack)
}
app.use(router)
app.mount('#app')
