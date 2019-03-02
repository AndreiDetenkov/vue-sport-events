import Vue from 'vue'
import Vuex from 'vuex'
import admin from './admin'
import events from './events'
import notification from './notification'
import login from './login'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    admin,
    events,
    notification,
    login
  }
})
