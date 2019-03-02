import axios from 'axios'
import router from '../../router'
export default {
  ADD_NEW_EVENT_PREVIEW ({ commit }, formData) {
    commit('LOADING_ADD_EVENT_BTN', true)
    axios({
      method: 'POST',
      url: '/admin/add-event-preview',
      data: formData
    }).then(response => {
      console.log(response)
      if (response.data) {
        commit('ADD_NEW_EVENT_SUCCESS', response.data)
      }
      commit('LOADING_ADD_EVENT_BTN', false)
    }).catch(error => {
      if (error.response) {
        commit('ADD_NEW_EVENT_ERROR', error.response.data.message)
      }
      commit('LOADING_ADD_EVENT_BTN', false)
    })
  },
  GET_EVENTS_LIST ({ commit }) {
    axios({
      method: 'GET',
      url: '/admin/events/list'
    }).then(response => {
      commit('GET_EVENTS_LIST_SUCCESS', response.data)
    }).catch(error => {
      commit('GET_EVENTS_LIST_ERROR', error)
    })
  },
  LOGOUT ({ commit }) {
    axios({
      method: 'DELETE',
      url: '/users/sessions'
    }).then(response => {
      console.log(response.data.message)
      localStorage.removeItem('token')
      router.push({ path: '/login' })
    }).catch(error => {
      console.log(error.response)
    })
  }
}
