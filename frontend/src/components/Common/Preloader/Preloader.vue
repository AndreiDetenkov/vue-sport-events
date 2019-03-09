<template lang="pug">
    v-layout(align-start justify-center fill-height)
      v-progress-linear(
        height="3"
        color="primary"
        indeterminate)
</template>

<script>
export default {
  name: 'Preloader'
}
</script>

<style lang="scss" scoped>
  .v-progress-linear {
    margin-top: 0;
  }
</style>
