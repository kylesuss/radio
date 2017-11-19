import {
  VIDEO_WILL_LOAD,
  VIDEO_DID_START,
  VIDEO_DID_END
} from 'actions/video'

const initialState = {
  isPlaying: false,
  willLoadVideo: false
}

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case VIDEO_WILL_LOAD:
      return {
        ...state,
        willLoadVideo: true
      }
    case VIDEO_DID_START:
      return {
        ...state,
        isPlaying: true,
        willLoadVideo: false
      }
    case VIDEO_DID_END:
      return {
        ...state,
        isPlaying: false,
        willLoadVideo: false
      }
    default:
      return state
  }
}
