import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import DocumentTitle from 'react-document-title'
import { Switch, Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import Header from 'components/header'
import Station from 'pages/station'
import { STATION_PATH, buildStationPath } from 'constants/routes'
import stationPropTypes from 'prop-types/station'
import { findStationBySlug } from 'selectors/station'
import * as colors from 'styles/colors'
import * as positioning from 'styles/positioning'
import randomStation from 'utils/random-station'

const StyledApp = styled.div`
  background: ${colors.WHITE};
  margin-top: 0;
`

const Main = styled.main`
  margin-top: ${positioning.HEIGHT_HEADER};
  display: flex;
`

const DEFAULT_TITLE = 'Fresh Transmission - Curated Internet Radio'

class App extends Component {
  get documentTitle () {
    const { activeStation, playerIsPlaying } = this.props

    return activeStation && playerIsPlaying
      ? `${activeStation.name} | ${DEFAULT_TITLE}`
      : DEFAULT_TITLE
  }

  render () {
    return (
      <StyledApp>
        <DocumentTitle title={this.documentTitle} />

        <Header />

        <Main>
          <Switch>
            <Route path={STATION_PATH} component={Station} />
            <Redirect to={buildStationPath(randomStation.slug)} />
          </Switch>
        </Main>
      </StyledApp>
    )
  }
}

App.propTypes = {
  activeStation: stationPropTypes,
  playerIsPlaying: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  activeStation: findStationBySlug(state.stations.items, state.player.activeStationSlug),
  playerIsPlaying: state.player.isPlaying
})

export {
  App,
  DEFAULT_TITLE
}

export default compose(
  connect(mapStateToProps)
)(App)
