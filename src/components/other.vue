<template>
  <div class='other-box'>
    <plug></plug>
    <github-trend></github-trend>
  </div>

</template>

<script>
import githubTrend from '@/components/github-trend'
import plug from '@/components/plug'

export default {
  name: 'other',
  components: {
    githubTrend,
    plug
  }
}
</script>

<style scoped lang='less'>
.other-box {
  display: flex;
  justify-content: space-between;
  height: 100%;
}

.el-card {
  border: 0;
}
</style>
