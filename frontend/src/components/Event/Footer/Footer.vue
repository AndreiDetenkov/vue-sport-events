<template lang="pug">
  footer
    v-container(grid-list-lg)
      v-layout(row justify-center).mb-4
        h2 Другие доступные мероприятия
      v-footer(color="#504d49" height="auto")
        v-layout(wrap row).mb-2
          v-flex(v-for="event in this.events", :key="event._id" xs6 sm3)
            v-card(flat dark)
              a(:href="`/events/item/${event._id}`", target="_blank").event-link
                v-img(
                  :src="`http://localhost:8000/uploads/${event.dirId}/${event.imagePreview}`",
                  :alt="event.title",
                  aspect-ratio="1.7")
              v-card-title
                span.event-date {{ event.date }}
                h4.event-title {{ event.title }}
      v-layout(row justify-center)
        v-flex(xs12)
          span.footer__title sport
          span.footer__title.footer__title--red events
          span.footer__copyright &nbsp;&nbsp;&copy;2019
</template>

<script>
export default {
  name: 'Footer',
  props: {
    id: {
      type: String,
      required: true,
      default: ''
    }
  },
  data: () => ({
  }),
  mounted () {
    this.$store.dispatch('GET_PREVIEW_EVENTS_LIST')
  },
  computed: {
    events () {
      const events = this.$store.state.events.eventsListProd
      if (!events) return []

      const sortedArray = events.sort(() => 0.5 - Math.random())
      let result = []
      if (sortedArray.length === 4) {
        result = sortedArray
      } else {
        result = sortedArray.splice(0, 4)
      }
      return result
    }
  },
  methods: {
    viewEventItem (id) {
      this.$router.push({ path: `/events/item/${id}` })
    }
  }
}
</script>

<style lang="scss" scoped>
  @font-face {
    font-family: 'Ocean';
    src: url('/static/fonts/Ocean.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  footer {
    background: #504d49;
    h2 {
      color: #fff;
    }
  }
  .footer {
    &__title {
      font-family: 'Ocean';
      font-size: 1.2rem;
      font-weight: 900;
      color: #fff;
      &--red {
        color: #f6554d;
      }
    }
    &__copyright {
      color: #fff;
      font-size: 1rem;
    }
  }
  .v-card {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    margin-bottom: 8px;
    color: #504d49;
    .event-link {
      text-decoration: none;
    }
    .v-image {
      border-radius: 8px;
      cursor: pointer;
    }
    &__title {
      padding: 16px 0 0;
      text-align: left;
      background: #504d49;
      .event-date {
        display: block;
        color: #fabb5a;
        font-size: 0.8rem;
        font-weight: 700;
        text-transform: uppercase;
      }
      h4 {
        font-family: 'Montserrat', sans-serif;
        color: #fff;
        font-size: 1rem;
        font-weight: 700;
        text-transform: uppercase;
        width: 100%;
      }
      h4:hover {
        cursor: pointer;
        color: #fabb5a;
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
    .v-card {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      .v-image {
        border-radius: 4px;
      }
      &__title {
        padding: 16px 0 0;
        text-align: left;
        .event-date {
          font-size: 0.7rem;
        }
        h4 {
          font-size: 0.85rem;
        }
      }
    }
  }
</style>
