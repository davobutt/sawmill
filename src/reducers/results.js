import {tagger} from '../analysers/tagger'

const results = (state = {}, action) => {
  console.log('HERE ' + action.type)
  switch (action.type) {
    case 'RESULT_ACTION':
      return Object.assign({}, state, {
        search: action.payload
      })

    case 'SELECT_RESULT_ACTION':
      return Object.assign({}, state, {
        selectedResult: action.payload
      })

    case 'GET_ALL_EVENTS_ACTION':
      const resultSet = action.payload.results[0]
      return Object.assign({}, state, {
        search: {
          ...state.search,
          results: state.search.results.map((result) => {
            if (result.groupKey === resultSet.groupKey) {
              result.events.push(...resultSet.events)
              result.partial = false
            }
            return result
          })
        }
      })

      case 'ANALYSE_EVENTS_ACTION':
        const result = action.payload



    default:
      return state
  }
}

export default results
