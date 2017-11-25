import cleanLiveInfo from 'utils/clean-live-info'

export default ({ text }) => ({
  timezone: null,
  current: {
    show: cleanLiveInfo(text.trim())
  }
})
