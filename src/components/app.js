import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Header from 'components/header'
import Navigation from 'components/navigation'
import { findStationBySlug } from 'selectors/station'
import * as colors from 'styles/colors'
import * as positioning from 'styles/positioning'
import DocumentTitle from 'react-document-title'

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
    const { children } = this.props

    return (
      <StyledApp>
        <DocumentTitle title={this.documentTitle} />

        <Header />

        <Navigation />

        <Main>
          {children}
        </Main>
      </StyledApp>
    )
  }
}

App.propTypes = {
  activeStation: PropTypes.shape({
    name: PropTypes.string
  }),
  playerIsPlaying: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  activeStation: findStationBySlug(state.stations.items, state.player.activeStation),
  playerIsPlaying: state.player.isPlaying
})

export {
  App,
  DEFAULT_TITLE
}

export default compose(
  connect(mapStateToProps)
)(App)
