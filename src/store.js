import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

const initialSate = {
  results: {
    search: {
      results: [{groupKey: 'TEST', events: [1, 2, 3]}],
      term: 'Test'
    }
  }
}

export default function configureStore () {
  return createStore(
    combineReducers({
      ...reducers
    }), initialSate,
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  )
}
