import React, { Component, PropTypes } from 'react'

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
      <div>
        <div>{this.props.station.name}</div>
        <button onClick={this.handleButtonClick}>
          Play
        </button>
      </div>
    )
  }
}
