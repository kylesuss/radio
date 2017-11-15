import modelMixlrLiveInfo from './live-info-mixlr'

export default ({ body }) => {
  if (body.broadcasts[0].title === 'Netil Radio on Mixlr') {
    return null
  }

  return modelMixlrLiveInfo({ body })
}
