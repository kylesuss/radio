import modelMixlrLiveInfo from './live-info-mixlr'

export default ({ body }) => {
  const title = body.broadcasts[0].title
  if (title === 'Netil Radio on Mixlr' || title === 'netil radio') {
    return null
  }

  return modelMixlrLiveInfo({ body })
}
