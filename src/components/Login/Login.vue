<template>
  <div class="login-container">
    <div class="loginbox" v-if="loginStatus">
      <el-form id="login" class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" status-icon ref="loginForm" label-position="right">
        <h3 class="title">Welcome to</h3>
        <h1 style="color:#251876 margin-bottom:100px" class="title">vue-element-admin</h1>
        <el-form-item label="邮箱" prop="login_email">
          <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username"></el-input><br>
        </el-form-item>
        <el-form-item label="密码" prop="login_password">
          <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"></el-input>
        </el-form-item>
        <el-form-item class="el-form-item-button">
          <el-button style="background-color:#af51c3" type="primary" @click.native.prevent="handleLogin" :loading="loading">立即登录</el-button>
          <el-button type="info" @click="switchPages()">注册界面</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="loginbox registerbox" v-else>
      <el-form ref="registerForm" class="login-form" :model="registerForm" :rules="registerRules">
        <el-form-item label="通讯邮箱" prop="email">
          <el-input type="text" placeholder="方便进行分类推送" v-model="registerForm.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="register_password">
          <el-input class="psw" name="password" type="password" @keyup.enter.native="handleLogin" v-model="registerForm.password" autoComplete="on"></el-input>
        </el-form-item>
        <el-form-item label="姓名(中)" prop="register_user_name">
          <el-input class="username" name="username" type="text" v-model="registerForm.username" autoComplete="on" placeholder="真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="姓名(英)" prop="register_user_ename">
          <el-input class="username" name="userename" type="text" v-model="registerForm.userename" autoComplete="on"  placeholder="没有可不填"></el-input>
        </el-form-item>
        <el-form-item label="照片上传" prop="photo">
          <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" drag :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="单位">
          <el-input type="text"></el-input>
        </el-form-item>
        <el-form-item label="领域" prop="domain">
          <el-cascader :options="domains" @change="handleDomainChange" expand-trigger="hover" v-model="registerForm.domainSelected" style="width: 300px" placeholder="请选择自己的领域"></el-cascader>
        </el-form-item>
        <el-form-item label="方向" prop="direct">
          <el-select v-model="registerForm.direction" multiple placeholder="请选择领域后再选择方向(至多6个)" style="width: 300px">
            <el-option v-for="(item, index) in directions" :key="index" :value="item.title">
            </el-option>
          </el-select>
          <el-input type="text" class="inputtext" placeholder="如有需要可补充" v-for="(keyword, index) in keywords" :key="index" v-model="registerForm.keywords[index]"></el-input>
        </el-form-item>
        <el-form-item label="个人网页链接">
          <el-input type="text" v-model="registerForm.privateURL"></el-input>
        </el-form-item>
        <el-form-item class="el-form-item-button">
          <el-button style="background-color:#af51c3" type="primary" @click="register()" :loading="loading">立即注册</el-button>
          <el-button type="info" @click="switchPages()">登录界面</el-button>
        </el-form-item>
      </el-form>
    </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { isValidUsername, isValidEmail } from '@/utils/validate'
import { getCategory, getTag } from '@/utils/register'

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
    const validateEmail = (rule, value, callback) => {
      if (!isValidEmail(value)) {
        callback(new Error('请输入正确的邮箱地址'))
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
        login_name: [{ required: true, trigger: 'blur', validator: validateUsername}],
        login_password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      registerForm: {
        email: '',
        username: '',
        userename: '',
        password: '',
        privateURL: '',
        domainSelected: [],
        keywords: []
      },
      registerRules: {
        photo: [{ required: true, message: '请上传照片', trigger: 'blur' }],
        register_user_name: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
        domain: [{ required: true, message: '请输入自己的领域', trigger: 'blur' }],
        direct: [{ required: true , message: '请输入自己的方向', trigger: 'blur' }],
        email: [{ required: true, trigger: 'blur', validator: validateEmail }]
      },
      imageUrl: '',
      domains: [{
        value: 'physics',
        label: 'A(物理)',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则'
        }],
      }],
      domainSelected: [],
      directions: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
      }],
      direction: [],
      keywords: [
        '', '', '', '', '', ''
      ],
      loading: false,
      pwdType: 'password',
      loginStatus: true
    }
  },
  created () {
    this.domains = []
    getCategory().then(res => {
      console.log(res)
      res.forEach(first => {
        let firstItem = {
          value: first.id,
          label: first.title,
          children: []
        }
        if (first.child) {
          first.child.forEach(second => {
            firstItem.children.push({
              value: second.id,
              label: second.title
            })
          })
        }
        this.domains.push(firstItem)
      })
      console.log(this.domains)
    })
    .catch(err => console.log(err))
  },
  methods: {
    beforeAvatarUpload (file) {
      const isJPGPNG = (file.type === 'image/jpeg' || file.type === 'image/png')
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPGPNG) this.$message.error('上传照片只能是jpg或png')
      if (!isLt2M) this.$message.error('上传照片大小不能超过2MB')
      return isJPGPNG && isLt2M
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    handleDomainChange (e) {
      console.log(e)
      getTag(e[1]).then(res => {
        this.directions = res
        console.log(this.directions)
      }).catch(err => console.log(err))
    },
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
      console.log(this.registerForm)
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  computed: {
    // 'allSelected': () => {
    //   return this.direction.length + this.keywords.length
    // }
  },
  components: {

  }
}
</script>

<style lang="stylus">
$bg = #2d3a4b
$light_gray = #616161

.login-container
  background-image url('../../assets/banner.png')
  background-repeat 'no-repeat'
  
  background-size cover
  width 100%
  min-height 100%
  position absolute
  // background #50a3a2
  // background -webkit-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%)
  // background -moz-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%)
  // background -o-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%)
  // background linear-gradient(to bottom right, #50a3a2 0%, #53e3a6 100%)
  .el-button
    border none
    border-radius 15px
    margin-left 20px

  .el-input
    display inline-block
    height 47px
    width 85%
    input
      // background transparent
      border 0
      -webkit-appearance none
      border-radius 0
      padding 12px 5px 12px 15px
      height 47px
      &:-webkit-autofill
        -webkit-box-shadow 0 0 0 1000px $bg inset!important
        -webkit-text-fill-color #fff!important
  .el-form-item
    color #d9dbde
    // border 1px solid rgba(255, 255, 255, 0.1)
    // background rgba(0, 0, 0, 0.1)
    border-radius 5px
    &__label
      width 75px
      color #877ad4!important
      
</style>

<style lang="stylus" scoped>
$bg = #2d3a4b
$dark_gray = #889aa4
$light_gray = #877ad4
.login-container
  //width 100%
  //background-color $bg
  //background-image linear-gradient(45deg,#063053, #9951ff)
  .login-form
    // height 100%
    position absolute
    //background: linear-gradient(to bottom, rgba(0,0,0,0.6) 100%, rgba(0,0,0,0.6) 100%);
    left -60%
    right 0
    width 520px
    padding 35px 35px 15px 35px
    margin 120px auto
    
    height 400px
    overflow-x hidden
    overflow-y scroll
    line-height 30px
    
    .title
      padding-left 30px
      font-weight 400
      color $light_gray
      
      
      font-weight bold
    .el-form-item:last-child
      color #d9dbde
      display flex
      //justify-content center
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

