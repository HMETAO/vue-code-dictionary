<template>
  <el-tree
    :props='categories'
    lazy
    ref='tree'>
  </el-tree>
</template>

<script>
// import { getCategories } from '@/api/category'

export default {
  name: 'category',
  data() {
    return {
      categories: []
    }
  },
  created() {
    this.getCategories()
  },
  methods: {
    // 获取分类列表
    getCategories() {
      // getCategories()
      //   .then(res => {
      //     this.categories = res.data
      //     console.log(res)
      //   })
    }

  }
}
</script>

<style scoped>

</style>
