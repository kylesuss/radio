import he from 'he'

export default (response) => {
  if (!response.shows.current) { return null }

  return {
    timezone: response.station.timezone,
    shows: {
      current: {
        name: he.decode(response.shows.current.name),
        starts: response.shows.current.starts,
        ends: response.shows.current.ends
      }
    }
  }
}
