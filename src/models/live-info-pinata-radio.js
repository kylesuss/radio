import cleanLiveInfo from 'utils/clean-live-info'

export default ({ body }) => ({
  timezone: null,
  current: {
    show: cleanLiveInfo(`${body.artist} - ${body.title}`)
  }
})
