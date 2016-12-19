import { combineReducers } from 'redux'
import stations from 'reducers/stations'
import player from 'reducers/player'
import { routerReducer } from 'react-router-redux'

export default combineReducers({
  stations,
  player,
  routing: routerReducer
})
