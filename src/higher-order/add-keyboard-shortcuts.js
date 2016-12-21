import React, { Component } from 'react'
import { store } from 'containers/root'
import { togglePlayState } from 'actions/player'

const SPACE_KEY = 32

export default function (ComposedComponent) {
  return class extends Component {
    componentDidMount () {
      window.addEventListener('keydown', this.handleKeyUp)
    }

    componentWillUnMount () {
      window.removeEventListener('keydown', this.handleKeyUp)
    }

    handleKeyUp = (event) => {
      switch (event.keyCode) {
        case SPACE_KEY:
          event.preventDefault() // Prevent scroll
          this.handleSpaceKey()
      }
    }

    handleSpaceKey = () => {
      store.dispatch(togglePlayState())
    }

    render () {
      return (
        <ComposedComponent {...this.props} />
      )
    }
  }
}
