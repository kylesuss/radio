import he from 'he'

export default ({ body }) => {
  if (!body.shows.current) { return null }

  return {
    timezone: body.station.timezone,
    shows: {
      current: {
        name: he.decode(body.shows.current.name),
        starts: body.shows.current.starts,
        ends: body.shows.current.ends
      }
    }
  }
}
