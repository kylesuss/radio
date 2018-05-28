import React from 'react'
import styled from 'styled-components'
import Logo from 'components/logo'
import * as colors from 'styles/colors'
import * as spacing from 'styles/spacing'
import * as positioning from 'styles/positioning'

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

const Header = () => (
  <StyledHeader>
    <Logo />
  </StyledHeader>
)

export default Header
