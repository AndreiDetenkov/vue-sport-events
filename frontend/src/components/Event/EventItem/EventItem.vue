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
              .image-date-box.hidden-xs-only
                span {{ moment(this.event.date).format('LL') }}
              v-layout(
                slot="placeholder"
                fill-height
                align-center
                justify-center
                ma-0)
                v-progress-circular(
                  indeterminate
                  color="grey lighten-3")
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
          div(v-if="event.videoLink").video-wrapper
            youtube(:video-id="videoId", :player-vars="playerVars", resize, fitParent).mb-4
          div.text-xs-center
            p(class="event-sponsor").d-inline-block.mx-1 Более подробная информация на сайте организатора эвента -&nbsp;
              a(class="event-sponsor-link text-uppercase",
                :href="`${event.sponsorLink}`",
                :alt="`${event.title}`",
                target="_blank").d-inline-block {{ event.sponsor }}
      v-divider.mb-4
      v-layout(justify-center row).mb-4
        v-flex(xs12 lg10)
          v-icon.mr-2 place
          span.event-location <b>Место проведения:</b> {{ event.location }}
          yandex-map(
            :coords="event.gps"
            zoom="12"
            style="width: 100%; height: 400px;")
            ymap-marker(
              marker-id="event._id"
              marker-type="placemark"
              :coords="event.gps"
              hint-content="Hint content 1",
              :balloon="{header: `${event.location}`, body: `Организатор мероприятия: ${event.sponsor}`}",
              :icon="{color: 'red', glyph: ''}",
              cluster-name="1")
    Footer(:id="id")
</template>

<script>
import Navbar from '../../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { mapState } from 'vuex'
import Preloader from '../../Common/Preloader/Preloader'
export default {
  name: 'EventItem',
  components: { Preloader, Footer, Navbar },
  data: () => ({
    event: null,
    videoId: 'lG0Ys-2d4MA',
    playerVars: {
      autoplay: 0
    }
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
      if (val.videoLink) this.videoId = val.videoLink
    },
    id (val) {
      this.$store.dispatch('GET_EVENT_ITEM', val)
    }
  },
  computed: {
    ...mapState({
      eventItem: state => state.events.eventItem,
      loading: state => state.events.loading
    })
  },
  methods: {

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
        font-size: 2.4rem;
        font-weight: 700;
        text-transform: uppercase;
        color: #504d49;
      }
      h4 {
        font-family: 'Montserrat', sans-serif;
        font-size: 1.4rem;
        text-transform: uppercase;
        color: #fabb5a;
      }
      .video-wrapper {
        margin: 0 auto;
        width: 100%;
        max-width: 650px;
      }
    }
    &-description {
      font-size: 1.2rem;
    }
    &-html {
      font-size: 1.1rem;
      margin-bottom: 50px;
    }
    &-location {
      display: inline-block;
      font-size: 1.2rem;
      margin-bottom: 32px;
    }
    &-sponsor {
      font-size: 1.5rem;
    }
    &-sponsor-link {
      font-size: 1.5rem;
      font-weight: 700;
      text-decoration: none;
      color: #fabb5a;
      cursor: pointer;
      margin-bottom: 32px;
    }
    &-sponsor-link:hover {
      color: #ff960d;
      cursor: pointer;
    }
  }
  @media screen and (max-width: 600px) {
    .event {
      .container {
        padding-top: 80px;
        .image-wrapper {
          margin-bottom: 32px;
        }
        h1 {
          font-size: 1.6rem;
        }
        h4 {
          font-size: 1.1rem;
        }
      }
      &-sponsor {
        font-size: 1.2rem;
        text-align: center;
      }
      &-sponsor-link {
        font-size: 1.3rem;
      }
    }
  }
</style>
