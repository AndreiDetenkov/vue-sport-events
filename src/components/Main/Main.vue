<template lang="pug">
  .main
    EventsList
</template>

<script>
import Events from '../Events/Events'
import EventsList from '../EventsList'
export default {
  name: 'Main',
  components: {EventsList, Events}
}
</script>

<style lang="scss" scoped>

</style>
