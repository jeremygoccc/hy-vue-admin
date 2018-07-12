<template>
  <div class="login-container">
      <div class="loginbox" v-if="loginStatus">
         <el-form  id="login" class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" status-icon label-width="80px" ref="loginForm" label-position="left">
          <h3 class="title">vue-element-admin</h3>
          <el-form-item label="账号" prop="username">
            <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"></el-input>
          </el-form-item>
          <el-form-item class="el-form-item-button">
            <el-button type="primary" @click.native.prevent="handleLogin" :loading="loading">立即登录</el-button>
            <el-button type="primary" @click="switchPages()">注册界面</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="loginbox registerbox" v-else>
        <el-form  id="register" class="login-form">
          <el-form-item label="照片上传">
            <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" drag :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="姓名(中)" prop="username">
            <el-input class="username" name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username"></el-input>
          </el-form-item>
           <el-form-item label="姓名(英)" prop="username">
            <el-input class="username" name="username" type="text" v-model="loginForm.userename" autoComplete="on" placeholder="username"></el-input>
          </el-form-item>
           <el-form-item label="单位">
            <el-input type="text"></el-input>
          </el-form-item>
          <el-form-item label="领域">
            <el-cascader
              :options="options2"
              @active-item-change="handleItemChange"
              :props="props"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="方向">
            <el-input type="text" class="inputtext" placeholder="请输入关键词"></el-input><el-input type="text" class="inputtext" placeholder="请输入关键词"></el-input><el-input type="text" class="inputtext" placeholder="请输入关键词"></el-input>
            <el-input type="text" class="inputtext" placeholder="请输入关键词"></el-input><el-input type="text" class="inputtext" placeholder="请输入关键词"></el-input><el-input type="text" class="inputtext" placeholder="请输入关键词"></el-input>
          </el-form-item>
          <el-form-item label="通讯邮箱">
            <el-input type="text"></el-input>
          </el-form-item>
          <el-form-item label="个人网页链接">
            <el-input type="text"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input class="psw" name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"></el-input>
          </el-form-item>
          <el-form-item class="el-form-item-button">
            <el-button type="primary" @click="switchPages()">登录界面</el-button>
            <el-button type="primary" @click="register()">立即注册</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { isValidUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isValidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        userename: '',
        password: 'admin'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername}],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      options2: [{
          label: 'A(物理)',
          cities: []
        }, {
          label: 'B(计算机)',
          cities: []
        }],
        props: {
          value: 'label',
          children: 'cities'
        },
      loading: false,
      pwdType: 'password',
      loginStatus: true
    }
  },
  created () {
  },
  methods: {
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm)
                    .then(() => {
                      console.log('登录成功')
                      this.loading = false
                      this.$router.push({ path: '/Admin' })
                    }).catch(err => {
                      console.log('登录失败: ' + err)
                      this.loading = false
                    })
        } else {
          console.log('Error Submit!')
          return false
        }
      })
    },
    switchPages () {
      this.loginStatus = !this.loginStatus
    },
    register () {
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleItemChange(val) {
      console.log('active item:', val);
      setTimeout(_ => {
        if (val.indexOf('A(物理)') > -1 && !this.options2[0].cities.length) {
          this.options2[0].cities = [{
            label: 'A01光学'
          }];
        } else if (val.indexOf('B(计算机)') > -1 && !this.options2[1].cities.length) {
          this.options2[1].cities = [{
            label: 'B01计算机科学'
          }];
        }
      }, 300);
    }
  },
  components: {

  }
}
</script>

<style lang="stylus">
$bg = #2d3a4b
$light_gray = #616161

.login-container
  .el-input
    display inline-block
    height 47px
    width 85%
    input
      background transparent
      border 0
      -webkit-appearance none
      border-radius 0
      padding 12px 5px 12px 15px
      color $light_gray
      height 47px
      &:-webkit-autofill
        -webkit-box-shadow 0 0 0 1000px $bg inset!important
        -webkit-text-fill-color #fff!important
  .el-form-item
    border 1px solid rgba(255, 255, 255, 0.1)
    background rgba(0, 0, 0, 0.1)
    border-radius 5px
    color #eee
</style>

<style lang="stylus" scoped>
$bg = #d5def5
$dark_gray = #889aa4
$light_gray = #90aeff
.login-container
  height 100%
  width 100%
  background-color $bg
  //background-image linear-gradient(45deg,#063053, #9951ff)
  .login-form
    // height 100%
    position absolute
    background-color #d5def5
    left 0
    right 0
    width 520px
    padding 35px 35px 15px 35px
    margin 120px auto
    .title
      font-size 26px
      font-weight 400
      color $light_gray
      margin 0 auto 40 auto
      text-align center
      font-weight bold
    .el-form-item:last-child
      display flex
      justify-content center
    .inputtext
      width 30%
    .avatar-uploader .el-upload
      border 1px dashed #d9d9d9
      border-radius 6px
      cursor pointer
      position relative
      overflow hidden
    .avatar-uploader .el-upload:hover
      border-color #409EFF
    .avatar-uploader-icon
      font-size 28px
      color #8c939d
      width 178px
      height 178px
      line-height 178px
      text-align center
    .avatar
      width 178px
      height 178px
      display block
</style>

