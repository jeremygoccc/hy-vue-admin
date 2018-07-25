<template>
  <div class="page">
    <el-container class="container">
      <el-collapse-transition>
        <el-aside :style="{ width: isCollaspe ? 'auto' : '200px' }">
          <NavMenu></NavMenu>
        </el-aside>
      </el-collapse-transition>
      <el-container>
        <el-header class="header">
          <Header></Header>
        </el-header>
        <el-main>
          <transition>
            <router-view :key="$route.fullpath"></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script type="text/ecmascript-6">
import NavMenu from '@/components/NavMenu/NavMenu'
import Header from '@/components/Header/Header'

export default {
  data () {
    return {
      isCollaspe: false
    }
  },
  created () {
    this.$bus.$on('collapse', () => {
      this.isCollaspe = !this.isCollaspe
    })
  },
  components: {
    NavMenu,
    Header
  }
}
</script>

<style lang="stylus">
.container
  height 100vh
  .el-aside
    min-height 100%
    background-color rgb(84, 92, 100)
  .header
    background-color #409EFF
    color #fff
    // height 40vh!important
    line-height 60px
</style>
