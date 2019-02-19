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
    state.eventsList = payload
    state.errors.getEventsListError = null
  },
  GET_EVENTS_LIST_ERROR (state, error) {
    state.errors.getEventsListError = error
  },
  GET_EVENTS_TITLE_LIST_SUCCESS (state, payload) {
    state.eventsTitle = payload
    state.errors.getEventsTitleError = null
  },
  GET_EVENTS_TITLE_LIST_ERROR (state, error) {
    state.errors.getEventsTitleError = error
  }
}
