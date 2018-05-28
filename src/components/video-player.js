import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import ReactPlayer from 'react-player'
import { muteAudioPlayer, unmuteAudioPlayer } from 'actions/player'
import { toggleVideoAudioState } from 'actions/video'
import * as colors from 'styles/colors'
import * as spacing from 'styles/spacing'
import * as transitions from 'styles/transitions'

const StyledVideoPlayerContainer = styled.div`
  position: absolute;
  width: 408px;
  top: 0;
  right: 0;
  visibility: ${props => props.hasStarted ? 'visible' : 'hidden'};
  opacity: ${props => props.hasStarted ? '1' : '0'};
  transition: opacity ${transitions.LENGTH_DOUBLE_MS} ease-out 5000ms;
  background: ${colors.WHITE};
`

const StyledVideoContainer = styled.div`
  position: relative;
`

const StyledVideoPlayer = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;

  > div,
  > iframe {
    position: absolute;
    top: 0;
    left: ${spacing.HALF};
    width: 100% !important;
    left: 0;
    border: 0;
  }
`

const StyledPlayerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: transparent;
`

const STREAM = 'stream'
const IFRAME = 'iframe'
const REACT_PLAYER_MAX_VOLUME = 1
const REACT_PLAYER_MIN_VOLUME = 0

class VideoPlayer extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    playerIsPlaying: PropTypes.bool.isRequired,
    video: PropTypes.shape({
      type: PropTypes.oneOf([STREAM, IFRAME]).isRequired,
      url: PropTypes.string.isRequired
    }).isRequired
  }

  state = {
    hasStarted: false
  }

  componentWillReceiveProps (nextProps) {
    const { name } = this.props

    if (name === nextProps.name) { return }

    this.setState({ hasStarted: false })
    this.reset()
  }

  componentWillUnmount () {
    this.reset()
  }

  get config () {
    return {
      dailymotion: {
        controls: false,
        quality: '1080'
      },
      youtube: {
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1
        }
      }
    }
  }

  get iframeSrc () {
    const { hasActiveAudio, playerIsPlaying, video } = this.props

    if (!playerIsPlaying || !hasActiveAudio) {
      return video.mutedUrl
    }

    return video.url
  }

  get reactPlayerVolume () {
    const { hasActiveAudio, playerIsPlaying } = this.props

    if (!playerIsPlaying || !hasActiveAudio) {
      return REACT_PLAYER_MIN_VOLUME
    }

    return REACT_PLAYER_MAX_VOLUME
  }

  get isAudioInactive () {
    const { hasActiveAudio, playerIsPlaying } = this.props
    return !playerIsPlaying || !hasActiveAudio
  }

  get isVideoAudioActive () {
    const { hasActiveAudio, playerIsPlaying } = this.props
    return hasActiveAudio && playerIsPlaying
  }

  get audioMessage () {
    const { hasActiveAudio, playerIsPlaying } = this.props

    if (!hasActiveAudio) {
      return 'Video audio inactive'
    }

    if (this.isVideoAudioActive) {
      return 'Video audio active'
    }

    if (hasActiveAudio && !playerIsPlaying) {
      return 'Audio paused'
    }
  }

  reset = () => {
    const {
      hasActiveAudio,
      toggleVideoAudioState,
      unmuteAudioPlayer
    } = this.props

    if (!hasActiveAudio) { return }

    toggleVideoAudioState()
    unmuteAudioPlayer()
  }

  handleStart = () => this.setState({ hasStarted: true })

  handleError = () => this.setState({ hasError: true })

  handleToggleButtonClick = () => {
    const {
      hasActiveAudio,
      toggleVideoAudioState,
      muteAudioPlayer,
      unmuteAudioPlayer
    } = this.props

    if (hasActiveAudio) {
      // Video audio is going to become inactive
      unmuteAudioPlayer()
    } else {
      // Video audio is going to become active
      muteAudioPlayer()
    }

    toggleVideoAudioState()
  }

  render () {
    const { video } = this.props
    const { hasError, hasStarted } = this.state

    if (hasError) { return null }

    return (
      <StyledVideoPlayerContainer hasStarted={hasStarted}>
        <StyledVideoContainer>
          <StyledVideoPlayer>
            {video.type === STREAM && (
              <ReactPlayer
                playing
                url={video.url}
                config={this.config}
                width="100%"
                height="100%"
                volume={this.reactPlayerVolume}
                onStart={this.handleStart}
                onError={this.handleError}
              />
            )}

            {video.type === IFRAME && (
              <iframe
                src={this.iframeSrc}
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                allowFullScreen="no"
                onLoad={this.handleStart}
                onError={this.handleError}
              />
            )}

            <StyledPlayerOverlay />
          </StyledVideoPlayer>
        </StyledVideoContainer>
      </StyledVideoPlayerContainer>
    )
  }
}

const mapStateToProps = (state) => ({
  hasActiveAudio: state.video.hasActiveAudio,
  playerIsPlaying: state.player.isPlaying
})

const mapDispatchToProps = (dispatch) => ({
  muteAudioPlayer: () => dispatch(muteAudioPlayer()),
  unmuteAudioPlayer: () => dispatch(unmuteAudioPlayer()),
  toggleVideoAudioState: () => dispatch(toggleVideoAudioState())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoPlayer)
