<template>
  <div id='app'>
    <home />
  </div>
</template>
<script>

import home from '@/components/home'

export default {
  name: 'App',
  components: {
    home
  }
}
</script>

<style>
html, body {
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
}


</style>
