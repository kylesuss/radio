import React, { Component } from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import StyledPlayer from 'styled/player'
import StyledButton from 'styled/button'
import * as colors from 'styles/colors'
import PlayIcon from 'react-icons/lib/md/play-arrow'
import PauseIcon from 'react-icons/lib/md/pause'
import ForwardIcon from 'react-icons/lib/fa/forward'
import BackwardIcon from 'react-icons/lib/fa/backward'
import { buildStationPath } from 'constants/routes'
import Sound from 'react-sound'
import isNil from 'lodash/isNil'

const StyledSeekButton = styled(StyledButton)`
  color: ${colors.WHITE};
`

class Player extends Component {
  static propTypes = {
    station: PropTypes.object,
    isPlaying: PropTypes.bool.isRequired,
    togglePlayState: PropTypes.func.isRequired,
    playStation: PropTypes.func.isRequired,
    prevStation: PropTypes.object.isRequired,
    nextStation: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      isLoading: false,
      streamUrl: props.station.streamUrl
    }
  }

  componentDidMount () {
    window.soundManager && window.soundManager.setup({ debugMode: false })
  }

  componentWillReceiveProps (nextProps) {
    const { station } = this.props
    const isChangingStations = nextProps.station.slug !== station.slug
    const stateUpdates = {}

    if (isChangingStations) {
      stateUpdates.streamUrl = nextProps.station.streamUrl
    }

    if (!station || isChangingStations) {
      stateUpdates.isLoading = true
    }

    Object.keys(stateUpdates).length && this.setState(stateUpdates)
  }

  get isPaused () {
    const { station, isPlaying } = this.props
    return !isNil(station) && !isPlaying
  }

  get soundPlayStatus () {
    if (this.isPaused) { return Sound.status.STOPPED }
    if (this.props.isPlaying) { return Sound.status.PLAYING }
    return Sound.status.STOPPED
  }

  get stationPath () {
    return buildStationPath(this.props.station.slug)
  }

  playStation = (slug) => {
    const { router, playStation } = this.props

    playStation(slug)
    router.push(`/${slug}`)
  }

  handlePlayToggleClick = () => {
    const { station } = this.props

    if (this.isPaused) {
       // Its going to become active
      this.setState({ streamUrl: station.streamUrl })
    } else {
      // Its going to become paused
      this.setState({ streamUrl: null })
    }

    this.props.togglePlayState()
  }

  handleNextClick = () => this.playStation(this.props.nextStation.slug)

  handlePrevClick = () => this.playStation(this.props.prevStation.slug)

  handleSoundPlaying = () => this.setState({ isLoading: false })

  render () {
    const { station, isPlaying } = this.props
    const { isLoading, streamUrl } = this.state

    return (
      <StyledPlayer.Container>
        <StyledPlayer.Inner>
          {station && (
            <StyledPlayer.StationContainer>
              {streamUrl && (
                <Sound
                  url={streamUrl}
                  playStatus={this.soundPlayStatus}
                  onPlaying={this.handleSoundPlaying}
                />
              )}

              <StyledPlayer.Controls>
                <StyledPlayer.PrevControls>
                  <StyledSeekButton onClick={this.handlePrevClick}>
                    <BackwardIcon />
                  </StyledSeekButton>
                </StyledPlayer.PrevControls>

                <StyledPlayer.PlayStateControls>
                  <StyledPlayer.PlayStateButton
                    onClick={this.handlePlayToggleClick}
                    disabled={isLoading}
                  >
                    <StyledPlayer.PlayStateInner isLoading={isLoading}>
                      {
                        isPlaying
                          ? <PauseIcon />
                          : <PlayIcon />
                      }
                    </StyledPlayer.PlayStateInner>
                  </StyledPlayer.PlayStateButton>
                </StyledPlayer.PlayStateControls>

                <StyledPlayer.NextControls>
                  <StyledSeekButton onClick={this.handleNextClick}>
                    <ForwardIcon />
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

export default withRouter(Player)
