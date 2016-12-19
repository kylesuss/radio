export const PLAY_STATION = 'PLAY_STATION'

export const playStation = (slug) => {
  return {
    type: PLAY_STATION,
    slug
  }
}
