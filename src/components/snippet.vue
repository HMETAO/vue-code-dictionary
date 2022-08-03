<template>
  <el-card>
    <el-container class='snippet-container'>
      <el-aside>
        <!--category列表-->
        <category />
      </el-aside>
      <el-main>
        <el-scrollbar>
          <prism-editor class='my-editor' v-model='code' :highlight='highlighter' line-numbers></prism-editor>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-card>
</template>

<script>
import category from '@/components/category'
// import Prism Editor
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css' // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-tomorrow.css' // import syntax highlighting styles
export default {
  name: 'snippet',
  components: {
    category,
    PrismEditor
  },
  data() {
    return { code: 'console.log("Hello World")' }
  },
  methods: {
    highlighter(code) {
      return highlight(code, languages.js) // languages.<insert language> to return html with markup
    }
  },
  created() {
  }

}
</script>

<style scoped lang='less'>
.el-card {
  height: 100%;

  /deep/ .el-card__body {
    height: 100%;
  }

  .snippet-container {
    height: 100%;

    .el-main {
      padding: 0 5px;
      height: 100%;
    }
  }
}

/* required class */
.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #2d2d2d;
  color: #ccc;
  height: 100%;
  width: 100%;
  /* you must provide font-family font-size line-height. Example: */
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

.el-scrollbar {
  height: 100%;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}
</style>
