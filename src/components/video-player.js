import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReactPlayer from 'react-player'
import { VIDEO_TYPE_STREAM, VIDEO_TYPE_IFRAME } from 'constants/video'
import * as colors from 'styles/colors'
import * as spacing from 'styles/spacing'
import * as transitions from 'styles/transitions'

const StyledVideoPlayerContainer = styled.div`
  position: absolute;
  width: 394px;
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

const REACT_PLAYER_MIN_VOLUME = 0

class VideoPlayer extends Component {
  state = {
    hasError: false,
    hasStarted: false
  }

  componentWillReceiveProps (nextProps) {
    const { name } = this.props

    if (name === nextProps.name) { return }

    this.setState({ hasError: false, hasStarted: false })
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

  handleStart = () => this.setState({ hasStarted: true })

  handleError = () => this.setState({ hasError: true })

  render () {
    const { video } = this.props
    const { hasError, hasStarted } = this.state

    if (hasError) { return null }

    return (
      <StyledVideoPlayerContainer hasStarted={hasStarted}>
        <StyledVideoContainer>
          <StyledVideoPlayer>
            {video.type === VIDEO_TYPE_STREAM && (
              <ReactPlayer
                playing
                url={video.url}
                config={this.config}
                width="100%"
                height="100%"
                volume={REACT_PLAYER_MIN_VOLUME}
                onStart={this.handleStart}
                onError={this.handleError}
              />
            )}

            {video.type === VIDEO_TYPE_IFRAME && (
              <iframe
                src={video.url}
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

VideoPlayer.propTypes = {
  name: PropTypes.string.isRequired,
  video: PropTypes.shape({
    type: PropTypes.oneOf([
      VIDEO_TYPE_STREAM,
      VIDEO_TYPE_IFRAME
    ]).isRequired,
    url: PropTypes.string.isRequired
  }).isRequired
}

export default VideoPlayer
