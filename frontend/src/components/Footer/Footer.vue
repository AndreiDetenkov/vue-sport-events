<template lang="pug">
  .footer
    v-footer(color="white" height="auto")
      v-layout(justify-center row)
        v-flex(xs12 text-xs-center)
          div &copy; {{ new Date().getFullYear() }}
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>

</style>
