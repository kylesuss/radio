import he from 'he'

export default ({ body }) => ({
  timezone: body.time_zone,
  current: {
    name: he.decode(body.broadcasts[0].title)
  }
})
