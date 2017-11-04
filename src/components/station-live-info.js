import { Component } from 'react'
import PropTypes from 'prop-types'
import { get } from 'utils/async'
import modelAirtimeResponse from 'models/airtime-response'

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
      get({ url: station.airtime.liveInfoUrl })
        .then(this.handleInfoResponse)
    }
  }

  handleInfoResponse = (response) => {
    const { handleInfoResponse } = this.props
    const normalizedResponse = modelAirtimeResponse(response.body)

    handleInfoResponse(normalizedResponse)
  }

  render () {
    return null
  }
}

export default StationLiveInfo
