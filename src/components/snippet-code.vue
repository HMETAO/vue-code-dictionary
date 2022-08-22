<template>
  <div class='box'>
    <!--功能条-->
    <div class='snippet-expand'>
      <div>
        <el-tooltip effect='dark' content='返回Snippet新增面板' placement='top'>
          <el-button type='info' icon='el-icon-edit' circle size='mini'
                     @click='backSnippetPageEventFunction'></el-button>
        </el-tooltip>
        <el-tooltip effect='dark' content='保存' placement='top'>
          <el-button type='success' icon='el-icon-check' circle size='mini'
                     @click='saveSnippetEventFunction'></el-button>
        </el-tooltip>
      </div>

    </div>
    <prism-editor :tabSize='4'
                  @blur='editorBlur'
                  class='my-editor'
                  v-model='code.snippet'
                  :highlight='highlighter'
                  line-numbers></prism-editor>

    <!-- todo 封装为一个component-->
    <!--Drawer-->
    <el-drawer
      title='添加Snippet'
      :visible.sync='isDrawer'
      @open='openInsertDrawerEventFunction'>
      <div class='snippet-drawer-box'>
        <el-form :model='snippetFrom' class='snippet-drawer-box-form'>
          <el-form-item label='标题：' :label-width='formLabelWidth'>
            <el-input placeholder='请输入标题' v-model='snippetFrom.title'></el-input>
          </el-form-item>
          <el-form-item label='分组：' :label-width='formLabelWidth'>
            <el-cascader
              v-model='snippetFrom.category'
              :options='categories'
              :props='categoryProps'
            ></el-cascader>
          </el-form-item>
        </el-form>
        <div class='snippet-drawer-box-button'>
          <el-button type='primary'>确 定</el-button>
          <el-button>取 消</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css' // import the styles somewhere
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-tomorrow.css'


import { SNIPPET_GET_EVENT } from '@/constants/eventConstants'
import { BASE_SNIPPET } from '@/constants/baseConstants'
import { getCategoryMenus } from '@/api/category'

export default {
  name: 'snippet-code',
  components: {
    PrismEditor
  },
  data() {
    return {
      code: {
        snippet: BASE_SNIPPET
      },
      isDrawer: false,
      formLabelWidth: '80px',
      snippetFrom: {},
      categories: [],
      categoryProps: {
        value: 'id',
        checkStrictly: true,
        emitPath: false
      }
    }
  },
  mounted() {
    this.$bus.$on(SNIPPET_GET_EVENT, this.snippetGetCallback)
  },
  destroyed() {
    this.$bus.$off(SNIPPET_GET_EVENT)
  },

  methods: {
    // 获取到snippet的回调
    snippetGetCallback(code) {
      this.code = code
    },
    // 高亮方法
    highlighter(snippet) {
      return highlight(snippet, languages.js) // languages.<insert language> to return html with markup
    },
    // 返回插入snippet面板回调
    backSnippetPageEventFunction() {
      // 初始化编辑器
      this.code = { snippet: BASE_SNIPPET }
    },
    // 打开插入snippet的Drawer回调
    openInsertDrawerEventFunction() {
      getCategoryMenus({ snippet: false }).then(res => {
        this.categories = res.data
      })
    },
    // 保存
    saveSnippetEventFunction() {
      if (!this.code.id) {
        console.log('insert')
        // 弹出drawer
        this.isDrawer = true
      } else {
        console.log('update')
      }
    },
    editorBlur() {
      console.log(this.code)
    }
  }
}
</script>

<style scoped lang='less'>
.box {
  display: flex;
  flex: 1;
  flex-direction: column;

  .snippet-expand {
    display: flex;
    justify-content: flex-end;
    padding: 3px 15px;
    background-color: #4d4d4d;
  }
}

/* required class */
.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #3d3d3d;
  color: #ccc;
  width: 100%;
  /* you must provide font-family font-size line-height. Example: */
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}

.snippet-drawer-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  .snippet-drawer-box-form {
    padding-right: 10px;
    flex: 1
  }

  .snippet-drawer-box-button {
    display: flex;
    padding: 0 10px 5px;

    .el-button {
      flex: 1
    }
  }
}

</style>
