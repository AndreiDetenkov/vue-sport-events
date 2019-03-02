import axios from 'axios'
import router from '../../router'
export default {
  state: {
    user: null,
    loginError: null,
    loading: false
  },
  mutations: {
    LOGIN_SUCCESS (state, payload) {
      state.user = payload
      state.loginError = null
      localStorage.setItem('token', payload.token)
      router.push({ path: '/admin' })
    },
    LOGIN_ERROR (state, error) {
      state.loginError = error
    }
  },
  actions: {
    LOGIN ({ commit, dispatch }, data) {
      axios({
        method: 'POST',
        url: '/users/sessions',
        data
      }).then(response => {
        commit('LOGIN_SUCCESS', response.data)
      }).catch(error => {
        if (error.response) {
          commit('LOGIN_ERROR', error)
          dispatch('NOTIFICATION', {
            open: true, color: 'error', text: error.response.data.message
          })
        }
      })
    }
  }
}
