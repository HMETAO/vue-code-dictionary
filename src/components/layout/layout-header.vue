<!-- header -->
<template>
  <div class='header-box'>
    <div class='header-web-site'>
      <div class='web-title'>Code Dictionary</div>
    </div>
    <div class='header-user-center'>
      <div v-if='isLogin'>
        <el-popover
          placement='bottom'
          trigger='hover'
          :close-delay='100'
          width='250'
        >
          <el-avatar slot='reference' :src='userInfo.avatar'></el-avatar>
          <div class='user-site-box'>
            <div>
              <div class='site'>
                <label>
                  用户名：
                </label>
                <div> {{ userInfo.username }}</div>
              </div>
              <div class='site'>
                <label>
                  上次登录：
                </label>
                <div>
                  {{ userInfo.lastLoginTime }}
                </div>
              </div>
            </div>
            <el-button size='mini' type='primary' plain @click='logout'>退出登录</el-button>
          </div>
        </el-popover>

      </div>


      <el-menu mode='horizontal' active-text-color='#0984e3'>
        <el-menu-item index='1'>首页</el-menu-item>
        <el-menu-item index='2'>归档</el-menu-item>
        <el-menu-item index='3'>关于</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { logout } from '@/api/user'

export default {
  name: 'layout-header',
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      isLogin: false,
      userInfo: {}
    }
  },
  mounted() {
    this.$bus.$on('loginStateEvent', this.loginStateEventFunction)
  },
  created() {
    this.init()
  },
  destroyed() {
    this.$bus.$off('loginStateEvent')
  },
  //方法集合
  methods: {
    init() {
      // 判断登录状态
      this.isLogin = Boolean(window.localStorage.getItem('isLogin'))
      if (this.isLogin) {
        this.$set(this, 'userInfo', JSON.parse(window.localStorage.getItem('userInfo')))
      }
    },
    logout() {
      // 调用接口
      logout()
      // 清除状态
      window.localStorage.clear()
      this.userInfo = {}
      this.isLogin = false
      // 跳转登录页
      this.$router.push({ name: 'login' })
    },
    loginStateEventFunction() {
      this.init()
    }
  }
}
</script>
<style lang='less' scoped>
.user-site-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .site {
    display: flex;

    label {
      width: 75px;
      text-align: right;
    }

    div {
      flex: 1;
    }

  }

  .el-button {
    margin: 10px 0 0;
  }
}

.header-box {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: stretch;

  .header-web-site {
    display: flex;
    align-items: center;

    .web-title {
      padding: 3px;
      color: #888888;
      font-style: italic;
      font-weight: 700;
      cursor: default;
      transition: .5s;
    }

    .web-title:hover {
      background-image: linear-gradient(#2de2ff, #8b67fb);
      -webkit-background-clip: text;
      color: transparent;

    }
  }

  .header-user-center {
    display: flex;
    align-items: center;

    .el-menu {
      display: flex;
      align-items: center;
      margin-left: 15px;
      height: 100%;

      .el-menu-item {
        font-weight: 600;
        border: 0;
      }
    }

  }
}
</style>
