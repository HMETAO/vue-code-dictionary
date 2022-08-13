<template>
  <el-tree
    :data='categories'
    accordion
    highlight-current
    node-key='id'
    @node-click='nodeClickEventFunction'
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
import { getSnippet } from '@/api/snippet'
import { SNIPPET_GET_EVENT } from '@/constants/eventConstants'

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
        })
    },
    nodeClickEventFunction(data) {
      // 判断是否为snippet
      if (data.snippet) {
        // 调用请求查询具体code
        getSnippet(data.id.replaceAll('sn-', ''))
          .then(res => {
            this.$bus.$emit(SNIPPET_GET_EVENT, res.data.snippet)
          }).catch(() => {
          this.$bus.$emit(SNIPPET_GET_EVENT, '请正确选择snippet')
        })
      }
    }

  }
}
</script>

<style scoped lang='less'>
.el-tree {
  font-size: 15px;
  height: 100%;

  .custom-tree-node {
    span {
      margin-left: 5px;
    }
  }
}
</style>
