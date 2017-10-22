import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as spacing from 'styles/spacing'
import * as colors from 'styles/colors'
import Link from 'react-router/lib/Link'
import StationListHeader from 'components/station-list-header'
import buildLocation from 'utils/build-location'
import { buildStationPath } from 'constants/routes'
import StyledPage from 'styled/page'

const StyledStationList = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;
`

const StyledListItem = styled.div`
  background: #f1f1f1;
`

const StyledListItemLink = styled(Link)`
  display: flex;
  font-size: 18px;
  padding: ${spacing.COMMON};
  text-decoration: none;

  &:active {
    transform: translateX(1px) translateY(1px);
  }

  &:hover {
    background: #f7f7f7;
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
  text-decoration: none;
  border-bottom: 2px solid ${colors.BLUE};
  transition: border 250ms ease-out;

  .station-list__item__link:hover & {
    border-bottom: 2px solid ${colors.PURPLE};
  }
`

const StyledLogo = styled.img`
  width: 70px;
  border-radius: 5px;
  margin-right: 1.2rem;
`

const StyledLocationText = styled.div`
  color: ${colors.BLUE_GREY};
  text-transform: uppercase;
  font-size: 13px;
  margin-top: .5rem;
`

export default class StationList extends Component {
  static propTypes = {
    stations: PropTypes.array.isRequired
  }

  static defaultProps = {
    stations: []
  }

  render () {
    const { stations } = this.props

    return (
      <StyledStationList>
        <StationListHeader />

        <StyledPage.ListPageScrollable>
          {
            stations.map((station) => {
              return (
                <StyledListItem key={station.name}>
                  <StyledListItemLink to={buildStationPath(station.slug)}>
                    <div>
                      <StyledLogo src={station.logo} />
                    </div>
                    <StyledListItemText>
                      <div>
                        <StyledNameText>
                          {station.name}
                        </StyledNameText>
                      </div>

                      <StyledLocationText>
                        {
                          buildLocation(
                            station.city,
                            station.country
                          )
                        }
                      </StyledLocationText>
                    </StyledListItemText>
                  </StyledListItemLink>
                </StyledListItem>
              )
            })
          }
        </StyledPage.ListPageScrollable>
      </StyledStationList>
    )
  }
}
