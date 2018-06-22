import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { togglePlayState } from 'actions/player'
import { findPrevStationUrl, findNextStationUrl } from 'selectors/station'

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
      const { history, prevStationUrl } = this.props
      history.push(prevStationUrl)
    }

    handleRightArrowKey = () => {
      const { history, nextStationUrl } = this.props
      console.log(nextStationUrl)
      history.push(nextStationUrl)
    }

    render () {
      // eslint-disable-next-line no-unused-vars
      const { match, nextStationUrl, prevStationUrl, togglePlayState, ...rest } = this.props

      return (
        <ComposedComponent {...rest} />
      )
    }
  }

  KeyboardShortcuts.propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        streamNumber: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    nextStationUrl: PropTypes.string,
    prevStationUrl: PropTypes.string
  }

  return KeyboardShortcuts
}

const mapStateToProps = (state, ownProps) => {
  const { player: { activeStationSlug }, stations: { items } } = state
  const currentStreamNumber = ownProps.match.params.streamNumber

  return {
    nextStationUrl: findNextStationUrl(items, activeStationSlug, currentStreamNumber),
    prevStationUrl: findPrevStationUrl(items, activeStationSlug, currentStreamNumber)
  }
}

const mapDispatchToProps = (dispatch) => ({
  togglePlayState: () => dispatch(togglePlayState())
})

const withKeyboardShortcutsAndData = (ComposedComponent) => (
  compose(
    withRouter,
    // mapStateToProps requires props from withRouter
    connect(mapStateToProps, mapDispatchToProps),
    withKeyboardShortcuts
  )(ComposedComponent)
)

export {
  withKeyboardShortcuts,
  SPACE_KEY,
  LEFT_ARROW_KEY,
  RIGHT_ARROW_KEY
}

export default withKeyboardShortcutsAndData
