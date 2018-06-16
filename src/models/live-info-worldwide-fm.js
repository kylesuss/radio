import get from 'lodash/get'
import { LIVE_INFO_CURRENT_KEY } from 'constants/live-info'

export default ({ body }) => {
  const info = get(body, 'tracks.current.name') || get(body, 'shows.current.name')
  const infoToReplace = ' (Follow @wwfmnowplaying Twitter for details)'

  return {
    [LIVE_INFO_CURRENT_KEY]: info.replace(infoToReplace, '')
  }
}
