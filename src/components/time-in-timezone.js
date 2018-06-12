import { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'

const UPDATE_INTERVAL = 30000 // 30 seconds

class TimeInTimezone extends Component {
  componentDidMount () {
    this.updateTimeInterval = setInterval(() => this.forceUpdate(), UPDATE_INTERVAL)
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
  children: PropTypes.func.isRequired,
  timezone: PropTypes.string.isRequired
}

export {
  UPDATE_INTERVAL
}

export default TimeInTimezone
