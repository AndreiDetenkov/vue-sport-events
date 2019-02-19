import axios from 'axios'
export default {
  GET_PREVIEW_EVENTS_LIST ({ commit }) {
    axios({
      method: 'GET',
      url: '/events/preview/list'
    }).then(response => {
      // console.log(response.data)
      if (response.data) {
        commit('GET_PREVIEW_EVENTS_LIST_SUCCESS', response.data)
      }
    }).catch(error => {
      console.log(error)
      if (error.response) {
        commit('GET_PREVIEW_EVENTS_LIST_ERROR', error.response.data.message)
      }
    })
  }
}
