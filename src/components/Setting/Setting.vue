<template>
  <div class="page">
    <el-tabs tab-position="left">
      <el-tab-pane label="修改信息">
        <el-form label-position="right" label-width="100px" :model="infoForm" :rules="infoRules" ref="ruleForm">
          <el-form-item label="账号" prop="account">
            <el-input type="text" v-model="infoForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="头像" prop="avatar">
              <img alt="" class="user-avatar" :src="avatar">
              <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" style="display: inline-block;">
                <img alt="" v-if="imageUrl" :src="imageUrl">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="修改密码">
        <el-form label-position="right" label-width="100px" :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item label="旧密码" prop="old">
            <el-input type="password" v-model="ruleForm.old" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new">
            <el-input type="password" v-model="ruleForm.new" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirm">
            <el-input type="password" v-model="ruleForm.confirm" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'

export default {
  data () {
    const validateConfirmPass = (rule, value, callback) => {
      if (value === '') callback(new Error('请再次输入新密码'))
      else if (value !== this.ruleForm.new) callback(new Error('两次输入密码不一致'))
      else if (value === this.ruleForm.old) callback(new Error('新旧密码不得一致！'))
      else callback()
    }
    return {
      ruleForm: {
        old: '',
        new: '',
        confirm: ''
      },
      rules: {
        old: [{
          required: true, message: '请输入旧密码', trigger: 'blur'
        }],
        new: [{
          required: true, message: '请输入新密码', trigger: 'blur'
        }, {
          min: 6, max: 16, message: '密码长度6-16位', trigger: 'blur'
        }],
        confirm: [{
          validator: validateConfirmPass, trigger: 'blur'
        }]
      },
      infoForm: {
        name: this.$store.state.user.name
      },
      infoRules: {
        name: [{
          required: true, message: '请输入用户名', trigger: 'blur'
        }]
      },
      imageUrl: ''
    }
  },
  created () {
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('Error Submit!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      console.log(file.type)
      const isJPGPNG = (file.type === 'image/jpeg' || file.type === 'image/png')
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPGPNG) this.$message.error('上传头像图片只能是jpg或png格式')
      if (!isLt2M) this.$message.error('上传头像图片大小不能超过2MB')
      return isJPGPNG && isLt2M
    }
  },
  computed: {
    ...mapGetters([
      'avatar',
      'name',
      'roles'
    ])
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
$imgSize = 50px

.el-input
  width 200px
img
  width $imgSize
  height $imgSize
.avatar-uploader
  border 1px dashed #d9d9d9
  border-radius 6px
  cursor pointer
  overflow hidden
  margin-left 10px
  .avatar-uploader-icon
    width $imgSize
    height $imgSize
    line-height $imgSize
    text-align center
    color #8c939d
</style>
