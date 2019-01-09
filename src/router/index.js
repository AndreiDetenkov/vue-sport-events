import Vue from 'vue'
import Router from 'vue-router'
import Events from '@/components/Events/Events.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'events',
      component: Events
    }
  ]
})
