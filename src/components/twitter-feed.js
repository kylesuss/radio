import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { loadScript } from 'utils/async'
import * as colors from 'styles/colors'
import * as transitions from 'styles/transitions'

const TWITTER_SCRIPT = '//platform.twitter.com/widgets.js'
const TWEET_LIMIT = 1

const StyledContainer = styled.div`
  opacity: ${props => props.isShowingFeed ? '1' : '0'};
  transition: opacity ${props => props.isShowingFeed ? transitions.LENGTH_DOUBLE_MS : transitions.LENGTH_COMMON_MS} ease-out;
`

export default class TwitterFeed extends Component {
  static propTypes = {
    twitterHandle: PropTypes.string
  }

  state = {
    isShowingFeed: false
  }

  componentDidMount () {
    if (window.twttr) {
      this.buildTimeline()
    } else {
      loadScript(TWITTER_SCRIPT)
        .then(() => {
          window.twttr.events.bind('rendered', this.showFeed)
          this.buildTimeline()
        })
        .catch((error) => { console.log(error) })
    }
  }

  componentWillReceiveProps (nextProps) {
    const { twitterHandle } = this.props
    const isChangingHandle = nextProps.twitterHandle !== twitterHandle

    if (isChangingHandle) {
      this.hideFeed()

      clearTimeout(this.buildTimelineTimeout)
      this.buildTimelineTimeout = setTimeout(() => {
        this.timelineEl.innerHTML = ''
        this.buildTimeline()
      }, transitions.LENGTH_DOUBLE)
    }
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
      linkColor: colors.PRIMARY_BLUE,
      chrome: 'noheader nofooter noborders'
    }
  }

  hideFeed = () => this.setState({ isShowingFeed: false })

  showFeed = () => this.setState({ isShowingFeed: true })

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
    const { isShowingFeed } = this.state

    return (
      <StyledContainer isShowingFeed={isShowingFeed}>
        <div ref={(el) => this.timelineEl = el}></div>
      </StyledContainer>
    )
  }
}
