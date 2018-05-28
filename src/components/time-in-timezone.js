import { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'

const INTERVAL = 30000 // 30 seconds

class TimeInTimezone extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
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
    const { children, timezone } = this.props
    const time = moment().tz(timezone).format('h:mm A')

    return children(time)
  }
}

export default TimeInTimezone
