export default (response) => ({
  timezone: response.station.timezone,
  shows: {
    current: {
      name: response.shows.current.name,
      starts: response.shows.current.starts,
      ends: response.shows.current.ends
    }
  }
})
