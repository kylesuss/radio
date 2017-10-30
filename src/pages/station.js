import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TwitterFeed from 'components/twitter-feed'
import PlayIcon from 'react-icons/lib/md/play-arrow'
import PauseIcon from 'react-icons/lib/md/pause'
import StyledPage from 'styled/page'
import StyledPlayer from 'styled/player'

const PlayControls = styled.div`
  width: 30px;
  height: 30px;
  margin-left: .8rem;
`

export default class Station extends Component {
  static propTypes = {
    station: PropTypes.object.isRequired,
    playStation: PropTypes.func.isRequired,
    playerIsPlaying: PropTypes.bool.isRequired,
    activeStation: PropTypes.string.isRequired,
    togglePlayState: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.playStation()
  }

  componentDidUpdate (prevProps) {
    const { station: { slug } } = this.props

    if (slug !== prevProps.station.slug) {
      this.playStation()
    }
  }

  playStation = () => {
    const { playStation, station } = this.props
    playStation(station.slug)
  }

  handleButtonClick = () => this.playStation()

  handlePlayToggleClick = () => {
    const { playStation, togglePlayState, station } = this.props

    if (this.isActiveStation) {
      togglePlayState()
    } else {
      playStation(station.slug)
    }
  }

  get isActiveStation () {
    return this.props.station.slug === this.props.activeStation
  }

  render () {
    const { playerIsPlaying, station } = this.props

    return (
      <StyledPage.Container>
        <StyledPage.Column>
          <StyledPage.ListHeader>
            <StyledPage.ListHeaderText>
              {station.name}
            </StyledPage.ListHeaderText>

            <PlayControls>
              <StyledPlayer.PlayStateButton
                onClick={this.handlePlayToggleClick}
              >
                <StyledPlayer.PlayStateInner>
                  {
                    playerIsPlaying && this.isActiveStation
                      ? <PauseIcon />
                      : <PlayIcon />
                  }
                </StyledPlayer.PlayStateInner>
              </StyledPlayer.PlayStateButton>
            </PlayControls>
          </StyledPage.ListHeader>

          <TwitterFeed twitterHandle={station.twitterHandle} />
        </StyledPage.Column>
      </StyledPage.Container>
    )
  }
}
