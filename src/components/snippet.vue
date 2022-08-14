<template>
  <div class='snippet-content'>
    <div class='snippet-category'>
      <category />
    </div>
    <div class='snippet-code'>
      <snippet-code />
    </div>
  </div>
</template>

<script>

import category from '@/components/category'
import snippetCode from '@/components/snippet-code'

export default {
  name: 'snippet',
  components: {
    category,
    snippetCode
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped lang='less'>

.snippet-content {
  height: 100%;
  justify-content: stretch;
  display: flex;

  .snippet-category {
    width: 250px;
  }

  .snippet-code {
    flex: 1;
    display: flex;
  }
}

</style>
