<template lang="pug">
    v-layout(row justify-center)
      v-flex(xs12)
        v-data-table(
          class="elevation-1",
          no-data-text="Нет данных для отображения",
          :items="events",
          hide-actions,
          hide-headers)
          template(slot="items" slot-scope="props")
            td {{ props.index + 1 }}
            td(class="text-xs-left subheading") {{ props.item.title }}
            td(class="text-xs-left") {{ moment(props.item.date).format('LL') }}
            td(class="justify-center px-0")
              v-btn(icon)
                v-icon(color="grey darken-2") edit
            td(class="justify-center px-0")
              v-btn(icon)
                v-icon(color="grey darken-2") delete
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'EventsList',
  mounted () {
    this.$store.dispatch('GET_EVENTS_LIST')
  },
  computed: {
    ...mapState({
      events: state => state.admin.eventsList
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
