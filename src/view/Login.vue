<template>
  <div class='login-container'>
    <div class='login-Box'>
      <!-- 头像 -->
      <div class='avatar-Box'>
        <img src='../assets/img/hmetao.png' alt='hmetao' />
      </div>
      <!-- 表单 -->
      <el-form
        label-width='0px'
        class='login-form'
        :model='loginForm'
        ref='loginFormRef'
        :rules='loginFormRules'
      >
        <!-- 用户名 -->
        <el-form-item prop='username'>
          <el-input
            placeholder='请输入用户名'
            prefix-icon='el-icon-user'
            v-model='loginForm.username'
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop='password'>
          <el-input
            placeholder='请输入密码'
            prefix-icon='el-icon-lock'
            v-model='loginForm.password'
            type='password'
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class='login-btn'>
          <el-button type='info' @click='()=>{this.registryDialogFormVisible = true}'>注册</el-button>
          <el-button type='primary' @click='login()'>登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--注册表单-->
    <el-dialog title='注册' :visible.sync='registryDialogFormVisible' @close='resetRegistryFormCloseEventFunction'>
      <el-form
        label-width='0px'
        :model='registryForm'
        ref='registryFormRef'
        :rules='registryFormRules'
      >
        <!-- 用户名 -->
        <el-form-item prop='username'>
          <el-input
            placeholder='请输入用户名'
            prefix-icon='el-icon-user'
            v-model='registryForm.username'
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop='password'>
          <el-input placeholder='请输入密码' type='password' v-model='registryForm.password' autocomplete='off'></el-input>
        </el-form-item>
        <el-form-item prop='checkPassword'>
          <el-input placeholder='确认密码' type='password' v-model='registryForm.checkPassword'
                    autocomplete='off'></el-input>
        </el-form-item>
        <!--手机号-->
        <el-form-item prop='mobile'>
          <el-input placeholder='手机号' v-model='registryForm.mobile'></el-input>
        </el-form-item>
        <!--邮箱-->
        <el-form-item prop='email'>
          <el-input placeholder='邮箱' v-model='registryForm.email'></el-input>
        </el-form-item>
        <!--头像-->
        <el-upload
          list-type='picture'
          action=''
          :limit='1'
          :auto-upload='false'
          ref='registryUploadRef'
          :on-change='avatarUploadChange'
          :on-remove='avatarUploadRemove'
          accept='image/png, image/jpeg'
        >
          <el-button size='small' type='primary'>上传头像</el-button>
        </el-upload>
        <!-- 按钮区域 -->
        <el-form-item class='login-btn'>
          <el-button type='primary' @click='registry()'>注册</el-button>
          <el-button type='info' @click='resetRegistryFormCloseEventFunction()'>重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { login, registry } from '@/api/user'
import { LOGIN_STATE_EVENT } from '@/constants/eventConstants'
import { successMessage, warningMessage } from '@/utils/baseMessage'

export default {
  name: 'Login',
  data() {
    // 校验密码框
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.registryForm.checkPassword !== '') {
          this.$refs.registryFormRef.validateField('checkPassword')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registryForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      registryDialogFormVisible: false,
      loginForm: {
        username: 'HMETAO',
        password: ''
      },
      registryForm: {
        username: '',
        password: '',
        checkPassword: '',
        email: '',
        mobile: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      // 注册表单Rules
      registryFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: '长度至少为8，至少含有一个字母和一个数字', trigger: 'blur' },
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        mobile: [
          {
            required: true,
            pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
            message: '手机号格式错误',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
            trigger: 'blur',
            message: '邮箱格式错误'
          }
        ]
      }
    }
  },
  methods: {
    avatarUploadChange(file, fileList) {
      this.registryForm.file = file.raw
    },
    avatarUploadRemove() {
      this.registryForm.file = undefined
    },
    registry() {
      // 校验注册表单
      this.$refs['registryFormRef'].validate((valid) => {
        if (valid) {
          // 构建formData对象
          const formData = new FormData()
          formData.append('username', this.registryForm.username)
          formData.append('password', this.registryForm.password)
          formData.append('email', this.registryForm.email)
          formData.append('mobile', this.registryForm.mobile)
          if (this.registryForm.file !== undefined)
            formData.append('file', this.registryForm.file)
          // 注册请求
          registry(formData).then(() => {
            // 关闭
            this.registryDialogFormVisible = false
            successMessage(this, '注册成功')
          }).catch(err => {
            warningMessage(this, err)
          })
        } else {
          warningMessage(this, '请根据要求填写登录表单')
          return false
        }
      })
    },
    login() {
      // 校验表单
      this.$refs['loginFormRef'].validate((valid) => {
        if (valid) {
          login(this.loginForm).then(res => {
            // 存储用户信息
            window.localStorage.setItem('userInfo', JSON.stringify(res.data))
            window.localStorage.setItem('isLogin', 'true')
            window.localStorage.setItem('token', res.data.token)
            // 触发登录事件
            this.$bus.$emit(LOGIN_STATE_EVENT)
            // 跳转home
            this.$router.push({ name: 'home' })
          }).catch(err => {
            this.$message.error(err)
          })
        } else {
          this.$message({
            type: 'warning',
            message: '请根据要求填写登录表单！'
          })
          return false
        }
      })

    },
    resetRegistryFormCloseEventFunction() {
      this.registryForm.file = undefined
      // 刷新表单
      this.$refs.registryFormRef.resetFields()
    }
  }
}
</script>

<style lang='less' scoped>

.login-btn {
  display: flex;
  justify-content: flex-end;
}

.login-form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.login-container {
  background-color: #74b9ff;
  height: 100%;

  .login-Box {
    position: relative;
    width: 450px;
    height: 300px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #f1f2f6;
    border-radius: 8px;

    .avatar-Box {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80px;
      height: 80px;
      border: 1px solid #eeeeee;
      border-radius: 50%;
      padding: 10px;
      overflow: hidden;
      box-shadow: 0 0 10px #dddddd;
      background-color: #f1f2f6;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: #dfe6e9;
      }
    }
  }
}

</style>
