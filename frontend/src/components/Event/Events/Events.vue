<template lang="pug">
 .main
   Navbar
   v-container(grid-list-lg)
     v-layout(row justify-center)
       v-flex(xs12)
         h1.main-title Календарь спортивных мероприятий на <span class="year">2019 год</span>
     v-layout(row wrap)
       v-flex(v-for="event in list", :key="event._id" xs12 sm6 md4 lg3)
         v-hover
           v-card(flat, slot-scope="{ hover }").mb-3
             div.event-img
               v-img(
                 :src="createUrl(event.dirId, event.imagePreview)",
                 @click.prevent="viewEventItem(event._id)",
                 :alt="event.title",
                 aspect-ratio="1.7")
                 v-layout(
                   slot="placeholder"
                   fill-height
                   align-center
                   justify-center
                   ma-0)
                   v-progress-circular(
                    indeterminate
                    color="grey lighten-3")
             v-card-title
               span.event-date {{ event.date }}
               h4(@click.prevent="viewEventItem(event._id)").event-title {{ event.title }}
             v-card-text
               a(:href="`${event.sponsorLink}`",
               target="_blank").sponsor-name {{ event.sponsor }}
             v-divider.my-3.hidden-sm-and-up
   //Footer
</template>

<script>
import { mapState } from 'vuex'
import Footer from '../Footer/Footer'
import Navbar from '../../Navbar/Navbar'
export default {
  name: 'Events',
  components: { Navbar, Footer },
  data: () => ({
  }),
  mounted () {
    this.$store.dispatch('GET_PREVIEW_EVENTS_LIST')
  },
  computed: {
    ...mapState({
      list: state => state.events.eventsListProd
    })
  },
  methods: {
    viewEventItem (id) {
      this.$router.push({ path: `/events/item/${id}` })
    },
    createUrl (dirId, image) {
      const env = process.env.NODE_ENV
      if (env === 'development') return `http://localhost:8000/uploads/${dirId}/${image}`
      else return `http://sport-kg.com:8000/uploads/${dirId}/${image}`
    }
  }
}
</script>
<style lang="scss" scoped>
  .year {
    color: #f6554d;
  }
  .main-title {
    font-family: 'Montserrat', sans-serif;
    text-transform: uppercase;
    margin-bottom: 16px;
    color: #454545;
    font-size: 2rem;
  }
  .v-card {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    margin-bottom: 8px;
    .event-img {
      border-radius: 8px;
      perspective: 400px;
    }
    .v-image {
      border-radius: 8px;
    }
    .v-image:hover {
      cursor: pointer;
      transform: rotate3d(0, 1, 0, 15deg);
      transition: 0.5s ease all;
      box-shadow: 0 3px 15px 0 rgba(50, 50, 50, 0.7)
    }
    &__title {
      padding: 16px 0 0;
      text-align: left;
      .event-date {
        display: block;
        color: #f6554d;
        font-size: 0.9rem;
        font-weight: 700;
        text-transform: uppercase;
        margin-bottom: 4px;
      }
      h4 {
        font-family: 'Montserrat', sans-serif;
        color: #454545;
        font-size: 1.1rem;
        font-weight: 700;
        text-transform: uppercase;
        width: 100%;
      }
      h4:hover {
        color: #595651;
        cursor: pointer;
      }
    }
    &__text {
      text-align: left;
      padding: 0;
      .sponsor-name {
        color: #504d49;
        font-size: 0.8rem;
        text-transform: uppercase;
        text-decoration: none;
      }
    }
  }
  @media screen and (max-width: 600px) {
    .main-title {
      font-size: 1.5rem;
    }
  }
</style>
