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
      // console.log(response)
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
  REMOVE_EVENT_BY_ID ({ commit, dispatch }, data) {
    commit('REMOVE_EVENT_LOADING', true)
    axios({
      method: 'DELETE',
      url: `/admin/event/delete/${data.eventId}`,
      data: { dirId: data.dirId }
    }).then(
      response => {
        commit('REMOVE_EVENT_SUCCESS', response.data)
        commit('REMOVE_EVENT_LOADING', false)
        dispatch('GET_EVENTS_LIST')
      },
      error => {
        commit('REMOVE_EVENT_ERROR', error.response.data.message)
        commit('REMOVE_EVENT_LOADING', false)
      }
    )
  },
  GET_EVENT_BY_ID ({ commit }, id) {
    axios({
      method: 'GET',
      url: `/admin/event/${id}`
    }).then(response => {
      commit('GET_EVENT_BY_ID_SUCCESS', response.data)
    }).catch(error => {
      console.log(error)
      commit('GET_EVENT_BY_ID_ERROR', error.response.data)
    })
  },
  EDIT_EVENT ({ commit }, data) {
    // for (let pair of data.formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1])
    // }
    axios({
      method: 'PUT',
      url: `/admin/event/edit/${data.id}`,
      data: data.formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(response => {
      console.log(response.data)
      commit('', response.data)
    }).catch(error => {
      console.log(error)
      commit('', error)
    })
  },
  LOGOUT () {
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
