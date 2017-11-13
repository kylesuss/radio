import he from 'he'

export default ({ body }) => {
  if (!body.shows.current) { return null }

  const trackName = body.tracks && body.tracks.current && body.tracks.current.name
  const name = trackName || body.shows.current.name

  return {
    timezone: body.station.timezone,
    current: {
      name: he.decode(name),
      starts: body.shows.current.starts,
      ends: body.shows.current.ends
    }
  }
}
