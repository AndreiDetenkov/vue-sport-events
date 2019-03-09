import moment from 'moment'
export default {
  GET_PREVIEW_EVENTS_LIST_SUCCESS (state, payload) {
    payload.map(item => {
      item.date = moment(item.date).format('LL')
    })
    state.eventsListProd = payload
    state.errors.getEventsListProdError = null
  },
  GET_PREVIEW_EVENTS_LIST_ERROR (state, error) {
    state.errors.getEventsListProdError = error
  },
  GET_EVENT_ITEM_SUCCESS (state, payload) {
    state.eventItem = payload
    state.errors.getEventItemError = null
  },
  GET_EVENT_ITEM_ERROR (state, error) {
    state.errors.getEventItemError = error
  }

}
