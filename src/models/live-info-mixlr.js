import cleanLiveInfo from 'utils/clean-live-info'

export default ({ body }) => ({
  timezone: body.time_zone,
  current: {
    show: cleanLiveInfo(body.broadcasts[0].title)
  }
})
