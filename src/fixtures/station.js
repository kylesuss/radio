import { VIDEO_TYPE_STREAM } from 'constants/video'

const station = {
  name: ':stationName',
  streamUrl: ':stationStreamUrl',
  slug: ':stationSlug',
  city: ':stationCity',
  country: ':stationCountry',
  twitterHandle: ':stationTwitterHandle',
  liveInfoUrl: ':stationLiveInfoUrl',
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
  }]
}

export default station
