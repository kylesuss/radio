import modelRadioCoLiveInfo from 'models/live-info-radio-co'

export default ({ body }) => {
  if (body.current_track.title === 'Soho Radio') {
    return null
  }

  return modelRadioCoLiveInfo({ body })
}
