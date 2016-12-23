import React, { Component, PropTypes } from 'react'
import Link from 'react-router/lib/Link'
import PlayIcon from 'react-icons/lib/md/play-arrow'
import PauseIcon from 'react-icons/lib/md/pause'
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
    togglePlayState: PropTypes.func.isRequired
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
      'player__controls__play-state__inner full-width full-height flex flex-justify-center flex-align-center': true,
      'player__controls__play-state__inner--loading': this.state.isLoading
    })
  }

  get stationPath () {
    return buildStationPath(this.props.station.slug)
  }

  handlePlayToggle = () => this.props.togglePlayState()

  handleSoundPlaying = () => this.setState({ isLoading: false })

  get stationTemplate () {
    const { isPlaying, station } = this.props

    return (
      <div className="flex">
        <Sound url={station.streamUrl}
               playStatus={this.soundPlayStatus}
               onPlaying={this.handleSoundPlaying} />

        <div className="player__controls m-r-3">
          <button className="player__controls__play-state__button btn-reset
                             full-width full-height color-white"
                  onClick={this.handlePlayToggle}
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

        <div className="player__info player__info--with-link flex
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

        <div className="player__info flex flex-direction-column m-l-1">
          <span className="color-blue-grey text-uppercase font-size-13">
            Location:
          </span>
          <span className="color-white font-size-18">
            {buildLocation(station.city, station.country)}
          </span>
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
