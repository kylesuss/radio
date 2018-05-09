import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Logo from 'components/logo'
import Player from 'components/player'
import { findStationBySlug } from 'selectors/station'
import StyledApp from 'styled/app'
import StyledPage from 'styled/page'
import withKeyboardShortcuts from 'containers/keyboard-shortcuts'
import DocumentTitle from 'react-document-title'

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
      <StyledApp.Container>
        <DocumentTitle title={this.documentTitle} />

        <Logo />
        <Player />

        <StyledApp.Main>
          <StyledPage.Container>
            {children}
          </StyledPage.Container>
        </StyledApp.Main>
      </StyledApp.Container>
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
  withKeyboardShortcuts,
  connect(mapStateToProps)
)(App)
