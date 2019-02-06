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
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import ImageUploader from 'vue-image-upload-resize'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.prototype.moment = moment
firebase.initializeApp(firebaseConfig)
Vue.use(Vuetify, {
  iconfont: 'md'
})
Vue.use(ImageUploader)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
