import React, { Component, PropTypes } from 'react'

export default class Station extends Component {
  static propTypes = {
    station: PropTypes.object.isRequired
  };

  render () {
    return (
      <div>{this.props.station.name}</div>
    )
  }
}
