export default {
  ADD_NEW_EVENT_SUCCESS (state, payload) {
    state.newEvent = payload
    state.errors.newEventError = null
  },
  ADD_NEW_EVENT_ERROR (state, error) {
    state.errors.newEventError = error
  },
  LOADING_ADD_EVENT_BTN (state, payload) {
    state.loading.addEventBtn = payload
  }
}
