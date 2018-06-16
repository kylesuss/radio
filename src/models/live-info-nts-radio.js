import get from 'lodash/get'
import { LIVE_INFO_CURRENT_KEY } from 'constants/live-info'

export default ({ body }) => {
  const channel1 = body.results.find(result => result.channel_name === '1')

  return {
    [LIVE_INFO_CURRENT_KEY]: get(channel1, 'now.broadcast_title')
  }
}
