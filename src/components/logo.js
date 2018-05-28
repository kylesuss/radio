import React from 'react'
import styled from 'styled-components'
import * as colors from 'styles/colors'
import * as fonts from 'styles/fonts'
import * as positioning from 'styles/positioning'

const StyledLogo = styled.h1`
  top: ${positioning.BODY_PADDING_PX};
  left: ${positioning.BODY_PADDING_PX};
  font-family: ${fonts.SECONDARY};
  font-weight: ${fonts.WEIGHT_SEMIBOLD};
  text-transform: uppercase;
  background: ${colors.BLACK};
  padding: 5px 7px;
  color: ${colors.WHITE};
  font-size: 18px;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`

const Logo = () => (
  <StyledLogo>
    Fresh Transmission
  </StyledLogo>
)

export default Logo
