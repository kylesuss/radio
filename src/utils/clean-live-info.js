import he from 'he'

export default (text) => {
  const de = he

  return he.decode(
    text.replace(/^ \- /, '')
  )
}
