<template lang="pug">
  v-app
    router-view
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  #app {
    font-family: 'Open Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 1em;
    color: #333;
    background: #fff;
    text-align: center;
  }
  .v-toolbar {
    &__content {
      border-bottom: 1px solid #ebebeb;
    }
  }
</style>
