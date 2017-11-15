import he from 'he'

export default ({ text }) => {
  const parser = new window.DOMParser()
  const dom = parser.parseFromString(text, 'text/html')
  const nameNode = dom.querySelector('#currentlyPlaying .showname')

  if (!nameNode || !nameNode.textContent) { return }

  return {
    current: {
      name: he.decode(nameNode.textContent)
    }
  }
}
