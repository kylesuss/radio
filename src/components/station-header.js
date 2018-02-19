import React from 'react'
import styled, { css } from 'styled-components'
import TimeInTimezone from 'components/time-in-timezone'
import PinIcon from 'react-icons/lib/md/place'
import ClockIcon from 'react-icons/lib/md/access-time'
import * as colors from 'styles/colors'
import * as fonts from 'styles/fonts'
import * as positioning from 'styles/positioning'
import * as spacing from 'styles/spacing'
import buildLocation from 'utils/build-location'

const StyledStationHeader = styled.header`
  position: sticky;
  top: -244px;
  z-index: 1;
`

const StyledStationStickyHeader = styled.div`
  background: ${colors.PURE_BLACK};
  height: ${positioning.HEIGHT_STICKY_STATION_HEADER_PX};
  display: flex;
`

const StyledStationDetails = styled.div`
  height: ${positioning.HEIGHT_STICKY_STATION_HEADER_PX};
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`

const StyledStationMeta = styled.div`
  display: flex;
`

const StyledStationDetailsTopRow = styled.div`
  color: ${colors.WHITE};
  text-transform: uppercase;
  font-style: italic;
  font-size: 13px;
`

const StyledStationDetailsBottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: .85rem;
  color: ${colors.LIGHT_GREY};
  margin-top: 14px;
`

const StyledStationName = styled.div`
  color: #111;
  font-family: ${fonts.SECONDARY};
  font-weight: ${fonts.WEIGHT_BOLD};
  font-style: italic;
  background: ${colors.PURE_WHITE};
  text-transform: uppercase;
  font-size: 36px;
  line-height: 36px;
  padding: 6px 17px;
  padding-right: 23px;
  margin-right: ${props => props.hasMessage ? '8px' : '0'};
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

const StationHeader = ({ station }) => {
  return (
    <StyledStationHeader>
      <StyledStationStickyHeader>
        <StyledStationDetails>
          <StyledStationDetailsTopRow>
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
          </StyledStationDetailsTopRow>

          <StyledStationDetailsBottomRow>
            <StyledStationName>
              {station.name}
            </StyledStationName>
          </StyledStationDetailsBottomRow>
        </StyledStationDetails>
      </StyledStationStickyHeader>
    </StyledStationHeader>
  )
}

export default StationHeader
