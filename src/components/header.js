import React from 'react'
import styled from 'styled-components'
import * as colors from 'styles/colors'
import * as fonts from 'styles/fonts'
import * as positioning from 'styles/positioning'
import * as spacing from 'styles/spacing'

const StyledHeader = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  height: ${positioning.HEIGHT_HEADER};
  background: ${colors.WHITE};
  z-index: ${positioning.Z_INDEX_APP_HEADER};
  padding: 0 ${spacing.HALF};
  border-bottom: 1px solid ${colors.SHADOW};
`

const StyledLogo = styled.h1`
  top: ${positioning.BODY_PADDING_PX};
  left: ${positioning.BODY_PADDING_PX};
  font-family: ${fonts.SECONDARY};
  font-style: italic;
  font-weight: ${fonts.WEIGHT_NORMAL};
  text-transform: uppercase;
  background: ${colors.BLACK};
  padding: 5px 7px;
  color: ${colors.WHITE};
  font-size: 18px;
  margin: 0;
`

const Header = () => (
  <StyledHeader>
    <StyledLogo>
      Fresh Transmission
    </StyledLogo>
  </StyledHeader>
)

export default Header
