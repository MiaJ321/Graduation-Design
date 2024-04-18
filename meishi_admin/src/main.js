import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 引入element-ui
import ElementUI from 'element-ui';  
import 'element-ui/lib/theme-chalk/index.css';

import VueParticles from 'vue-particles'  // 引入背景粒子插件

// 引入 echarts
import * as echarts from 'echarts'

// 让浏览器和服务器之间通信，动态数据交互

import axios from 'axios'       // 引入axios
// 配置请求的跟路径
axios.defaults.baseURL = 'http://127.0.0.1:5000/'  // 定义公共接口
Vue.prototype.$http = axios   // 将axios 全局挂载 vue 实例上

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueParticles)


new Vue({
  // 在Vue项目中，要想把路由用起来，必须把路由实例对象进行挂载
  router,
  store,
  render: h => h(App)
}).$mount('#app')
