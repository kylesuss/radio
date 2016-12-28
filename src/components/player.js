import React, { Component, PropTypes } from 'react'
import Link from 'react-router/lib/Link'
import PlayIcon from 'react-icons/lib/md/play-arrow'
import PauseIcon from 'react-icons/lib/md/pause'
import ForwardIcon from 'react-icons/lib/fa/forward'
import BackwardIcon from 'react-icons/lib/fa/backward'
import buildLocation from 'utils/build-location'
import { buildStationPath } from 'constants/routes'
import Sound from 'react-sound'
import classnames from 'classnames'
import isNil from 'lodash/isNil'
import 'styles/player'

export default class Player extends Component {
  static propTypes = {
    station: PropTypes.object,
    isOpen: PropTypes.bool.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    togglePlayState: PropTypes.func.isRequired,
    playStation: PropTypes.func.isRequired,
    prevStation: PropTypes.object.isRequired,
    nextStation: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.state = { isLoading: false }
  }

  componentWillReceiveProps (nextProps) {
    const { station } = this.props

    if (!station || nextProps.station.slug !== station.slug) {
      this.setState({ isLoading: true })
    }
  }

  get audioSrc () {
    return this.props.station.streamUrl
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

  get wrapperClasses () {
    return classnames({
      'player color-white': true,
      'player--open': this.props.isOpen
    })
  }

  get playStateClasses () {
    return classnames({
      'player__play-controls__play-state__inner full-width full-height flex flex-justify-center flex-align-center cursor-pointer': true,
      'player__play-controls__play-state__inner--loading': this.state.isLoading
    })
  }

  get stationPath () {
    return buildStationPath(this.props.station.slug)
  }

  handlePlayToggleClick = () => this.props.togglePlayState()

  handleNextClick = () => this.props.playStation(this.props.nextStation.slug)

  handlePrevClick = () => this.props.playStation(this.props.prevStation.slug)

  handleSoundPlaying = () => this.setState({ isLoading: false })

  get stationTemplate () {
    const { isPlaying, station } = this.props

    return (
      <div className="flex flex-grow-1">
        <Sound url={station.streamUrl}
               playStatus={this.soundPlayStatus}
               onPlaying={this.handleSoundPlaying} />

        <div className="player__controls flex flex-justify-center">
          <div className="player__prev-controls flex">
            <button className="btn-reset color-white"
                    onClick={this.handlePrevClick}>
              <BackwardIcon />
            </button>
          </div>

          <div className="player__play-controls m-l-0__8">
            <button className="player__play-controls__play-state__button btn-reset
                               full-width full-height color-white"
                    onClick={this.handlePlayToggleClick}
                    disabled={this.state.isLoading}>
              <div className={this.playStateClasses}>
                {
                  isPlaying
                    ? <PauseIcon />
                    : <PlayIcon />
                }
              </div>
            </button>
          </div>

          <div className="player__next-controls flex m-l-0__8">
            <button className="btn-reset color-white"
                    onClick={this.handleNextClick}>
              <ForwardIcon />
            </button>
          </div>
        </div>

        <div className="player__info player__info--with-link flex m-l-1__5
                        flex-direction-column flex-justify-center">
          <span className="color-blue-grey text-uppercase font-size-13">
            {
              this.state.isLoading
                ? 'Loading:'
                : 'Now playing:'
            }
          </span>
          <span className="color-white font-size-18 link-light">
            <Link to={this.stationPath}>
              {station.name}
            </Link>
          </span>
        </div>

        <div className="player__info flex flex-direction-column m-l-1
                        flex-justify-center">
          <span className="color-blue-grey text-uppercase font-size-13">
            Location:
          </span>
          <span className="color-white font-size-18">
            {buildLocation(station.city, station.country)}
          </span>
        </div>

        <div className="flex flex-grow-1 flex-justify-end">
          <div className="player__keyboard-shortcuts color-blue-grey">

            <div className="text-center text-bold text-uppercase">
              Keyboard shortcuts:
            </div>

            <div className="flex flex-align-center">
              <span className="m-r-1" title="Left arrow key">
                <span className="font-style-italic">left</span>
                <span> - previous station</span>
              </span>

              <span className="m-r-1" title="Space key">
                <span className="font-style-italic">space</span>
                <span> - play / pause</span>
              </span>

              <span title="Right arrow key">
                <span className="font-style-italic">right</span>
                <span> - next station</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className={this.wrapperClasses}>
        <div className="player__inner flex flex-align-center">
          {this.props.station && this.stationTemplate}
        </div>
      </div>
    )
  }
}
