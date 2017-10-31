import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TwitterPreview from 'components/twitter-preview'
import Player from 'containers/player'
import StationList from 'containers/station-list'
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

  state = {
    activeTwitterPreviewHandle: null
  }

  get documentTitle () {
    const { activeStation, playerIsPlaying } = this.props

    return activeStation && playerIsPlaying
      ? `${activeStation.name} | ${DEFAULT_TITLE}`
      : DEFAULT_TITLE
  }

  handleOpenFeed = (twitterHandle) => {
    const { activeStation } = this.props

    if (activeStation.twitterHandle === twitterHandle) { return }

    this.setState({ activeTwitterPreviewHandle: twitterHandle })
  }

  handleCloseFeed = () => this.setState({
    activeTwitterPreviewHandle: null
  })

  render () {
    const { activeTwitterPreviewHandle } = this.state

    return (
      <StyledApp.Container>
        <DocumentTitle title={this.documentTitle} />

        <StyledApp.Header />

        <StyledApp.Main>
          <StyledPage.Container>
            {this.props.children}
          </StyledPage.Container>
        </StyledApp.Main>

        <StyledApp.LeftColumn isShowingTwitterPreview={!!activeTwitterPreviewHandle}>
          <StationList
            handleOpenFeed={this.handleOpenFeed}
            handleCloseFeed={this.handleCloseFeed}
            activeTwitterPreviewHandle={activeTwitterPreviewHandle}
          />

          <Player />
        </StyledApp.LeftColumn>

        <TwitterPreview
          isVisible={!!activeTwitterPreviewHandle}
          twitterHandle={activeTwitterPreviewHandle}
          handleCloseFeed={this.handleCloseFeed}
        />
      </StyledApp.Container>
    )
  }
}

export default withKeyboardShortcuts(App)
