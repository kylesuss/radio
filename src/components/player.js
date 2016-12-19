import React, { Component, PropTypes } from 'react'
import Sound from 'react-sound'
import classnames from 'classnames'
import isNil from 'lodash/isNil'
import 'styles/player'

export default class Player extends Component {
  static propTypes = {
    station: PropTypes.object,
    isOpen: PropTypes.bool.isRequired,
    isPlaying: PropTypes.bool.isRequired
  }

  get audioSrc () {
    return this.props.station.streamUrl
  }

  get isPaused () {
    const { station, isPlaying } = this.props
    return !isNil(station) && !isPlaying
  }

  get soundPlayStatus () {
    if (this.isPaused) { return Sound.status.PAUSED }
    if (this.props.isPlaying) { return Sound.status.PLAYING }
    return Sound.status.STOPPED
  }

  get wrapperClasses () {
    return classnames({
      'player color-white flex flex-align-center': true,
      'player--open': this.props.isOpen
    })
  }

  render () {
    return (
      <div className={this.wrapperClasses}>
        {
          this.props.station &&
            <Sound url={this.props.station.streamUrl}
                   playStatus={this.soundPlayStatus} />
        }
      </div>
    )
  }
}
