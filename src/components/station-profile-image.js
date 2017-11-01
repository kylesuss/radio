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
  transform: translate3d(0, calc(-50% + ${props => positioning.HEIGHT_STATION_HEADER_IMAGE / 2 + (props.offsetPercentage * 30)}px), 0);
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
    const { offsetPercentage } = this.state

    return (
      <ProfileImageContainer>
        <ProfileImage
          src={station.profileImage}
          offsetPercentage={offsetPercentage}
        />
      </ProfileImageContainer>
    )
  }
}

export default StationProfileImage
