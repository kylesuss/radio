import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import ArrowIcon from 'react-icons/lib/md/play-arrow'
import stationPropTypes from 'prop-types/station'
import * as colors from 'styles/colors'
import * as easing from 'styles/easing'
import * as spacing from 'styles/spacing'
import * as positioning from 'styles/positioning'
import * as transitions from 'styles/transitions'
import Link from 'react-router/lib/Link'
import { buildStationPath } from 'constants/routes'

const greyBackground = '#222'

const StyledStationList = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  bottom: ${positioning.HEIGHT_PLAYER_PX};
  width: ${positioning.WIDTH_LEFT_COLUMN_PX};
  overflow-y: auto;
  -webkit-overflow-scrolling: touch
`

const StyledListItemText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
`

const StyledLogoWrapper = styled.div`
  display: flex;
`

const StyledListItemLink = styled(({
  isActive, ...rest
}) => <Link {...rest} />)`
  position: relative;
  display: flex;
  font-size: 13px;
  padding: ${spacing.HALF};
  text-decoration: none;
  transition: background ${transitions.LENGTH_COMMON_MS} ease-out;
  background: ${props => props.isActive ? greyBackground : 'transparent'};
  overflow: hidden;

  &:hover {
    background: ${greyBackground};
  }

  &:active > ${StyledLogoWrapper},
  &:active > ${StyledListItemText} {
    transform: translateX(1px) translateY(1px);
  }
`

const StyledArrowIcon = styled(({
  isActive, ...rest
}) => <ArrowIcon {...rest} />)`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateX(${props => props.isActive ? '0' : '24px'}) translateY(-50%) scale(1);
  transition: transform ${transitions.LENGTH_COMMON_MS} ${easing.EASE_OUT_QUINT};
  color: ${colors.WHITE};
  opacity: 1;
  width: 14px;
  height: 14px;
`

const StyledNameText = styled.div`
  display: inline-block;
  color: ${colors.BLACK};
  color: ${colors.BLUE_GREY};
`

const StationList = ({ activeStationSlug, stations }) => (
  <StyledStationList>
    {stations.map((station) => {
      const isActiveStation = station.slug === activeStationSlug

      return (
        <StyledListItemLink
          key={station.name}
          isActive={isActiveStation}
          to={buildStationPath(station.slug)}
        >
          <StyledListItemText>
            <StyledNameText>
              {station.name}
            </StyledNameText>
          </StyledListItemText>

          <StyledArrowIcon isActive={isActiveStation} />
        </StyledListItemLink>
      )
    })}
  </StyledStationList>
)

StationList.propTypes = {
  activeStationSlug: PropTypes.string,
  stations: PropTypes.arrayOf(stationPropTypes)
}

StationList.defaultProps = {
  stations: []
}

const mapStateToProps = (state) => ({
  stations: state.stations.items,
  activeStationSlug: state.player.activeStationSlug
})

export default connect(mapStateToProps)(StationList)
