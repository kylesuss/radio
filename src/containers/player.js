import { connect } from 'react-redux'
import Player from 'components/player'
import { findStationBySlug } from 'selectors/station'

const mapStateToProps = (state) => {
  return {
    isOpen: state.player.isOpen,
    isPlaying: state.player.isPlaying,
    station: findStationBySlug(state.stations, state.player.activeStation)
  }
}

export default connect(
  mapStateToProps,
  null
)(Player)
