import Vue from 'vue'
import Router from 'vue-router'

import EventItem from '@/components/Event/EventItem/EventItem'
import Admin from '@/components/Admin/Admin'
import AddEvent from '@/components/Admin/AddEvent/AddEvent'
import Events from '@/components/Event/Events/Events'
import EventsList from '@/components/Admin/EventsList/EventsList'
import Login from '../components/Login/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'events',
      component: Events
    },
    {
      path: '/events/item/:id',
      name: 'event-item',
      component: EventItem,
      props: true
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      beforeEnter: AuthGuard,
      children: [
        {
          path: '/admin/add-event',
          name: 'add-event',
          component: AddEvent,
          beforeEnter: AuthGuard
        },
        {
          path: '/admin/events-list',
          name: 'events-list',
          component: EventsList,
          beforeEnter: AuthGuard
        }
      ]
    },
    {
      path: '*',
      redirect: { path: '/' }
    }
  ]
})

function AuthGuard (to, from, next) {
  const token = localStorage.getItem('token')
  // const auth = store.state.auth.authenticated
  if (token) next()
  else next('/login')
}
