import Vue from 'vue'
import Router from 'vue-router'
import menus from '@/config/menu-config'

Vue.use(Router)

let routes = []

// 视图路由配置
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

// 后台侧边栏路由配置
menus.forEach(item => {
  if (!item.sub) {
    routes.push({
      path: `/${item.componentName}`,
      name: 'Admin',
      component: () => import(`@/views/Admin/Admin`),
      children: [{
        path: '',
        name: item.componentName,
        component: () =>
          import(`@/components/${item.componentName}/${item.componentName}`)
      }]
    })
  } else {
    item.sub.forEach(sub => {
      routes.push({
        path: `/${sub.componentName}`,
        name: 'Admin',
        component: () => import(`@/views/Admin/Admin`),
        children: [{
          path: '',
          name: sub.componentName,
          component: () =>
            import(`@/components/${sub.componentName}/${sub.componentName}`)
        }]
      })
    })
  }
})

export default new Router({ routes })
