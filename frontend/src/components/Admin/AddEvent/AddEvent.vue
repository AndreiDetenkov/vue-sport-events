<template lang="pug">
  v-container(grid-list-md)
    v-layout(row wrap)
      v-flex(xs6)
        v-form(ref="form")
          v-text-field(
          v-model="event.title",
          label="Название мероприятия")
          v-text-field(
          v-model="event.distance"
          label="Дистанция")
          v-text-field(
          v-model="event.location"
          label="Место проведения")
          v-text-field(
          v-model="event.sponsor"
          label="Организатор")
          v-text-field(
          v-model="event.sponsorLink"
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
            label="Дата мероприятия")
            v-date-picker(
            no-title
            scrollable
            ref="picker"
            locale="ru"
            v-model="event.date"
            @change="save")
      v-flex(xs6)
        input(type="file" ref="file" @change="fileChange")
    v-btn(color="primary" @click="addEvent", :loading="addEventBtn").my-4 Отправить
    Notification
</template>

<script>
import { mapState } from 'vuex'
import Notification from '../../Common/Notiifcation/Notification'
// import moment from 'moment'
// moment().format('LL')
export default {
  name: 'AddEvent',
  components: { Notification },
  data: () => ({
    event: {
      title: '',
      distance: '',
      location: '',
      date: '',
      sponsor: '',
      sponsorLink: '',
      imagePreview: []
    },
    menu: false,
    hasImage: false
  }),
  mounted () {
    this.mutationSubscribe()
  },
  computed: {
    ...mapState(['addEventBtn'])
  },
  methods: {
    fileChange () {
      this.event.imagePreview = this.$refs.file.files[0]
    },
    save (date) {
      this.$refs.menu.save(date)
    },
    addEvent () {
      const formData = new FormData()
      Object.entries(this.event).forEach(
        ([key, value]) => formData.append(key, value)
      )
      this.$store.dispatch('ADD_NEW_EVENT', formData)
    },
    mutationSubscribe () {
      this.$store.subscribe((mutation, state) => {
        switch (mutation.type) {
          case 'ADD_NEW_EVENT_SUCCESS':
            this.$refs.form.reset()
            this.$refs.file.value = ''
            this.$store.dispatch('NOTIFICATION',
              { open: true, color: 'success', text: state.admin.newEvent.message })
            break
          case 'ADD_NEW_EVENT_ERROR':
            this.$store.dispatch('NOTIFICATION',
              { open: true, color: 'error', text: state.admin.errors.newEventError })
            break
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
