<template lang="pug">
  v-layout(row justify-center)
    v-dialog(v-model="show" fullscreen hide-overlay transition="dialog-bottom-transition")
      v-card
        v-toolbar(dark, color="primary")
          v-btn(icon, dark, @click.prevent="close")
            v-icon close
          v-spacer
        v-card-text
          AddEvent(:edit="edit")
</template>

<script>
import AddEvent from '../AddEvent/AddEvent'
export default {
  name: 'EditEvent',
  components: { AddEvent },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    edit: false
  }),
  methods: {
    close () {
      this.$emit('close-edit-dialog')
    }
  }
}
</script>

<style lang="scss" scoped></style>
