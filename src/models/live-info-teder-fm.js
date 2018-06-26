import get from 'lodash/get'
import {
  LIVE_INFO_CURRENT_KEY,
  LIVE_INFO_STATUS_KEY,
  LIVE_INFO_ACTIVE_STATUS,
  LIVE_INFO_INACTIVE_STATUS
} from 'constants/live-info'

export default ({ text = '' }) => {
  const parser = new window.DOMParser()
  const dom = parser.parseFromString(text, 'text/html')
  const nameNode = dom.querySelector('.player .info .title')
  const title = dom.querySelector('h1.title')
  const isInactive = title.textContent === 'Off The Air'

  return {
    [LIVE_INFO_STATUS_KEY]: isInactive
      ? LIVE_INFO_INACTIVE_STATUS
      : LIVE_INFO_ACTIVE_STATUS,
    [LIVE_INFO_CURRENT_KEY]: isInactive
      ? null
      : get(nameNode, 'textContent', '').trim()
  }
}
