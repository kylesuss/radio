import React from 'react'
import styled from 'styled-components'
import StationProfileImage from 'components/station-profile-image'
import * as colors from 'styles/colors'
import * as positioning from 'styles/positioning'
import * as spacing from 'styles/spacing'
import buildLocation from 'utils/build-location'

const commonShadow = 'box-shadow: 1px 1px 15px rgba(0,0,0,0.2)'

const StyledStationHeader = styled.header`
  position: sticky;
  top: -244px;
`

const StyledStationStickyHeader = styled.div`
  background: ${colors.PURE_BLACK};
  height: ${positioning.HEIGHT_STICKY_STATION_HEADER_PX};
  display: flex;
`

const StyledLogo = styled.img`
  border-radius: 50%;
  width: 54px;
  margin-left: ${spacing.COMMON};
  margin-top: 15px;
  margin-bottom: 15px;
  ${commonShadow};
`

const StyledStationDetails = styled.div`
  height: ${positioning.HEIGHT_STICKY_STATION_HEADER_PX};
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  margin-left: 15px;
  margin-right: ${spacing.COMMON};
`

const StyledStationDetailsTopRow = styled.div`
  margin-bottom: .4rem;
`

const StyledStationDetailsBottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: .85rem;
  color: ${colors.LIGHT_GREY};
`

const StyledStationName = styled.div`
  color: ${colors.WHITE};
  font-size: 1.15rem;
  text-transform: uppercase;
`

const StationHeader = ({ station, liveStationInfo }) => (
  <StyledStationHeader>
    <StationProfileImage station={station} />

    <StyledStationStickyHeader>
      <StyledLogo src={station.logo} />

      <StyledStationDetails>
        <StyledStationDetailsTopRow>
          <StyledStationName>
            {station.name}
          </StyledStationName>
        </StyledStationDetailsTopRow>

        <StyledStationDetailsBottomRow>
          <div>
            {liveStationInfo && (
              liveStationInfo.current.name
            )}

            {!liveStationInfo && (
              buildLocation(
                station.city,
                station.country
              )
            )}
          </div>
        </StyledStationDetailsBottomRow>
      </StyledStationDetails>
    </StyledStationStickyHeader>
  </StyledStationHeader>
)

export default StationHeader
