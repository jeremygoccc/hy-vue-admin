<template>
  <el-card class="box-card">
      <div class="clrearfix" slot="header">
          <span>Hy-Vue-Admin后台管理系统</span>
      </div>
      <div class="des">
          <span>- menu-config.js文件配置构建侧边栏组件</span>
      </div>
      <div class="des">
          <span>- 可复用组件配置</span>
      </div>
  </el-card>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Illustrate',
  data () {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
.box-card
    width: 500px
    height: auto
    margin: 0 auto
    .des
        font-weight: bolder
        margin-bottom 10px
</style>
