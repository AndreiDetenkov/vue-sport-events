import Vue from 'vue'
import Router from 'vue-router'
import EventsList from '../components/EventsList/EventsList'
import EventItem from '../components/EventItem/EventItem'
import AddEvent from '../components/AddEvent/AddEvent'

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
      path: '/events/add',
      name: 'add-event',
      component: AddEvent
    },
    {
      path: '*',
      redirect: { path: '/events/list' }
    }
  ]
})
