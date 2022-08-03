<template>
  <el-tree
    :data='categories'
    accordion
    highlight-current
    node-key='id'
    ref='tree'>
    <span class='custom-tree-node' slot-scope='{ node,data }'>
      <el-tag v-if='data.snippet' class='el-icon-tickets' size='small' effect='plain'>
        <span>{{ node.label }}</span>
      </el-tag>
      <i class='el-icon-folder' v-else>
        <span>{{ node.label }}</span>
      </i>
      </span>
  </el-tree>
</template>

<script>
import { getCategoryMenus } from '@/api/category'

export default {
  name: 'category',
  data() {
    return {
      categories: []
    }
  },
  created() {
    this.getCategoryMenus()
  },
  methods: {
    // 获取分类列表
    getCategoryMenus() {
      getCategoryMenus()
        .then(res => {
          this.categories = res.data
          console.log(res)
        })
    }

  }
}
</script>

<style scoped lang='less'>
.el-tree {
  font-size: 15px;

  .custom-tree-node {
    span {
      margin-left: 5px;
    }
  }
}
</style>
