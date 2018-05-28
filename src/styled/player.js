import styled, { keyframes } from 'styled-components'
import StyledButton from 'styled/button'
import * as colors from 'styles/colors'
import * as spacing from 'styles/spacing'

const Container = styled.div`
  position: absolute;
  bottom: 0;
  transform: translateY(50%);
`

const Inner = styled.div`
  display: flex;
  align-items: center;
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
  align-items: center;
  font-size: 30px;

  &:active {
    ${prevNextActiveStyles}
  }
`

const NextControls = styled.div`
  display: flex;
  align-items: center;
  margin-left: ${spacing.HALF};
  font-size: 30px;

  &:active {
    ${prevNextActiveStyles}
  }
`

const PlayStateControls = styled.div`
  width: 46px;
  height: 46px;
  margin-left: ${spacing.HALF};
`

const animatePlayStateLoading = keyframes`
  from {
    transform: scale3d(.8, .8, 1);
    opacity: 0.4;
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
  margin: 0 auto;
  background: ${colors.PRIMARY_BLUE};
  box-shadow: 1px 1px 10px #ccc;
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
    background: ${colors.PRIMARY_BLUE};
    ${props => props.isLoading && `
      animation: ${animatePlayStateLoading} 1s ease-out infinite;
    `}
  }

  &:active {
    width: 95%;
    height: 95%;
    box-shadow: 1px 1px 4px #ccc;
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
