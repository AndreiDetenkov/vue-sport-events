<template lang="pug">
  v-container
    v-layout(row justify-center)
      v-flex(xs12)
        h2 «Хан горы - Апхилл ивент»
    Footer
</template>

<script>
export default {
  name: 'EventItem'
}
</script>

<style lang="scss" scoped>
  .container {
    h2 {
      font-family: 'Montserrat', sans-serif;
      font-size: 2.5rem;
      font-weight: 700;
      text-transform: capitalize;
    }
  }
</style>
