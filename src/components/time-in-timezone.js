import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'

const INTERVAL = 30000 // 30 seconds

class TimeInTimezone extends Component {
  static propTypes = {
    timezone: PropTypes.string.isRequired
  }

  componentDidMount () {
    this.updateTimeInterval = setInterval(() => this.forceUpdate(), INTERVAL)
  }

  componentWillUnmount () {
    clearInterval(this.updateTimeInterval)
    this.updateTimeInterval = null
  }

  render () {
    const { timezone } = this.props

    return (
      <span>
        {moment().tz(timezone).format('h:mm A')}
      </span>
    )
  }
}

export default TimeInTimezone
