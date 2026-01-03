import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/main.css'

// 创建Vue应用
const app = createApp(App)

// 全局错误处理
app.config.errorHandler = (err, vm, info) => {
  console.error('Global error:', err)
  console.error('Component:', vm)
  console.error('Info:', info)
}

app.mount('#app')
