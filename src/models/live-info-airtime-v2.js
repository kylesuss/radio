import cleanLiveInfo from 'utils/clean-live-info'

export default ({ body }) => {
  if (!body.shows.current) { return null }

  return {
    current: {
      show: cleanLiveInfo(body.shows.current.name)
    }
  }
}
