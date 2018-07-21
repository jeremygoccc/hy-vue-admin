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
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {

    }
  },
  created () {
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
</style>
