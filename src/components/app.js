import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Player from 'containers/player'
import StationList from 'containers/station-list'
import StyledApp from 'styled/app'
import StyledPage from 'styled/page'
import addKeyboardShortcuts from 'higher-order/add-keyboard-shortcuts'
import DocumentTitle from 'react-document-title'

const DEFAULT_TITLE = 'Fresh Transmission - Curated Internet Radio'

class App extends Component {
  static propTypes = {
    playerIsOpen: PropTypes.bool.isRequired,
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
    const { playerIsOpen } = this.props

    return (
      <StyledApp.Container>
        <StyledApp.Header />

        <StyledApp.Logo>

          <StyledApp.LogoInner>
            <StyledApp.LogoPrimary>
              Fresh
            </StyledApp.LogoPrimary>
            <StyledApp.LogoSecondary>
              Transmission
            </StyledApp.LogoSecondary>
          </StyledApp.LogoInner>
        </StyledApp.Logo>

        <StyledApp.Main withOpenPlayer={playerIsOpen}>
          <DocumentTitle title={this.documentTitle}>
            <StyledPage.ListPage>
              <StyledPage.ListPageDetails>
                <StationList />
              </StyledPage.ListPageDetails>

              {this.props.children}
            </StyledPage.ListPage>
          </DocumentTitle>
        </StyledApp.Main>

        <Player />
      </StyledApp.Container>
    )
  }
}

export default addKeyboardShortcuts(App)
