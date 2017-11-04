import React, { Component } from 'react'
import PropTypes from 'prop-types'
import StationPreview from 'components/station-preview'
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
    activePreviewStation: {}
  }

  get documentTitle () {
    const { activeStation, playerIsPlaying } = this.props

    return activeStation && playerIsPlaying
      ? `${activeStation.name} | ${DEFAULT_TITLE}`
      : DEFAULT_TITLE
  }

  handleOpenPreview = (station) => {
    const { activeStation } = this.props

    if (activeStation.station === station) { return }

    this.setState({ activePreviewStation: station })
  }

  handleClosePreview = () => this.setState({
    activePreviewStation: {}
  })

  render () {
    const { activePreviewStation } = this.state
    const isShowingStationPreview = !!activePreviewStation.name

    return (
      <StyledApp.Container>
        <DocumentTitle title={this.documentTitle} />

        <StyledApp.Header />

        <StyledApp.Main>
          <StyledPage.Container>
            {this.props.children}
          </StyledPage.Container>
        </StyledApp.Main>

        <StyledApp.LeftColumn isShowingStationPreview={isShowingStationPreview}>
          <StationList
            handleOpenPreview={this.handleOpenPreview}
            handleClosePreview={this.handleClosePreview}
            activePreviewStation={activePreviewStation}
          />

          <Player />
        </StyledApp.LeftColumn>

        <StationPreview
          isVisible={isShowingStationPreview}
          station={activePreviewStation}
          handleClosePreview={this.handleClosePreview}
        />
      </StyledApp.Container>
    )
  }
}

export default withKeyboardShortcuts(App)
