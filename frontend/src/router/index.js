import Vue from 'vue'
import Router from 'vue-router'
import EventsList from '@/components/Event/EventsList/EventsList'
import EventItem from '@/components/Event/EventItem/EventItem'
import Admin from '@/components/Admin/Admin'
import AddEvent from '@/components/Admin/AddEvent/AddEvent'

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
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [
        {
          path: '/admin/add-event',
          name: 'add-event',
          component: AddEvent
        }
      ]
    },
    {
      path: '*',
      redirect: { path: '/events/list' }
    }
  ]
})
