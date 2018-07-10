<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: `/${route.path}` }" v-for="(route, index) in routes" :key="index">{{ route.name }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script type="text/ecmascript-6">
import menu from '@/config/menu-config'

export default {
    name: 'BreadCrumb',
    data() {
      return {
          routes: []
      }
    },
    created() {
      this.getBreadCrumb()
    },
    watch: {
      $route() {
          this.getBreadCrumb()
      }
    },
    methods: {
      getBreadCrumb () {
          let routes = []
          menu.forEach(item => {
              if (!item.sub && item.componentName === this.$route.name) {
                //   console.log('无子组件匹配成功')
                  let route = {
                      path: item.componentName,
                      name: item.name
                  }
                  routes.push(route)
                  return false
              } else if (item.sub) {
                  item.sub.forEach(sub => {
                      if (sub.componentName === this.$route.name && sub.param === this.$route.query.info) {
                        //   console.log('子组件匹配成功')
                          let routePar = {
                              path: sub.componentName,
                              name: item.name
                          }, routeChild = {
                              path: sub.componentName,
                              name: sub.name
                          };
                          routes.push(routePar, routeChild)
                          return false
                      }
                  })
              }
          })
        //   console.log(routes)
          this.routes = routes
      }
    },
    components: {

    }
}
</script>

<style scoped lang="stylus">
</style>
