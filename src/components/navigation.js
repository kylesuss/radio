import React from 'react'
import styled from 'styled-components'
import * as colors from 'styles/colors'
import * as positioning from 'styles/positioning'

const StyledNavigation = styled.nav`
  background: ${colors.BLACK};
  position: fixed;
  left: 0;
  height: 100vh;
  width: ${positioning.WIDTH_LEFT_COLUMN_PX};
  display: flex;
  flex-direction: column;
`

const Navigation = () => (
  <StyledNavigation />
)

export default Navigation
