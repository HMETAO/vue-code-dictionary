<template>
  <el-card>
    <el-container>
      <el-header>
        <!--面包屑-->
        <el-breadcrumb separator='>'>
          <el-breadcrumb-item v-for='(item,index) in $route.matched' :key='index' :to='item.path'>
            {{ item.meta.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-container>
        <el-aside>
          <!--category列表-->
          <category />
        </el-aside>
        <el-main>

        </el-main>
      </el-container>
    </el-container>
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
