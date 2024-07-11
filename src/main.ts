import { createApp } from 'vue'
import './style.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import plugins from './plugins' // plugins

import microApp from '@micro-zoe/micro-app'

import { createPinia } from 'pinia'



import SvgIcon from '@/components/SvgIcon/index.vue'
import elementIcons from '@/components/SvgIcon/svgicon'


import router, { setupRouter } from './router/index.ts'


import App from './App.vue'

// microApp.start()

const pinia = createPinia()

const app = createApp(App)
// 
setupRouter(app)

// await router.ready()

app.use(pinia)
.use(ElementPlus)
.use(plugins)
.use(elementIcons)
.component('svg-icon', SvgIcon).mount('#app')

// 卸载应用
window.unmount = () => {
  app.unmount()
}