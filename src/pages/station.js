import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import animateScrollTo from 'animated-scroll-to'
import Navigation from 'components/navigation'
import { initPlayer, playStation } from 'actions/player'
import StationDetails from 'components/station-details'
import StationHeader from 'components/station-header'
import TwitterFeed from 'components/twitter-feed'
import withKeyboardShortcuts from 'containers/keyboard-shortcuts'
import { buildStationPath } from 'constants/routes'
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
  componentDidMount () {
    const { activeStation, initPlayer } = this.props

    initPlayer(activeStation.slug)
    animateScrollTo(0, scrollOptions)
  }

  componentWillReceiveProps (nextProps) {
    const { activeStation, playStation } = this.props
    const isChangingStation = activeStation.slug !== nextProps.activeStation.slug

    if (!isChangingStation) { return }

    playStation(nextProps.activeStation.slug)
  }

  componentDidUpdate (prevProps) {
    const { activeStation } = this.props
    const isChangingStation = activeStation.slug !== prevProps.activeStation.slug

    if (!isChangingStation) { return }

    animateScrollTo(0, scrollOptions)
  }

  get hasStreamMatch () {
    const { activeStation, match } = this.props

    return !!activeStation.streams.find(stream => (
      stream.number === match.params.streamNumber
    ))
  }

  handleScrollCompletion = (nextStation) => {
    const { activeStation, playStation } = this.props

    if (activeStation.name !== nextStation.name) { return }

    playStation(nextStation.slug)
  }

  render () {
    const { activeStation, stationList } = this.props

    if (!activeStation) { return null }

    if (!this.hasStreamMatch) {
      return <Redirect to={buildStationPath(activeStation.slug)} />
    }

    return (
      <StyledStation>
        <Navigation />

        <StationHeader
          station={activeStation}
          stationList={stationList}
        />

        <StyledPage.Content>
          <StyledPage.Column>
            <TwitterFeed twitterHandle={activeStation.twitterHandle} />
          </StyledPage.Column>

          <StyledPage.Column>
            <StationDetails station={activeStation} />
          </StyledPage.Column>
        </StyledPage.Content>
      </StyledStation>
    )
  }
}

Station.propTypes = {
  activeStation: stationPropTypes.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  initPlayer: PropTypes.func.isRequired,
  playStation: PropTypes.func.isRequired,
  stationList: PropTypes.arrayOf(stationPropTypes).isRequired
}

const mapStateToProps = (state, ownProps) => ({
  activeStation: findStationBySlug(state.stations.items, ownProps.match.params.slug),
  stationList: state.stations.items
})

const mapDispatchToProps = (dispatch) => ({
  initPlayer: (args) => dispatch(initPlayer(args)),
  playStation: (args) => dispatch(playStation(args))
})

export default compose(
  withKeyboardShortcuts,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Station)
