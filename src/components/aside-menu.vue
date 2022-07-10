<template>
  <el-menu
    default-active='2'
    router
    text-color='#2d3436'
    active-text-color='#0984e3'>
    <el-menu-item index='2'>
      <i class='el-icon-menu'></i>
      <span slot='title'>片段</span>
    </el-menu-item>
    <el-menu-item index='3'>
      <i class='el-icon-document'></i>
      <span slot='title'>插件</span>
    </el-menu-item>
    <el-menu-item index='4'>
      <i class='el-icon-setting'></i>
      <span slot='title'>多样</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'aside-menu'
}
</script>

<style lang='less' scoped>
.el-menu {
  height: 100%;

  .el-menu-item span {
    font-size: 10px;
  }
}


</style>
