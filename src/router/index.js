import Vue from 'vue'
import Router from 'vue-router'
import EventsList from '../components/EventsList/EventsList'
import EventItem from '../components/EventItem/EventItem'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/events/list',
      name: 'events-list',
      component: EventsList
    },
    {
      path: '/events/item/:id',
      name: 'event-item',
      component: EventItem,
      props: true
    },
    {
      path: '*',
      redirect: { path: '/events/list' }
    }
  ]
})
