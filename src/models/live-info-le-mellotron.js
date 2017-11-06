import he from 'he'

export default ({ body }) => ({
  timezone: null,
  shows: {
    current: {
      name: he.decode(body.track.display)
    }
  }
})
