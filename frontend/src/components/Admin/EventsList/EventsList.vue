<template lang="pug">
  v-container
    v-layout(row justify-center)
      v-flex(xs12)
        pre {{ events }}
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'EventsList',
  mounted () {
    this.$store.dispatch('GET_EVENTS_LIST')
  },
  computed: {
    ...mapState({
      events: state => state.admin.eventsList
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
s
