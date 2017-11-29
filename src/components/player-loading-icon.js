import React from 'react'
import styled, { keyframes } from 'styled-components'
import * as colors from 'styles/colors'
import * as easing from 'styles/easing'

const StyledPlayerLoadingIcon = styled.div`
  display: flex;
`

const dotAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(-4px, -4px, 0);
  }

  50% {
    opacity: 1;
    transform: translate3d(-0, -0, 0);
  }

  100% {
    opacity: 0;
    transform: translate3d(4px, -4px, 0);
  }
`

const ANIMATION_STEP = 200

const StyledDot = styled.span`
  background ${colors.WHITE};
  border-radius: 50%;
  width: 5px;
  height: 5px;
  margin-right: 3px;
  opacity: 0;
  animation: ${dotAnimation} 2000ms ${easing.EASE_OUT_BACK} infinite;
  animation-delay: ${props => props.index * ANIMATION_STEP}ms;

  &:last-child {
    margin-right: 0;
  }
`

const PlayerLoadingIcon = () => (
  <StyledPlayerLoadingIcon>
    {[...Array(3)].map((item, index) => (
      <StyledDot
        index={index}
        key={index}
      />
    ))}
  </StyledPlayerLoadingIcon>
)

export default PlayerLoadingIcon
