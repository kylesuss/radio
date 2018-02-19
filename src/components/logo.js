import React from 'react'
import styled from 'styled-components'
import * as colors from 'styles/colors'
import * as fonts from 'styles/fonts'
import * as positioning from 'styles/positioning'

const StyledLogo = styled.h1`
  position: fixed;
  top: ${positioning.BODY_PADDING_PX};
  left: ${positioning.BODY_PADDING_PX};
  color: ${colors.WHITE};
  font-weight: ${fonts.WEIGHT_SEMIBOLD};
  font-size: 18px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`

const Logo = () => (
  <StyledLogo>
    Fresh Transmission
  </StyledLogo>
)

export default Logo
