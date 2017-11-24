import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReactPlayer from 'react-player'
import InfoIcon from 'react-icons/lib/md/info'
import VolumeIcon from 'react-icons/lib/md/volume-up'
import MutedIcon from 'react-icons/lib/md/volume-off'
import Button from 'styled/button'
import * as colors from 'styles/colors'
import * as easing from 'styles/easing'
import * as transitions from 'styles/transitions'

const StyledVideoContainer = styled.div`
  width: 100%;
  height: 0;
  position: relative;
  padding-bottom: 56.25%;
  position: sticky;
  top: 114px;
  visibility: ${props => props.hasStarted ? 'visible' : 'hidden'};
  opacity: ${props => props.hasStarted ? '1' : '0'};
  transition: opacity ${transitions.LENGTH_DOUBLE_MS} ease-out;

  > div,
  > iframe {
    position: absolute;
    top: 0;
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

const StyledAudioIndicator = styled.div`
  position: absolute;
  background: ${colors.PURE_BLACK};
  color: #888;
  border-radius: 2px;
  padding: 10px;
  right: 15px;
  top: 15px;
  font-size: 18px;
`

const StyledAudioMessage = styled.span`
  font-size: 12px;
  text-transform: uppercase;
  margin-left: 8px;
`

const HOVER_DELAY = 3000

const StyledPlayerOverlayDetails = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  visibility: ${props => props.hasStarted ? 'hidden' : 'visible'};
  opacity: ${props => props.hasStarted ? '0' : '1'};
  transition:
    visibility 0ms linear ${transitions.LENGTH_COMMON + HOVER_DELAY}ms,
    opacity ${transitions.LENGTH_COMMON_MS} ${HOVER_DELAY}ms;

  ${StyledPlayerOverlay}:hover & {
    visibility: visible;
    opacity: 1;
    transition: opacity ${transitions.LENGTH_COMMON_MS};
  }
`

const StyledControls = styled.div`
  position: absolute;
  height: 46px;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${colors.PURE_BLACK};
  color: #888;
  font-size: 12px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
`

const StyledControlsSection = styled.div`
  display: flex;
  align-items: center;
`

const StyledInfoIcon = styled(InfoIcon)`
  margin-right: 8px;
  height: 20px;
  width: 18px;
`

const StyledToggle = styled.div`
  position: relative;
  width: 50px;
  border: 2px solid ${colors.WHITE};
  padding: 4px;
  height: 20px;
  border-radius: 2px;
`

const StyledToggleIndicator = styled.div`
  position: absolute;
  left: 3px;
  top: 3px;
  width: 18px;
  background: ${colors.PURPLE};
  height: 10px;
  transform: translateX(${props => props.hasActiveAudio ? '22px' : '0px'});
  transition: transform ${easing.EASE_OUT_QUINT} ${transitions.LENGTH_COMMON_MS};
`

const StyledToggleMessage = styled.div`
  margin-right: 10px;
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
    const {
      hasActiveAudio,
      name,
      toggleVideoAudioState,
      unmuteAudioPlayer
    } = this.props

    if (name === nextProps.name) { return }

    this.setState({ hasStarted: false })

    if (hasActiveAudio) {
      toggleVideoAudioState()
      unmuteAudioPlayer()
    }
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

  get audioMessage () {
    const { hasActiveAudio, playerIsPlaying } = this.props

    if (!hasActiveAudio) {
      return 'Video audio inactive'
    }

    if (hasActiveAudio && playerIsPlaying) {
      return 'Video audio active'
    }

    if (hasActiveAudio && !playerIsPlaying) {
      return 'Audio paused'
    }
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
    const { hasActiveAudio, video } = this.props
    const { hasError, hasStarted } = this.state

    if (hasError) { return null }

    return (
      <StyledVideoContainer hasStarted={hasStarted}>
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

        <StyledPlayerOverlay>
          <StyledPlayerOverlayDetails hasStarted={hasStarted}>
            <StyledAudioIndicator>
              {this.isAudioInactive ? <MutedIcon /> : <VolumeIcon />}

              <StyledAudioMessage>
                {this.audioMessage}
              </StyledAudioMessage>
            </StyledAudioIndicator>

            <StyledControls>
              <StyledControlsSection>
                <StyledInfoIcon />

                <span>Video and audio feeds may not sync</span>
              </StyledControlsSection>

              <StyledControlsSection>
                <StyledToggleMessage>Switch source:</StyledToggleMessage>

                <Button onClick={this.handleToggleButtonClick}>
                  <StyledToggle>
                    <StyledToggleIndicator
                      hasActiveAudio={hasActiveAudio}
                    />
                  </StyledToggle>
                </Button>
              </StyledControlsSection>
            </StyledControls>
          </StyledPlayerOverlayDetails>
        </StyledPlayerOverlay>
      </StyledVideoContainer>
    )
  }
}

export default VideoPlayer
