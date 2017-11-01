import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import animateScrollTo from 'animated-scroll-to'
import StationHeader from 'components/station-header'
import TwitterFeed from 'components/twitter-feed'
import StyledPage from 'styled/page'
import * as spacing from 'styles/spacing'

const StyledStation = styled.div`
  width: 100%;
`

const StyledPageContent = styled(StyledPage.Content)`
  padding-top: ${spacing.DOUBLE};
`

const scrollOptions = {
  speed: 500
}

export default class Station extends Component {
  static propTypes = {
    station: PropTypes.object.isRequired,
    playStation: PropTypes.func.isRequired,
    activeStation: PropTypes.string.isRequired
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

  get isActiveStation () {
    const { station, activeStation } = this.props
    return station.slug === activeStation
  }

  render () {
    const { station } = this.props

    return (
      <StyledStation>
        <StationHeader station={station} />

        <StyledPageContent>
          <StyledPage.Column>
            <TwitterFeed twitterHandle={station.twitterHandle} />
          </StyledPage.Column>
        </StyledPageContent>
      </StyledStation>
    )
  }
}
