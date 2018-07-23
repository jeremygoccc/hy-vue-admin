<template>
  <div class="login-container">
    <div class="loginbox" v-if="loginStatus">
      <el-form id="login" ref="form" class="login-form" :model="loginForm" :rules="loginRules" status-icon label-position="right">
        <h3 class="title">Welcome to</h3>
        <h1 style="color:#251876 margin-bottom:100px" class="title">vue-element-admin</h1>
        <el-form-item label="邮箱" prop="username">
          <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="通讯邮箱"></el-input><br>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item class="el-form-item-button">
          <el-button style="background-color:#af51c3" type="primary" @click.native.prevent="handleLogin" :loading="loading">立即登录</el-button>
          <el-button type="info" @click="switchPages()">注册界面</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="loginbox registerbox" v-else>
      <el-form ref="form" class="login-form" :model="registerForm" :rules="registerRules" status-icon>
        <el-form-item label="通讯邮箱" prop="email">
          <el-input type="text" placeholder="方便进行分类推送" v-model="registerForm.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input class="psw" name="password" type="password" @keyup.enter.native="handleLogin" v-model="registerForm.password" autoComplete="on"></el-input>
        </el-form-item>
        <el-form-item label="姓名(中)" prop="c_name">
          <el-input class="username" name="username" type="text" v-model="registerForm.c_name" autoComplete="on" placeholder="真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="姓名(英)" prop="e_name">
          <el-input class="username" name="userename" type="text" v-model="registerForm.ename" autoComplete="on"  placeholder="没有可不填"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input class="username" name="userphone" type="text" v-model="registerForm.phone" autoComplete="on"  placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="照片上传" prop="photo">
          <el-upload class="avatar-uploader" action="https://physic.gongbarry.xyz/uploads" :auto-upload="true" drag :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <!-- <input type="file" name="" id=""> -->
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-input type="text" v-model="registerForm.unit"></el-input>
        </el-form-item>
        <el-form-item label="领域" prop="domain">
          <el-cascader :options="domains" @change="handleDomainChange" expand-trigger="hover" v-model="registerForm.category" style="width: 300px" placeholder="请选择自己的领域" required></el-cascader>
        </el-form-item>
        <el-form-item label="方向" prop="direct">
          <el-select v-model="registerForm.tag" multiple placeholder="请选择领域后再选择方向(至多6个)" style="width: 300px" required>
            <el-option v-for="(item, index) in directions" :key="index" :value="item.title">
            </el-option>
          </el-select>
          <el-input type="text" class="inputtext" placeholder="如有需要可补充" v-for="(keyword, index) in keywords" :key="index" v-model="registerForm.addTag[index]"></el-input>
        </el-form-item>
        <el-form-item label="个人网页链接">
          <el-input type="text" v-model="registerForm.privateURL"></el-input>
        </el-form-item>
        <el-form-item class="el-form-item-button">
          <el-button style="background-color:#af51c3" type="primary" @click.native.prevent="handleRegister" :loading="loading">立即注册</el-button>
          <el-button type="info" @click="switchPages()">登录界面</el-button>
        </el-form-item>
      </el-form>
    </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { isValidUsername, isValidEmail, isValidPhone } from '@/utils/validate'
import { getCategory, getTag, toEmail } from '@/utils/register'
import { getToken, getUserId } from '@/utils/auth'

export default {
  name: 'Login',
  data () {
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
    const validatePhone = (rule, value, callback) => {
      if (!isValidPhone(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        userename: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateEmail}],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      registerForm: {
        email: '',
        c_name: '',
        e_name: '',
        password: '',
        privateURL: '',
        phone: '',
        unit: '',
        category: [],
        tag: [],
        addTag: []
      },
      registerRules: {
        // photo: [{ required: true, message: '请上传照片', trigger: 'blur' }],
        c_name: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
        // domain: [{ required: true, message: '请输入自己的领域', trigger: 'blur' }],
        // direct: [{ required: true , message: '请输入自己的方向', trigger: 'blur' }],
        email: [{ required: true, trigger: 'blur', validator: validateEmail }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }],
        phone: [{ trigger: 'blur', validator: validatePhone }],
        unit: [{ required: true, trigger: 'blur', message: '请输入自己的单位信息' }]
      },
      imageUrl: '',
      domains: [{
        value: 'physics',
        label: 'A(物理)',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则'
        }]
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
      // this.imageUrl = URL.createObjectURL(file.raw)
      // console.log(imageUrl)
      return isJPGPNG && isLt2M
    },
    handleAvatarSuccess (res, file) {
      console.log(res)
      this.imageUrl = URL.createObjectURL(file.raw)
      console.log(this.imageUrl)
    },
    handleDomainChange (e) {
      console.log(e)
      getTag(e[1]).then(res => {
        this.directions = res
        console.log(this.directions)
      }).catch(err => console.log(err))
    },
    handleRegister () {
      console.log(this.registerForm)
      // this.registerForm.tag = Object
      let tagIdArr = []
      this.registerForm.tag.forEach(tag => {
        this.directions.forEach(direction => {
          if (tag === direction.title) tagIdArr.push(direction.id)
        })
      })
      this.registerForm.tag = tagIdArr
      // let form = {
      //   add_tag: this.registerForm.addTag.join(','),
      //   category: this.registerForm.category[1],
      //   ename: this.registerForm.ename,
      //   name: this.registerForm.name,
      //   password: this.registerForm.password,
      //   myurl: this.registerForm.privateURL,
      //   tag: tagIdArr.join(','),
      //   username: this.registerForm.username,
      //   phone: this.registerForm.phone,
      //   unit: this.registerForm.unit
      // }
      // console.log(form)
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Register', this.registerForm)
            .then(() => {
              console.log('注册成功')
              this.loading = false
              const userId = getUserId()
              const data = { token: getToken() }
              toEmail(userId, data).then(res => console.log(res))
                .catch(err => console.log(err))
              this.$router.push({ path: '/Admin' })
            }).catch(err => {
              console.log('注册失败: ' + err)
              this.loading = false
            })
        } else {
          this.$message.error('请检查输入格式')
          return false
        }
      })
    },
    handleLogin () {
      this.$refs.form.validate(valid => {
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
          this.$message.error('请检查输入格式')
          return false
        }
      })
    },
    switchPages () {
      this.loginStatus = !this.loginStatus
      setTimeout(() => {
        this.resetForm('form')
      }, 100);
    },
    register () {
      console.log(this.registerForm)
    },
    resetForm (formName) {
      console.log(this.$refs[formName])
      if (this.$refs[formName] !== undefined) this.$refs[formName].resetFields()
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
$avatar_height = 178px

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
      &-dragger
        width $avatar_height!important
        height $avatar_height!important
        line-height $avatar_height!important
    .avatar-uploader .el-upload:hover
      border-color #409EFF
    .avatar-uploader-icon
      font-size 28px
      color #8c939d
      width $avatar_height
      height $avatar_height
      line-height $avatar_height
      text-align center
    .avatar
      width $avatar_height
      height $avatar_height
      display block
</style>
