import styled, { keyframes } from 'styled-components'
import * as colors from 'styles/colors'
import * as spacing from 'styles/spacing'
import * as fonts from 'styles/fonts'
import * as easing from 'styles/easing'

const Container = styled.div`
  background: ${colors.WHITE};
  padding: ${spacing.COMMON};
  margin-top: 6px;
  min-height: calc(100vh - 6px);
`

const headerAnimation = keyframes`
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(to right, ${colors.GREEN}, ${colors.BLUE}, ${colors.GREEN}, ${colors.BLUE}, ${colors.GREEN}, ${colors.BLUE});
  box-shadow: 0 1px 15px 0px rgba(0, 0, 0, .4);
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;

  }

  &::before {
    animation: ${headerAnimation} 3000ms ease-out infinite;
    background: linear-gradient(to right, ${colors.BLUE}, ${colors.GREEN}, ${colors.BLUE}, ${colors.GREEN}, ${colors.BLUE}, ${colors.GREEN});
  }
`

const logoBackgroundAnimation = keyframes`
  0% {
    width: 0;
    height: 0;
    background: ${colors.BLACK};
  }

  50% {
    width: 100%;
    height: 0;
  }

  100% {
    width: 100%;
    height: 100%;
    background: ${colors.BLACK};
  }
`

const Logo = styled.div`
  position: fixed;
  width: 180px;
  height: 200px;
  padding: 4px;
  text-align: center;
  display: flex;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    border: 2px solid transparent;
    animation: ${logoBackgroundAnimation} 450ms ${easing.EASE_OUT_BACK} 250ms forwards;
  }
`

const logoInnerAnimation = keyframes`
  from {
    background: transparent;
    transform: scale(.9);
  }

  to {
    background: ${colors.WHITE};
    transform: scale(1);
  }
`

const LogoInner = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  left: 4px;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  z-index: 1;
  animation: ${logoInnerAnimation} 200ms ease-out 750ms forwards;
`

const logoAnimation = keyframes`
  from {
    transform: translate3d(0, -1rem, 0);
    opacity: 0;
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
`

const sharedLogoStyles = `
  opacity: 0;
  animation: ${logoAnimation} 500ms ${easing.EASE_OUT_BACK} 1000ms forwards;
`

const LogoPrimary = styled.span`
  ${sharedLogoStyles}
  font-size: 3rem;
  font-family: ${fonts.TERTIARY};
  background: linear-gradient(to right, ${colors.BLUE}, ${colors.GREEN}, ${colors.BLUE});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const LogoSecondary = styled.span`
  ${sharedLogoStyles}
  font-size: 1.275rem;
  font-family: ${fonts.PRIMARY};
  text-transform: uppercase;
  font-weight: ${fonts.WEIGHT_BOLD};
`

const Main = styled.main`
  position: fixed;
  top: calc(${spacing.COMMON} + 6px);
  right: 0;
  bottom: 0;
  left: 1.5rem;
  margin-left: 180px;
  ${props => props.withOpenPlayer && `
    padding-bottom: 5rem;
  `}
`

export default {
  Container,
  Header,
  Logo,
  LogoInner,
  LogoPrimary,
  LogoSecondary,
  Main
}
