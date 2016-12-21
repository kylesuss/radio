import React, { Component } from 'react'
import { store } from 'containers/root'
import { togglePlayState } from 'actions/player'

const SPACE_KEY = 32

export default function (ComposedComponent) {
  return class extends Component {
    componentDidMount () {
      window.addEventListener('keyup', this.handleKeyUp)
    }

    componentWillUnMount () {
      window.removeEventListener('keyup', this.handleKeyUp)
    }

    handleKeyUp = (event) => {
      switch (event.keyCode) {
        case SPACE_KEY:
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
