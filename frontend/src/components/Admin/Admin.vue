<template lang="pug">
  v-app
    Toolbar
    router-view
</template>

<script>
import Toolbar from './Toolbar/Toolbar'
export default {
  name: 'Admin',
  components: { Toolbar }
}
</script>

<style scoped>
  #app {
    background: #EDEEF0;
  }
</style>
