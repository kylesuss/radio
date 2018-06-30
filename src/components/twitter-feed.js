import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { loadScript } from 'utils/async'
import * as colors from 'styles/colors'
import * as transitions from 'styles/transitions'

const TWITTER_SCRIPT = '//platform.twitter.com/widgets.js'
const TWEET_LIMIT = 1

class TwitterFeed extends Component {
  componentDidMount () {
    const { showContent } = this.props

    if (window.twttr) {
      this.buildTimeline()
    } else {
      loadScript(TWITTER_SCRIPT)
        .then(() => {
          window.twttr.events.bind('rendered', showContent)
          this.buildTimeline()
        })
        .catch((error) => { console.log(error) })
    }
  }

  componentWillReceiveProps (nextProps) {
    const { twitterHandle } = this.props
    const isChangingHandle = nextProps.twitterHandle !== twitterHandle

    if (!isChangingHandle) { return }

    clearTimeout(this.buildTimelineTimeout)
    this.buildTimelineTimeout = setTimeout(() => {
      this.timelineEl.innerHTML = ''
      this.buildTimeline()
    }, transitions.LENGTH_DOUBLE)
  }

  componentWillUnmount () {
    clearTimeout(this.buildTimelineTimeout)
    this.buildTimelineTimeout = null
    this.timelineEl = null
  }

  get timelineDataSource () {
    return {
      sourceType: 'profile',
      screenName: this.props.twitterHandle
    }
  }

  get timelineOptions () {
    return {
      tweetLimit: TWEET_LIMIT,
      linkColor: colors.BLUE_PRIMARY,
      chrome: 'noheader nofooter noborders'
    }
  }

  buildTimeline = () => {
    const { twitterHandle } = this.props
    if (!window.twttr || !twitterHandle) { return }

    window.twttr.widgets.createTimeline(
      this.timelineDataSource,
      this.timelineEl,
      this.timelineOptions
    )
  }

  render () {
    return (
      <div ref={(el) => this.timelineEl = el}></div>
    )
  }
}

TwitterFeed.propTypes = {
  showContent: PropTypes.func.isRequired,
  twitterHandle: PropTypes.string
}

export default TwitterFeed
