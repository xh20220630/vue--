import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//导入我们的注册全局组件的方法
import installSvg from "./icons"

// 导入全局的路由守卫
import "@/router/routerGuard"

//需要在全局引入我们的element-puls插件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

//导入我们设置的全局scss
import '@/assets/scss/index.scss' //指到文件夹名，默认找index
const app = createApp(App)
//在app上全局注册我们的svg组件
installSvg(app)
// app.component('svg-icon',svgIcon)

app.use(store).use(router).use(ElementPlus,{locale:zhCn}).mount('#app')
