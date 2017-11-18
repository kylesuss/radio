import React, { Component } from 'react'
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
  state = {
    hasError: false,
    hasStarted: false
  }

  componentWillReceiveProps (nextProps) {
    const { url } = this.props

    if (url === nextProps.url) { return }

    this.setState({
      hasError: false,
      hasStarted: false
    })
  }

  get config () {
    return {
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
    const { type, url } = this.props
    const { hasError, hasStarted } = this.state

    if (hasError) { return null }

    return (
      <StyledVideoContainer hasStarted={hasStarted}>
        {type === STREAM && (
          <ReactPlayer
            playing
            url={url}
            config={this.config}
            width="100%"
            height="100%"
            volume={0}
            onStart={this.handleStart}
            onError={this.handleError}
          />
        )}

        {type === IFRAME && (
          <iframe
            src={url}
            width="100%"
            height="100%"
            frameborder="0"
            scrolling="no"
            allowfullscreen="no"
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
