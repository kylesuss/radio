import he from 'he'

export default (text) => {
  let cleanedText

  cleanedText = text.replace(/^ - /, '')
  cleanedText = cleanedText.replace(/_/g, ' ')

  return he.decode(cleanedText)
}
