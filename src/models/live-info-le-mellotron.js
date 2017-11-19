import cleanLiveInfo from 'utils/clean-live-info'

export default ({ body }) => {
  if (!body.track) { return null }

  const isLive = body.live.audio === '1'

  return {
    timezone: null,
    current: {
      name: cleanLiveInfo(isLive ? body.live.status : body.track.display)
    }
  }
}
