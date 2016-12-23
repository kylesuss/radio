import React, { Component, PropTypes } from 'react'
import { loadScript } from 'utils/async'

const TWITTER_SCRIPT = '//platform.twitter.com/widgets.js'

export default class TwitterFeed extends Component {
  static propTypes = {
    twitterHandle: PropTypes.string.isRequired
  }

  componentDidMount () {
    if (window.twttr) {
      this.buildTimeline()
    } else {
      loadScript(TWITTER_SCRIPT)
        .then(this.buildTimeline)
        .catch((error) => { console.log(error) })
    }
  }

  componentDidUpdate () {
    this.timelineEl.innerHTML = ''
    this.buildTimeline()
  }

  componentWillUnmount () {
    this.timelineEl = null
  }

  get timelineOptions () {
    return {
      sourceType: 'profile',
      screenName: this.props.twitterHandle
    }
  }

  buildTimeline = () => {
    console.log('buildTimeline')
    if (!window.twttr) { return }
    window.twttr.widgets.createTimeline(this.timelineOptions, this.timelineEl)
  }

  render () {
    return (
      <div ref={(el) => this.timelineEl = el}></div>
    )
  }
}
