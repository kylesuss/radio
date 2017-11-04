import { Component } from 'react'
import PropTypes from 'prop-types'
import { get } from 'utils/async'
import modelAirtimeLiveInfo from 'models/live-info-airtime'

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

    if (station.airtime) {
      this.getLiveInfo(station.airtime.liveInfoUrl)
    }
  }

  getLiveInfo = (url) => {
    get({ url })
      .then(this.handleInfoResponse)
  }

  handleInfoResponse = (response) => {
    const { handleInfoResponse } = this.props
    const normalizedResponse = modelAirtimeLiveInfo(response.body)

    handleInfoResponse(normalizedResponse)
  }

  render () {
    return null
  }
}

export default StationLiveInfo
