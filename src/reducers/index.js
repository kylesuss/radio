import { combineReducers } from 'redux'
import stations from 'reducers/stations'
import { routerReducer } from 'react-router-redux'

export default combineReducers({
  stations,
  routing: routerReducer
})
