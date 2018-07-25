import menus from '@/config/menu-config'

let routes = []

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
        component: () => import(`@/components/${item.componentName}/${item.componentName}`)
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
          component: () => import(`@/components/${sub.componentName}/${sub.componentName}`)
        }]
      })
    })
  }
})

export default routes
