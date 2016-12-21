import React, { Component, PropTypes } from 'react'
import TwitterFeed from 'components/twitter-feed'
import 'styles/pages/station'

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
      <div className="page--station">
        <div className="page--station__details">
          <div>{this.props.station.name}</div>
          <button onClick={this.handleButtonClick}>
            Play
          </button>
        </div>

        <div className="page--station__feed">
          <TwitterFeed twitterHandle={this.props.station.twitterHandle} />
        </div>
      </div>
    )
  }
}
