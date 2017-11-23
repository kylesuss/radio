import cleanLiveInfo from 'utils/clean-live-info'

export default ({ body }) => {
  if (!body.current) { return null }

  return {
    timezone: null,
    current: {
      show: cleanLiveInfo(body.current.name)
    }
  }
}
