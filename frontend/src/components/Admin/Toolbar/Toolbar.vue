<template lang="pug">
  .nav
    v-navigation-drawer(app temporary absolute v-model="drawer")
      v-list
        v-list-tile
          v-list-tile-action
            v-icon dashboard
          v-list-tile-title Add event
    v-toolbar(color="primary" dark)
      v-toolbar-side-icon(@click="drawer = true")
      v-spacer
      v-btn(icon)
        v-icon library_books
      router-link(to="/admin/add-event")
        v-btn(icon)
          v-icon library_add
      v-btn(icon)
        v-icon account_box
      v-btn(icon)
        v-icon exit_to_app

</template>

<script>
export default {
  name: 'Toolbar',
  data () {
    return {
      drawer: false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
