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

class VideoPlayer extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    playerIsPlaying: PropTypes.bool.isRequired,
    videos: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.oneOf([STREAM, IFRAME]).isRequired,
      url: PropTypes.string.isRequired
    })).isRequired
  }

  state = {
    activeVideoIndex: 0,
    hasErrorOnAllVideos: false,
    hasStarted: false
  }

  componentDidMount () {
    const { videoWillLoad } = this.props
    videoWillLoad()
  }

  componentWillReceiveProps (nextProps) {
    const { name, videoWillLoad } = this.props

    if (name === nextProps.name) { return }

    videoWillLoad()

    this.setState({
      activeVideoIndex: 0,
      hasErrorOnAllVideos: false,
      hasStarted: false
    })
  }

  componentWillUnmount () {
    const { videoDidEnd } = this.props
    videoDidEnd()
  }

  get activeVideo () {
    const { videos } = this.props
    const { activeVideoIndex } = this.state
    return videos[activeVideoIndex]
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

  handleStart = () => {
    const { videoDidStart } = this.props
    videoDidStart()
    this.setState({ hasStarted: true })
  }

  handleError = () => {
    const { videos } = this.props
    const { activeVideoIndex } = this.state
    const isLastVideo = activeVideoIndex === (videos.length - 1)

    if (isLastVideo) {
      this.setState({ hasErrorOnAllVideos: true })
      return
    }

    this.setState({ activeVideoIndex: activeVideoIndex + 1 })
  }

  render () {
    const { playerIsPlaying } = this.props
    const { hasErrorOnAllVideos, hasStarted } = this.state
    const activeVideo = this.activeVideo

    if (hasErrorOnAllVideos) { return null }

    return (
      <StyledVideoContainer hasStarted={hasStarted}>
        {activeVideo.type === STREAM && (
          <ReactPlayer
            playing
            url={activeVideo.url}
            config={this.config}
            width="100%"
            height="100%"
            volume={playerIsPlaying ? 1 : 0}
            onStart={this.handleStart}
            onError={this.handleError}
          />
        )}

        {activeVideo.type === IFRAME && (
          <iframe
            src={playerIsPlaying ? activeVideo.url : activeVideo.mutedUrl}
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
