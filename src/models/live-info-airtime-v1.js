import he from 'he'

export default ({ body }) => {
  if (!body.current) { return null }

  return {
    timezone: null,
    current: {
      name: he.decode(body.current.name)
    }
  }
}
