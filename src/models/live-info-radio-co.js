import cleanLiveInfo from 'utils/clean-live-info'

export default ({ body }) => {
  if (!body.current_track) { return null }

  return {
    current: {
      show: cleanLiveInfo(body.current_track.title)
    }
  }
}
