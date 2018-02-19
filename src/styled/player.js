import styled, { keyframes } from 'styled-components'
import StyledButton from 'styled/button'
import * as colors from 'styles/colors'
import * as positioning from 'styles/positioning'

const Container = styled.div`
  position: fixed;
  bottom: ${positioning.BODY_PADDING_PX};
  left: ${positioning.BODY_PADDING_PX};
  max-width: 200px;
`

const Inner = styled.div`
  display: flex;
  align-items: center;
  height: ${positioning.HEIGHT_PLAYER_PX};
`

const StationContainer = styled.div`
  display: flex;
`

const Controls = styled.div`
  display: flex;
  justify-content: center;
`

const prevNextActiveStyles = `
  transform: translateX(1px) translateY(1px);
`

const PrevControls = styled.div`
  display: flex;
  font-size: 38px;

  &:active {
    ${prevNextActiveStyles}
  }
`

const NextControls = styled.div`
  display: flex;
  margin-left: .2rem;
  font-size: 38px;

  &:active {
    ${prevNextActiveStyles}
  }
`

const PlayStateControls = styled.div`
  width: 46px;
  height: 46px;
  margin-left: .2rem;
`

const animatePlayStateLoading = keyframes`
  from {
    transform: scale3d(.8, .8, 1);
    opacity: 1;
  }

  to {
    transform: scale3d(1.5, 1.5, 1);
    opacity: 0;
  }
`

const PlayStateInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${props => props.isLoading ? 'default' : 'pointer'};
  border-radius: 50%;
  margin: 0 auto;
  background: ${colors.LIGHT_BLUE};
  transition: width 150ms ease-out,
              height 150ms ease-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background: ${colors.LIGHT_BLUE};
    border-radius: 50%;
    ${props => props.isLoading && `
      animation: ${animatePlayStateLoading} 1s ease-out infinite;
    `}
  }

  &:active {
    width: 95%;
    height: 95%;
  }

  svg {
    width: 60%;
    height: 60%;
    transform: translate3d(0, 0, 0);
    transition: filter 250ms ease-out,
                width 150ms ease-out,
                height 150ms ease-out;
  }
`

const PlayStateButton = styled(StyledButton)`
  width: 100%;
  height: 100%;
  color: ${colors.WHITE};

  &:disabled ${PlayStateInner}:hover svg {
    filter: none;
    width: 60%;
    height: 60%;
  }

  &:disabled ${PlayStateInner}:active {
    width: 100%;
    height: 100%;
  }
`

export default {
  Container,
  Inner,
  StationContainer,
  Controls,
  PrevControls,
  NextControls,
  PlayStateControls,
  PlayStateInner,
  PlayStateButton
}
