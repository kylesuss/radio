import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Header from 'components/header'
import Navigation from 'components/navigation'
import { findStationBySlug } from 'selectors/station'
import StyledPage from 'styled/page'
import * as colors from 'styles/colors'
import media from 'styles/media'
import * as positioning from 'styles/positioning'
import withKeyboardShortcuts from 'containers/keyboard-shortcuts'
import DocumentTitle from 'react-document-title'

const Container = styled.div`
  background: ${colors.WHITE};
  margin-top: 0;
`

const Main = styled.main`
  ${media.mediumScreenUp`
    margin-left: ${positioning.WIDTH_LEFT_COLUMN_PX};
  `}
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
      <Container>
        <DocumentTitle title={this.documentTitle} />

        <Header />

        <Navigation />

        <Main>
          <StyledPage.Container>
            {children}
          </StyledPage.Container>
        </Main>
      </Container>
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
