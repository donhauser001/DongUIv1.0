import { createApp } from 'vue'
import './style.css'
import './styles/utilities.css' // 基于CSS变量的工具类库
import 'virtual:uno.css'
// 移除 @unocss/reset/tailwind.css - 我们使用自己的可控 reset
import router from './router' // 引入路由
import App from './App.vue'
import { initTheme } from './utils/theme'

// 初始化主题变量（异步加载远程配置，但不阻塞应用启动）
initTheme().catch(err => {
    console.warn('Theme initialization failed:', err)
})

const app = createApp(App)

app.use(router) // 挂载路由
app.mount('#app')
