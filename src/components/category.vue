<template>
  <div class='category-box'>
    <!--搜索部分-->
    <div class='snippet-category-search'>
      <el-input placeholder='搜索菜单内容' size='small' v-model='categorySearch' prefix-icon='el-icon-search'></el-input>
    </div>
    <!--树形部分-->
    <el-tree
      :data='categoryMenus'
      accordion
      highlight-current
      node-key='id'
      @node-click='nodeClickEventFunction'
      :filter-node-method='filterNode'
      :expand-on-click-node='false'
      ref='tree'>
    <span class='custom-tree-node' slot-scope='{ node,data }'>
          <el-tag v-if='data.snippet' class='el-icon-tickets' size='small' effect='plain'>
            <span>{{ node.label }}</span>
          </el-tag>
          <div v-else class='category-node '>
            <i class='el-icon-folder category-site '>
              <span>{{ node.label }}</span>
            </i>
            <span class='tree-btn'>
              <el-button
                type='text'
                @click='categoryInsertDialogEventFunction(data)'
                size='mini'>
                新增
              </el-button>
              <el-button
                type='text'
                size='mini'>
                删除
              </el-button>
            </span>
          </div>
      </span>
    </el-tree>


    <el-dialog
      title='添加category'
      :visible.sync='categoryInsertDialogVisible'
      width='25%'>
      <el-form :model='categoryInsertForm' class='snippet-drawer-box-form'>
        <el-form-item label='分组名：' :label-width='formLabelWidth'>
          <el-input v-model='categoryInsertForm.name' placeholder='请输入分组名称'></el-input>
        </el-form-item>
        <el-form-item label='父分组：' :label-width='formLabelWidth'>
          <el-cascader v-model='categoryInsertForm.parentId' :options='category'
                       :props='categoryProps'></el-cascader>
        </el-form-item>
      </el-form>
      <span slot='footer' class='dialog-footer'>
        <el-button @click='categoryInsertDialogVisible = false'>取 消</el-button>
        <el-button type='primary' @click='categoryInsertEventFunction'>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCategoryMenus, insertCategory } from '@/api/category'
import { getSnippet } from '@/api/snippet'
import { SNIPPET_GET_EVENT } from '@/constants/eventConstants'

export default {
  name: 'category',
  data() {
    return {
      categoryMenus: [],
      categorySearch: '',
      formLabelWidth: '80px',
      categoryInsertDialogVisible: false,
      categoryInsertForm: {
        parentId: '0'
      },
      categoryProps: {
        value: 'id',
        checkStrictly: true,
        emitPath: false
      },
      category: [
        { id: '0', label: '顶级分组' }
      ]

    }
  },
  created() {
    this.init()
  },
  watch: {
    categorySearch(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    // 初始化方法
    init() {
      this.getCategoryMenus()
      this.getCategory()
    },
    // 获取分类列表（包括snippet）
    getCategoryMenus() {
      getCategoryMenus()
        .then(res => {
          this.categoryMenus = res.data
        })
    },
    // 只获取分组列表（不包括snippet）
    getCategory() {
      getCategoryMenus({ snippet: false })
        .then(res => {
          this.category = this.category.concat(res.data)
        })
    },
    // 节点点击回调
    nodeClickEventFunction(data) {
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
    },
    // 点击category添加按钮回调
    categoryInsertDialogEventFunction(data) {
      // 打开对话框
      this.categoryInsertDialogVisible = true
      this.categoryInsertForm.parentId = data.id
    },
    categoryInsertEventFunction() {
      insertCategory(this.categoryInsertForm)
        .then(() => {
          // 关闭对话框
          this.categoryInsertDialogVisible = false
          // 刷新菜单
          this.getCategoryMenus()
          // 弹出提示消息
          this.$message({
            showClose: true,
            message: '添加成功',
            type: 'success'
          })
        })
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
    font-size: 14px;
    color: #7d7d7d;
    flex: 1;

    .custom-tree-node {
      width: 100%;

      span {
        margin-left: 5px;
      }

      .category-node {
        display: flex;
        justify-content: space-between;

        .category-site {
          display: flex;
          align-items: center;
        }

        .tree-btn {
          margin-right: 5px;
        }
      }
    }
  }
}

</style>