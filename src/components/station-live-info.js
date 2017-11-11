import { Component } from 'react'
import PropTypes from 'prop-types'
import { get } from 'utils/async'
import modelAirtimeV1LiveInfo from 'models/live-info-airtime-v1'
import modelAirtimeV2LiveInfo from 'models/live-info-airtime-v2'
import modelMixlrLiveInfo from 'models/live-info-mixlr'
import modelLeMellotronInfo from 'models/live-info-le-mellotron'
import modelRedLightRadioLiveInfo from 'models/live-info-red-light-radio'
import modelRadioCoLiveInfo from 'models/live-info-radio-co'
import modelNoodsRadioLiveInfo from 'models/live-info-noods-radio'

const liveInfoModelMap = {
  'le-mellotron': modelLeMellotronInfo,
  'lyl-radio': modelAirtimeV1LiveInfo,
  'netil-radio': modelMixlrLiveInfo,
  'noods-radio': modelNoodsRadioLiveInfo,
  'red-light-radio': modelRedLightRadioLiveInfo,
  'soho-radio': modelRadioCoLiveInfo
}

const REFETCH_INTERVAL = 30000 // 30 seconds

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

  componentWillUnmount () {
    clearInterval(this.refetchInterval)
    this.refetchInterval = null
  }

  get liveInfoUrl () {
    const { station } = this.props

    if (station.airtime) {
      return station.airtime.liveInfoUrl
    }

    if (station.liveInfoUrl) {
      return station.liveInfoUrl
    }
  }

  fetchStationData = () => {
    if (!this.liveInfoUrl) { return }
    this.getLiveInfo()
    this.refetchLiveInfo()
  }

  getLiveInfo = () => {
    get({ url: this.liveInfoUrl })
      .then(this.handleInfoResponse)
  }

  refetchLiveInfo = () => {
    clearInterval(this.refetchInterval)

    this.refetchInterval = setInterval(() => {
      this.getLiveInfo()
    }, REFETCH_INTERVAL)
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
