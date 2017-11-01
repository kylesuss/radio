import React from 'react'
import styled from 'styled-components'
import StationProfileImage from 'components/station-profile-image'
import * as colors from 'styles/colors'
import * as positioning from 'styles/positioning'
import * as spacing from 'styles/spacing'

const commonShadow = 'box-shadow: 1px 1px 15px rgba(0,0,0,0.2)'

const StyledStationHeader = styled.header`
  position: sticky;
  top: -244px;
`

const StyledStationStickyHeader = styled.div`
  background: ${colors.PURE_BLACK};
  height: ${positioning.HEIGHT_STICKY_STATION_HEADER_PX};
`

const StyledLogo = styled.img`
  float: left;
  border-radius: 50%;
  width: 84px;
  margin-left: ${spacing.COMMON};
  margin-top: 10px;
  ${commonShadow};
`

const StyledStationName = styled.div`
  float: left;
  height: ${positioning.HEIGHT_STICKY_STATION_HEADER_PX};
  display: flex;
  align-items: center;
  color: ${colors.WHITE};
  font-size: 1.4rem;
  margin-left: ${spacing.COMMON};
  ${commonShadow};
`

const StationHeader = ({ station }) => (
  <StyledStationHeader>
    <StationProfileImage station={station} />

    <StyledStationStickyHeader>
      <StyledLogo src={station.logo} />

      <StyledStationName>
        {station.name}
      </StyledStationName>
    </StyledStationStickyHeader>
  </StyledStationHeader>
)

export default StationHeader
