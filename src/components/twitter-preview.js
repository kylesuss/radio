import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TwitterFeed from 'components/twitter-feed'
import CloseIcon from 'react-icons/lib/md/close'
import * as positioning from 'styles/positioning'
import * as transitions from 'styles/transitions'
import * as shadow from 'styles/shadow'
import * as colors from 'styles/colors'
import * as spacing from 'styles/spacing'
import * as easing from 'styles/easing'

const StyledFeedContainer = styled.div`
  position: fixed;
  left: 0;
  width: ${positioning.WIDTH_LEFT_COLUMN_PX};
  top: ${positioning.HEIGHT_HEADER_PX};
  right: ${positioning.WIDTH_LEFT_COLUMN_PX};
  bottom: 0;
  overflow: auto;
  padding: .75rem;
  background: #333;
  z-index: ${positioning.Z_INDEX_TWITTER_PREVIEW};
  transition:
    transform ${transitions.LENGTH_DOUBLE_MS} ${easing.EASE_OUT_QUINT},
    box-shadow ${transitions.LENGTH_COMMON_MS} ease-out;
  transform: translateX(0);
  box-shadow: ${props => props.isVisible ? `${shadow.SETTINGS_COMMON} ${shadow.COLOR_DARK}` : 'none'};
  ${props => props.isVisible && `
    transform: translateX(${positioning.WIDTH_LEFT_COLUMN_PX});
  `}
`

const StyledUnderlay = styled.div`
  position: fixed;
  top: ${positioning.HEIGHT_HEADER_PX};
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
  left: ${positioning.WIDTH_LEFT_COLUMN_PX};
`

const StyledMessageContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  background: ${colors.PURE_BLACK};
  color: ${colors.WHITE};
  padding: ${spacing.HALF};
  align-items: center;
  box-shadow: ${shadow.SETTINGS_COMMON} ${shadow.COLOR_DARK};
`

const StyledCloseIcon = styled(CloseIcon)`
  width: 21px;
  height: 21px;
  margin-right: 5px;
`

const StyledCloseMessage = styled.div`
  text-transform: uppercase;
  font-size: 15px;
  margin-right: 5px;
`

class TwitterPreview extends Component {
  static propTypes = {
    handleCloseFeed: PropTypes.func.isRequired,
    twitterHandle: PropTypes.string
  }

  handleCloseFeed = () => this.props.handleCloseFeed()

  render () {
    const { isVisible, twitterHandle } = this.props

    return (
      <div>
        <StyledFeedContainer isVisible={isVisible}>
          <TwitterFeed twitterHandle={twitterHandle} />
        </StyledFeedContainer>

        <StyledUnderlay isVisible={isVisible}>
          <StyledCloseContainer onMouseEnter={this.handleCloseFeed}>
            <StyledMessageContainer>
              <StyledCloseIcon />

              <StyledCloseMessage>
                Close
              </StyledCloseMessage>
            </StyledMessageContainer>
          </StyledCloseContainer>
        </StyledUnderlay>
      </div>
    )
  }
}

export default TwitterPreview
