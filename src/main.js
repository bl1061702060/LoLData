import Vue from 'vue'
import App from './App'
// 引入 element-ui
import ElementUI from 'element-ui'
// 引入 element-ui 样式
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import routes from './router/'
import store from './store/'
import { routerMode } from './config/env'

// 配置使用element-ui
Vue.use(ElementUI)
Vue.prototype.$loading = ElementUI.Loading.service
Vue.prototype.$msgbox = ElementUI.MessageBox
Vue.prototype.$alert = ElementUI.MessageBox.alert
Vue.prototype.$confirm = ElementUI.MessageBox.confirm
Vue.prototype.$prompt = ElementUI.MessageBox.prompt
Vue.prototype.$notify = ElementUI.Notification
Vue.prototype.$message = ElementUI.Message

// 注入路由
Vue.use(VueRouter)
const router = new VueRouter({
    routes,
    mode: routerMode,
    strict: process.env.NODE_ENV !== 'production'
})

// 注册vue实例， 并且绑定到#app上
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')