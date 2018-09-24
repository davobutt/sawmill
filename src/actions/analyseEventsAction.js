export const analyseEventsAction = (result) => dispatch => {
  dispatch({
    type: 'ANALYSE_EVENTS_ACTION',
    payload: result
  })
}
