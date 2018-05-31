import cleanLiveInfo from 'utils/clean-live-info'

export default ({ body }) => {
  if (!body.track) { return null }

  const isLive = body.live.video === '1'

  return {
    timezone: null,
    current: {
      show: isLive
        ? cleanLiveInfo(body.live.status)
        : cleanLiveInfo(body.track.display)
    }
  }
}
