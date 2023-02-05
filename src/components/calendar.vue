<template>
  <div class='calendarBar'>
    <vc-calendar :attributes='calendarAttr' :columns='$screens({ lg: 2 }, 1)' is-expanded></vc-calendar>
  </div>
</template>

<script>
import { calendar } from '@/api/other'

export default {
  name: 'calendar',
  data() {
    return {
      calendarAttr: []
    }
  },
  created() {
    this.calendar()
  },
  methods: {
    calendar() {
      calendar()
        .then(res => {
          this.calendarAttr = [
            ...res.data.map(item => ({
              key: item.key,
              dates: item.dates,
              bar: {
                color: item.color
              },
              popover: {
                label: item.label
              }
            }))
          ]
        })
    }
  }
}
</script>

<style lang='scss' scoped>


</style>
