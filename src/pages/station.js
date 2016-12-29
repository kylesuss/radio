import React, { Component, PropTypes } from 'react'
import StationList from 'containers/station-list'
import TwitterFeed from 'components/twitter-feed'
import 'styles/pages/common'

export default class Station extends Component {
  static propTypes = {
    station: PropTypes.object.isRequired,
    playStation: PropTypes.func.isRequired
  };

  handleButtonClick = () => {
    const { playStation, station } = this.props
    playStation(station.slug)
  }

  render () {
    return (
      <div className="page--list m-r-1__5">
        <div className="page--list__details">
          <StationList />
        </div>

        <div className="page--list__feed">
          <div className="relative overflow-hidden full-height">
            <div className="page--list__header flex">
              <div className="flex-grow-1 font-primary text-uppercase color-white">
                {this.props.station.name}
              </div>
              <button onClick={this.handleButtonClick}>
                Play
              </button>
            </div>

            <div className="page--list__scrollable p-1__5">
              <TwitterFeed twitterHandle={this.props.station.twitterHandle} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
