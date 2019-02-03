<template lang="pug">
  v-app
    v-content
      Navbar
      router-view
      Footer
</template>

<script>
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
export default {
  name: 'App',
  components: {Footer, Navbar}
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
  .v-footer {
    border-top: 1px solid #ebebeb;
  }
</style>
