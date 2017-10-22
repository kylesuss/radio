import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { loadScript } from 'utils/async'
import * as animations from 'styles/animations'

const TWITTER_SCRIPT = '//platform.twitter.com/widgets.js'

const StyledContainer = styled.div`
  iframe {
    opacity: 0;
    animation: ${animations.fadeIn} 400ms ease-out forwards;
    animation-delay: 500ms;
  }
`

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

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.twitterHandle !== this.props.twitterHandle) {
      this.timelineEl.innerHTML = ''
      this.buildTimeline()
    }
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
    if (!window.twttr) { return }
    window.twttr.widgets.createTimeline(this.timelineOptions, this.timelineEl)
  }

  render () {
    return (
      <StyledContainer innerRef={(el) => this.timelineEl = el} />
    )
  }
}
