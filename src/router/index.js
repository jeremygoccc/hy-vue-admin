import Vue from 'vue'
import Router from 'vue-router'
import routes from '@/router/menu'

Vue.use(Router)

// 全局视图路由配置
routes.push({
  path: '/',
  name: 'Index',
  redirect: '/Index',
  component: () => import(`@/views/Index/Index`),
  children: [{
    path: '/Index',
    component: () => import(`@/views/Index/Index`)
  }]
}, {
  path: '/Login',
  name: 'Login',
  component: () => import(`@/views/Login/Login`)
}, {
  path: '/Home',
  name: 'Home',
  redirect: '/Admin',
  component: () => import(`@/views/Admin/Admin`)
}, {
  path: '/Admin',
  name: 'Admin',
  component: () => import(`@/views/Admin/Admin`),
  children: [{
    path: '/',
    name: 'Home',
    component: () => import(`@/components/Home/Home`)
  }]
}, {
  path: '/Setting',
  name: 'Admin',
  component: () => import(`@/views/Admin/Admin`),
  children: [{
    path: '',
    name: 'Setting',
    component: () => import(`@/components/Setting/Setting`)
  }]
})

export default new Router({ routes })
