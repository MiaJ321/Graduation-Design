import Vue from 'vue'
import VueRouter from 'vue-router'

// 安装为Vue的插件
Vue.use(VueRouter)

// 此为路由模块
const routes = [
  // 重定向，当只有一个/，默认到login
  { path: '/', redirect: '/login' },
  { path: '/login', component: ()=> import('../components/Login.vue') },
  {
    path: '/home',
    component: ()=> import('../views/Home.vue'),
    redirect: '/welcome',
    // home的嵌套声明子路由
    children: [
      // 布置网址
      // 默认子路由：如果该数组中，某个路由规则的path值为空字符串，则这条路由规则，叫做“默认子路由”
      { path: '/welcome', component: ()=> import('../components/Welcome.vue') },
      { path: '/users', component: ()=> import('../components/Users.vue') },
      { path: '/list', component: ()=> import('../components/List.vue') },
      { path: '/info', component: ()=> import('../components/Info.vue') },
      { path: '/pinglun', component: ()=> import('../components/Pinglun.vue') },
      { path: '/luck', component: ()=> import('../components/Luck.vue') },
    ]
  }

]

const router = new VueRouter({
  //routes是一个数组，定义“hash”地址和组件之间的对应关系
  routes
})

// 向外共享路由的实例对象
export default router
