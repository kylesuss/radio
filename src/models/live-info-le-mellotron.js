import he from 'he'

export default ({ body }) => ({
  timezone: null,
  current: {
    name: he.decode(body.track.display)
  }
})
