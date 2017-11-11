import he from 'he'

export default ({ body }) => {
  if (!body.currentlyPlayingAuto && !body.currentlyPlayingLive) {
    return null
  }

  return {
    timezone: null,
    shows: {
      current: {
        name: he.decode(body.currentlyPlayingLive || body.currentlyPlayingAuto)
      }
    }
  }
}
