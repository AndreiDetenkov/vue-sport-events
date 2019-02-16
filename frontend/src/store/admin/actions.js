import axios from 'axios'
export default {
  ADD_NEW_EVENT_PREVIEW ({ commit }, formData) {
    commit('LOADING_ADD_EVENT_BTN', true)
    axios({
      method: 'POST',
      url: 'http://localhost:8000/admin/add-event-preview',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      // console.log(response.data)
      commit('ADD_NEW_EVENT_SUCCESS', response.data)
      commit('LOADING_ADD_EVENT_BTN', false)
    }).catch(error => {
      commit('ADD_NEW_EVENT_ERROR', error.response.data.message)
      commit('LOADING_ADD_EVENT_BTN', false)
    })
  },
  GET_EVENTS_LIST ({ commit }) {
    axios({
      method: 'GET',
      url: 'http://localhost:8000/admin/events/list'
    }).then(response => {
      commit('GET_EVENTS_LIST_SUCCESS', response.data)
    }).catch(error => {
      commit('GET_EVENTS_LIST_ERROR', error)
    })
  }
}
