import { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'

const INTERVAL = 30000 // 30 seconds

class TimeInTimezone extends Component {
  componentDidMount () {
    this.updateTimeInterval = setInterval(() => this.forceUpdate(), INTERVAL)
  }

  componentWillUnmount () {
    clearInterval(this.updateTimeInterval)
    this.updateTimeInterval = null
  }

  render () {
    const { children, timezone } = this.props
    const time = moment().tz(timezone).format('h:mm A')

    return children(time)
  }
}

TimeInTimezone.propTypes = {
  children: PropTypes.any.isRequired,
  timezone: PropTypes.string.isRequired
}

export default TimeInTimezone
