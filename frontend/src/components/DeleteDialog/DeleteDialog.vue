<template lang="pug">
  v-dialog(
    v-model="show",
    transition="slide-y-reverse-transition",
    persistent,
    max-width="400px")
    v-card.pa-3
      v-card-text.text-xs-center.mb-3
        slot(name="title")
      v-card-actions
        v-spacer
        v-btn(
          outline,
          color="grey",
          @click.prevent="cancel").mx-2 Отмена
        v-btn(
          color="error",
          :loading="loading",
          :disabled="loading",
          @click.prevent="remove").mx-2 Удалить
        v-spacer
</template>

<script>
export default {
  name: 'DeleteDialog',
  props: {
    id: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    dispatchType: {
      type: String,
      default: ''
    }
  },
  created () {
    this.subscribeToMutations()
  },
  methods: {
    cancel () {
      this.$emit('close-dialog')
    },
    remove () {
      switch (this.dispatchType) {
        case 'event':
          this.$emit('delete-event-dispatch')
          break
      }
    },
    subscribeToMutations () {
      this.$store.subscribe((mutation, state) => {
        switch (mutation.type) {
          case 'REMOVE_EVENT_SUCCESS':
            this.cancel()
            break
          case 'REMOVE_EVENT_ERROR':
            this.$store.dispatch('NOTIFICATION',
              { open: true, color: 'error', text: state.admin.errors.removeEventError })
            break
        }
      })
    }
  }
}
</script>
