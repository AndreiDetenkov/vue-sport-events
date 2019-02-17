// import moment from 'moment'
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
  },
  GET_EVENTS_LIST_SUCCESS (state, payload) {
    // payload.map(item => {
    //   item.date = moment(item.date).format('LL')
    // })
    state.eventsList = payload
    state.errors.getEventsListError = null
  },
  GET_EVENTS_LIST_ERROR (state, error) {
    state.errors.getEventsListError = error
  }
}
