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
