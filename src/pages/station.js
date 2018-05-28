import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import animateScrollTo from 'animated-scroll-to'
import { playStation } from 'actions/player'
import StationDetails from 'components/station-details'
import StationHeader from 'components/station-header'
import TwitterFeed from 'components/twitter-feed'
import { findStationBySlug } from 'selectors/station'
import StyledPage from 'styled/page'

const StyledStation = styled.div`
  width: 100%;
`

const scrollOptions = {
  speed: 400
}

class Station extends Component {
  static propTypes = {
    station: PropTypes.object.isRequired,
    playStation: PropTypes.func.isRequired,
    activeStation: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      activeStation: props.station
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

    this.setState({ activeStation: station }, () => this.playStation())
  }

  render () {
    const { activeStation } = this.state

    return (
      <StyledStation>
        <StationHeader station={activeStation} />

        <StyledPage.Content>
          <StyledPage.Column>
            <StationDetails station={activeStation} />
          </StyledPage.Column>

          <StyledPage.Column>
            <TwitterFeed twitterHandle={activeStation.twitterHandle} />
          </StyledPage.Column>
        </StyledPage.Content>
      </StyledStation>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  station: findStationBySlug(state.stations.items, ownProps.params.slug),
  activeStation: state.player.activeStation
})

const mapDispatchToProps = (dispatch) => ({
  playStation: (args) => dispatch(playStation(args))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Station)
