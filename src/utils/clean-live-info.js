import he from 'he'
import {
  LIVE_INFO_CURRENT_KEY,
  LIVE_INFO_STATUS_KEY,
  LIVE_INFO_NO_DATA_STATUS,
  LIVE_INFO_ACTIVE_STATUS
} from 'constants/live-info'

export default (liveInfo) => {
  const text = liveInfo[LIVE_INFO_CURRENT_KEY] || ''

  let cleanedText

  cleanedText = text.replace(/^ - /, '')
  cleanedText = cleanedText.replace(/_/g, ' ')

  const autoStatus = cleanedText ? LIVE_INFO_ACTIVE_STATUS : LIVE_INFO_NO_DATA_STATUS
  const status = liveInfo[LIVE_INFO_STATUS_KEY] || autoStatus

  return {
    ...liveInfo,
    [LIVE_INFO_STATUS_KEY]: status,
    [LIVE_INFO_CURRENT_KEY]: he.decode(cleanedText)
  }
}
