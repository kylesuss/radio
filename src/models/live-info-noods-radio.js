import { LIVE_INFO_CURRENT_KEY } from 'constants/live-info'

export default ({ text = '' }) => ({
  [LIVE_INFO_CURRENT_KEY]: text.trim()
})
