import get from 'lodash/get'
import { LIVE_INFO_CURRENT_KEY } from 'constants/live-info'

export default ({ body }) => {
  const isLive = body.live.video === '1'

  return {
    [LIVE_INFO_CURRENT_KEY]: isLive
      ? get(body, 'live.status') || get(body, 'track.display')
      : get(body, 'track.display')
  }
}
