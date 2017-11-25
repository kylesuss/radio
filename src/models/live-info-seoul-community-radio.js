import cleanLiveInfo from 'utils/clean-live-info'

export default ({ body }) => {
  if (!body.tracks.current) { return null }

  return {
    timezone: body.station.timezone,
    current: {
      show: cleanLiveInfo(body.tracks.current.name)
    }
  }
}
