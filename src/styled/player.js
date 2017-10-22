import styled, { keyframes } from 'styled-components'
import StyledButton from 'styled/button'
import * as colors from 'styles/colors'
import * as easing from 'styles/easing'
import * as spacing from 'styles/spacing'

const Container = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  height: 100px;
  background: ${colors.BLACK};
  transition: transform 250ms ${easing.EASE_OUT_BACK},
              box-shadow 250ms ease-out;
  transform: translate3d(0, 100px, 0);
  ${props => props.isOpen && `
    transform: translate3d(0, 20px, 0);
    box-shadow: 0 -1px 15px 1px rgba(0, 0, 0, .4);
  `}
`

const Inner = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  padding: .8rem ${spacing.COMMON};
  min-width: 1127px;
`

const StationContainer = styled.div`
  display: flex;
  flex-grow: 1;
`

const Controls = styled.div`
  display: flex;
  justify-content: center;
  width: 180px;
`

const prevNextActiveStyles = `
  transform: translateX(1px) translateY(1px);
`

const PrevControls = styled.div`
  display: flex;

  &:active {
    ${prevNextActiveStyles}
  }
`

const NextControls = styled.div`
  display: flex;
  margin-left: .8rem;

  &:active {
    ${prevNextActiveStyles}
  }
`

const PlayStateControls = styled.div`
  width: 50px;
  height: 50px;
  margin-left: .8rem;
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
  cursor: pointer;
  border-radius: 50%;
  margin: 0 auto;
  background: linear-gradient(to bottom, ${colors.RED}, ${colors.PURPLE});
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
    background: ${colors.PURPLE};
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

  &:hover svg {
    filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, .5));
    width: 68%;
    height: 68%;
  }

  &:active svg {
    filter: none;
    width: 58%;
    height: 58%;
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

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1rem;
  width: 200px;
  ${props => props.withLink && `
    transform: translateY(-2px);
  `}
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
  PlayStateButton,
  Info
}
