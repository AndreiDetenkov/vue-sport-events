import Vue from 'vue'
import Vuex from 'vuex'
import admin from './admin/index'
import events from './events/index'
import notification from './notification/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    admin,
    events,
    notification
  }
})
