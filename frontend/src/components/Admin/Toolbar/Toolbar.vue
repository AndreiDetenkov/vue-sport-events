<template lang="pug">
  .nav
    v-toolbar(flat color="white")
      v-toolbar-title
        a(href="/")
          span.header__title sport
          span.header__title.header__title--red events
      v-spacer
      v-toolbar-items
        v-btn(
        flat,
        color="blue-grey darken-4",
        v-for="item in menu",
        :key="item.title",
        :to="item.link").text-capitalize {{ item.title }}
          v-icon(right) {{ item.icon }}
        v-btn(
          flat,
          color="blue-grey darken-4",
          @click.prevent="logout").text-capitalize Выход
          v-icon(right) exit_to_app
</template>

<script>
export default {
  name: 'Toolbar',
  data () {
    return {
      drawer: true,
      mini: true,
      menu: [
        { icon: 'library_books', title: 'Список', link: '/admin/events-list' },
        { icon: 'note_add', title: 'Добавить', link: '/admin/add-event' },
        { icon: 'account_box', title: 'Кабинет' }
      ]
    }
  },
  methods: {
    routerLink (link) {
      this.$router.push({ path: `${link}` })
    },
    logout () {
      this.$store.dispatch('LOGOUT')
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
  .v-toolbar {
    background: #757F9A;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #D7DDE8, #757F9A);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to left, #D7DDE8, #757F9A); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    .v-toolbar__title {
      a {
        text-decoration: none;
        color: #242424
      }
      .header__title {
        font-family: 'Ocean';
        font-size: 1.5rem;
        font-weight: 900;
        &--red {
          color: #f6554d;
        }
      }
    }
  }
</style>
