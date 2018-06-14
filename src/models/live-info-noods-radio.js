import cleanLiveInfo from 'utils/clean-live-info'

export default ({ text }) => ({
  current: {
    show: cleanLiveInfo(text.trim())
  }
})
