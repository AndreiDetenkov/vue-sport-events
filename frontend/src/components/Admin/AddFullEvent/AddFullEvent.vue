<template lang="pug">
  v-container
    v-layout(row justify-center)
      v-flex(xs12)
        v-card(class="elevation-4")
          v-card-title
            v-layout(row justify-center)
              h2 Добавление нового эвента
          v-card-text
            v-form(ref="form")
              v-layout(row justify-center)
                v-flex(xs12 sm8)
                  v-select(
                    label="Название мероприятия",
                    :items="eventTitle",
                    item-text="title",
                    item-value="_id",
                        v-model="eventId")
                  v-text-field(
                    v-model="distance"
                    label="Дистанция")
                  v-textarea(
                    label="Описание эвента"
                    v-model="description")
              v-layout(row justify-center)
                v-flex(xs12 sm8)
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
  .v-card {
    padding: 16px;
  }
</style>
