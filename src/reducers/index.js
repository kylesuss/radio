import { combineReducers } from 'redux'
import stations from 'reducers/stations'
import player from 'reducers/player'

export default combineReducers({
  stations,
  player
})
