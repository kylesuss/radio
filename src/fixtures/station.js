import { DEFAULT_STREAM_NUMBER } from 'constants/player'
import { VIDEO_TYPE_STREAM } from 'constants/video'

const station = {
  name: ':stationName',
  slug: ':stationSlug',
  city: ':stationCity',
  country: ':stationCountry',
  twitterHandle: ':stationTwitterHandle',
  timezone: ':stationTimezone',
  video: {
    type: VIDEO_TYPE_STREAM,
    url: ':stationVideoUrl'
  },
  isActive: true,
  description: ':stationDescription',
  web: {
    url: ':stationWebUrl',
    display: ':stationWebDisplay'
  },
  archives: [{
    url: ':stationArchiveUrl',
    display: ':stationArchiveDisplay'
  }],
  streams: [{
    number: DEFAULT_STREAM_NUMBER,
    url: 'stationStreamUrl',
    liveInfoUrl: ':stationLiveInfoUrl'
  }]
}

export default station
