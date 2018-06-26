import { LIVE_INFO_CURRENT_KEY } from 'constants/live-info'

export default ({ text = '' }) => {
  const parser = new window.DOMParser()
  const dom = parser.parseFromString(text, 'text/html')
  const nameNode = dom.querySelector('.bar.top')

  nameNode.innerHTML = nameNode.innerHTML
    .replace('<!--', '')
    .replace('-->', '')
    .replace('Playing Now - ', '')

  return {
    [LIVE_INFO_CURRENT_KEY]: nameNode.textContent.trim()
  }
}
