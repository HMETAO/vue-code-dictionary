<template>
  <div class='calendarBar'>
    <vc-calendar :attributes='attrs' :columns='$screens({ lg: 2 }, 1)' is-expanded></vc-calendar>
  </div>
</template>

<script>
export default {
  name: 'calendar',
  data() {
    return {
      // 当前日期
      attrs: [
        // {
        //   key: 'codeforces',
        //   // 括号内传递日期可点亮指定日期，如new Date(2019, 6, 1)，也可传递多个日期：如dates: [ new Date(2018, 0, 1), new Date(2018, 0, 15) ]
        //   dates: new Date(),
        //   bar: true,
        //   popover: {
        //     label: '美好的一天！要开心呦！'
        //   }
        // }
      ]
    }
  }
}
</script>

<style lang='scss' scoped>


</style>
