import { LIVE_INFO_CURRENT_KEY } from 'constants/live-info'

export default ({ body }) => ({
  [LIVE_INFO_CURRENT_KEY]: `${body.artist} - ${body.title}`
})
