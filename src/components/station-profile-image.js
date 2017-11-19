import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as positioning from 'styles/positioning'

const imageBottomOffset = positioning.HEIGHT_STATION_HEADER_IMAGE + positioning.HEIGHT_HEADER
const ProfileImageContainer = styled.div`
  width: 100%;
  height: ${positioning.HEIGHT_STATION_HEADER_IMAGE}px;
  overflow: hidden;
`

const ProfileImage = styled.img`
  width: 100%;
`

class StationProfileImage extends Component {
  static propTypes = {
    station: PropTypes.object.isRequired
  }

  state = {
    offsetPercentage: 0
  }

  componentDidMount () {
    this.scrollListener = window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.scrollListener)
    window.cancelAnimationFrame(this.animationFrame)
  }

  get yTransform () {
    const { offsetPercentage } = this.state
    return positioning.HEIGHT_STATION_HEADER_IMAGE / 2 + (offsetPercentage * 30)
  }

  get transformStyle () {
    return `translate3d(0, calc(-50% + ${this.yTransform}px), 0)`
  }

  handleScroll = () => {
    const scrollTop = document.body.scrollTop

    this.animationFrame = window.requestAnimationFrame(() => this.setState({
      offsetPercentage: scrollTop > 0
        ? Math.min(scrollTop / imageBottomOffset, 100)
        : 0
    }))
  }

  render () {
    const { station } = this.props

    return (
      <ProfileImageContainer>
        <ProfileImage
          src={station.profileImage}
          style={{ transform: this.transformStyle }}
        />
      </ProfileImageContainer>
    )
  }
}

export default StationProfileImage
