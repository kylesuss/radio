import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ArrowIcon from 'react-icons/lib/md/play-arrow'
import * as colors from 'styles/colors'
import * as easing from 'styles/easing'
import * as spacing from 'styles/spacing'
import * as positioning from 'styles/positioning'
import * as transitions from 'styles/transitions'
import Link from 'react-router/lib/Link'
import { buildStationPath } from 'constants/routes'

const StyledStationList = styled.div`
  position: absolute;
  top: 0;
  bottom: ${positioning.HEIGHT_PLAYER_PX};
  width: ${positioning.WIDTH_LEFT_COLUMN_PX};
  background: ${colors.PURE_WHITE};
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
  font-size: 14px;
  padding: ${spacing.HALF};
  text-decoration: none;
  transition: background ${transitions.LENGTH_COMMON_MS} ease-out;
  background: ${props => props.isActive ? colors.LIGHT_GREY : 'transparent'};
  overflow: hidden;

  &:hover {
    background: ${colors.LIGHT_GREY};
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
  color: ${colors.BLACK};
  opacity: .25;
  width: 14px;
  height: 14px;
`

const StyledNameText = styled.div`
  display: inline-block;
  color: ${colors.BLACK};
`

const StyledLogo = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: ${spacing.HALF};
`

export default class StationList extends Component {
  static propTypes = {
    activeStation: PropTypes.string.isRequired,
    stations: PropTypes.array.isRequired
  }

  static defaultProps = {
    stations: []
  }

  isActiveStation = (slug) => slug === this.props.activeStation

  handlePlayStation = (slug) => this.props.playStation(slug)

  render () {
    const { stations } = this.props

    return (
      <StyledStationList>
        <div>
          {
            stations.map((station) => {
              return (
                <StyledListItemLink
                  key={station.name}
                  isActive={this.isActiveStation(station.slug)}
                  to={buildStationPath(station.slug)}
                >
                  <StyledLogoWrapper>
                    <StyledLogo src={station.logo} />
                  </StyledLogoWrapper>
                  <StyledListItemText>
                    <div>
                      <StyledNameText>
                        {station.name}
                      </StyledNameText>
                    </div>
                  </StyledListItemText>

                  <StyledArrowIcon
                    isActive={this.isActiveStation(station.slug)}
                  />
                </StyledListItemLink>
              )
            })
          }
        </div>
      </StyledStationList>
    )
  }
}
