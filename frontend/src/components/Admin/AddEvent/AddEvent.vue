<template lang="pug">
  .add-event
    v-container(grid-list-lg)
      v-layout(row justify-center).mb-3
        h2 Добавление нового эвента
      v-layout(row wrap)
        v-flex(xs12 md6)
          v-card()
            v-card-text
              v-form(ref="form")
                v-text-field(
                  v-model="event.title",
                  :rules="[v => !!v || 'Это обязательное поле']"
                  label="Название мероприятия")
                v-text-field(
                  v-model="event.location"
                  :rules="[v => !!v || 'Это обязательное поле']"
                  label="Место проведения")
                v-text-field(
                  label="Дистанция",
                  v-model="event.distance")
                v-text-field(
                  v-model="event.sponsor"
                  :rules="[v => !!v || 'Это обязательное поле']"
                  label="Организатор")
                v-text-field(
                  v-model="event.sponsorLink"
                  :rules="[v => !!v || 'Это обязательное поле']"
                  label="Ссылка на сайт организатора")
                v-menu(
                  ref="menu"
                  :close-on-content-click="false"
                  v-model="menu"
                  full-width
                  min-width="290px")
                  v-text-field(
                    slot="activator"
                    v-model="event.date"
                    :rules="[v => !!v || 'Это обязательное поле']",
                    label="Дата мероприятия")
                  v-date-picker(
                    no-title
                    scrollable
                    ref="picker"
                    locale="ru"
                    v-model="event.date"
                    @change="save")
        v-flex(xs12 md6)
          v-card().mb-3
            v-card-title
              v-layout(row justify-center)
                div.image-preview
                  img(
                    src=''
                    ref="preview")
            v-card-text
              label(for="file" class="label")
                v-icon.mr-2 photo
                span Загрузить превью
              input(type="file" ref="file" @change="fileChange" id="file")
      v-layout(row justify-center)
        v-flex(xs12)
          v-card()
            v-card-text
              v-textarea(
              label="Описание эвента",
              v-model="event.description")
              quill-editor(
              :content="event.content"
              ref="myQuillEditor"
              @change="onEditorChange($event)")
      v-btn(color="primary" @click="addEvent", :loading="addEventBtn").my-4 Добавить
    Notification
</template>

<script>
import { mapState } from 'vuex'
import Notification from '../../Common/Notiifcation/Notification'
import nanoid from 'nanoid'
// import moment from 'moment'
// moment().format('LL')
export default {
  name: 'AddEvent',
  components: { Notification },
  data: () => ({
    event: {
      title: '',
      location: '',
      distance: '',
      date: '',
      sponsor: '',
      sponsorLink: '',
      imagePreview: [],
      content: '',
      description: ''
    },
    menu: false,
    hasImage: false
  }),
  mounted () {
    this.mutationSubscribe()
  },
  watch: {
    'event.imagePreview': {
      deep: true,
      handler: function (val) {
        if (val) {
          let reader = new FileReader()
          reader.addEventListener('load', function () {
            this.$refs.preview.src = reader.result
          }.bind(this), false)
          reader.readAsDataURL(this.event.imagePreview)
        }
      }
    }
  },
  computed: {
    ...mapState(['addEventBtn']),
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  methods: {
    fileChange () {
      this.event.imagePreview = this.$refs.file.files[0]
    },
    save (date) {
      this.$refs.menu.save(date)
    },
    addEvent () {
      if (this.$refs.form.validate()) {
        const formData = new FormData()
        const id = nanoid()
        formData.append('dirId', id)
        Object.entries(this.event).forEach(
          ([key, value]) => formData.append(key, value)
        )
        this.$store.dispatch('ADD_NEW_EVENT_PREVIEW', formData)
      } else {
        this.$store.dispatch('NOTIFICATION',
          { open: true, color: 'error', text: 'Необходимо заполнить все поля!' })
      }
    },
    mutationSubscribe () {
      this.$store.subscribe((mutation, state) => {
        switch (mutation.type) {
          case 'ADD_NEW_EVENT_SUCCESS':
            this.$store.dispatch('NOTIFICATION',
              { open: true, color: 'success', text: state.admin.newEvent.message })
            this.$refs.form.reset()
            this.$refs.file.value = ''
            this.$refs.preview.src = ''
            break
          case 'ADD_NEW_EVENT_ERROR':
            this.$store.dispatch('NOTIFICATION',
              { open: true, color: 'error', text: state.admin.errors.newEventError })
            break
        }
      })
    },
    onEditorChange ({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.content = html
    }
  }
}
</script>

<style lang="scss" scoped>
  .add-event {
    background: #f5f5f5;
    .v-card {
      padding: 16px;
      &__title {
        .image-preview {
          width: 100%;
          img {
            max-width: 100%;
          }
        }
      }
    }
    input[type="file"] {
      display: none;
    }
    .label {
      border: 1px solid #c3c3c3;
      display: inline-block;
      padding: 6px 12px;
      cursor: pointer;
      span {
        display: inline-block;
        transform: translateY(-3px);
      }
    }
  }
</style>
