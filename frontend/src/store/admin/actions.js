import axios from 'axios'

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
  GET_EVENTS_TITLE_LIST ({ commit }) {
    axios({
      method: 'GET',
      url: '/admin/events/items'
    }).then(response => {
      // console.log(response.data)
      commit('GET_EVENTS_TITLE_LIST_SUCCESS', response.data)
    }).catch(error => {
      if (error.response) {
        commit('GET_EVENTS_TITLE_LIST_ERROR', error.response.data.message)
      }
    })
  }
}
