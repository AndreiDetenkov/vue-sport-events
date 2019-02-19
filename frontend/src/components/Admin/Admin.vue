<template lang="pug">
  v-app
    Toolbar
    router-view
</template>

<script>
import Toolbar from './Toolbar/Toolbar'
import AddEvent from './AddEvent/AddEvent'
export default {
  name: 'Admin',
  components: { AddEvent, Toolbar }
}
</script>
