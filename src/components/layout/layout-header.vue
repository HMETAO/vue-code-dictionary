<!-- header -->
<template>
  <div class='header-box'>
    <div class='header-web-site'>
      <div class='web-title'>Code Dictionary</div>
    </div>
    <div class='header-user-center'>
      <el-avatar
        src='http://tpocketbook.hmetao.cn/TPocketBook/avatar/c569fb7de0cc4e4089bf7c8bc3127b41.jpg'>
      </el-avatar>
      <el-menu mode='horizontal' active-text-color='#0984e3'>
        <el-menu-item index='2'>首页</el-menu-item>
        <el-menu-item index='3'>归档</el-menu-item>
        <el-menu-item index='4'>关于</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: 'layout-header',
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {}
  },
  //方法集合
  methods: {}
}
</script>
<style lang='less' scoped>
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
