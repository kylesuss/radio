import React from 'react'
import styled from 'styled-components'
import StationProfileImage from 'components/station-profile-image'
import * as colors from 'styles/colors'
import * as fonts from 'styles/fonts'
import * as positioning from 'styles/positioning'
import * as spacing from 'styles/spacing'
import * as transitions from 'styles/transitions'
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

const StyledLiveInfo = styled.div`
  display: flex;
  opacity: ${props => props.hasLiveInfo ? '1' : '0'};
  transition: opacity ${transitions.LENGTH_COMMON_MS} ease-out;
`

const sharedLabelStyles = `
  border-radius: 2px;
  color: #111;
  font-weight: ${fonts.WEIGHT_BOLD};
  text-transform: uppercase;
  font-size: 11px;
  padding: 2px 6px;
  margin-right: 8px;
`

const StyledLiveShowLabel = styled.span`
  ${sharedLabelStyles}
  background: ${colors.GREEN};
`

const StyledLiveTrackLabel = styled.span`
  ${sharedLabelStyles}
  background: ${colors.BLUE};
`

const StyledInactiveLabel = styled.span`
  ${sharedLabelStyles}
  background: ${colors.BLUE_GREY};
`

const StyledLiveTrack = styled.div`
  margin-left: ${spacing.COMMON};
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
            {buildLocation(
              station.city,
              station.country
            )}
          </div>

          <StyledLiveInfo hasLiveInfo={!!liveStationInfo}>
            {liveStationInfo && liveStationInfo.current.isInactive && (
              <div>
                <StyledInactiveLabel>Station currently inactive</StyledInactiveLabel>
                <span>{liveStationInfo.current.inactiveStatus}</span>
              </div>
            )}

            {liveStationInfo && liveStationInfo.current.show && (
              <div>
                <StyledLiveShowLabel>Show</StyledLiveShowLabel>
                <span>{liveStationInfo.current.show}</span>
              </div>
            )}

            {liveStationInfo && liveStationInfo.current.track && (
              <StyledLiveTrack>
                <StyledLiveTrackLabel>Track</StyledLiveTrackLabel>
                <span>{liveStationInfo.current.track}</span>
              </StyledLiveTrack>
            )}
          </StyledLiveInfo>
        </StyledStationDetailsBottomRow>
      </StyledStationDetails>
    </StyledStationStickyHeader>
  </StyledStationHeader>
)

export default StationHeader
