import cleanLiveInfo from 'utils/clean-live-info'

export default ({ body }) => ({
  timezone: null,
  current: {
    name: cleanLiveInfo(body.track.display)
  }
})
