import get from 'lodash/get'
import {
  LIVE_INFO_CURRENT_KEY,
  LIVE_INFO_STATUS_KEY,
  LIVE_INFO_ACTIVE_STATUS,
  LIVE_INFO_INACTIVE_STATUS
} from 'constants/live-info'

export default ({ body }) => {
  const name = get(body, 'current.name')
  const isInactive = !!name.match(/Live streaming back on Monday/) ||
                     !!name.match(/Live streaming starts at noon/)

  return {
    [LIVE_INFO_STATUS_KEY]: isInactive
      ? LIVE_INFO_INACTIVE_STATUS
      : LIVE_INFO_ACTIVE_STATUS,
    [LIVE_INFO_CURRENT_KEY]: name
  }
}
