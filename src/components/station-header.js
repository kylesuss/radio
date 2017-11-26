import React from 'react'
import styled, { css } from 'styled-components'
import StationProfileImage from 'components/station-profile-image'
import TimeInTimezone from 'components/time-in-timezone'
import PinIcon from 'react-icons/lib/md/place'
import ClockIcon from 'react-icons/lib/md/access-time'
import * as colors from 'styles/colors'
import * as fonts from 'styles/fonts'
import * as positioning from 'styles/positioning'
import * as spacing from 'styles/spacing'
import * as transitions from 'styles/transitions'
import buildLocation from 'utils/build-location'

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

const StyledStationMeta = styled.div`
  display: flex;
`

const StyledStationDetailsTopRow = styled.div`
  margin-bottom: .25rem;
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

const StyledStationInfoElement = styled.div`
  display: flex;
  align-items: center;
  line-height: 1rem;
  margin-left: ${spacing.HALF};

  &:first-child {
    margin-left: 0;
  }
`

const sharedIconStyled = css`
  color: ${colors.BLUE_GREY};
  margin-right: 4px;
`

const StyledPinIcon = styled(PinIcon)`
  ${sharedIconStyled}
  font-size: 18px;
`

const StyledClockIcon = styled(ClockIcon)`
  ${sharedIconStyled}
  font-size: 20px;
`

const StyledLiveInfo = styled.div`
  display: flex;
  align-items: center;
  opacity: ${props => props.hasLiveInfo ? '1' : '0'};
  transition: opacity ${transitions.LENGTH_COMMON_MS} ease-out;
`

const sharedLabelStyles = css`
  border-radius: 2px;
  color: #111;
  font-weight: ${fonts.WEIGHT_BOLD};
  text-transform: uppercase;
  font-size: 11px;
  padding: 2px 6px;
  margin-right: ${props => props.hasMessage ? '8px' : '0'};
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

const StationHeader = ({ station, liveStationInfo, playerHasError }) => {
  const hasInactiveStatus = liveStationInfo && liveStationInfo.current.isInactive
  const hasInactiveMessage = liveStationInfo && !!liveStationInfo.current.inactiveStatus
  const shouldShowInactiveMessage = playerHasError || hasInactiveStatus

  return (
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
            <StyledStationMeta>
              <StyledStationInfoElement>
                <StyledPinIcon />

                <span>
                  {buildLocation(
                    station.city,
                    station.country
                  )}
                </span>
              </StyledStationInfoElement>

              {station.timezone && (
                <StyledStationInfoElement>
                  <StyledClockIcon />

                  <TimeInTimezone timezone={station.timezone} />
                </StyledStationInfoElement>
              )}
            </StyledStationMeta>

            <StyledLiveInfo hasLiveInfo={shouldShowInactiveMessage || !!liveStationInfo}>
              {shouldShowInactiveMessage && (
                <div>
                  <StyledInactiveLabel hasMessage={hasInactiveMessage}>
                    Station currently inactive
                  </StyledInactiveLabel>

                  {hasInactiveMessage && (
                    <span>{liveStationInfo.current.inactiveStatus}</span>
                  )}
                </div>
              )}

              {liveStationInfo && liveStationInfo.current.show && (
                <div>
                  <StyledLiveShowLabel hasMessage>Show</StyledLiveShowLabel>
                  <span>{liveStationInfo.current.show}</span>
                </div>
              )}

              {liveStationInfo && liveStationInfo.current.track && (
                <StyledLiveTrack>
                  <StyledLiveTrackLabel hasMessage>Track</StyledLiveTrackLabel>
                  <span>{liveStationInfo.current.track}</span>
                </StyledLiveTrack>
              )}
            </StyledLiveInfo>
          </StyledStationDetailsBottomRow>
        </StyledStationDetails>
      </StyledStationStickyHeader>
    </StyledStationHeader>
  )
}

export default StationHeader
