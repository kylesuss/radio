import he from 'he'

export default ({ body }) => {
  if (!body.results) { return null }

  const channel1 = body.results.find(result => result.channel_name === '1')

  if (!channel1) { return null }

  return {
    timezone: null,
    current: {
      name: he.decode(channel1.now.broadcast_title)
    }
  }
}
