import React, { Component, PropTypes } from 'react'
import { buildStationPath } from 'constants/routes'

export default class Home extends Component {
  static propTypes = {
    stations: PropTypes.array.isRequired
  }

  static defaultProps = {
    stations: []
  }

  handleStationClick = (station) => {
    this.props.push(
      buildStationPath(station.slug)
    )
  }

  render () {
    return (
      <div>
        {
          this.props.stations.map((station) => {
            return (
              <div key={station.name}>
                <button onClick={() => this.handleStationClick(station)}>
                  {station.name}
                </button>
              </div>
            )
          })
        }
      </div>
    )
  }
}
