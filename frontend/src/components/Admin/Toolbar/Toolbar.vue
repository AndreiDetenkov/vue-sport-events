<template lang="pug">
  .nav
    v-navigation-drawer(
      app
      hide-overlay
      permanent
      stateless
      :mini-variant.sync="mini"
      v-model="drawer")
      v-toolbar(flat class="transparent")
        v-list(class="pa-0")
          v-list-tile(avatar)
            v-list-tile-avatar
              img(src='https://avataaars.io/?avatarStyle=Circle&topType=WinterHat1&accessoriesType=Wayfarers&hatColor=Gray02&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=PastelOrange&eyeType=Close&eyebrowType=FlatNatural&mouthType=Twinkle&skinColor=Brown')
            v-spacer
            v-list-tile-action
              v-btn(icon @click.stop="mini = !mini")
                v-icon chevron_left
      v-list
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
      mini: true,
      drawerMenu: [
        {icon: 'library_books', title: 'Список эвентов', link: '/admin/events-list'},
        {icon: 'library_add', title: 'Добавить', link: '/admin/add-event-preview'},
        {icon: 'account_box', title: 'Кабинет'},
        {icon: 'exit_to_app', title: 'Выход'}
      ],
      cruds: [
        ['Create', 'add'],
        ['Read', 'insert_drive_file'],
        ['Update', 'update'],
        ['Delete', 'delete']
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
