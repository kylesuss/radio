import cleanLiveInfo from 'utils/clean-live-info'

export default ({ body }) => {
  if (!body.track) { return null }

  const isLive = body.live.audio === '1'

  return {
    timezone: null,
    current: {
      ...(isLive ? { show: cleanLiveInfo(body.live.status) } : {}),
      ...(isLive ? {} : { track: cleanLiveInfo(body.track.display) })
    }
  }
}
