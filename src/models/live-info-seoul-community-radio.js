import cleanLiveInfo from 'utils/clean-live-info'

export default ({ body }) => {
  if (!body.shows.current) { return null }

  const isInactive = !body.tracks.current

  return {
    timezone: body.station.timezone,
    current: {
      ...(isInactive ? { isInactive: true } : { show: cleanLiveInfo(body.tracks.current.name) })
    }
  }
}
