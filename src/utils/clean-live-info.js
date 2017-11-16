import he from 'he'

export default (text) => he.decode(
  text.replace(/^ - /, '')
)
