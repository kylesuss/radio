import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReactPlayer from 'react-player'
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

const STREAM = 'stream'
const IFRAME = 'iframe'
const WAIT_FOR_LOAD_DELAY = 10000

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

  componentDidMount () {
    this.handleNewVideo()
  }

  componentWillReceiveProps (nextProps) {
    const { name } = this.props

    if (name === nextProps.name) { return }

    this.setState({ hasStarted: false })
    this.handleNewVideo()
  }

  componentWillUnmount () {
    const { videoDidEnd } = this.props

    videoDidEnd()

    clearTimeout(this.waitForLoadTimeout)
    this.waitForLoadTimeout = null
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

  handleNewVideo = () => {
    const { videoWillLoad } = this.props

    videoWillLoad()

    clearTimeout(this.waitForLoadTimeout)
    this.waitForLoadTimeout = setTimeout(() => {
      const { hasStarted } = this.state
      if (!hasStarted) { this.handleError() }
    }, WAIT_FOR_LOAD_DELAY)
  }

  handleStart = () => {
    const { videoDidStart } = this.props

    videoDidStart()

    this.setState({ hasStarted: true })
  }

  handleError = () => this.setState({ hasError: true })

  render () {
    const { playerIsPlaying, video } = this.props
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
            volume={playerIsPlaying ? 1 : 0}
            onStart={this.handleStart}
            onError={this.handleError}
          />
        )}

        {video.type === IFRAME && (
          <iframe
            src={playerIsPlaying ? video.url : video.mutedUrl}
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
      </StyledVideoContainer>
    )
  }
}

export default VideoPlayer
