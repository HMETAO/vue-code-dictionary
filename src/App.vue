<template>
  <div id='app'>
    <el-container class='container'>
      <el-header height='70px'>
        <layout-header />
      </el-header>
      <layout-body class='content' />
    </el-container>
  </div>
</template>
<script>

import layoutHeader from '@/components/layout/layout-header'
import layoutBody from '@/components/layout/layout-body'

export default {
  name: 'App',
  components: {
    layoutHeader,
    layoutBody
  }
}
</script>

<style scoped lang='less'>


#app {
  width: 100%;
  height: 100%;
}

.container {
  height: 100%;

  .content {
    flex: 1;
    overflow: auto;
  }

  .el-header {
    border-bottom: #2ecc71 2px solid;
  }
}

</style>
