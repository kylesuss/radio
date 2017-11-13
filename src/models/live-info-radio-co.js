import he from 'he'

export default ({ body }) => {
  if (!body.current_track) { return null }

  return {
    timezone: null,
    current: {
      name: he.decode(body.current_track.title)
    }
  }
}
