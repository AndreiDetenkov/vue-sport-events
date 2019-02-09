<template lang="pug">
  .event-item
    Navbar
    v-container
      v-layout(row justify-center)
        v-flex(xs12)
          h2 «Хан горы - Апхилл ивент»
    Footer
</template>

<script>
import Navbar from '../../Navbar/Navbar'
import Footer from '../../Footer/Footer'
export default {
  name: 'EventItem',
  components: { Footer, Navbar }
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
