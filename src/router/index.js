import Vue from 'vue'
import Router from 'vue-router'
import menus from '@/config/menu-config'

Vue.use(Router)

let routes = []

routes.push({
  path: "/",
  name: "Login",
  redirect: "/Login",
  component: () => import(`@/components/Login/Login`),
  children: [{
    path: '/Login',
    component: () => import(`@/components/Login/Login`)
  }]
});

routes.push({
  path: '/Home',
  name: 'Home',
  redirect: '/Admin',
  component: () => import(`@/components/Admin/Admin`)
})

routes.push({
  path: '/Admin',
  name: 'Admin',
  component: () => import(`@/components/Admin/Admin`),
  children: [{
    path: '/',
    name: 'Home',
    component: () => import(`@/components/Home/Home`)
  }]
})

menus.forEach(item => {
  if (!item.sub) {
    routes.push({
      path: `/${item.componentName}`,
      name: 'Admin',
      component: () => import(`@/components/Admin/Admin`),
      children: [{
        path: '',
        name: item.componentName,
        component: () =>
          import(`@/components/${item.componentName}/${item.componentName}`)
      }]
    })
  } else {
    item.sub.forEach(sub => {
      // let param = ''
      // if (sub.param) param = sub.componentName + '/:' + sub.param
      // else param = sub.component
      // console.log(param)
      routes.push({
        path: `/${sub.componentName}`,
        name: 'Admin',
        component: () => import(`@/components/Admin/Admin`),
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
