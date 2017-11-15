import cleanLiveInfo from 'utils/clean-live-info'

export default ({ body }) => {
  if (!body.currentlyPlayingAuto && !body.currentlyPlayingLive) {
    return null
  }

  return {
    timezone: null,
    current: {
      name: cleanLiveInfo(body.currentlyPlayingLive || body.currentlyPlayingAuto)
    }
  }
}