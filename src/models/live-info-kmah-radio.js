import cleanLiveInfo from 'utils/clean-live-info'

export default ({ text }) => {
  const parser = new window.DOMParser()
  const dom = parser.parseFromString(text, 'text/html')
  const nameNode = dom.querySelector('#currentlyPlaying .showname')

  if (!nameNode || !nameNode.textContent) { return }

  const isInactive = !!nameNode.textContent.match(/Back at midday/)
  const status = cleanLiveInfo(nameNode.textContent)

  return {
    current: {
      ...(isInactive ? { isInactive: true, inactiveStatus: status } : { show: status })
    }
  }
}
