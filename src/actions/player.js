export const PLAY_STATION = 'PLAY_STATION'

export const playStation = (slug) => {
  return {
    type: PLAY_STATION,
    slug
  }
}

export const TOGGLE_PLAY_STATE = 'TOGGLE_PLAY_STATE'

export const togglePlayState = () => {
  return {
    type: TOGGLE_PLAY_STATE
  }
}
