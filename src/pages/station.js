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
      <div className="page--list">
        <div className="page--list__details">
          <StationList />
        </div>

        <div className="page--list__feed">
          <div>{this.props.station.name}</div>
          <button onClick={this.handleButtonClick}>
            Play
          </button>
          <TwitterFeed twitterHandle={this.props.station.twitterHandle} />
        </div>
      </div>
    )
  }
}
