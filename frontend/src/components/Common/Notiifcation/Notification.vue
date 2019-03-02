<template lang="pug">
  v-snackbar(
    v-model="snackbar",
    :color="color",
    right,
    top,
    :timeout="timeout") {{ text }}
    v-btn(dark, flat, @click.native="closeSnackbar") Закрыть
</template>
<script>
export default ({
  name: 'Notification',
  data: () => ({
    timeout: 5000
  }),
  computed: {
    snackbar: {
      get () {
        return this.$store.state.notification.open
      },
      set () {
        console.log()
      }
    },
    color () {
      return this.$store.state.notification.color
    },
    text () {
      return this.$store.state.notification.text
    }
  },
  methods: {
    closeSnackbar () {
      this.$store.dispatch('NOTIFICATION', { open: false, color: '', text: '' })
    }
  }
})
</script>
