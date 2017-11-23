import cleanLiveInfo from 'utils/clean-live-info'

export default ({ body }) => {
  if (!body.shows.current) { return null }

  return {
    timezone: body.station.timezone,
    current: {
      show: cleanLiveInfo(body.shows.current.name),
      starts: body.shows.current.starts,
      ends: body.shows.current.ends
    }
  }
}
