<template>
  <div class="page">
    <el-tabs tab-position="left">
      <el-tab-pane label="修改密码">
        <el-form label-position="right" label-width="100px">
          <el-form-item label="旧密码">
            <el-input type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">提交</el-button>
            <el-button type="danger">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
.el-input
  width 200px
</style>
