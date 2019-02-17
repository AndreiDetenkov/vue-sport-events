export default {
  GET_PREVIEW_EVENTS_LIST_SUCCESS (state, payload) {
    state.previewEventsList = payload
    state.errors.getPreviewEventsListError = null
  },
  GET_PREVIEW_EVENTS_LIST_ERROR (state, error) {
    state.errors.getPreviewEventsListError = error
  }

}
