import get from 'lodash/get'
import cleanLiveInfo from 'utils/clean-live-info'

export default ({ body }) => {
  const title = get(body, 'broadcasts[0].title')

  if (!title) { return null }

  return {
    current: {
      show: cleanLiveInfo(title)
    }
  }
}
