<template lang="pug">
  v-container(grid-list-lg)
    v-footer(color="white" height="auto")
      v-layout(wrap row)
        v-flex(v-for="event in this.events", :key="event._id" xs6 md3)
          v-card(flat)
            a(:href="`/events/item/${event._id}`", target="_blank").event-link
              v-img(
                :src="`http://localhost:8000/uploads/${event.dirId}/${event.imagePreview}`",
                :alt="event.title",
                aspect-ratio="1.7")
            v-card-title
              span.event-date {{ event.date }}
              h4.event-title {{ event.title }}
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
  .v-card {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    margin-bottom: 8px;
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
      .event-date {
        display: block;
        color: #f6554d;
        font-size: 0.8rem;
        font-weight: 700;
        text-transform: uppercase;
      }
      h4 {
        font-family: 'Montserrat', sans-serif;
        color: #454545;
        font-size: 1rem;
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
