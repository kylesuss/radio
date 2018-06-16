import get from 'lodash/get'
import { LIVE_INFO_CURRENT_KEY } from 'constants/live-info'

export default ({ body }) => ({
  [LIVE_INFO_CURRENT_KEY]: get(body, 'shows.current.name')
})
