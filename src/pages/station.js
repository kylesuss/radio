import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import animateScrollTo from 'animated-scroll-to'
import StationProfileImage from 'components/station-profile-image'
import TwitterFeed from 'components/twitter-feed'
import StyledPage from 'styled/page'

const StyledStation = styled.div`
  width: 100%;
`

const scrollOptions = {
  speed: 350
}

export default class Station extends Component {
  static propTypes = {
    station: PropTypes.object.isRequired,
    playStation: PropTypes.func.isRequired,
    activeStation: PropTypes.string.isRequired,
    togglePlayState: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.playStation()
    animateScrollTo(0, scrollOptions)
  }

  componentDidUpdate (prevProps) {
    const { station: { slug } } = this.props

    if (slug !== prevProps.station.slug) {
      this.playStation()
      animateScrollTo(0, scrollOptions)
    }
  }

  playStation = () => {
    const { playStation, station } = this.props
    playStation(station.slug)
  }

  handleButtonClick = () => this.playStation()

  handlePlayToggleClick = () => {
    const { playStation, togglePlayState, station } = this.props

    if (this.isActiveStation) {
      togglePlayState()
    } else {
      playStation(station.slug)
    }
  }

  get isActiveStation () {
    return this.props.station.slug === this.props.activeStation
  }

  render () {
    const { station } = this.props

    return (
      <StyledStation>
        <StationProfileImage station={station} />

        <StyledPage.Content>
          <StyledPage.Column>
            <TwitterFeed twitterHandle={station.twitterHandle} />
          </StyledPage.Column>
        </StyledPage.Content>
      </StyledStation>
    )
  }
}
