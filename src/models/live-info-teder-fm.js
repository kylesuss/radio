import cleanLiveInfo from 'utils/clean-live-info'

export default ({ text }) => {
  const parser = new window.DOMParser()
  const dom = parser.parseFromString(text, 'text/html')
  const nameNode = dom.querySelector('.player .info .title')

  if (!nameNode || !nameNode.textContent) { return }

  return {
    current: {
      show: cleanLiveInfo(nameNode.textContent)
    }
  }
}
