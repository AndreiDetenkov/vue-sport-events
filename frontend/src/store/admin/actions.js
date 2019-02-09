import axios from 'axios'
export default {
  ADD_NEW_EVENT ({ commit }, formData) {
    commit('LOADING_ADD_EVENT_BTN', true)
    axios({
      method: 'POST',
      url: 'http://localhost:8000/event/add',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      commit('ADD_NEW_EVENT_SUCCESS', response.data)
      commit('LOADING_ADD_EVENT_BTN', false)
    }).catch(error => {
      commit('ADD_NEW_EVENT_ERROR', error.response.data.message)
      commit('LOADING_ADD_EVENT_BTN', false)
    })
  }
}
