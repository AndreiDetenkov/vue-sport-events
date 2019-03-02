<template lang="pug">
  v-container
    v-layout(row justify-center)
      v-flex(xs12)
        v-card(class="elevation-4")
          v-card-text
            v-form(ref="form")
              v-data-table(
                no-data-text="Нет данных для отображения",
                :items="events",
                hide-actions,
                hide-headers)
                template(slot="items" slot-scope="props")
                  td(width="10") {{ props.index + 1 }}
                  td
                    img(
                      width="80",
                      :src="`http://localhost:8000/uploads/${props.item.dirId}/${props.item.imagePreview}`").mt-1
                  td(class="text-xs-left subheading") {{ props.item.title }}
                  td(class="text-xs-left") {{ moment(props.item.date).format('LL') }}
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
  .v-table tbody td:first-child {
    padding: 0 8px;
  }
</style>
