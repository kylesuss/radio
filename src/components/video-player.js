import React, { Component } from 'react'
import styled from 'styled-components'
import ReactPlayer from 'react-player'

const StyledVideoContainer = styled.div`
  width: 100%;
  height: 0;
  position: relative;
  padding-bottom: 56.25%;
  position: sticky;
  top: 114px;

  > div {
    position: absolute;
    top: 0;
    left: 0;
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

class VideoPlayer extends Component {
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

  render () {
    const { streamUrl } = this.props

    return (
      <StyledVideoContainer>
        <ReactPlayer
          playing
          url={streamUrl}
          config={this.config}
          width="100%"
          height="100%"
          volume={0}
        />

        <StyledPlayerOverlay />
      </StyledVideoContainer>
    )
  }
}

export default VideoPlayer
