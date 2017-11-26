import * as actions from 'actions/player'
import * as constants from 'constants/player'
import stationsFixtures from 'fixtures/stations'

const initialState = {
  isPlaying: false,
  hasError: false,
  activeStation: stationsFixtures[0].slug,
  audioPlayerVolume: constants.AUDIO_PLAYER_MAX_VOLUME
}

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case actions.PLAY_STATION:
      return {
        ...state,
        isPlaying: true,
        activeStation: action.slug,
        audioPlayerVolume: constants.AUDIO_PLAYER_MAX_VOLUME,
        hasError: false
      }
    case actions.TOGGLE_PLAY_STATE:
      return {
        ...state,
        isPlaying: !state.isPlaying,
        hasError: false
      }
    case actions.MUTE_AUDIO_PLAYER:
      return {
        ...state,
        audioPlayerVolume: constants.AUDIO_PLAYER_MIN_VOLUME
      }
    case actions.UNMUTE_AUDIO_PLAYER:
      return {
        ...state,
        audioPlayerVolume: constants.AUDIO_PLAYER_MAX_VOLUME
      }
    case actions.SET_PLAYER_ERROR:
      return {
        ...state,
        hasError: true
      }
    default:
      return state
  }
}
