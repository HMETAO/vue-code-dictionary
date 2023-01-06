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
          <el-button type='primary' @click='login()'>登录</el-button>
          <el-button type='info' @click='resetLoginForm()'>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { LOGIN_STATE_EVENT } from '@/constants/eventConstants'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: 'HMETAO',
        password: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login() {
      // 校验表单
      this.$refs['loginFormRef'].validate((valid) => {
        if (valid) {
          login(this.loginForm).then(res => {
            // 存储用户信息
            window.localStorage.setItem('userInfo', JSON.stringify(res.data))
            window.localStorage.setItem('isLogin', 'true')
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
    resetLoginForm() {
      // 刷新表单
      this.$refs.loginFormRef.resetFields()
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
