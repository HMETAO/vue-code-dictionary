<!-- home -->
<template>
  <el-container>
    <el-header height='70px'>
      <layout-header />
    </el-header>
    <layout-body />
  </el-container>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import layoutHeader from '@/components/layout/layout-header'
import layoutBody from '@/components/layout/layout-body'

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    layoutHeader,
    layoutBody
  },
  data() {
    //这里存放数据
    return {}
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {}

}
</script>
<style scoped>
.el-container {
  height: 100%;
}

.el-header {
  border-bottom: #2ecc71 2px solid;

}
</style>
