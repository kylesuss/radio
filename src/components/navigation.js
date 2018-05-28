import React from 'react'
import styled from 'styled-components'
import StationList from 'components/station-list'
import * as colors from 'styles/colors'
import * as positioning from 'styles/positioning'
import media from 'styles/media'

const StyledNavigation = styled.nav`
  background: ${colors.BLACK};
  position: fixed;
  left: 0;
  height: calc(100vh - ${positioning.HEIGHT_HEADER_PX});
  width: ${positioning.WIDTH_LEFT_COLUMN_PX};
  flex-direction: column;
  display: none;
  ${media.mediumScreenUp`
    display: flex;
  `}
`

const Navigation = () => (
  <StyledNavigation>
    <StationList />
  </StyledNavigation>
)

export default Navigation
