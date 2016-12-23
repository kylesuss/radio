import React, { Component, PropTypes } from 'react'
import Link from 'react-router/lib/Link'
import StationListHeader from 'containers/station-list-header'
import buildLocation from 'utils/build-location'
import { buildStationPath } from 'constants/routes'
import 'styles/pages/home'

export default class Home extends Component {
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

        <div className="station-list__items">
          {
            this.props.stations.map((station) => {
              return (
                <div className="station-list__item" key={station.name}>
                  <Link className="station-list__item__link"
                        to={buildStationPath(station.slug)}>
                    <div className="flex font-size-18">
                      <div className="flex-grow-1">
                        {station.name}
                      </div>
                      <div className="flex-grow-1 text-right">
                        {
                          buildLocation(
                            station.city,
                            station.country
                          )
                        }
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
