import he from 'he'

export default (response) => ({
  timezone: response.time_zone,
  shows: {
    current: {
      name: he.decode(response.broadcasts[0].title)
    }
  }
})
