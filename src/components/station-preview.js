import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TwitterFeed from 'components/twitter-feed'
import * as positioning from 'styles/positioning'
import * as transitions from 'styles/transitions'
import * as easing from 'styles/easing'

const StyledFeedContainer = styled.div`
  position: fixed;
  left: 0;
  width: ${positioning.WIDTH_LEFT_COLUMN_PX};
  top: 0;
  right: ${positioning.WIDTH_LEFT_COLUMN_PX};
  bottom: 0;
  overflow: auto;
  padding: .75rem;
  background: #333;
  z-index: ${positioning.Z_INDEX_TWITTER_PREVIEW};
  transition: transform ${transitions.LENGTH_DOUBLE_MS} ${easing.EASE_OUT_QUINT} ${props => props.isVisible ? transitions.LENGTH_COMMON_MS : '0ms'};
  transform: translateX(0);
  ${props => props.isVisible && `
    transform: translateX(${positioning.WIDTH_LEFT_COLUMN_PX});
  `}
`

const StyledUnderlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: ${positioning.WIDTH_LEFT_COLUMN_PX};
  z-index: ${props => props.isVisible ? positioning.Z_INDEX_TWITTER_PREVIEW_UNDERLAY : '-1'};
  opacity: ${props => props.isVisible ? '1' : '0'};
  transition:
    opacity ${transitions.LENGTH_SHORT_MS} ease-out ${props => props.isVisible ? '0ms' : transitions.LENGTH_SHORT_MS},
    z-index 0ms linear ${props => props.isVisible ? '0ms' : transitions.LENGTH_DOUBLE_MS};
  background: rgba(0, 0, 0, .5);
`

const StyledCloseContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  left: ${positioning.WIDTH_LEFT_COLUMN_PX};
`

class StationPreview extends Component {
  static propTypes = {
    handleClosePreview: PropTypes.func.isRequired,
    station: PropTypes.object
  }

  handleClosePreview = () => this.props.handleClosePreview()

  render () {
    const { isVisible, station } = this.props

    return (
      <div>
        <StyledFeedContainer isVisible={isVisible}>
          <TwitterFeed twitterHandle={station.twitterHandle} />
        </StyledFeedContainer>

        <StyledUnderlay isVisible={isVisible}>
          <StyledCloseContainer onMouseEnter={this.handleClosePreview} />
        </StyledUnderlay>
      </div>
    )
  }
}

export default StationPreview
