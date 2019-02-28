<template lang="pug">
  .full-event
    v-container
      v-layout(row justify-center).mb-3
        h2 Добавление нового эвента
      v-layout(row justify-center fill-height)
        v-flex(xs12)
          v-card(class="elevation-4")
            v-card-text
              v-form(ref="form")
                v-layout(row justify-center).mb-2
                  v-flex(xs12 sm8)
                    v-select(
                      label="Название мероприятия",
                      :items="eventTitle",
                      item-text="title",
                      item-value="_id",
                      v-model="eventId")
                    v-text-field(
                      label="Дистанция",
                      v-model="distance")
                    v-textarea(
                      label="Описание эвента",
                      v-model="description")
                v-layout(row justify-center)
                  v-flex(xs12)
                    quill-editor(
                    :content="content"
                    ref="myQuillEditor"
                    @change="onEditorChange($event)")
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AddFullEvent',
  data: () => ({
    eventId: '',
    distance: '',
    dirId: '',
    content: '',
    description: ''
  }),
  mounted () {
    this.$store.dispatch('GET_EVENTS_TITLE_LIST')
    this.$store.dispatch('GET_EVENTS_LIST')
  },
  watch: {
    eventId (val) {
      if (val) {
        this.eventList.map(event => {
          if (event._id === val) this.dirId = event.dirId
        })
      }
    }
  },
  computed: {
    ...mapState({
      eventTitle: state => state.admin.eventsTitle,
      eventList: state => state.admin.eventsList
    }),
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  methods: {
    onEditorChange ({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.content = html
    }
  }
}
</script>

<style lang="scss" scoped>
  .full-event {
    background: #f5f5f5;
    .v-card {
      padding: 16px;
    }
  }
</style>
