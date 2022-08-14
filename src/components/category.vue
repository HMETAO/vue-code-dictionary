<template>
  <div class='category-box'>
    <!--搜索部分-->
    <div class='snippet-category-search'>
      <el-input placeholder='搜索菜单内容' size='small' v-model='categorySearch' prefix-icon='el-icon-search'></el-input>
    </div>
    <!--树形部分-->
    <el-tree
      :data='categories'
      accordion
      highlight-current
      node-key='id'
      @node-click='nodeClickEventFunction'
      :filter-node-method='filterNode'
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
  </div>
</template>

<script>
import { getCategoryMenus } from '@/api/category'
import { getSnippet } from '@/api/snippet'
import { SNIPPET_GET_EVENT } from '@/constants/eventConstants'

export default {
  name: 'category',
  data() {
    return {
      categories: [],
      categorySearch: ''
    }
  },
  created() {
    this.getCategoryMenus()
  },
  watch: {
    categorySearch(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    // 获取分类列表
    getCategoryMenus() {
      getCategoryMenus()
        .then(res => {
          this.categories = res.data
        })
    },
    // 节点点击回调
    nodeClickEventFunction(data, node) {
      console.log(node)
      // 判断是否为snippet
      if (data.snippet) {
        // 调用请求查询具体code
        getSnippet(data.id.replaceAll('sn-', ''))
          .then(res => {
            this.$bus.$emit(SNIPPET_GET_EVENT, res.data)
          }).catch(() => {
          this.$bus.$emit(SNIPPET_GET_EVENT, { snippet: '请正确选择snippet' })
        })
      }
    },
    // 查询node
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }

  }
}
</script>

<style scoped lang='less'>
.category-box {
  display: flex;
  flex-direction: column;
  height: 100%;

  .el-tree {
    font-size: 15px;
    color: #7d7d7d;
    flex: 1;

    .custom-tree-node {
      span {
        margin-left: 5px;
      }
    }
  }
}

</style>
