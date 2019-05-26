<template lang="pug">
  header
    v-toolbar(flat color="white")
      v-spacer.hidden-sm-and-up
      v-toolbar-title
        a(href="/")
          span.header__title sport
          span.header__title.header__title--red events
      v-spacer
      v-btn(icon @click.prevent="login").login-btn
        v-icon(color="grey") input
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    login () {
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style lang="scss" scoped>
  @font-face {
    font-family: 'Ocean';
    src: url('/static/fonts/Ocean.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  .v-toolbar__title {
    a {
      text-decoration: none;
      color: #504d49
    }
    .header__title {
      font-family: 'Ocean';
      font-size: 1.4rem;
      font-weight: 900;
      &--red {
        color: #f6554d;
      }
    }
  }
  .login-btn:hover {
    color: transparent;
  }
</style>
