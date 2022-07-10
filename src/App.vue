<template>
  <div id='app'>
    <el-container>
      <el-header height='70px'>
        <layout-header />
      </el-header>
      <layout-body />
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

<style>
html, body {
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
}

.el-container {
  height: 100%;
}

.el-header {
  border-bottom: #2ecc71 2px solid;

}

</style>
