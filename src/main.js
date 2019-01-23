import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import moment from 'moment'
import 'moment/locale/ru'
import firebase from 'firebase/app'
import firebaseConfig from './config/firebase'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.prototype.moment = moment
firebase.initializeApp(firebaseConfig)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
