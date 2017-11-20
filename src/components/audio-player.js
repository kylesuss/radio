import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Sound from 'react-sound'

const MIN_VOLUME = 0
const MAX_VOLUME = 100

class AudioPlayer extends Component {
  static propTypes = {
    handleSoundPlaying: PropTypes.func.isRequired,
    isPaused: PropTypes.bool.isRequired,
    playerIsPlaying: PropTypes.bool.isRequired,
    isPlayingVideo: PropTypes.bool.isRequired,
    streamUrl: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      streamUrl: props.streamUrl,
      volume: props.isPlayingVideo ? MIN_VOLUME : MAX_VOLUME
    }
  }

  componentWillReceiveProps (nextProps) {
    const { streamUrl } = this.props
    const isChangingStreamUrls = nextProps.streamUrl !== streamUrl
    const stateUpdates = {}

    if (nextProps.isPlayingVideo) {
      stateUpdates.streamUrl = null
      stateUpdates.volume = MIN_VOLUME
    }

    if (isChangingStreamUrls) {
      stateUpdates.volume = MAX_VOLUME
      stateUpdates.streamUrl = nextProps.streamUrl
    }

    Object.keys(stateUpdates).length && this.setState(stateUpdates)
  }

  get soundPlayStatus () {
    const { isPaused, playerIsPlaying } = this.props

    if (isPaused) { return Sound.status.STOPPED }
    if (playerIsPlaying) { return Sound.status.PLAYING }

    return Sound.status.STOPPED
  }

  handleSoundPlaying = () => this.props.handleSoundPlaying()

  render () {
    const { streamUrl, volume } = this.state

    if (!streamUrl) { return null }

    return (
      <Sound
        url={streamUrl}
        playStatus={this.soundPlayStatus}
        onPlaying={this.handleSoundPlaying}
        volume={volume}
      />
    )
  }
}

export default AudioPlayer
