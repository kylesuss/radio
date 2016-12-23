import React, { Component } from 'react'
import StationList from 'containers/station-list'
import 'styles/pages/common'

export default class Home extends Component {
  render () {
    return (
      <div className="page--list">
        <div className="page--list__details">
          <StationList />
        </div>

        <div className="page--list__feed"></div>
      </div>
    )
  }
}
