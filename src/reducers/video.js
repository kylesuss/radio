import * as actions from 'actions/video'

const initialState = {
  hasActiveAudio: false
}

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case actions.TOGGLE_VIDEO_AUDIO_STATE:
      return {
        ...state,
        hasActiveAudio: !state.hasActiveAudio
      }
    default:
      return state
  }
}
