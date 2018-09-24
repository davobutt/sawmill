export const selectResultAction = (result) => dispatch => {
  dispatch({
    type: 'SELECT_RESULT_ACTION',
    payload: result
  })
}
