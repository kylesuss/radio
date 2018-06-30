import React, { Component } from 'react'
import styled from 'styled-components'
import StationDetails from 'components/station-details'
import TwitterFeed from 'components/twitter-feed'
import stationPropTypes from 'prop-types/station'
import StyledPage from 'styled/page'
import * as easing from 'styles/easing'
import * as spacing from 'styles/spacing'
import * as transitions from 'styles/transitions'

const StyledStationContent = styled.div`
  opacity: ${props => props.isVisible ? '1' : '0'};
  transform: translateY(${props => props.isVisible ? '0' : spacing.COMMON});
  transition:
    opacity ${props => props.isVisible ? '400ms' : transitions.LENGTH_COMMON_MS} ease-out,
    transform ${props => props.isVisible ? '550ms' : '0ms'} ${easing.EASE_OUT_QUINT} ${props => props.isVisible ? '0ms' : transitions.LENGTH_DOUBLE_MS};
`

class StationContent extends Component {
  state = {
    isShowingContent: false
  }

  constructor (props) {
    super(props)

    this.state = {
      socialStation: props.station,
      visibleStation: props.station
    }
  }

  componentWillReceiveProps (nextProps) {
    const { station } = this.props
    const isChangingStation = nextProps.station.slug !== station.slug

    if (!isChangingStation) { return }

    this.setState({
      isShowingContent: false,
      socialStation: nextProps.station
    })
  }

  showContent = () => this.setState({
    isShowingContent: true,
    visibleStation: this.props.station
  })

  render () {
    const { station } = this.props
    const { isShowingContent, visibleStation } = this.state

    return (
      <StyledStationContent isVisible={isShowingContent}>
        <StyledPage.Content>
          <StyledPage.Column>
            <TwitterFeed
              showContent={this.showContent}
              twitterHandle={station.twitterHandle}
            />
          </StyledPage.Column>

          <StyledPage.Column>
            <StationDetails station={visibleStation} />
          </StyledPage.Column>
        </StyledPage.Content>
      </StyledStationContent>
    )
  }
}

StationContent.propTypes = {
  station: stationPropTypes
}

export default StationContent
