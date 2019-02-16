<template lang="pug">
  .nav
    v-navigation-drawer(
      app
      hide-overlay
      permanent
      width="200"
      v-model="drawer")
      v-list()
        v-list-tile(
          v-for="item in this.drawerMenu",
          :key="item.title",
          @click="routerLink(item.link)")
          v-list-tile-action
            v-icon {{ item.icon }}
          v-list-tile-content
            v-list-tile-title {{ item.title }}
    v-toolbar(color="white" flat)
      <!--v-toolbar-side-icon(@click="drawer = true")-->
</template>

<script>
export default {
  name: 'Toolbar',
  data () {
    return {
      drawer: true,
      drawerMenu: [
        {icon: 'library_books', title: 'Список', link: '/admin/events-list'},
        {icon: 'library_add', title: 'Добавить', link: '/admin/add-event-preview'},
        {icon: 'account_box', title: 'Кабинет'},
        {icon: 'exit_to_app', title: 'Выход'}
      ]
    }
  },
  methods: {
    routerLink (link) {
      this.$router.push({ path: `${link}` })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
