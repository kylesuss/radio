import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import animateScrollTo from 'animated-scroll-to'
import StationLiveInfo from 'components/station-live-info'
import StationHeader from 'components/station-header'
import TwitterFeed from 'components/twitter-feed'
import StyledPage from 'styled/page'

const StyledStation = styled.div`
  width: 100%;
`

const scrollOptions = {
  speed: 400
}

export default class Station extends Component {
  static propTypes = {
    station: PropTypes.object.isRequired,
    playStation: PropTypes.func.isRequired,
    activeStation: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      activeStation: props.station,
      liveStationInfo: null
    }
  }

  componentDidMount () {
    this.playStation()
    animateScrollTo(0, scrollOptions)
  }

  componentDidUpdate (prevProps) {
    const { station } = this.props

    if (station.slug !== prevProps.station.slug) {
      animateScrollTo(0, {
        ...scrollOptions,
        onComplete: () => this.handleScrollCompletion(station)
      })
    }
  }

  playStation = () => {
    const { playStation } = this.props
    const { activeStation } = this.state

    playStation(activeStation.slug)
  }

  handleScrollCompletion = (station) => {
    const { station: { name } } = this.props

    if (name !== station.name) { return }

    this.setState({
      activeStation: station,
      liveStationInfo: null
    }, () => this.playStation())
  }

  handleInfoResponse = (info) => this.setState({
    liveStationInfo: info
  })

  render () {
    const { activeStation, liveStationInfo } = this.state

    return (
      <StyledStation>
        <StationLiveInfo
          station={activeStation}
          handleInfoResponse={this.handleInfoResponse}
        />

        <StationHeader
          station={activeStation}
          liveStationInfo={liveStationInfo}
        />

        <StyledPage.Content>
          <StyledPage.Column>
            <TwitterFeed twitterHandle={activeStation.twitterHandle} />
          </StyledPage.Column>
        </StyledPage.Content>
      </StyledStation>
    )
  }
}
