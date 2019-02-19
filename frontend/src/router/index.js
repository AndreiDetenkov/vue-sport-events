import Vue from 'vue'
import Router from 'vue-router'

import EventItem from '@/components/Event/EventItem/EventItem'
import Admin from '@/components/Admin/Admin'
import AddEvent from '@/components/Admin/AddEvent/AddEvent'
import EventsListPreview from '@/components/Event/EventsListPreview/EventsListPreview'
import EventsList from '@/components/Admin/EventsList/EventsList'
import AddFullEvent from '@/components/Admin/AddFullEvent/AddFullEvent'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/events-preview/list',
      name: 'events-preview-list',
      component: EventsListPreview
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
          path: '/admin/add-event-preview',
          name: 'add-event-preview',
          component: AddEvent
        },
        {
          path: '/admin/add-event',
          name: 'add-event',
          component: AddFullEvent
        },
        {
          path: '/admin/events-list',
          name: 'events-list',
          component: EventsList
        }
      ]
    },
    {
      path: '*',
      redirect: { path: '/events-preview/list' }
    }
  ]
})
