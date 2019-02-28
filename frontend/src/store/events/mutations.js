import moment from 'moment'
export default {
  GET_PREVIEW_EVENTS_LIST_SUCCESS (state, payload) {
    payload.map(item => {
      item.date = moment(item.date).format('LL')
    })
    state.previewEventsList = payload
    state.errors.getPreviewEventsListError = null
  },
  GET_PREVIEW_EVENTS_LIST_ERROR (state, error) {
    state.errors.getPreviewEventsListError = error
  }

}
