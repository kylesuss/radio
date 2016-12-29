import React, { Component } from 'react'
import StationList from 'containers/station-list'
import 'styles/pages/common'

export default class Home extends Component {
  render () {
    return (
      <div className="page--list m-r-1__5">
        <div className="page--list__details">
          <StationList />
        </div>

        <div className="page--list__details">
          <div className="page--list__feed"></div>
        </div>
      </div>
    )
  }
}
