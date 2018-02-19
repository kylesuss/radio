import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import animateScrollTo from 'animated-scroll-to'
import { playStation } from 'actions/player'
import StationHeader from 'components/station-header'
import TwitterFeed from 'components/twitter-feed'
import VideoPlayer from 'containers/video-player'
import { findStationBySlug } from 'selectors/station'
import StyledPage from 'styled/page'
import * as spacing from 'styles/spacing'

const StyledStation = styled.div`
  width: 100%;
  padding-top: calc(50vh - 130px);
`

const StyledRightColumn = styled(StyledPage.Column)`
  margin-top: -${spacing.COMMON};
`

const scrollOptions = {
  speed: 400
}

class Station extends Component {
  static propTypes = {
    station: PropTypes.object.isRequired,
    playStation: PropTypes.func.isRequired,
    activeStation: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      activeStation: props.station
    }
  }

  componentDidMount () {
    this.playStation()
    animateScrollTo(0, scrollOptions)
  }

  componentDidUpdate (prevProps) {
    const { station } = this.props

    if (station.slug !== prevProps.station.slug) {
      animateScrollTo(0, {
        ...scrollOptions,
        onComplete: () => this.handleScrollCompletion(station)
      })
    }
  }

  playStation = () => {
    const { playStation } = this.props
    const { activeStation } = this.state

    playStation(activeStation.slug)
  }

  handleScrollCompletion = (station) => {
    const { station: { name } } = this.props

    if (name !== station.name) { return }

    this.setState({
      activeStation: station
    }, () => this.playStation())
  }

  render () {
    const { activeStation } = this.state

    return (
      <StyledStation>
        <StationHeader station={activeStation} />

        <StyledPage.Content>
          <StyledPage.Column>
            <TwitterFeed twitterHandle={activeStation.twitterHandle} />
          </StyledPage.Column>

          <StyledRightColumn>
            {activeStation.video && (
              <VideoPlayer
                name={activeStation.name}
                video={activeStation.video}
              />
            )}
          </StyledRightColumn>
        </StyledPage.Content>
      </StyledStation>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { slug } = ownProps.params

  return {
    station: findStationBySlug(state.stations.items, slug),
    activeStation: state.player.activeStation
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    playStation: (args) => dispatch(playStation(args))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Station)
