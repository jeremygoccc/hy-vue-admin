<template>
  <div class="page">
    <el-col id="cards">
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
    <el-col id="notification">
        <el-card>
            <div slot="header" style="font-weight: bolder">
                <span style="margin-right: 5px">欢迎中心</span><i class="header-icon el-icon-menu"></i>
            </div>
            <div class="info-item">
                <span>当前天气：晴</span>
                <span>当前时间：{{ time }}</span>
            </div>
        </el-card>
        <el-card>
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item name="1">
                    <template slot="title">
                        <b style="font-size: 17px; margin-right: 5px">公告</b><i class="header-icon el-icon-info"></i>
                    </template>
                    <span>宏奕2018官网开发测试中...</span>
                </el-collapse-item>
            </el-collapse>
        </el-card>
    </el-col>
    <el-col id="center">
        <el-card>
            <el-menu mode="horizontal" @select="handleSelect">
                <el-menu-item index="Operation">处理中心</el-menu-item>
                <el-menu-item index="Message">消息中心</el-menu-item>
            </el-menu>
            <template v-if="operationFlag">
                <div class="operation-item">
                    <span>您的关键词是：
                        <b style="color: green; margin-right: 10px" v-for="(point, index) in points" :key="index" v-text="point.title"></b>
                    </span>
                    <span>匹配邮件最近一次发送时间：19分钟前 <el-button type="primary" style="margin-left: 10px" @click="sendAgain()"><i class="el-icon-refresh" style="margin-right: 5px"></i>再次发送</el-button></span>
                </div>
            </template>
            <template v-else>
                <div class="operation-item">
                    <span>收到邮件：15封</span>
                    <span style="color: green">已读：5封</span>
                    <span style="color: red">未读：10封</span>
                </div>
            </template>
        </el-card>
    </el-col>
  </div>
</template>

<script type="text/ecmascript-6">
import { formatTime, sendEmail } from '@/utils/oridinary'

export default {
  data () {
    return {
        activeName: '1',
        activeIndex: '1',
        operationFlag: true,
        points: [
            {
                title: '数学逻辑分析'
            },
            {
                title: '离散数学'
            },
            {
                title: '线性代数'
            },
            {
                title: '人工智能'
            }
        ],
        time: ''
    }
  },
  created () {
    console.log(sendEmail)
    console.log(this.$store.state.user)
    this.time = formatTime(new Date())
  },
  watch: {
      time () {
        return formatTime(new Date())
      }
  },
  methods: {
    handleSelect (key, keyPath) {
        console.log(key, keyPath)
        this.operationFlag = !this.operationFlag
    },
    sendAgain () {
        sendEmail()
    }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
$font-size = 16px

.el-col
    display flex
    justify-content space-between
    margin-top 32px
    &:first-child
        margin-top 0
#cards
    // width 100vw
    .box-card
        display: inline-block
        width: 20vw
        max-height: 30vh
        padding-bottom: 15px
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
#notification
    .el-card
        display inline-block
        min-width 48.5%
        .info-item
            min-height 48px
            display flex
            flex-direction column
            justify-content space-between
            font-size .9375rem
#center
    .el-card
        min-width 100%
        .operation-item
            display flex
            flex-direction column
            justify-content space-between
            padding 2rem
            span
                margin-top 1.25rem
</style>
