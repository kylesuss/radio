import React, { Component, createElement } from 'react'
import styled, { keyframes } from 'styled-components'
import { compose } from 'redux'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PlayIcon from 'react-icons/lib/md/play-arrow'
import PauseIcon from 'react-icons/lib/md/pause'
import { togglePlayState, playStation } from 'actions/player'
import AudioPlayer from 'components/audio-player'
import PlayerLoadingIcon from 'components/player-loading-icon'
import { DEFAULT_STREAM_NUMBER } from 'constants/player'
import { buildStationPath } from 'constants/routes'
import stationPropTypes from 'prop-types/station'
import { findPrevStationBySlug, findNextStationBySlug } from 'selectors/station'
import StyledButton from 'styled/button'
import * as colors from 'styles/colors'
import * as spacing from 'styles/spacing'
import * as transitions from 'styles/transitions'

const StyledPlayer = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  transform: translateY(50%);
`

const StyledControls = styled.div`
  display: flex;
  align-items: center;
`

const buttonActiveTransform = `
  transform: translateX(1px) translateY(1px);
`

const StyledSeekButton = styled(StyledButton)`
  font-size: 20px;
  width: 32px;
  height: 32px;
  color: ${colors.WHITE};
  background: ${colors.BLACK};
  transition: background ${transitions.LENGTH_COMMON_MS} ease-out;
  box-shadow: 1px 1px 10px ${colors.SHADOW};

  &:hover {
    background: ${colors.BLACK_HOVER};
  }

  &:active {
    ${buttonActiveTransform}
  }
`

const StyledReversePlayIcon = styled(PlayIcon)`
  transform: scaleX(-1);
`

const animatePlayStateLoading = keyframes`
  from {
    transform: scale3d(.8, .8, 1);
    opacity: 0.4;
  }

  to {
    transform: scale3d(1.5, 1.5, 1);
    opacity: 0;
  }
`

const StyledPlayStateButton = styled(StyledButton)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${props => props.isLoading ? 'default' : 'pointer'};
  width: 46px;
  height: 46px;
  font-size: 28px;
  margin: 0 ${spacing.HALF};
  color: ${colors.WHITE};
  background: ${colors.BLUE_PRIMARY};
  box-shadow: 1px 1px 10px ${colors.SHADOW};
  transition: width 150ms ease-out,
              height 150ms ease-out,
              background ${transitions.LENGTH_COMMON_MS} ease-out;

  &:hover {
    background: ${colors.BLUE_PRIMARY_HOVER};
  }

  &:disabled:hover {
    background: ${colors.BLUE_PRIMARY};
  }

  &:active {
    ${buttonActiveTransform}
    box-shadow: 1px 1px 4px ${colors.SHADOW};
  }

  &:disabled:active {
    transform: none;
    box-shadow: 1px 1px 10px ${colors.SHADOW};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background: ${colors.BLUE_PRIMARY};
    ${props => props.isLoading && `
      animation: ${animatePlayStateLoading} 1s ease-out infinite;
    `}
  }
`

const uniqueStreamUrl = (url) => `${url}?t=${Date.now()}`

const getStream = (streams, number) => (
  streams.find(stream => stream.number === number)
)

class Player extends Component {
  constructor (props) {
    super(props)

    const stream = getStream(props.station.streams, props.streamNumber)

    this.state = {
      isLoadingAudioSrc: true,
      streamUrl: uniqueStreamUrl(stream.url)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { isPlaying, station, streamNumber } = this.props
    const isStartingToPause = !nextProps.isPlaying && isPlaying

    if (isStartingToPause) {
      this.setState({ streamUrl: null, isLoadingAudioSrc: false })
      return
    }

    const isChangingStations = nextProps.station.slug !== station.slug
    const isStartingToPlay = nextProps.isPlaying && !isPlaying
    const isChangingStreams = nextProps.streamNumber !== streamNumber
    const isChangingCurrentStationStream = !isChangingStations && isChangingStreams
    const nextStream = getStream(nextProps.station.streams, nextProps.streamNumber)

    const hasNewStream = (
      isChangingStations ||
      isStartingToPlay ||
      isChangingCurrentStationStream
    )

    if (!hasNewStream) { return }

    this.setState({
      streamUrl: uniqueStreamUrl(nextStream.url),
      isLoadingAudioSrc: true
    })
  }

  get activeStream () {
    const { station, streamNumber } = this.props
    return station.streams.find(stream => stream.number === streamNumber)
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
    router.push(buildStationPath(slug))
  }

  handleTogglePlayState = () => this.props.togglePlayState()

  handleNextClick = () => this.playStation(this.props.nextStation.slug)

  handlePrevClick = () => this.playStation(this.props.prevStation.slug)

  handleSoundPlaying = () => this.setState({ isLoadingAudioSrc: false })

  render () {
    const { isPlaying } = this.props
    const { isLoadingAudioSrc, streamUrl } = this.state

    return (
      <StyledPlayer>
        {streamUrl && (
          <AudioPlayer
            handleSoundPlaying={this.handleSoundPlaying}
            handleSoundError={this.handleTogglePlayState}
            playerIsPlaying={isPlaying}
            streamUrl={streamUrl}
          />
        )}

        <StyledControls>
          <StyledSeekButton onClick={this.handlePrevClick}>
            <StyledReversePlayIcon />
          </StyledSeekButton>

          <StyledPlayStateButton
            onClick={this.handleTogglePlayState}
            isLoading={isLoadingAudioSrc}
            disabled={isLoadingAudioSrc}
          >
            {this.playStateIcon}
          </StyledPlayStateButton>

          <StyledSeekButton onClick={this.handleNextClick}>
            <PlayIcon />
          </StyledSeekButton>
        </StyledControls>
      </StyledPlayer>
    )
  }
}

Player.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  nextStation: stationPropTypes,
  playStation: PropTypes.func.isRequired,
  prevStation: stationPropTypes,
  station: stationPropTypes.isRequired,
  streamNumber: PropTypes.string,
  togglePlayState: PropTypes.func.isRequired
}

Player.defaultProps = {
  streamNumber: DEFAULT_STREAM_NUMBER
}

const mapStateToProps = (state) => ({
  isPlaying: state.player.isPlaying,
  nextStation: findNextStationBySlug(state.stations.items, state.player.activeStationSlug),
  prevStation: findPrevStationBySlug(state.stations.items, state.player.activeStationSlug)
})

const mapDispatchToProps = (dispatch) => ({
  playStation: (args) => dispatch(playStation(args)),
  togglePlayState: () => dispatch(togglePlayState())
})

export {
  Player,
  uniqueStreamUrl
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Player)
