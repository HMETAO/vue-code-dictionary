<template>
  <div class='other-box'>
    <github-trend></github-trend>
  </div>

</template>

<script>
import githubTrend from '@/components/github-trend'

export default {
  name: 'other',
  components: {
    githubTrend
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
