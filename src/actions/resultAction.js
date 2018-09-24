export const resultAction = (result) => dispatch => {
  dispatch({
    type: 'RESULT_ACTION',
    payload: result
  })
}
