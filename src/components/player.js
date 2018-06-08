import React, { Component, createElement } from 'react'
import { compose } from 'redux'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import StyledPlayer from 'styled/player'
import StyledButton from 'styled/button'
import * as colors from 'styles/colors'
import isNil from 'lodash/isNil'
import PlayIcon from 'react-icons/lib/md/play-arrow'
import PauseIcon from 'react-icons/lib/md/pause'
import { togglePlayState, playStation } from 'actions/player'
import { buildStationPath } from 'constants/routes'
import PlayerLoadingIcon from 'components/player-loading-icon'
import AudioPlayer from 'components/audio-player'
import stationPropTypes from 'prop-types/station'
import {
  findPrevStationBySlug,
  findNextStationBySlug
} from 'selectors/station'
import * as transitions from 'styles/transitions'

const StyledSeekButton = styled(StyledButton)`
  color: ${colors.WHITE};
  background: ${colors.BLACK};
  transition: background ${transitions.LENGTH_COMMON_MS} ease-out;
  box-shadow: 1px 1px 10px #ccc;
  width: 32px;
  height: 32px;

  &:hover {
    background: ${colors.BLACK_HOVER};
  }
`

const StyledReversePlayIcon = styled(PlayIcon)`
  transform: scaleX(-1);
`

const uniqueStreamUrl = (url) => `${url}?t=${Date.now()}`

class Player extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoadingAudioSrc: true,
      streamUrl: uniqueStreamUrl(props.station.streamUrl)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { isPlaying, station } = this.props
    const isChangingStations = nextProps.station.slug !== station.slug
    const isStartingToPlay = nextProps.isPlaying && !isPlaying
    const isStartingToPause = !nextProps.isPlaying && isPlaying
    const stateUpdates = {}

    if (isChangingStations || isStartingToPlay) {
      stateUpdates.streamUrl = uniqueStreamUrl(nextProps.station.streamUrl)
      stateUpdates.isLoadingAudioSrc = true
    }

    if (isStartingToPause) {
      stateUpdates.streamUrl = null
      stateUpdates.isLoadingAudioSrc = false
    }

    Object.keys(stateUpdates).length && this.setState(stateUpdates)
  }

  get isPaused () {
    const { station, isPlaying } = this.props
    return !isNil(station) && !isPlaying
  }

  get stationPath () {
    return buildStationPath(this.props.station.slug)
  }

  get playStateIcon () {
    const { isPlaying } = this.props
    const { isLoadingAudioSrc } = this.state

    if (isLoadingAudioSrc) {
      return createElement(PlayerLoadingIcon)
    }

    return isPlaying
      ? createElement(PauseIcon)
      : createElement(PlayIcon)
  }

  playStation = (slug) => {
    const { router, playStation } = this.props

    playStation(slug)
    router.push(`/${slug}`)
  }

  handleTogglePlayState = () => this.props.togglePlayState()

  handleNextClick = () => this.playStation(this.props.nextStation.slug)

  handlePrevClick = () => this.playStation(this.props.prevStation.slug)

  handleSoundPlaying = () => this.setState({ isLoadingAudioSrc: false })

  render () {
    const { station, isPlaying, videoHasActiveAudio } = this.props
    const { isLoadingAudioSrc, streamUrl } = this.state

    return (
      <StyledPlayer.Container>
        <StyledPlayer.Inner>
          {station && (
            <StyledPlayer.StationContainer>
              {streamUrl && (
                <AudioPlayer
                  handleSoundPlaying={this.handleSoundPlaying}
                  handleSoundError={this.handleTogglePlayState}
                  isPaused={this.isPaused}
                  playerIsPlaying={isPlaying}
                  streamUrl={streamUrl}
                />
              )}

              <StyledPlayer.Controls>
                <StyledPlayer.PrevControls>
                  <StyledSeekButton onClick={this.handlePrevClick}>
                    <StyledReversePlayIcon />
                  </StyledSeekButton>
                </StyledPlayer.PrevControls>

                <StyledPlayer.PlayStateControls>
                  <StyledPlayer.PlayStateButton
                    onClick={this.handleTogglePlayState}
                    disabled={isLoadingAudioSrc && !videoHasActiveAudio}
                  >
                    <StyledPlayer.PlayStateInner
                      isLoading={isLoadingAudioSrc && !videoHasActiveAudio}
                    >
                      {this.playStateIcon}
                    </StyledPlayer.PlayStateInner>
                  </StyledPlayer.PlayStateButton>
                </StyledPlayer.PlayStateControls>

                <StyledPlayer.NextControls>
                  <StyledSeekButton onClick={this.handleNextClick}>
                    <PlayIcon />
                  </StyledSeekButton>
                </StyledPlayer.NextControls>
              </StyledPlayer.Controls>
            </StyledPlayer.StationContainer>
          )}
        </StyledPlayer.Inner>
      </StyledPlayer.Container>
    )
  }
}

Player.propTypes = {
  station: stationPropTypes,
  isPlaying: PropTypes.bool.isRequired,
  togglePlayState: PropTypes.func.isRequired,
  playStation: PropTypes.func.isRequired,
  prevStation: stationPropTypes,
  nextStation: stationPropTypes,
  videoHasActiveAudio: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  const { stations, player } = state

  return {
    isPlaying: state.player.isPlaying,
    prevStation: findPrevStationBySlug(stations.items, player.activeStationSlug),
    nextStation: findNextStationBySlug(stations.items, player.activeStationSlug),
    videoHasActiveAudio: state.video.hasActiveAudio
  }
}

const mapDispatchToProps = (dispatch) => ({
  togglePlayState: () => dispatch(togglePlayState()),
  playStation: (args) => dispatch(playStation(args))
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Player)
