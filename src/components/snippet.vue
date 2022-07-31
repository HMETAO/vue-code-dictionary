<template>
  <el-card>
    <!--面包屑-->
    <el-breadcrumb separator='>'>
      <el-breadcrumb-item v-for='(item,index) in $route.matched' :key='index' :to='item.path'>
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <category />
  </el-card>
</template>

<script>
import category from '@/components/category'

export default {
  name: 'snippet',
  components: {
    category
  },
  data() {
    return {}
  },
  methods: {},
  created() {
  }

}
</script>

<style scoped lang='less'>
.el-card {
  height: 100%;
}
</style>
