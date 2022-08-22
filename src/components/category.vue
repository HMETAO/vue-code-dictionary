<template>
  <div class='category-box'>
    <!--搜索部分-->
    <div class='snippet-category-search'>
      <el-input placeholder='搜索菜单内容' size='small' v-model='categorySearch' prefix-icon='el-icon-search'></el-input>
    </div>
    <!--树形部分-->
    <el-tree
      :data='categoryMenus'
      highlight-current
      node-key='id'
      @node-click='nodeClickEventFunction'
      :filter-node-method='filterNode'
      :expand-on-click-node='false'
      ref='tree'>
    <span class='custom-tree-node' slot-scope='{ node,data }'>
          <div class='category-node '>
            <el-tag v-if='data.snippet' class='el-icon-tickets' size='small' effect='plain'>
              <span>{{ node.label }}</span>
            </el-tag>
            <i v-else class='el-icon-folder category-site '>
              <span>{{ node.label }}</span>
            </i>
            <span class='tree-btn'>
              <el-button
                v-if='!data.snippet'
                type='text'
                @click='data.snippet? snippetInsertDialogEventFunction(data) : categoryInsertDialogEventFunction(data)'
                size='mini'>
                新增
              </el-button>
              <el-button
                type='text'
                @click='data.snippet? snippetDeleteEventFunction(data) : categoryDeleteEventFunction(data)'
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
      @close='categoryInsertDialogCloseEventFunction'
      width='25%'>
      <el-form :model='categoryInsertForm' class='snippet-drawer-box-form' ref='categoryInsertFormRef'>
        <el-form-item label='分组名：' :label-width='formLabelWidth' prop='name'>
          <el-input v-model='categoryInsertForm.name' placeholder='请输入分组名称'></el-input>
        </el-form-item>
        <el-form-item label='父分组：' :label-width='formLabelWidth' prop='parentId'>
          <el-cascader v-model='categoryInsertForm.parentId' :options='category'
                       :props='categoryProps'></el-cascader>
        </el-form-item>
      </el-form>
      <span slot='footer' class='dialog-footer'>
        <el-button type='primary' @click='categoryInsertEventFunction'>确 定</el-button>
        <el-button @click='categoryInsertDialogVisible = false'>取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCategoryMenus, insertCategory, deleteCategory } from '@/api/category'
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
    // dialog关闭刷新form
    categoryInsertDialogCloseEventFunction() {
      this.$refs['categoryInsertFormRef'].resetFields()
    },
    // 删除分组事件回调
    categoryDeleteEventFunction(data) {
      this.$confirm('此操作将永久删除 "' + data.label + '" ,该分组下Snippet转移至通用分组, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCategory(data.id)
          .then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 刷新category菜单
            this.getCategoryMenus()
          })
          .catch((err) => {
            this.$message({
              type: 'error',
              message: '删除失败：' + err
            })
          })
      })
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

      .tree-btn {
        margin-right: 5px;
      }

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
      }
    }
  }
}

</style>
