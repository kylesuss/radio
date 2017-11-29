import { Component } from 'react'
import PropTypes from 'prop-types'
import { get } from 'utils/async'
import liveInfoModels from 'constants/live-info-models'

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
    return station.liveInfoUrl
  }

  fetchStationData = () => {
    const { station } = this.props
    if (!this.liveInfoUrl) { return }
    this.getLiveInfo(station.slug)
    this.refetchLiveInfo()
  }

  getLiveInfo = (stationSlug) => {
    get({ url: this.liveInfoUrl })
      .then((response) => this.handleInfoResponse(stationSlug, response))
  }

  refetchLiveInfo = () => {
    clearInterval(this.refetchInterval)

    this.refetchInterval = setInterval(() => {
      this.getLiveInfo()
    }, REFETCH_INTERVAL)
  }

  handleInfoResponse = (stationSlug, response) => {
    const { handleInfoResponse, station } = this.props

    if (stationSlug !== station.slug) { return }

    const normalizedResponse = liveInfoModels[station.slug]({
      text: response.text,
      body: response.body
    })

    handleInfoResponse(normalizedResponse)
  }

  render () {
    return null
  }
}

export default StationLiveInfo
