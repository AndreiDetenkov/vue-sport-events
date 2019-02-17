<template lang="pug">
 .main
   Navbar
   v-container(grid-list-lg)
     v-layout(row justify-center)
       v-flex(xs12)
        h1.main-title Календарь спортивных мероприятий на 2019 год
     v-layout(row wrap)
       v-flex(v-for="event in list", :key="event._id" xs12 sm6 md4 lg3)
         v-card(flat)
           div.event-img
             v-img(
               :src="`http://localhost:8000/uploads/${event.dirId}/${event.imagePreview}`",
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
             a(:href="`${event.sponsorLink}`",
               target="_blank").sponsor-name {{ event.sponsor }}
             h4(@click.prevent="viewEventItem(event._id)").event-title {{ event.title }}
           v-card-text
             p {{ event.location }}
           v-divider.mb-2.hidden-sm-and-up
   Footer
</template>

<script>
import {mapState} from 'vuex'
import Footer from '../../Footer/Footer'
import Navbar from '../../Navbar/Navbar'
export default {
  name: 'index',
  components: { Navbar, Footer },
  data: () => ({
  }),
  mounted () {
    this.$store.dispatch('GET_PREVIEW_EVENTS_LIST')
  },
  computed: {
    ...mapState({
      list: state => state.events.previewEventsList
    })
  },
  methods: {
    viewEventItem (id) {
      this.$router.push({ path: `/events/item/${id}` })
    }
  }
}
</script>
<style lang="scss" scoped>
  .main-title {
    font-family: 'Montserrat', sans-serif;
    text-transform: uppercase;
    margin-bottom: 16px;
  }
  .v-card {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    .event-img {

      border-radius: 8px;
      perspective: 400px;
    }
    .v-image {
      border-radius: 8px;
    }
    .v-image:hover {
      transform: rotate3d(0, 1, 0, 15deg);
      transition: 0.5s ease all;
      box-shadow: 0 3px 15px 0 rgba(50, 50, 50, 0.7)
    }
    &__title {
      padding: 16px 0 4px;
      text-align: left;
      .sponsor-name {
        display: block;
        color: #d7b914;
        font-size: 0.85rem;
        font-weight: 700;
        text-transform: uppercase;
        margin-bottom: 4px;
        text-decoration: none;
      }
      .sponsor-name:hover {
        color: #b39909;
      }
      h4 {
        font-family: 'Montserrat', sans-serif;
        color: #454545;
        font-size: 1.14rem;
        font-weight: 700;
        text-transform: uppercase;
        width: 100%;
      }
      h4:hover {
        color: #616161;
        cursor: pointer;
      }
    }
    &__text {
      color: #8d8d8d;
      font-size: 0.8rem;
      text-align: left;
      padding: 0;
    }
  }
</style>
