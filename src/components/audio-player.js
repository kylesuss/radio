import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Sound from 'react-sound'
import { setPlayerError } from 'actions/player'

class AudioPlayer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      streamUrl: props.streamUrl
    }
  }

  componentDidMount () {
    window.soundManager && window.soundManager.setup({ debugMode: false })
  }

  componentWillReceiveProps (nextProps) {
    const { streamUrl } = this.props
    const isChangingStreamUrls = nextProps.streamUrl !== streamUrl
    const stateUpdates = {}

    if (isChangingStreamUrls) {
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

  handleSoundError = () => {
    const { handleSoundError, setPlayerError } = this.props

    handleSoundError()
    setPlayerError()
  }

  render () {
    const { audioPlayerVolume } = this.props
    const { streamUrl } = this.state

    if (!streamUrl) { return null }

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
  isPaused: PropTypes.bool.isRequired,
  playerIsPlaying: PropTypes.bool.isRequired,
  streamUrl: PropTypes.string.isRequired,
  setPlayerError: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  playerIsPlaying: state.player.isPlaying,
  audioPlayerVolume: state.player.audioPlayerVolume
})

const mapDispatchToProps = (dispatch) => ({
  setPlayerError: () => dispatch(setPlayerError())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AudioPlayer)
