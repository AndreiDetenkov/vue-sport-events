<template lang="pug">
  .header
    v-toolbar(flat color="white")
      v-toolbar-title
       // {{ moment(Date.now()).format('LL') }}
      v-spacer
      v-btn(icon)
        v-icon(color="grey") input
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style lang="scss" scoped>
  .v-toolbar__title {
    color: #504d49;
    font-size: 0.8rem;
  }
</style>
