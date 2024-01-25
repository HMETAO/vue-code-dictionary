<template>
  <el-card class='tool-box'>
    <toolTable></toolTable>
  </el-card>
</template>

<script>
import toolTable from '@/components/tool-table'

export default {
  name: 'tool',
  components: {
    toolTable
  }
}
</script>

<style lang='less' scoped>
.tool-box {
  height: 100%;

}

.el-card {
  border: 0;
}
</style>
