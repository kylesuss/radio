import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import StationListItem from 'components/station-list-item'
import * as spacing from 'styles/spacing'
import * as colors from 'styles/colors'
import * as positioning from 'styles/positioning'
import Link from 'react-router/lib/Link'
import { buildStationPath } from 'constants/routes'

const StyledStationList = styled.div`
  position: absolute;
  top: 0;
  bottom: ${positioning.HEIGHT_PLAYER_PX};
  width: ${positioning.WIDTH_LEFT_COLUMN_PX};
  overflow-y: auto;
  -webkit-overflow-scrolling: touch
`

const StyledStationListBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: ${positioning.HEIGHT_PLAYER_PX};
  width: ${positioning.WIDTH_LEFT_COLUMN_PX};
  z-index: -3;
  background: ${colors.WHITE};
`

const StyledListItemLink = styled(Link)`
  display: flex;
  font-size: 14px;
  padding: ${spacing.HALF};
  text-decoration: none;

  &:active {
    transform: translateX(1px) translateY(1px);
  }
`

const StyledListItemText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
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
    stations: PropTypes.array.isRequired,
    handleOpenPreview: PropTypes.func.isRequired,
    handleClosePreview: PropTypes.func.isRequired,
    activePreviewStation: PropTypes.object
  }

  static defaultProps = {
    stations: []
  }

  isActiveStation = (slug) => slug === this.props.activeStation

  isPreviewingStation = (name) => {
    const { activePreviewStation } = this.props
    return activePreviewStation && name === activePreviewStation.name
  }

  handlePlayStation = (slug) => this.props.playStation(slug)

  handleClosePreview = () => this.props.handleClosePreview()

  render () {
    const { stations, handleOpenPreview } = this.props

    return (
      <div>
        <StyledStationList>
          <div>
            {
              stations.map((station) => {
                return (
                  <StationListItem
                    key={station.name}
                    isActive={this.isActiveStation(station.slug)}
                    isPreviewing={this.isPreviewingStation(station.name)}
                    station={station}
                    handleOpenPreview={handleOpenPreview}
                  >
                    <StyledListItemLink
                      to={buildStationPath(station.slug)}
                      onClick={this.handleClosePreview}
                    >
                      <div>
                        <StyledLogo src={station.logo} />
                      </div>
                      <StyledListItemText>
                        <div>
                          <StyledNameText>
                            {station.name}
                          </StyledNameText>
                        </div>
                      </StyledListItemText>
                    </StyledListItemLink>
                  </StationListItem>
                )
              })
            }
          </div>
        </StyledStationList>

        <StyledStationListBackground />
      </div>
    )
  }
}
