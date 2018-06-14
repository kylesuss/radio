import cleanLiveInfo from 'utils/clean-live-info'

export default ({ body }) => {
  if (!body.shows) { return null }

  const isInactive = body.shows && !body.shows.current

  return {
    current: {
      ...(isInactive ? { isInactive: true } : { show: cleanLiveInfo(body.shows.current.name) })
    }
  }
}
