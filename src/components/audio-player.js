import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Sound from 'react-sound'

class AudioPlayer extends Component {
  componentDidMount () {
    window.soundManager && window.soundManager.setup({ debugMode: false })
  }

  get soundPlayStatus () {
    const { playerIsPlaying } = this.props

    return playerIsPlaying
      ? Sound.status.PLAYING
      : Sound.status.STOPPED
  }

  handleSoundPlaying = () => this.props.handleSoundPlaying()

  handleSoundError = () => this.props.handleSoundError()

  render () {
    const { audioPlayerVolume, streamUrl } = this.props

    return (
      <Sound
        url={streamUrl}
        playStatus={this.soundPlayStatus}
        onPlaying={this.handleSoundPlaying}
        onError={this.handleSoundError}
        volume={audioPlayerVolume}
      />
    )
  }
}

AudioPlayer.propTypes = {
  audioPlayerVolume: PropTypes.number.isRequired,
  handleSoundPlaying: PropTypes.func.isRequired,
  handleSoundError: PropTypes.func.isRequired,
  playerIsPlaying: PropTypes.bool.isRequired,
  streamUrl: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
  audioPlayerVolume: state.player.audioPlayerVolume,
  playerIsPlaying: state.player.isPlaying
})

export {
  AudioPlayer
}

export default connect(
  mapStateToProps,
  null,
)(AudioPlayer)
