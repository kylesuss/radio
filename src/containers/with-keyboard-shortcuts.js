import React, { Component } from 'react'
import { store } from 'containers/root'
import { togglePlayState, playStation } from 'actions/player'
import { findPrevStationBySlug, findNextStationBySlug } from 'selectors/station'

const SPACE_KEY = 32
const LEFT_ARROW_KEY = 37
const RIGHT_ARROW_KEY = 39

export default function (ComposedComponent) {
  return class extends Component {
    componentDidMount () {
      window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount () {
      window.removeEventListener('keydown', this.handleKeyDown)
    }

    // TODO: Is there a better way of doing this?
    get storeState () {
      return store.getState()
    }

    get stationList () {
      return this.storeState.stations.items
    }

    get activeSlug () {
      return this.storeState.player.activeStation
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

    handleSpaceKey = () => store.dispatch(togglePlayState())

    handleLeftArrowKey = () => {
      const { router } = this.props
      const prevStation = findPrevStationBySlug(this.stationList, this.activeSlug)

      store.dispatch(playStation(prevStation.slug))
      router.push(`/${prevStation.slug}`)
    }

    handleRightArrowKey = () => {
      const { router } = this.props
      const nextStation = findNextStationBySlug(this.stationList, this.activeSlug)

      store.dispatch(playStation(nextStation.slug))
      router.push(`/${nextStation.slug}`)
    }

    render () {
      return (
        <ComposedComponent {...this.props} />
      )
    }
  }
}
