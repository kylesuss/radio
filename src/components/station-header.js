import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { withRouter } from 'react-router-dom'
import TimeInTimezone from 'components/time-in-timezone'
import StationLiveInfo from 'components/station-live-info'
import Player from 'components/player'
import VideoPlayer from 'components/video-player'
import stationPropTypes from 'prop-types/station'
import StreamsTabs from 'components/streams-tabs'
import * as colors from 'styles/colors'
import * as easing from 'styles/easing'
import * as fonts from 'styles/fonts'
import * as spacing from 'styles/spacing'
import buildLocation from 'utils/build-location'

const StyledStationHeader = styled.header`
  height: 236px;
  display: flex;
  background: ${colors.BLUE_LIGHT};
  padding: ${spacing.DOUBLE};
  padding-bottom: calc(${spacing.DOUBLE} + ${spacing.HALF});
  position: relative;
  ${props => props.hasMultipleStreams && `
    padding-top: calc(${spacing.DOUBLE} + 30px);
  `}
`

const animateStationDetails = keyframes`
  0% {
    transform: translateX(-2rem);
    opacity: 0;
  }

  75% {
    transform: translateX(0);
  }

  100% {
    opacity: 1;
  }
`

const StyledStationDetails = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  animation: ${animateStationDetails} 750ms ${easing.EASE_OUT_QUINT};
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

const StationHeader = ({ station, match }) => {
  const hasMultipleStreams = station.streams.length > 1

  return (
    <StyledStationHeader hasMultipleStreams={hasMultipleStreams}>
      {hasMultipleStreams && (
        <StreamsTabs
          stationSlug={station.slug}
          streamNumber={match.params.streamNumber}
          streams={station.streams}
        />
      )}

      <StyledStationDetails key={station.name}>
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

        <StationLiveInfo
          station={station}
          streamNumber={match.params.streamNumber}
        />
      </StyledStationDetails>

      {station.video && (
        <VideoPlayer
          key={station.slug}
          name={station.name}
          video={station.video}
        />
      )}

      <Player
        station={station}
        streamNumber={match.params.streamNumber}
      />
    </StyledStationHeader>
  )
}

StationHeader.propTypes = {
  station: stationPropTypes,
  match: PropTypes.shape({
    params: PropTypes.shape({
      streamNumber: PropTypes.string
    }).isRequired
  }).isRequired
}

export default withRouter(StationHeader)
