import cleanLiveInfo from 'utils/clean-live-info'

export default ({ body }) => ({
  current: {
    show: cleanLiveInfo(`${body.artist} - ${body.title}`)
  }
})
