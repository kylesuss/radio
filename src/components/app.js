import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Logo from 'components/logo'
import Player from 'components/player'
import StyledApp from 'styled/app'
import StyledPage from 'styled/page'
import withKeyboardShortcuts from 'containers/with-keyboard-shortcuts'
import DocumentTitle from 'react-document-title'

const DEFAULT_TITLE = 'Fresh Transmission - Curated Internet Radio'

class App extends Component {
  static propTypes = {
    playerIsPlaying: PropTypes.bool.isRequired,
    activeStation: PropTypes.object
  }

  get documentTitle () {
    const { activeStation, playerIsPlaying } = this.props

    return activeStation && playerIsPlaying
      ? `${activeStation.name} | ${DEFAULT_TITLE}`
      : DEFAULT_TITLE
  }

  render () {
    return (
      <StyledApp.Container>
        <DocumentTitle title={this.documentTitle} />

        <Logo />
        <Player />

        <StyledApp.Main>
          <StyledPage.Container>
            {this.props.children}
          </StyledPage.Container>
        </StyledApp.Main>
      </StyledApp.Container>
    )
  }
}

export default withKeyboardShortcuts(App)
