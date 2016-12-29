import React, { Component, PropTypes } from 'react'
import TwitterFeed from 'components/twitter-feed'
import PlayIcon from 'react-icons/lib/md/play-arrow'
import PauseIcon from 'react-icons/lib/md/pause'
import 'styles/pages/common'

export default class Station extends Component {
  static propTypes = {
    station: PropTypes.object.isRequired,
    playStation: PropTypes.func.isRequired,
    playerIsPlaying: PropTypes.bool.isRequired,
    activeStation: PropTypes.string.isRequired,
    togglePlayState: PropTypes.func.isRequired
  };

  handleButtonClick = () => {
    const { playStation, station } = this.props
    playStation(station.slug)
  }

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
    return (
      <div className="page--list__feed">
        <div className="relative overflow-hidden full-height">
          <div className="page--list__header flex">
            <div className="flex-grow-1 font-primary text-uppercase color-white">
              {this.props.station.name}
            </div>

            <div className="player__play-controls--header m-l-0__8">
              <button className="player__play-controls__play-state__button btn-reset
                                 full-width full-height color-white"
                      onClick={this.handlePlayToggleClick}>
                <div className="player__play-controls__play-state__inner
                                full-width full-height flex flex-justify-center
                                flex-align-center cursor-pointer">
                  {
                    this.props.playerIsPlaying && this.isActiveStation
                      ? <PauseIcon />
                      : <PlayIcon />
                  }
                </div>
              </button>
            </div>
          </div>

          <div className="page--list__scrollable p-1__5">
            <TwitterFeed twitterHandle={this.props.station.twitterHandle} />
          </div>
        </div>
      </div>
    )
  }
}
