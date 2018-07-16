<template>
  <el-card class="box-card">
      <div class="clearfix" slot="header">
          <span>Hy-Vue-Admin后台管理系统</span>
      </div>
      <div class="des">
          <span>- 基于vue、vuex、element-ui以及easy-mock后台管理系统</span>
      </div>
      <div class="des">
          <span>- 基于 element-ui 设计语言，提供后台管理系统常用场景</span>
      </div>
      <div class="des">
          <span>- 基于 vuex 管理整体状态对象，易于设计与维护</span>
      </div>
      <div class="des">
          <span>- 通过配置 menu-config.js 可动态加载侧边栏以及对基本列表组件的动态属性设置</span>
      </div>
      <div class="des">
          <span>- 扩展可自行添加新可复用组件进行动态配置的对应</span>
      </div>
      <div class="des">
          <span>- 适合前后端分离实践团队开发</span>
      </div>
  </el-card>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'Illustrate',
    data() {
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
    .clearfix
        text-align center
    .des
        font-weight: bolder
        margin-bottom 10px
</style>
