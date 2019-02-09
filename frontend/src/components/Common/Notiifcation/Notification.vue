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
    timeout: 0
  }),
  computed: {
    snackbar () {
      return this.$store.state.notification.open
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
