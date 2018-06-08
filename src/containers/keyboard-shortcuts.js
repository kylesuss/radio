import React, { Component } from 'react'
import { connect } from 'react-redux'
import { togglePlayState, playStation } from 'actions/player'
import { findPrevStationBySlug, findNextStationBySlug } from 'selectors/station'
import { buildStationPath } from 'constants/routes'

const SPACE_KEY = 32
const LEFT_ARROW_KEY = 37
const RIGHT_ARROW_KEY = 39

const withKeyboardShortcuts = (ComposedComponent) => {
  class KeyboardShortcuts extends Component {
    componentDidMount () {
      window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount () {
      window.removeEventListener('keydown', this.handleKeyDown)
    }

    playStation = (slug) => {
      const { playStation, router } = this.props
      playStation(slug)
      router.push(buildStationPath(slug))
    }

    handleKeyDown = (event) => {
      switch (event.keyCode) {
        case SPACE_KEY:
          event.preventDefault() // Prevent scroll
          this.handleSpaceKey()
          break
        case LEFT_ARROW_KEY:
          this.handleLeftArrowKey()
          break
        case RIGHT_ARROW_KEY:
          this.handleRightArrowKey()
      }
    }

    handleSpaceKey = () => this.props.togglePlayState()

    handleLeftArrowKey = () => {
      const { activeStationSlug, stationList } = this.props
      const prevStation = findPrevStationBySlug(stationList, activeStationSlug)
      this.playStation(prevStation.slug)
    }

    handleRightArrowKey = () => {
      const { activeStationSlug, stationList } = this.props
      const nextStation = findNextStationBySlug(stationList, activeStationSlug)
      this.playStation(nextStation.slug)
    }

    render () {
      return (
        <ComposedComponent {...this.props} />
      )
    }
  }

  return KeyboardShortcuts
}

const mapStateToProps = (state) => ({
  stationList: state.stations.items,
  activeStationSlug: state.player.activeStationSlug
})

const mapDispatchToProps = (dispatch) => ({
  playStation: (slug) => dispatch(playStation(slug)),
  togglePlayState: () => dispatch(togglePlayState())
})

const withKeyboardShortcutsAndData = (ComposedComponent) => (
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withKeyboardShortcuts(ComposedComponent))
)

export {
  withKeyboardShortcuts,
  SPACE_KEY,
  LEFT_ARROW_KEY,
  RIGHT_ARROW_KEY
}

export default withKeyboardShortcutsAndData
