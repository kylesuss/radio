import { PLAY_STATION, TOGGLE_PLAY_STATE } from 'actions/player'

const initialState = {
  isPlaying: false,
  activeStation: null
}

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case PLAY_STATION:
      return {
        ...state,
        isPlaying: true,
        activeStation: action.slug
      }
    case TOGGLE_PLAY_STATE:
      return {
        ...state,
        isPlaying: state.isOpen ? !state.isPlaying : state.isPlaying
      }
    default:
      return state
  }
}
