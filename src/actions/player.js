export const PLAY_STATION = 'PLAY_STATION'

export const playStation = (slug) => ({
  type: PLAY_STATION,
  slug
})

export const TOGGLE_PLAY_STATE = 'TOGGLE_PLAY_STATE'

export const togglePlayState = () => ({
  type: TOGGLE_PLAY_STATE
})

export const MUTE_AUDIO_PLAYER = 'MUTE_AUDIO_PLAYER'

export const muteAudioPlayer = () => ({
  type: MUTE_AUDIO_PLAYER
})

export const UNMUTE_AUDIO_PLAYER = 'UNMUTE_AUDIO_PLAYER'

export const unmuteAudioPlayer = () => ({
  type: UNMUTE_AUDIO_PLAYER
})
