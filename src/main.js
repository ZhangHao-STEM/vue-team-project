import'./assets/main.scss'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'//引入Elenent-plus
import 'element-plus/dist/index.css'
import App from './App.vue'
import locale from 'element-plus/dist/locale/zh-cn'//引入中文语言包

const app = createApp(App)//创建应用实例

app.use(ElementPlus,{locale})
app.mount('#app')
