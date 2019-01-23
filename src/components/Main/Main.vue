<template lang="pug">
  .events
    Events
</template>

<script>
import Events from '../Events/Events'
export default {
  name: 'Main',
  components: {Events}
}
</script>

<style lang="scss" scoped>
  .events {
    padding: 0 16px;
    background: #76b852;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #8DC26F, #76b852);
    background: linear-gradient(to right, #8DC26F, #76b852);
  }
</style>
