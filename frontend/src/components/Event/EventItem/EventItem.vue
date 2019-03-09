<template lang="pug">
  .event
    Navbar.navbar
    v-container(v-if="event")
      v-layout(row justify-center)
        v-flex(xs12)
          .image-wrapper
            v-img(
            :src="`http://localhost:8000/uploads/${event.dirId}/${event.imagePreview}`",
            :alt="event.title",
            aspect-ratio="1.7")
              .image-date-box
                span {{ moment(this.event.date).format('LL') }}
          h1 {{ event.title }}
      v-layout.mb-4
        v-flex(xs12)
          <!--p Начнется: {{ moment().to(event.date) }}-->
          h4 Дистанция: {{ event.distance }}
      v-divider.mb-4
      v-layout(class="text-xs-left")
        v-flex(xs12)
          p.event-description {{ event.description }}
          p(v-html="event.content").event-html
      v-divider.mb-4
      v-layout(justify-center row)
        v-flex(xs12 lg10)
          yandex-map(
            :coords="event.gps"
            zoom="12"
            style="width: 100%; height: 500px;"
            map-type="hybrid")
            ymap-marker(
              marker-id="event._id"
              marker-type="placemark"
              :coords="event.gps"
              hint-content="Hint content 1"
              :balloon="{header: 'header', body: 'body', footer: 'footer'}"
              :icon="{color: 'red', glyph: ''}"
              cluster-name="1")
</template>

<script>
import Navbar from '../../Navbar/Navbar'
import Footer from '../../Footer/Footer'
import { mapState } from 'vuex'
import Preloader from '../../Common/Preloader/Preloader'
export default {
  name: 'EventItem',
  components: { Preloader, Footer, Navbar },
  data: () => ({
    event: null
  }),
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.$store.dispatch('GET_EVENT_ITEM', this.id)
  },
  watch: {
    eventItem (val) {
      this.event = val
      this.createArrayOfGps(event.lat, event.long)
    }
  },
  computed: {
    ...mapState({
      eventItem: state => state.events.eventItem,
      loading: state => state.events.loading
    })
  },
  methods: {
    createArrayOfGps (lat, long) {
      let array = []
      for (let arg in arguments) {
        array.push(arg)
      }
      return array
    }
  }
}
</script>

<style lang="scss" scoped>
  .event {
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
    }
    .container {
      padding-top: 100px;
      .image-wrapper {
        margin-bottom: 48px;
        .v-image {
          border-radius: 8px;
        }
        .image-date-box {
          position: absolute;
          content: '';
          top: 32px;
          left: 0;
          width: 300px;
          height: 70px;
          background: #fff;
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
        }
        span {
          position: absolute;
          content: '';
          top: 50%;
          margin-top: -19px;
          left: 50%;
          margin-left: -130px;
          color: #f6554d;
          font-size: 1.8rem;
          font-weight: 700;
          text-transform: uppercase;
        }
      }
      h1 {
        font-family: 'Montserrat', sans-serif;
        font-size: 2.8rem;
        font-weight: 700;
        text-transform: uppercase;
        color: #504d49;
      }
      h4 {
        font-family: 'Montserrat', sans-serif;
        font-size: 1.5rem;
        text-transform: uppercase;
        color: #fabb5a;
      }
    }
    &-description {
      font-size: 1.2rem;
    }
    &-html {
      font-size: 1.1rem;
    }
  }
</style>
