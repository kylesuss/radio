import cleanLiveInfo from 'utils/clean-live-info'

export default ({ body }) => {
  if (!body.current_track) { return null }

  return {
    timezone: null,
    current: {
      show: cleanLiveInfo(body.current_track.title)
    }
  }
}
