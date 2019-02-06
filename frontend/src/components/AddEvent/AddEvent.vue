<template lang="pug">
  v-container
    v-layout(row justify-center wrap)
      v-flex(xs12 sm6 lg5)
        v-text-field(
          v-model="title",
          label="Название мероприятия")
        v-text-field(
          v-model="distance"
          label="Дистанция")
        v-text-field(
          v-model="sponsor"
          label="Организатор")
        v-text-field(
          v-model="sponsorLink"
          placeholder="https://www.google.com"
          label="Ссылка на сайт организатора")
        v-menu(
          ref="menu"
          :close-on-content-click="false"
          v-model="menu"
          full-width
          min-width="290px")
          v-text-field(
            slot="activator"
            v-model="date"
            label="Дата мероприятия")
          v-date-picker(
            no-title
            scrollable
            ref="picker"
            locale="ru"
            v-model="date"
            @change="save")
        image-uploader(
          :preview="true"
          :className="['fileinput', { 'fileinput--loaded': hasImage }]"
          capture="environment"
          :debug="1"
          doNotResize="gif"
          :autoRotate="true"
          outputFormat="verbose"
          @input="setImage")
        v-btn(color="primary" @click="addEvent") Отправить
</template>

<script>
// import moment from 'moment'
// moment().format('LL')
export default {
  name: 'AddEvent',
  data: () => ({
    title: '',
    distance: '',
    date: '',
    menu: false,
    sponsor: '',
    sponsorLink: '',
    hasImage: false,
    image: null
  }),
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    },
    setImage (output) {
      this.hasImage = true
      this.image = output
      console.log(this.image)
    },
    addEvent () {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
