import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as colors from 'styles/colors'
import * as easing from 'styles/easing'
import * as transitions from 'styles/transitions'

const GREEN_BG_TRANSITION_DELAY = 650
const GREEN_BG_ANIMATION_LENGTH = transitions.LENGTH_DOUBLE + GREEN_BG_TRANSITION_DELAY

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
      transform ${({ isActive, isPreviewing }) => isActive || isPreviewing ? '0ms' : transitions.LENGTH_DOUBLE_MS} ${easing.EASE_OUT_QUINT} ${({ isActive, isPreviewing }) => isActive || isPreviewing ? '0' : transitions.LENGTH_DOUBLE_MS},
      opacity ${transitions.LENGTH_COMMON_MS} ease-out,
      background ${transitions.LENGTH_COMMON_MS} ease-out;
    ${props => props.isPreviewing ? `
      transform: translateX(0);
      background: ${colors.LIGHT_GREEN};
      opacity: 1;
    ` : `
      transform: translateX(${props.isActive ? '0' : '-100%'});
      background: ${props.isActive ? colors.LIGHT_GREY : colors.LIGHT_GREEN};
      opacity: ${props.isActive ? '1' : '0'};
    `}
    z-index: -1;
  }

  &::after {
    opacity: 0;
    background: ${colors.LIGHT_GREY};
    z-index: -2;
    transition: opacity ${transitions.LENGTH_COMMON_MS} ease-out;
  }

  &:hover::before {
    transform: translateX(0);
    transition:
      transform ${props => props.isActive ? '0ms' : transitions.LENGTH_DOUBLE_MS} ${easing.EASE_OUT_QUINT} ${props => props.isActive ? '0' : GREEN_BG_TRANSITION_DELAY}ms,
      background ${transitions.LENGTH_COMMON_MS} ease-out;
    opacity: 1;
  }

  &:hover::after {
    opacity: 1;
  }
`

class StationListItem extends Component {
  static propTypes = {
    isActive: PropTypes.bool.isRequired,
    handleOpenFeed: PropTypes.func.isRequired,
    twitterHandle: PropTypes.string.isRequired
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

    clearTimeout(this.mouseOverTimeout)

    this.mouseOverTimeout = setTimeout(() => {
      handleOpenFeed(twitterHandle)
    }, GREEN_BG_ANIMATION_LENGTH)
  }

  handleMouseLeave = () => clearTimeout(this.mouseOverTimeout)

  render () {
    const { isActive, isPreviewing, children } = this.props

    return (
      <StyledListItem
        isActive={isActive}
        isPreviewing={isPreviewing}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {children}
      </StyledListItem>
    )
  }
}

export default StationListItem
