import PropTypes from 'prop-types'
import { VIDEO_TYPE_STREAM, VIDEO_TYPE_IFRAME } from 'constants/video'

const station = PropTypes.shape({
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  city: PropTypes.string,
  country: PropTypes.string,
  twitterHandle: PropTypes.string.isRequired,
  timezone: PropTypes.string,
  video: PropTypes.shape({
    type: PropTypes.oneOf([VIDEO_TYPE_STREAM, VIDEO_TYPE_IFRAME]).isRequired,
    url: PropTypes.string.isRequired,
    mutedUrl: PropTypes.string
  }),
  isActive: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
  web: PropTypes.shape({
    url: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired
  }).isRequired,
  archives: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired
  })),
  streams: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    liveInfoUrl: PropTypes.string
  })).isRequired
})

export default station
