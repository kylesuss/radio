import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ArrowIcon from 'react-icons/lib/md/play-arrow'
import Button from 'styled/button'
import * as colors from 'styles/colors'
import * as easing from 'styles/easing'
import * as transitions from 'styles/transitions'

const GREEN_BG_TRANSITION_DELAY = 750
const GREEN_BG_ANIMATION_LENGTH = transitions.LENGTH_DOUBLE + GREEN_BG_TRANSITION_DELAY
const PREVIEW_SECTION_WIDTH_PX = '14px'

const StyledPreviewContainer = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .1);
  cursor: pointer;
  display: flex;
  align-items: center;
  transform: translateX(${PREVIEW_SECTION_WIDTH_PX});
  transition:
    transform ${transitions.LENGTH_COMMON_MS} ${easing.EASE_OUT_QUINT},
    opacity ${transitions.LENGTH_COMMON_MS} ease-out;

  &:hover {
    background: ${colors.DARK_GREEN};
  }

  ${props => props.isPreviewing && `
    transform: translateX(${PREVIEW_SECTION_WIDTH_PX}) scale(.7);
  `}
`

const StyledListItem = styled.div`
  position: relative;
  overflow: hidden;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  &::before {
    transform: translateX(${props => props.isActive ? '0' : '-100%'});
    transition:
      transform ${props => props.isActive ? '0ms' : transitions.LENGTH_DOUBLE_MS} ${easing.EASE_OUT_QUINT} ${props => props.isActive ? '0ms' : transitions.LENGTH_DOUBLE_MS},
      opacity ${transitions.LENGTH_COMMON_MS} ease-out,
      background ${transitions.LENGTH_COMMON_MS} ease-out;
    ${props => props.isPreviewing && `
      transition:
        transform ${props => props.isActive ? '0ms' : transitions.LENGTH_DOUBLE_MS} ${easing.EASE_OUT_QUINT} ${props => props.isActive ? '0ms' : GREEN_BG_TRANSITION_DELAY}ms,
        background ${transitions.LENGTH_COMMON_MS} ease-out;
      transform: translateX(0);
      background: ${colors.LIGHT_GREEN};
      opacity: 1;
    `}
    z-index: -1;
  }

  &::after {
    opacity: 0;
    background: ${colors.LIGHT_GREY};
    z-index: -2;
    transition: opacity ${transitions.LENGTH_COMMON_MS} ease-out;
  }

  &:hover ${StyledPreviewContainer} {
    ${props => props.isActive && `
      transform: translateX(${PREVIEW_SECTION_WIDTH_PX}) scale(1);
    `}
    ${props => !props.isActive && `
      transform: ${props.isPreviewing ? `transform: translateX(${PREVIEW_SECTION_WIDTH_PX}) scale(.7)` : 'translateX(0)'};
    `}
  }

  &:hover::after {
    opacity: 1;
  }

  &:hover::before {
    transition:
      transform ${props => props.isActive ? '0ms' : transitions.LENGTH_DOUBLE_MS} ${easing.EASE_OUT_QUINT} ${props => props.isActive || props.isPreviewing ? '0ms' : GREEN_BG_TRANSITION_DELAY},
      background ${transitions.LENGTH_COMMON_MS} ease-out;
    opacity: ${props => props.isActive ? '0' : '1'};
  }
`

const StyledArrowIcon = styled(ArrowIcon)`
  color: ${colors.BLACK};
  opacity: .25;
  width: ${PREVIEW_SECTION_WIDTH_PX};
  height: ${PREVIEW_SECTION_WIDTH_PX};
`

class StationListItem extends Component {
  static propTypes = {
    isActive: PropTypes.bool.isRequired,
    handleOpenFeed: PropTypes.func.isRequired,
    twitterHandle: PropTypes.string.isRequired
  }

  state = {
    isMousingOver: false
  }

  componentWillReceiveProps (nextProps) {
    const { isActive } = this.props
    const isBecomingActive = !isActive && nextProps.isActive

    if (isBecomingActive) {
      clearTimeout(this.mouseOverTimeout)
    }
  }

  componentWillUmount () {
    clearTimeout(this.mouseOverTimeout)
    this.mouseOverTimeout = null
  }

  handleMouseEnter = () => {
    const { handleOpenFeed, twitterHandle } = this.props

    this.setState({ isMousingOver: true })

    clearTimeout(this.mouseOverTimeout)

    this.mouseOverTimeout = setTimeout(() => {
      handleOpenFeed(twitterHandle)
    }, GREEN_BG_ANIMATION_LENGTH)
  }

  handleMouseLeave = () => {
    this.setState({ isMousingOver: false })
    clearTimeout(this.mouseOverTimeout)
  }

  handlePreviewButtonClick = () => this.props.handleOpenFeed(
    this.props.twitterHandle
  )

  render () {
    const { isActive, isPreviewing, children } = this.props

    return (
      <StyledListItem
        isActive={isActive}
        isPreviewing={isPreviewing}
      >
        {children}

        <StyledPreviewContainer
          isPreviewing={isPreviewing}
          onClick={this.handlePreviewButtonClick}
        >
          <StyledArrowIcon />
        </StyledPreviewContainer>
      </StyledListItem>
    )
  }
}

export default StationListItem
