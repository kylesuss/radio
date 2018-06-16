import get from 'lodash/get'
import { LIVE_INFO_CURRENT_KEY } from 'constants/live-info'

export default ({ text = '' }) => {
  const parser = new window.DOMParser()
  const dom = parser.parseFromString(text, 'text/html')
  const nameNode = dom.querySelector('#switch-now .tstarheavyupper')

  return {
    [LIVE_INFO_CURRENT_KEY]: get(nameNode, 'textContent', '').trim()
  }
}
