import { connect } from 'react-redux'
import { findStationBySlug } from 'selectors/station'
import App from 'components/app'

const mapStateToProps = (state) => {
  return {
    playerIsOpen: state.player.isOpen,
    playerIsPlaying: state.player.isPlaying,
    activeStation: findStationBySlug(state.stations.items, state.player.activeStation)
  }
}

export default connect(
  mapStateToProps,
  null
)(App)
