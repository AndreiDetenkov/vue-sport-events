<template lang="pug">
  v-container(fluid grid-list-lg)
    v-layout(row wrap)
      v-flex(v-for="event in events", :key="event._id" xs12 sm6 md4 lg3 xl2)
        v-card()
          v-img(
          :src="createUrl(event.dirId, event.imagePreview)",
          :alt="event.title",
          aspect-ratio="1.7")
          v-card-title
            div.text-truncate {{ event.title }}
          v-card-actions
            v-spacer
            v-btn(icon,
              @click.prevent="openEditDialog(event._id)")
              v-icon(color="primary lighten-2") edit
            v-btn(icon,
              @click.prevent="openDeleteDialog(event._id, event.title, event.dirId)")
              v-icon(color="error lighten-1") delete
              // {{ moment(props.item.date).format('LL') }}
    DeleteDialog(
      :show="showDeleteDialog",
      :loading="loadingForRemoveEvent",
      dispatchType="event",
      @close-dialog="closeDeleteDialog",
      @delete-event-dispatch="removeEvent")
      div(slot="title") Вы действительно хотите удалить эвент,<br><b>{{ eventTitle }}</b>?
    EditEvent(
    :show="editDialog",
    :id="eventId",
    @close-edit-dialog="closeEditDialog")
</template>

<script>
import { mapState } from 'vuex'
import DeleteDialog from '../../DeleteDialog/DeleteDialog'
import EditEvent from '../EditEvent/EditEvent'
export default {
  name: 'EventsList',
  components: { EditEvent, DeleteDialog },
  data: () => ({
    eventId: '',
    eventTitle: '',
    dirId: '',
    showDeleteDialog: false,
    editDialog: false
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
    closeDeleteDialog () {
      this.showDeleteDialog = false
      this.eventId = ''
      this.eventTitle = ''
    },
    openDeleteDialog (id, title, dirId) {
      this.eventId = id
      this.eventTitle = title
      this.dirId = dirId
      this.showDeleteDialog = true
    },
    openEditDialog (id) {
      this.eventId = id
      this.$store.dispatch('GET_EVENT_BY_ID', id)
      this.editDialog = true
    },
    closeEditDialog () {
      this.editDialog = false
      this.eventId = ''
    },
    createUrl (dirId, image) {
      const env = process.env.NODE_ENV
      if (env === 'production') return `http://sport-kg.com:8000/uploads/${dirId}/${image}`
      else return `http://localhost:8000/uploads/${dirId}/${image}`
    }
  }
}
</script>

<style lang="scss" scoped>
  .v-table tbody td:first-child {
    padding: 0 8px;
  }
</style>
