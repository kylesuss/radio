import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import animateScrollTo from 'animated-scroll-to'
import Navigation from 'components/navigation'
import { playStation } from 'actions/player'
import StationDetails from 'components/station-details'
import StationHeader from 'components/station-header'
import TwitterFeed from 'components/twitter-feed'
import withKeyboardShortcuts from 'containers/keyboard-shortcuts'
import stationPropTypes from 'prop-types/station'
import { findStationBySlug } from 'selectors/station'
import StyledPage from 'styled/page'
import media from 'styles/media'
import * as positioning from 'styles/positioning'

const StyledStation = styled.div`
  width: 100%;
  ${media.mediumScreenUp`
    margin-left: ${positioning.WIDTH_LEFT_COLUMN_PX};
  `}
`

const scrollOptions = {
  speed: 400
}

class Station extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // Track the visibleStation so that scroll behavior can happen
      // before the activeStation becomes the visibleStation.
      visibleStation: props.activeStation
    }
  }

  componentDidMount () {
    this.playStation()
    animateScrollTo(0, scrollOptions)
  }

  componentDidUpdate (prevProps) {
    const { activeStation } = this.props

    if (activeStation.slug !== prevProps.activeStation.slug) {
      animateScrollTo(0, {
        ...scrollOptions,
        onComplete: () => this.handleScrollCompletion(activeStation)
      })
    }
  }

  playStation = () => {
    const { playStation } = this.props
    const { visibleStation } = this.state

    playStation(visibleStation.slug)
  }

  handleScrollCompletion = (nextStation) => {
    const { activeStation: { name } } = this.props

    if (name !== nextStation.name) { return }

    this.setState({ visibleStation: nextStation }, () => this.playStation())
  }

  render () {
    const { visibleStation } = this.state

    if (!visibleStation) { return null }

    return (
      <StyledStation>
        <Navigation />

        <StationHeader station={visibleStation} />

        <StyledPage.Content>
          <StyledPage.Column>
            <TwitterFeed twitterHandle={visibleStation.twitterHandle} />
          </StyledPage.Column>

          <StyledPage.Column>
            <StationDetails station={visibleStation} />
          </StyledPage.Column>
        </StyledPage.Content>
      </StyledStation>
    )
  }
}

Station.propTypes = {
  activeStation: stationPropTypes.isRequired,
  playStation: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  activeStation: findStationBySlug(state.stations.items, ownProps.params.slug)
})

const mapDispatchToProps = (dispatch) => ({
  playStation: (args) => dispatch(playStation(args))
})

export default compose(
  withKeyboardShortcuts,
  connect(mapStateToProps, mapDispatchToProps)
)(Station)
