import get from 'lodash/get'
import { LIVE_INFO_CURRENT_KEY } from 'constants/live-info'

export default ({ body }) => {
  const title = get(body, 'broadcasts[0].title')
  const withFillerTitle = title === 'Netil Radio on Mixlr' || title === 'netil radio'

  return {
    [LIVE_INFO_CURRENT_KEY]: withFillerTitle ? null : title
  }
}
