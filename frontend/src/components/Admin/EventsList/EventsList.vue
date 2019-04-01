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
                      width="50",
                      :src="`http://localhost:8000/uploads/${props.item.dirId}/${props.item.imagePreview}`").mt-1
                  td(class="text-xs-left subheading") {{ props.item.title }}
                  td(class="text-xs-left") {{ moment(props.item.date).format('LL') }}
                  td(class="justify-center px-0")
                    v-btn(icon)
                      v-icon(color="grey darken-2") edit
                  td(class="justify-center px-0")
                    v-btn(icon)
                      v-icon(
                        color="grey darken-2",
                        @click.prevent="openDialog(props.item._id, props.item.title, props.item.dirId)") delete
    DeleteDialog(
      :show="showDeleteDialog",
      :loading="loadingForRemoveEvent",
      dispatchType="event",
      @close-dialog="closeDialog",
      @delete-event-dispatch="removeEvent()")
        div(slot="title") Вы действительно хотите удалить эвент,<br><b>{{ eventTitle }}</b>?
</template>

<script>
import { mapState } from 'vuex'
import DeleteDialog from '../../DeleteDialog/DeleteDialog'
export default {
  name: 'EventsList',
  components: { DeleteDialog },
  data: () => ({
    eventId: '',
    eventTitle: '',
    dirId: '',
    showDeleteDialog: false
  }),
  mounted () {
    this.$store.dispatch('GET_EVENTS_LIST')
  },
  computed: {
    ...mapState({
      events: state => state.admin.eventsList,
      loadingForRemoveEvent: state => state.admin.loading.removeEventLoading
    })
  },
  methods: {
    removeEvent () {
      this.$store.dispatch('REMOVE_EVENT_BY_ID', {
        eventId: this.eventId,
        dirId: this.dirId
      })
    },
    closeDialog () {
      this.showDeleteDialog = false
      this.eventId = ''
      this.eventTitle = ''
    },
    openDialog (id, title, dirId) {
      this.eventId = id
      this.eventTitle = title
      this.dirId = dirId
      this.showDeleteDialog = true
    }
  }
}
</script>

<style lang="scss" scoped>
  .v-table tbody td:first-child {
    padding: 0 8px;
  }
</style>
