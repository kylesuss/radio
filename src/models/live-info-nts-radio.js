import get from 'lodash/get'
import { LIVE_INFO_CURRENT_KEY } from 'constants/live-info'

export const modelNTSRadioLiveInfoStream1 = ({ body }) => {
  const channel1 = body.results.find(result => result.channel_name === '1')

  return {
    [LIVE_INFO_CURRENT_KEY]: get(channel1, 'now.broadcast_title')
  }
}

export const modelNTSRadioLiveInfoStream2 = ({ body }) => {
  const channel2 = body.results.find(result => result.channel_name === '2')

  return {
    [LIVE_INFO_CURRENT_KEY]: get(channel2, 'now.broadcast_title')
  }
}
