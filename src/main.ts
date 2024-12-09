import { createApp } from 'vue'
import ErrorStackParser from 'error-stack-parser'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/main.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)

app.config.errorHandler = (err: any, vm) => {
  const errorStack = ErrorStackParser.parse(err as Error);
  const jsError = {
    stackFrames: errorStack,
    stack: err.stack,
    message: err.message,
    errorName: err.name
  }
  // findCodeBySourceMap(errorStack[0])
  console.log("ERROR", jsError)
  vm!.$message.error(`你触发了一个错误：${err.name}`);
  localStorage.setItem("jsErrorList", JSON.stringify(jsError));
}
app.mount('#app')
