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

  state = {
    isLoading: false
  }

  componentDidMount () {
    window.soundManager && window.soundManager.setup({ debugMode: false })
  }

  componentWillReceiveProps (nextProps) {
    const { station } = this.props

    if (!station || nextProps.station.slug !== station.slug) {
      this.setState({ isLoading: true })
    }
  }

  get isPaused () {
    const { station, isPlaying } = this.props
    return !isNil(station) && !isPlaying
  }

  get soundPlayStatus () {
    if (this.isPaused) { return Sound.status.PAUSED }
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

  handlePlayToggleClick = () => this.props.togglePlayState()

  handleNextClick = () => this.playStation(this.props.nextStation.slug)

  handlePrevClick = () => this.playStation(this.props.prevStation.slug)

  handleSoundPlaying = () => this.setState({ isLoading: false })

  render () {
    const { station, isPlaying } = this.props
    const { isLoading } = this.state

    return (
      <StyledPlayer.Container>
        <StyledPlayer.Inner>
          {station && (
            <StyledPlayer.StationContainer>
              <Sound
                url={station.streamUrl}
                playStatus={this.soundPlayStatus}
                onPlaying={this.handleSoundPlaying}
              />

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
