import cleanLiveInfo from 'utils/clean-live-info'

export default ({ body }) => {
  if (!body.length || !body[0].showName) { return }

  return {
    current: {
      show: cleanLiveInfo(body[0].showName)
    }
  }
}
