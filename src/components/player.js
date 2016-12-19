import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import 'styles/player'

export default class Player extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    isPlaying: PropTypes.bool.isRequired
  };

  get wrapperClasses () {
    return classnames({
      'player color-white flex flex-align-center': true,
      'player--open': this.props.isOpen
    })
  }

  render () {
    return (
      <div className={this.wrapperClasses}>
        player
      </div>
    )
  }
}
