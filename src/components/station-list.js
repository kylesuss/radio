import React, { Component, PropTypes } from 'react'
import Link from 'react-router/lib/Link'
import StationListHeader from 'containers/station-list-header'
import buildLocation from 'utils/build-location'
import { buildStationPath } from 'constants/routes'
import 'styles/station-list'

export default class StationList extends Component {
  static propTypes = {
    stations: PropTypes.array.isRequired
  }

  static defaultProps = {
    stations: []
  }

  render () {
    return (
      <div className="station-list relative overflow-hidden full-height">
        <StationListHeader />

        <div className="page--list__scrollable">
          {
            this.props.stations.map((station) => {
              return (
                <div className="station-list__item" key={station.name}>
                  <Link className="station-list__item__link"
                        to={buildStationPath(station.slug)}>
                    <div className="flex font-size-18">
                      <div>
                        <img className="station-list__item__logo m-r-1__2"
                             src={station.logo} />
                      </div>
                      <div className="flex flex-direction-column
                                      flex-justify-center flex-grow-1">
                        <div>
                          <span className="station-list__item__name">
                            {station.name}
                          </span>
                        </div>
                        <div className="color-blue-grey text-uppercase
                                        font-size-13 m-t-0__5">
                          {
                            buildLocation(
                              station.city,
                              station.country
                            )
                          }
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
