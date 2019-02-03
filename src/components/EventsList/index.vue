<template lang="pug">
  v-container(grid-list-lg)
    v-layout(row wrap)
      v-flex(v-for="event in db.springEvents", :key="event.title" xs12 sm6 md4 lg3)
        v-card(flat)
          v-img(:src="`static/photo/${event.photo }`" aspect-ratio="1.7")
          v-card-title
            a(:href="`${event.link}`" target="_blank").sponsor-name {{ event.sponsor }}
            h2.event-title {{ event.title }}
          v-card-text
            p {{ event.location }}
</template>

<script>
import eventsList from '../../assets/db'
export default {
  name: 'index',
  data: () => ({
    db: eventsList
  })
}
</script>
<style lang="scss" scoped>
  .v-card {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    .v-image {
      border-radius: 8px;
    }
    &__title {
      padding: 14px 0 0;
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
      h2 {
        font-family: 'Montserrat', sans-serif;
        color: #454545;
        font-size: 1.14rem;
        font-weight: 700;
        text-transform: uppercase;
        width: 100%;
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
