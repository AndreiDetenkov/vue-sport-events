import axios from 'axios'
import store from './store/index'
import NProgress from 'nprogress'

axios.defaults.baseURL = 'http://localhost:8000'

export default function interceptors () {
  axios.interceptors.request.use(function (config) {
    let token = localStorage.getItem('token')
    if (token) {
      config.headers['Token'] = `${token}`
    }
    NProgress.start()
    return config
  }, function (error) {
    // Do something with request error
    return Promise.reject(error)
  })

  axios.interceptors.response.use(function (response) {
    NProgress.done()
    return response
  }, function (error) {
    // if (error.response.status === 400) {}
    if (error.response.status === 401) {
      console.log(error.response.status)
      alert('Вы не авторизованы')
      localStorage.clear()
      store.dispatch('LOGOUT')
    }
    // if (error.response.status === 501 || error.response.status === 500) {
    //   alert('Сервер в данный момент не доступен')
    // }
    // if (error.response.status === 502) {}
    return Promise.reject(error)
  })
}
