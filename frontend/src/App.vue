<template lang="pug">
  v-app
    v-content
      transition(name="slide-fade")
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
  .v-footer {
    border-top: 1px solid #ebebeb;
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active до версии 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
