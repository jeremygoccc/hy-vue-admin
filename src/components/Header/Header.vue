<template>
  <el-row>
      <el-col :span="24">
          <i class="el-icon-setting"></i>
          <Breadcrumb></Breadcrumb>
          <el-badge :value="12">
            <el-dropdown>
              <i class="el-icon-bell"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>第一封邮件</el-dropdown-item>
                <el-dropdown-item>第二封邮件</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-badge>
          <el-dropdown class="avatar-container">
            <div class="avatar-wrapper">
              <img alt="" class="user-avatar" :src="avatar">
              <i class="el-icon-caret-bottom"></i>
            </div>
            <el-dropdown-menu class="user-dropdown" slot="dropdown">
              <el-dropdown-item divided>
                <router-link class="inlineBlock" to="/Admin">
                    首页
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <router-link class="inlineBlock" to="/Setting">
                    设置
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <span @click="logout" class="logout" style="color: red">退出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      </el-col>
  </el-row>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/BreadCrumb/BreadCrumb'

export default {
  name: 'Header',
  data () {
    return {
    }
  },
  components: {
    Breadcrumb
  },
  computed: {
    ...mapGetters([
      'avatar',
      'name',
      'roles'
    ])
  },
  methods: {
    logout () {
      console.log('点击退出')
      this.$store.dispatch('LogOut').then(() => {
        console.log('退出成功')
        // this.$route.push({ path: '/' })
        location.reload()
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="stylus">
$font-size = 16px
.el-col
  .el-breadcrumb
    display inline-block
    margin-left 10px
  .el-badge
    position absolute
    top 20px
    right 150px
    &__content
      font-size 10px!important
    .el-dropdown
      font-size 1.5 * $font-size
      .el-icon-bell
        position absolute
        right 5px
        top -35px
        color #fff
  .avatar-container
    height 50px
    display inline-block
    position absolute
    right 35px
    .avatar-wrapper
      cursor pointer
      position relative
      .user-avatar
        width 50px
        height 50px
        border-radius 50%
        position: absolute
        right 15px
        top 3px
      .el-icon-caret-bottom
        position absolute
        right -20px
        top 25px
        font-size 12px
</style>
