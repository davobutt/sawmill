export const getAllEventsAction = (result) => dispatch => {
  dispatch({
    type: 'GET_ALL_EVENTS_ACTION',
    payload: result
  })
}
