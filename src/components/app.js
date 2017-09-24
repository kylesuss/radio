import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Player from 'containers/player'
import StationList from 'containers/station-list'
import addKeyboardShortcuts from 'higher-order/add-keyboard-shortcuts'
import DocumentTitle from 'react-document-title'
import classnames from 'classnames'
import 'styles/app'
import 'styles/pages/common'

const DEFAULT_TITLE = 'Fresh Transmission - Curated Internet Radio'

class App extends Component {
  static propTypes = {
    playerIsOpen: PropTypes.bool.isRequired,
    playerIsPlaying: PropTypes.bool.isRequired,
    activeStation: PropTypes.object
  }

  get containerClasses () {
    return classnames({
      'app__container': true,
      'app__container--with-open-player': this.props.playerIsOpen
    })
  }

  get documentTitle () {
    const { activeStation, playerIsPlaying } = this.props

    return activeStation && playerIsPlaying
      ? `${activeStation.name} | ${DEFAULT_TITLE}`
      : DEFAULT_TITLE
  }

  render () {
    return (
      <div className="app">
        <div className="app__header"></div>

        <div className="app__logo text-center flex flex-justify-center">

          <div className="app__logo__inner flex flex-justify-center
                          flex-direction-column">
            <span className="app__logo__primary font-tertiary">
              Fresh
            </span>
            <span className="app__logo__secondary font-primary text-uppercase
                             text-bold">
              Transmission
            </span>
          </div>
        </div>

        <div className={this.containerClasses}>
          <DocumentTitle title={this.documentTitle}>
            <div className="page--list m-r-1__5">
              <div className="page--list__details">
                <StationList />
              </div>

              {this.props.children}
            </div>
          </DocumentTitle>
        </div>

        <Player />
      </div>
    )
  }
}

export default addKeyboardShortcuts(App)
