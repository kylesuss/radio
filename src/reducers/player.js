import { PLAY_STATION } from 'actions/player'

const initialState = {
  isOpen: true,
  isPlaying: false,
  activeStation: null
}

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case PLAY_STATION:
      return {
        ...state,
        isOpen: true,
        isPlaying: true,
        activeStation: action.slug
      }
    default:
      return state
  }
}
