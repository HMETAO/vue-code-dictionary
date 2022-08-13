<template>
  <div class='box'>
    <prism-editor :tabSize='4' class='my-editor' v-model='code' :highlight='highlighter' line-numbers></prism-editor>
  </div>
</template>

<script>
// import Prism Editor
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css' // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-tomorrow.css'
import { SNIPPET_GET_EVENT } from '@/constants/eventConstants'

export default {
  name: 'snippet-code',
  components: {
    PrismEditor
  },
  data() {
    return { code: '⭐⭐⭐⭐请在左侧选择展示的snippet⭐⭐⭐⭐' }
  },
  mounted() {
    this.$bus.$on(SNIPPET_GET_EVENT, this.highlighter)
  },

  destroyed() {
    this.$bus.$off(SNIPPET_GET_EVENT)

  },

  methods: {
    highlighter(code) {
      this.code = code
      return highlight(code, languages.js) // languages.<insert language> to return html with markup
    }
  }
}
</script>

<style scoped lang='less'>
.box {
  display: flex;
  flex: 1;
  box-sizing: border-box;
  overflow: auto;
}

/* required class */
.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #2d2d2d;
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


</style>
