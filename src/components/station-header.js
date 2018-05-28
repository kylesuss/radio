import React from 'react'
import styled from 'styled-components'
import TimeInTimezone from 'components/time-in-timezone'
import StationLiveInfo from 'components/station-live-info'
import Player from 'components/player'
import VideoPlayer from 'components/video-player'
import * as colors from 'styles/colors'
import * as fonts from 'styles/fonts'
import * as spacing from 'styles/spacing'
import buildLocation from 'utils/build-location'

const StyledStationHeader = styled.header`
  height: 230px;
  background: ${colors.LIGHT_BLUE_BG};
  padding: ${spacing.DOUBLE};
  position: relative;
`

const StyledStationDetails = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`

const StyledStationMeta = styled.div`
  display: flex;
  font-size: .85rem;
  color: ${colors.BLUE_GREY};
  margin-top: ${spacing.HALF};
`

const StyledStationName = styled.div`
  color: #111;
  font-family: ${fonts.SECONDARY};
  font-weight: ${fonts.WEIGHT_BOLD};
  font-style: italic;
  text-transform: uppercase;
  font-size: 36px;
  line-height: 36px;
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

const StationHeader = ({ station }) => {
  return (
    <StyledStationHeader>
      <StyledStationDetails>
        <StyledStationName>
          {station.name}
        </StyledStationName>

        <StyledStationMeta>
          <StyledStationInfoElement>
            {buildLocation(
              station.city,
              station.country
            )}
          </StyledStationInfoElement>

          {station.timezone && (
            <StyledStationInfoElement>
              <TimeInTimezone timezone={station.timezone}>
                {(time) => time}
              </TimeInTimezone>
            </StyledStationInfoElement>
          )}
        </StyledStationMeta>

        <StationLiveInfo station={station} />
      </StyledStationDetails>

      {station.video && (
        <VideoPlayer
          name={station.name}
          video={station.video}
        />
      )}

      <Player />
    </StyledStationHeader>
  )
}

export default StationHeader
