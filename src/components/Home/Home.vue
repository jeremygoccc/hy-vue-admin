<template>
  <div class="page">
    <el-col>
        <el-card class="box-card">
          <div><i class="el-icon-info"></i></div>
          <div class="card-info">
              <span class="info-des">学生人数</span>
              <span class="info-nums">10000人</span>
          </div>
        </el-card>
        <el-card class="box-card">
          <div><i class="el-icon-info"></i></div>
          <div class="card-info">
              <span class="info-des">学生人数</span>
              <span class="info-nums">10000人</span>
          </div>
        </el-card>
        <el-card class="box-card">
          <div><i class="el-icon-info"></i></div>
          <div class="card-info">
              <span class="info-des">学生人数</span>
              <span class="info-nums">10000人</span>
          </div>
        </el-card>
        <el-card class="box-card">
          <div><i class="el-icon-info"></i></div>
          <div class="card-info">
              <span class="info-des">学生人数</span>
              <span class="info-nums">10000人</span>
          </div>
        </el-card>
    </el-col>
    <!-- <el-col class="notification">
        <el-collapse accordion>
            <div class="el-collapse-item" title="欢迎中心">
                当前时间：2018年7月24日21:15分
            </div>
        </el-collapse>
        <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="公告" name="1">
                <div>基于vue与ElementUI的可配置化后台权限管理系统</div>
                <div>适合团队前后端分离协作开发</div>
            </el-collapse-item>
            <el-collapse-item title="公告" name="2">
                <div>由于系统的复杂性与软件开发的必然性</div>
                <div>加上宏奕团队能力水平有限，使用过程中的bug希望能及时反馈！</div>
            </el-collapse-item>
        </el-collapse>
    </el-col> -->
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
        activeName: '1'
    }
  },
  created() {
    console.log(this.$store.state.user)
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
$font-size = 16px

.box-card
    display: inline-block
    margin: 15px
    width: 20vw
    height: 20vh
    div
        display: inline-block
    div:nth-child(1)
        transition: all 0.38s ease-out
        color: #40c9c6
        font-size: 3 * $font-size
        float: left
    div:nth-child(2)
        display: inline-flex
        flex-direction: column
        color: rgba(0, 0, 0, 0.45)
        font-size: $font-size
        float: right
        margin: 5px
        .info-des
            margin-bottom: 10px
        .info-nums
            font-weight: bolder
.notification
    .el-collapse
        display inline-block
        min-width 45%
</style>
