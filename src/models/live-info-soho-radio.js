import get from 'lodash/get'
import { LIVE_INFO_CURRENT_KEY } from 'constants/live-info'

export default ({ body }) => {
  const title = get(body, 'current_track.title')
  const withFillerTitle = title === 'Soho Radio'

  return {
    [LIVE_INFO_CURRENT_KEY]: withFillerTitle ? null : title
  }
}
