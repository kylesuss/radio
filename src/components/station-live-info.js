import { Component } from 'react'
import PropTypes from 'prop-types'
import { get } from 'utils/async'
import modelAirtimeV1LiveInfo from 'models/live-info-airtime-v1'
import modelAirtimeV2LiveInfo from 'models/live-info-airtime-v2'
import modelMixlrLiveInfo from 'models/live-info-mixlr'
import modelLeMellotronInfo from 'models/live-info-le-mellotron'
import modelRedLightRadio from 'models/live-info-red-light-radio'
import modelRadioCoLiveInfo from 'models/live-info-radio-co'

const liveInfoModelMap = {
  'netil-radio': modelMixlrLiveInfo,
  'le-mellotron': modelLeMellotronInfo,
  'red-light-radio': modelRedLightRadio,
  'soho-radio': modelRadioCoLiveInfo,
  'lyl-radio': modelAirtimeV1LiveInfo
}

class StationLiveInfo extends Component {
  static propTypes = {
    handleInfoResponse: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.fetchStationData()
  }

  componentDidUpdate (prevProps) {
    const { station } = this.props

    if (station.slug !== prevProps.station.slug) {
      this.fetchStationData()
    }
  }

  fetchStationData = () => {
    const { station } = this.props
    let liveInfoUrl

    if (station.airtime) {
      liveInfoUrl = station.airtime.liveInfoUrl
    } else if (station.liveInfoUrl) {
      liveInfoUrl = station.liveInfoUrl
    }

    liveInfoUrl && this.getLiveInfo(liveInfoUrl)
  }

  getLiveInfo = (url) => {
    get({ url })
      .then(this.handleInfoResponse)
  }

  handleInfoResponse = (response) => {
    const { handleInfoResponse, station } = this.props
    let normalizedResponse

    if (station.airtime) {
      normalizedResponse = modelAirtimeV2LiveInfo({ body: response.body })
    } else {
      normalizedResponse = liveInfoModelMap[station.slug]({
        text: response.text,
        body: response.body
      })
    }

    handleInfoResponse(normalizedResponse)
  }

  render () {
    return null
  }
}

export default StationLiveInfo
