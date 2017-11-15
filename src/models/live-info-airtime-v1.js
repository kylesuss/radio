import cleanLiveInfo from 'utils/clean-live-info'

export default ({ body }) => {
  if (!body.current) { return null }

  return {
    timezone: null,
    current: {
      name: cleanLiveInfo(body.current.name)
    }
  }
}
