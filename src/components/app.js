import React, { Component, PropTypes } from 'react'
import Player from 'containers/player'
import addKeyboardShortcuts from 'higher-order/add-keyboard-shortcuts'
import classnames from 'classnames'
import 'styles/app'

class App extends Component {
  static propTypes = {
    playerIsOpen: PropTypes.bool.isRequired
  }

  get containerClasses () {
    return classnames({
      'app__container': true,
      'app__container--with-open-player': this.props.playerIsOpen
    })
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
          {this.props.children}
        </div>

        <Player />
      </div>
    )
  }
}

export default addKeyboardShortcuts(App)
