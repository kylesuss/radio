import * as actions from 'actions/player'
import * as constants from 'constants/player'

const initialState = {
  isPlaying: false,
  hasError: false,
  activeStationSlug: null,
  audioPlayerVolume: constants.AUDIO_PLAYER_MAX_VOLUME
}

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case actions.INIT_PLAYER:
      return {
        ...state,
        activeStationSlug: action.slug
      }
    case actions.PLAY_STATION:
      return {
        ...state,
        isPlaying: true,
        activeStationSlug: action.slug,
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
    default:
      return state
  }
}
